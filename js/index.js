/**
 * Created by Administrator on 2017/1/13.
 */
window.onload= function () {
    header();
    banner();
    timeBack();
}

function header(){
    var banner=document.querySelector(".jd_banner");
    var bannerHeight=banner.offsetHeight;
    var header=document.querySelector(".jd_header");
    window.onscroll=function(){
        var top=document.body.scrollTop;
        var opacity=0;
        if(top < bannerHeight){
            opacity=top/bannerHeight;
        }
        else{
            opacity=1;
        }
        header.style.background="rgba(233,35,34,"+opacity+")";
    }
}

function banner() {
    //自动轮播
    /*1.获取banner，并获取它的宽度
     2.获取用于轮播的ul
     3.设置索引
     4.添加时钟，实现自动轮播
     5.注意：之前添加的过渡效果如果没有清除，那么在下次设置某个样式的时候还会拥有之前添加的过渡效果
     6.当处理最后一张图片的时候，要注意要先过渡到最后一张之后再进行图片的非过渡效果的跳转。*/
    var banner = document.querySelector('.jd_banner');
    var bannerWidth=banner.offsetWidth;
    var imgBox=banner.querySelector("ul:first-of-type");
    var indicators=banner.querySelector("ul:last-of-type").querySelectorAll("li");
    var index=1;
    var timerId;
    //开启过渡
    var openTransition=function(){
        imgBox.style.transition="transform .2s";
        imgBox.style.webkitTransition="transform .2s";
    }
    //关闭过渡
    var closeTransition=function(){
        imgBox.style.transition="none";
        imgBox.style.webkitTransition="none";
    }
    //设置偏移
    var setTransform=function(distanceX){
        imgBox.style.transform="translateX("+distanceX+"px)";
        imgBox.style.webkitTransform="translateX("+distanceX+"px)";
    }
    //开启定时器
    var openTimer=function(){
        timerId=setInterval(function(){
            index++;
            openTransition();
            setTransform(-index*bannerWidth);
        },2000);
    }
    //设置标记样式
    var setIndicator=function(index){
        for(var i=0;i<indicators.length;i++){
            indicators[i].classList.remove('active');
        }
        indicators[index-1].classList.add('active');
    }
    //开启自动轮播
    openTimer();
    //手动轮播--滑动
    var startX=0;
    var moveX=0;
    var distanceX=0;
    //滑动开始事件
    imgBox.addEventListener("touchstart",function(e){
        clearInterval(timerId);
        startX= e.touches[0].clientX;
    });
    //滑动过程事件
    imgBox.addEventListener("touchmove",function(e){
        moveX= e.touches[0].clientX;
        distanceX=moveX-startX;
        closeTransition();
        setTransform(-index*bannerWidth+distanceX);
    });
    //滑动结束事件
    imgBox.addEventListener("touchend",function(e){
        if(Math.abs(distanceX )> bannerWidth/3){
            if(distanceX>0){
                index--;
            }
            else if(distanceX <0){
                index++;
            }
            openTransition();
            setTransform(-index*bannerWidth);
        }
        else if(Math.abs(distanceX ) > 0){
            openTransition();
            setTransform(-index*bannerWidth);
        }
        setTimeout(function(){
            openTimer();
        },200);
    });
    //监听过渡结束后的事件
    var tend=function(){
        if(index==9){
            index=1;
            closeTransition();
            setTransform(-index*bannerWidth);
        }
        else if(index==0){
            index=8;
            closeTransition();
            setTransform(-index*bannerWidth);
        }
        setIndicator(index);
    }
    //添加过渡结束的监听
    itcast.addTransitionEnd(imgBox,tend);
    //添加window的改变屏幕大小的事件
    window.addEventListener("resize",function(){
        bannerWidth=banner.offsetWidth;
    })
    //添加window获取焦点和失去焦点的事件 即:web页面到后台
    window.addEventListener("blur",function(){
        clearInterval(timerId);
    })
    window.addEventListener("focus",function(){
        openTimer();
    })
}

//秒杀倒计时
function timeBack(){
    var spans=document.querySelector(".jd_sk_time").querySelectorAll("span");
    var total=3600;
    var timerId=setInterval(function(){
        total--;
        if(total<0){
            clearInterval(timerId);
            return;
        }
        var hour=Math.floor(total/3600);
        var minute=Math.floor(total%3600/60);
        var second=Math.floor(total%60);
        spans[0].innerHTML=Math.floor(hour/10);
        spans[1].innerHTML=Math.floor(hour%10);
        spans[3].innerHTML=Math.floor(minute/10);
        spans[4].innerHTML=Math.floor(minute%10);
        spans[6].innerHTML=Math.floor(second/10);
        spans[7].innerHTML=Math.floor(second%10);
    },1000);
}