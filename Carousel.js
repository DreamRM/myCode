function Lubo(option) {
    this.init(option);
}
var timer = null;
Lubo.prototype = {
    constructor: Lubo,
    init: function(option) {
        this.eleInit(option);
        this.circleInit();
        this.arrowInit();
        this.autoplay(option);
    },
    eleInit: function(option) {
        this.box = document.getElementById(option.boxId);
        this.ul = this.box.children[0].children[0];
        this.circles = document.getElementById(option.circleId).children;
        this.arrow = document.getElementById(option.arrowId);
        this.lis = this.ul.children;
        this.arrowL = this.arrow.children[0];
        this.arrowR = this.arrow.children[1];
        this.imgHeight = this.lis[0].offsetHeight;
        this.imgWidth = this.lis[0].offsetWidth;
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = option.liClass;
        }
        this.opacity = option.opacity;
        this.directions = option.direction;
        this.ul.className = option.ulClass;
        this.current = 0;
        this.target;
    },
    circleInit: function() {
        for (var i = 0; i < this.circles.length; i++) {
            var that = this;
            this.circles[i].index = i;
            this.circles[i].onmouseover = function() {
                if (this.index == 0 && that.current == that.circles.length - 1) {
                    that.current = 0;
                    if (that.directions == "top") {
                        that.target = -(that.lis.length - 1) * that.imgHeight;
                        animateV(that.ul, { "top": that.target }, function() {
                            that.ul.style.top = "0px";
                        })
                    } else if (that.directions == "left") {
                        that.target = -(that.lis.length - 1) * that.imgWidth;
                        animateV(that.ul, { "left": that.target }, function() {
                            that.ul.style.left = "0px";
                        })
                    }
                } else {
                    that.current = this.index;
                    if (that.directions == "top") {
                        that.target = that.current * that.imgHeight * -1;
                        animateV(that.ul, { "top": that.target });
                    } else if (that.directions == "left") {
                        that.target = that.current * that.imgWidth * -1;
                        animateV(that.ul, { "left": that.target });
                    } else if ((that.directions == "opacity")) {
                        animateV(that.lis[that.current], { "opacity": 1, "zIndex": 1 });
                    }
                }
                for (var j = 0; j < that.circles.length; j++) {
                    that.circles[j].removeAttribute("class");
                    if ((that.directions == "opacity")) {
                        that.lis[j].style.zIndex = 0;
                        that.lis[j].style.opacity = 0;
                    }
                }
                this.className = "current";
            }
        }
    },
    arrowInit: function() {
        var that = this;
        this.arrowR.onclick = function() {
                if (that.current == (that.lis.length - 1)) {
                    that.current = 0;
                    if (that.directions == "top") {
                        that.ul.style.top = "0px";
                        that.ul.style.left = "0px";
                    } else if (that.directions == "left") {
                        that.ul.style.left = "0px";
                        that.ul.style.top = "0px";
                    }
                }
                that.current++;

                that.getCircle = function() {
                    if (that.directions == "top") {
                        that.target = that.current * that.imgHeight * -1;
                        animateV(that.ul, { "top": that.target });
                    } else if (that.directions == "left") {
                        that.target = that.current * that.imgWidth * -1;
                        animateV(that.ul, { "left": that.target });
                    } else if (that.directions == "opacity") {
                        for (var i = 0; i < that.lis.length; i++) {
                            that.lis[i].style.zIndex = 0;
                            that.lis[i].style.opacity = 0;
                        }
                        animateV(that.lis[that.current], { "zIndex": 1, "opacity": 1 });
                    }
                }
                that.getCircle();

                if (that.current == (that.lis.length - 1)) {
                    that.circles[that.circles.length - 1].removeAttribute("class");
                    that.circles[0].className = "current";
                } else {
                    for (var j = 0; j < that.circles.length; j++) {
                        that.circles[j].removeAttribute("class");
                    }
                    that.circles[that.current].className = "current";
                }
            },
            this.arrowL.onclick = function() {
                if (that.current == 0) {
                    that.current = that.lis.length - 1;
                    if (that.directions == "top") {
                        that.ul.style.top = -(that.lis.length - 1) * that.imgHeight + "px";
                    } else if (that.directions == "left") {
                        that.ul.style.left = -(that.lis.length - 1) * that.imgWidth + "px";
                    }
                }
                that.current--;
                that.getCircle();
                for (var j = 0; j < that.circles.length; j++) {
                    that.circles[j].removeAttribute("class");
                }
                that.circles[that.current].className = "current";
            }
    },
    autoplay: function(option) {
        var that = this;
        clearInterval(timer)
        if (option.autoplay) {
            timer = setInterval(this.arrowR.onclick, 3000);
        }

        this.box.onmouseover = function() {
            that.arrow.style.display = "block";
            clearInterval(timer);
        };

        this.box.onmouseout = function() {
            that.arrow.style.display = "none";
            if (option.autoplay) {
                timer = setInterval(that.arrowR.onclick, 3000);
            }
        };
    },

}

var leftBtn = document.querySelector("#left");
var topBtn = document.querySelector("#top");
var opaBtn = document.querySelector("#opacity");

leftBtn.onclick = fn1;

function fn1() {
    var control = new Lubo({
        ulClass: "ulLine", // ul水平移动类名
        direction: "left", // 水平移动方向

        boxId: "box", // 轮播图盒子
        circleId: "list", // 小圆点的id
        arrowId: "arrow", // 左右箭头的id
        autoplay: true // 控制自动轮播
    });
    console.log(leftBtn)
}

topBtn.onclick = fn2;

function fn2() {
    var control = new Lubo({
        ulClass: "ulVertical", // ul垂直移动类名
        direction: "top", // 垂直移动方向
        boxId: "box", // 轮播图盒子
        circleId: "list", // 小圆点的id
        arrowId: "arrow", // 左右箭头的id
        autoplay: true // 控制自动轮播
    });
    console.log(topBtn)
}

opaBtn.onclick = fn3;

function fn3() {
    var control = new Lubo({
        liClass: "lizp", // li标签的类名
        direction: "opacity", // 判断渐变
        boxId: "box", // 轮播图盒子
        circleId: "list", // 小圆点的id
        arrowId: "arrow", // 左右箭头的id
        autoplay: true // 控制自动轮播
    });
    console.log(opaBtn)
}


