/**
 * Created by Administrator on 2017/1/13.
 */
    //封装：添加过渡结束的监听
var itcast = {
    addTransitionEnd: function (dom,callback) {
        dom.addEventListener("transitionEnd", function () {
            callback && callback();
        });
        dom.addEventListener("webkitTransitionEnd", function () {
            callback && callback();
        });
        dom.addEventListener("msTransitionEnd", function () {
            callback && callback();
        });
        dom.addEventListener("oTransitionEnd", function () {
            callback && callback();
        });
        dom.addEventListener("mozTransitionEnd", function () {
            callback && callback();
        });
    },
    addAnimationEnd: function (dom,callback) {
        dom.addEventListener("animationEnd", function () {
            callback && callback();
        });
        dom.addEventListener("webkitAnimationEnd", function () {
            callback && callback();
        });
        dom.addEventListener("msAnimationEnd", function () {
            callback && callback();
        });
        dom.addEventListener("oAnimationEnd", function () {
            callback && callback();
        });
        dom.addEventListener("mozAnimationEnd", function () {
            callback && callback();
        });
    }
};