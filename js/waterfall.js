// 把所有盒子元素添加进数组，并返回
var boxesAll = function() {
    var boxes = document.querySelectorAll('.box')
    boxesArr = []
    for(let i = 0; i < boxes.length; i++) {
        boxesArr.push(boxes[i])
    }
    return boxesArr
}

// 最矮的高度的那个盒子在行中的下标的高度
var minHeightIndex = function(boxesHArr, minH) {
    for(let i = 0; i < boxesHArr.length; i++) {
        // 找出最矮图片盒子的高度
        if(minH == boxesHArr[i]){
            return i
        }
    }
}

// 计算列数和列宽
var columnCount = function() {
    var boxes = document.querySelectorAll('.box')
    // 页面总宽度
    var Mainwidth = document.documentElement.clientWidth
    var boxWidth = boxes[0].offsetWidth
    var colObj = {
            "boxWidth": boxWidth,
            "cols": Math.floor(Mainwidth / boxWidth),
    }
    return colObj
}

// 添加样式定位图片
var addStyle = function() {
    // 得到含有所有盒子元素的数组
    var boxesArr = boxesAll()
    // 计算列数和列宽
    var colObj = columnCount()
    // 找出行中高度最低的盒子的高度, 并将作为下一行元素的 top
    var main = document.querySelector('.main')
    main.style.width = colObj.boxWidth * colObj.cols + 'px'
    main.style.margin = '0 auto'

    var boxesHArr = []
    //遍历数组 boxesArr 的每个盒子元素
    for(let i = 0; i < boxesArr.length; i++) {
        var boxesH = boxesArr[i].offsetHeight
        if(i < colObj.cols) {
            boxesHArr[i] = boxesH
        } else {
            // 找出行中最矮的高度的那个盒子
            var minH = Math.min.apply(null, boxesHArr)
            // console.log('boexHArr', boxesHArr, 'minH', minH)
            // 最矮的高度的那个盒子在行中的下标
            var minHIndex = minHeightIndex(boxesHArr, minH)
            boxesArr[i].style.position='absolute'
            boxesArr[i].style.top= minH + 'px'
            boxesArr[i].style.left=boxesArr[minHIndex].offsetLeft + 'px'
            //数组 最小高元素的高 + 添加上的 boxesArr[i] 盒子高
            boxesHArr[minHIndex] += boxesArr[i].offsetHeight
        }
    }
}

// 检查高度，判断是否该加载新的图片
var checkscrollside = function() {
    var main = document.querySelector('.main')
    var boxesArr = boxesAll()
    // 最后一个自身的 top + 自身高度的一半(实现未滚到底就开始加载)
    var len = boxesArr.length - 1
    var lastboxH = boxesArr[len].offsetTop + Math.floor(boxesArr[len].offsetHeight / 2);
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    var documentH = document.documentElement.clientHeight
    //到达指定高度后 返回 true，触发 waterfall() 函数
    var totalHeight = scrollTop + documentH
    if(lastboxH < totalHeight) {
        console.log('true')
        return true
    } else {
        console.log('false')
        return false
    }
}

// box 模板
var boxTemplate = function(imgSrc) {
    var t = `
        <div class='box'>
            <img src=${imgSrc}>
        </div>
    `
    return t
}

// 加载图片
var loadImg = function(imgArr) {
    var main = document.querySelector('.main')
        window.addEventListener("scroll", function(){
            if(checkscrollside()) {
                for(let i = 0; i < imgArr.length; i++) {
                    var imgSrc =  imgArr[i]
                    var boxDiv = boxTemplate(imgSrc)
                    main.insertAdjacentHTML('beforeend', boxDiv)
                }
                addStyle()
            }
        })
}

_main = function() {
    addStyle()
    var imgArr = [
        'waterfall-img/白saber.png',
        'waterfall-img/不明所以.jpg',
        'waterfall-img/村雨.png',
        'waterfall-img/惠惠.jpg',
        'waterfall-img/婚纱saber.png',
        'waterfall-img/凛.png',
        'waterfall-img/尼禄.jpg',
        'waterfall-img/无名.jpg',
        'waterfall-img/信长.jpg',
        'waterfall-img/学妹.jpg',
        'waterfall-img/亚斯娜.png',
        'waterfall-img/樱.png',
        'waterfall-img/樱花贞德.jpg',
        'waterfall-img/贞德.jpg',
        'waterfall-img/凛1.jpg',
        'waterfall-img/尼禄1.jpg',
        'waterfall-img/伊卫宫.jpg',
        'waterfall-img/你的名字.jpg',
        'waterfall-img/打工战士.jpg',
        'waterfall-img/单身狗.jpg',
        'waterfall-img/两仪式.jpg',
        'waterfall-img/人工智障.jpg',
        'waterfall-img/折千.jpg',
        'waterfall-img/折基.jpg',
        'waterfall-img/桐人.jpg',
        'waterfall-img/助手.jpg',
        'waterfall-img/团子雪乃.jpg',
    ]
    loadImg(imgArr)
}

_main()
