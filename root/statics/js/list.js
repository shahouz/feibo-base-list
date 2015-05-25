/**
 * Created by vqianduan on 15/5/12.
 */
 var loadAble = true;
var currentCate = 0;
var catePage = [1,1,1,1];
var thisrow = '';
var tabChangeSwitch = true;

function set_loading(){
    var picLoadList = [];
    var bannerPic = $(".bannerMainPic");
    var loadingBarWidth = 0;

    for(var i=0; i<bannerPic.length; i++){
        picLoadList.push(bannerPic.eq(i).attr("src"));
    }
    
    function loadPic(poi){
        var len = picLoadList.length;
        var i = poi ? poi : 0;
        if(i < len){
            var img = new Image();
            img.src = picLoadList[i];
            img.onload = function(e){
                i++;
                loadingBarWidth += 25;
                $(".loadingBar").css("width",loadingBarWidth+"%");
                loadPic(i);
            }
        }else{
            setTimeout(function(){
                $(".loading").hide();
                $(".loadingBar").hide();
                pageInit();
            },500);
        }
    };

    setTimeout(loadPic,200);
}

function get_banner(){
    var bannerHtml = '';
    $.ajax({
        type : "get",
        url  : "http://guye.cccwei.com/api.php?srv=1101&os_type=3&version=1",
        dataType : "json",
        success : function(d){
            for(var i in d.data){
                //bannerHtml += '<div class="swiper-slide"><img src="http://guye.cccwei.com/'+ d.data[i].img +'" class="bannerMainPic" /></div>';
                bannerHtml += '<img src="http://guye.cccwei.com/'+ d.data[i].img +'" class="bannerMainPic" />';
            }
            //$(".swiper-wrapper").html(bannerHtml);
            //swiper
			//var swiper = new Swiper('.swiper-container', {
			//    pagination: '.swiper-pagination',
			//    paginationClickable: true
			//});

            $(".bannerScroll").html(bannerHtml);
            //执行预加载
            set_loading();
        },
        error : function(){
            alert("焦点图数据请求失败");
        }
    });
}
function getLocalTime(endTime) {     
   //return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ').getFullYear();
   var newDate = new Date();
   newDate.setTime(endTime * 1000);
   return newDate.toLocaleDateString();
}
function get_list(){
	
	$.ajax({
        type : "get",
        url  : "http://guye.cccwei.com/api.php?srv=1103&os_type=3&version=1&cate_id=1&pg_size=20",
        dataType : "json",
        success : function(d){
        	var listHtml = '';
        	for(var i in d.data){
	        	listHtml += '<article class="mainArticle">';
	            listHtml += '<a href="'+ d.data[i].url +'">';
	            listHtml += '<img src="http://guye.cccwei.com/'+ d.data[i].pic +'" class="icon">';
	            listHtml += '<h3>'+ d.data[i].title +'</h3>';
	            listHtml += '<p>'+ d.data[i].author +' / '+ getLocalTime(d.data[i].add_time) +'</p>';
	            listHtml += '</a>';
	            listHtml += '</article>';
            }
            $(".articleBox").eq(0).html(listHtml);
        }
    });
    //2
    $.ajax({
        type : "get",
        url  : "http://guye.cccwei.com/api.php?srv=1103&os_type=3&version=1&cate_id=2&pg_size=20",
        dataType : "json",
        success : function(d){
        	var listHtml = '';
        	for(var i in d.data){
	        	listHtml += '<article class="mainArticle">';
	            listHtml += '<a href="'+ d.data[i].url +'">';
	            listHtml += '<img src="http://guye.cccwei.com/'+ d.data[i].pic +'" class="icon">';
	            listHtml += '<h3>'+ d.data[i].title +'</h3>';
	            listHtml += '<p>'+ d.data[i].author +' / '+ getLocalTime(d.data[i].add_time) +'</p>';
	            listHtml += '</a>';
	            listHtml += '</article>';
            }
            $(".articleBox").eq(1).html(listHtml);
        }
    });
    //3
    $.ajax({
        type : "get",
        url  : "http://guye.cccwei.com/api.php?srv=1103&os_type=3&version=1&cate_id=3&pg_size=20",
        dataType : "json",
        success : function(d){
        	var listHtml = '';
        	for(var i in d.data){
	        	listHtml += '<article class="mainArticle">';
	            listHtml += '<a href="'+ d.data[i].url +'">';
	            listHtml += '<img src="http://guye.cccwei.com/'+ d.data[i].pic +'" class="icon">';
	            listHtml += '<h3>'+ d.data[i].title +'</h3>';
	            listHtml += '<p>'+ d.data[i].author +' / '+ getLocalTime(d.data[i].add_time) +'</p>';
	            listHtml += '</a>';
	            listHtml += '</article>';
            }
            $(".articleBox").eq(2).html(listHtml);
        }
    });
    //4
    $.ajax({
        type : "get",
        url  : "http://guye.cccwei.com/api.php?srv=1103&os_type=3&version=1&cate_id=4&pg_size=20",
        dataType : "json",
        success : function(d){
        	var listHtml = '';
        	for(var i in d.data){
	        	listHtml += '<article class="mainArticle">';
	            listHtml += '<a href="'+ d.data[i].url +'">';
	            listHtml += '<img src="http://guye.cccwei.com/'+ d.data[i].pic +'" class="icon">';
	            listHtml += '<h3>'+ d.data[i].title +'</h3>';
	            listHtml += '<p>'+ d.data[i].author +' / '+ getLocalTime(d.data[i].add_time) +'</p>';
	            listHtml += '</a>';
	            listHtml += '</article>';
            }
            $(".articleBox").eq(3).html(listHtml);
        }
    });
}
function changeCate(current){
    if(tabChangeSwitch){

        tabChangeSwitch = false;

        var $self = $(this);
        var myindex = current ? current : $self.index();

        currentCate = myindex;

        var preindex = $(".mainLink.current").index();
        var moveindex = '';

        $(".aritcleBoxPlan").addClass("canAni");
        $(".articleBox").eq(myindex).find("article").show();

        var turnLeft = function(){
            moveindex = (myindex - preindex) * $(window).width();
            $(".aritcleBoxPlan,.bannerScroll").css({
                "marginLeft" : "-=" + moveindex + "px"
            });
            setTimeout(function(){
                $(".articleBox").eq(preindex).find("article").hide();
            },500);
        };
        var turnRight = function(){
            moveindex = (preindex - myindex) * $(window).width();
            $(".aritcleBoxPlan,.bannerScroll").css({
                "marginLeft" : "+=" + moveindex + "px"
            });
            setTimeout(function(){
                $(".articleBox").eq(preindex).find("article").hide();
            },500);
        };

        preindex < myindex ? turnLeft() : (preindex > myindex && turnRight());

        $self.addClass("current").siblings(".mainLink").removeClass("current");

        setTimeout(function(){
            tabChangeSwitch = true;
        },500)
    }else{
        return false;
    }
}
function pageInit(){

    get_list();

    $(".articleBox").css({
        "width" : $(window).width()+"px"
    });
    $(".articleBoxBor,.bannerMainPic").css("width",$(window).width()+"px");

    //选项切换
    $(".mainLink").on("touchstart", changeCate);

    var set_loading = function(){
        
        var winHeight = $(window).height();
        /*
        if(vqd.getScrollTop() >= 226){
            $(".tabPlan.posiAbo").show();
            $(".articleBox").css("height",winHeight+"px");
        }else{
            $(".tabPlan.posiAbo").hide();
            $(".articleBox").css("height","auto");
        }
        */

        thisrow = $(".articleBox[data-st='open']").find(".mainArticle").length;

        if(vqd.getScrollTop() + vqd.getWindowHeight() >= vqd.getScrollHeight() - 50){

            //当前列是否加载完
            if(catePage[currentCate]){
                //是否大于20个
                if(thisrow >= 20){
                    //延迟加载
                    if(loadAble){
                        catePage[currentCate] ++;
                        loadAble = false;
                        $(".articleLoading").show();
                        $.ajax({
                            type : "get",
                            url  : "http://guye.cccwei.com/api.php?srv=1103&os_type=3&version=1&pg_size=20&cate_id="+(currentCate+1)+"&pg_cur="+catePage[currentCate],
                            dataType : "json",
                            success : function(d){
                                if(d.rs_code == '1000'){
                                    var listHtml = '';
                                    for(var i in d.data){
                                        listHtml += '<article class="mainArticle">';
                                        listHtml += '<a href="'+ d.data[i].url +'">';
                                        listHtml += '<img src="http://guye.cccwei.com/'+ d.data[i].pic +'" class="icon">';
                                        listHtml += '<h3>'+ d.data[i].title +'</h3>';
                                        listHtml += '<p>'+ d.data[i].author +' / '+ getLocalTime(d.data[i].add_time) +'</p>';
                                        listHtml += '</a>';
                                        listHtml += '</article>';
                                    }
                                    $(".articleBox[data-st='open']").append(listHtml);
                                    $(".articleLoading").hide();

                                    setTimeout(function(){
                                        loadAble = true;
                                    },200);
                                }else{
                                    $(".articleLoading").hide();
                                    loadAble = true;
                                    catePage[currentCate] = false;
                                }
                            },
                            error : function(){

                            }
                        });
                    }
                }
            }
        }
    };
    //加载更多
    $(document).on("touchstart touchmove touchend", set_loading);
    document.onscroll = set_loading;
}

$(function(){
    get_banner();
})
