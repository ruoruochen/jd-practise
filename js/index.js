//轮播图效果

let ul = document.querySelector(".slider-list");
let ol = document.querySelector(".slider-btnlist");
let startx;
let x;
var moveX;
let number = 0;
let w = ul.querySelector('li').offsetWidth;
let timer = setInterval(function () {
    number++;
    let translateX = -number * w;
    ul.style.transition = 'all .3s';
    ul.style.transform = 'translateX(' + translateX + 'px)';
}, 2000);

// 过渡完成之后进行判断
//——如果划到最后一张number=5 则取消动画效果跳转到第二张number=0
//——如果划到第一张number=-1 则取消动画效果跳转到倒数第二张number=4
ul.addEventListener("transitionend", function () {
    if (number == 5) {
        number = 0;
        // console.log(number);

        let translatex = -number * w;
        ul.style.transition = "none";
        ul.style.transform = "translateX(" + translatex + "px)"
    } else if (number == -1) {
        number = 4;
        let translatex = -number * w;
        ul.style.transition = "none";
        ul.style.transform = "translateX(" + translatex + "px)"
    }

    // 小圆点变化
    ol.querySelector('.active').classList.remove('active');
    ol.children[number].classList.add('active');

})


// 手指落下
// ——获取当前坐标
ul.addEventListener('touchstart', function (e) {
    startx = e.touches[0].clientX;
    clearInterval(timer);
})


// 手指移动
// ——计算移动距离
// ——移动盒子， =盒子原来位置+手指移动距离。
// ——取消动画效果
ul.addEventListener('touchmove', function (e) {
    // console.log("移动");
    x = e.touches[0].clientX;
    movex = x - startx;
    // console.log(x);
    // console.log(movex);

    let translateX = -number * w + movex;
    // console.log(translateX);

    ul.style.transition = 'none';
    ul.style.transform = 'translateX(' + translateX + 'px)';
})

// 手指抬起
// ——判断上一张或下一张 根据移动距离去判断是回弹还是播放上一张下一张 
// ————切换图片
// ————切换小圆点
ul.addEventListener('touchend', function (e) {
    if (Math.abs(movex) > 50) {
        if (movex < 0) {
            number++;
        } else {
            number--;
        }
    }

    let translateX = -number * w;
    // console.log(translateX);

    ul.style.transition = 'all 0.3s';
    ul.style.transform = 'translateX(' + translateX + 'px)';
    clearInterval(timer);
    //重新启动自动播放功能
    timer = setInterval(function () {
        number++;
        var translatex = -number * w;
        ul.style.transition = "all .3s"
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000);
})


window.addEventListener("scroll", function (e) {
    // console.log(window.pageYOffset);
    if (window.pageYOffset > 0) {
        document.querySelector(".search-wrap").style.backgroundColor = "#e43130";
        document.querySelector('#common_tip').style.display = "none";
    } else if (window.pageYOffset == 0) {
        document.querySelector('#common_tip').style.display = "block";
        document.querySelector(".search-wrap").style.backgroundColor = "#c82519";
    }
})