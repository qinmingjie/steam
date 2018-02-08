//商店社区下拉菜单
var merchant = $(".merchant_fa");
var merchantSon = $(".merchant");
var community = $(".community_fa")
var communitySon = $(".community")
//商店下拉
merchant.mouseenter(function(){
	merchantSon.fadeIn(200)
})
merchant.mouseleave(function(){
	merchantSon.fadeOut(200)
})
//社区下拉
community.mouseenter(function(){
	communitySon.fadeIn(200)
})
community.mouseleave(function(){
	communitySon.fadeOut(200)
})



//弹出层
//找到父级元素
var bannerbg = $(".bannerFa");
var bannerFa = $(".banFaShow");
var intro = $(".banFaShow .intro");
bannerbg.mouseenter(function(){
	imgList = $(".banFaShow .Img img")
	newintro = $(".banFaShow .intro");
	newintro.fadeIn();
	//弹出框图片自动播放
	first = setInterval(function(){
		Outoplay()
	},1000)
	newintro.mouseenter(function(){
		newintro.fadeOut()
	})
});
bannerbg.mouseleave(function(){
	newintro.fadeOut();
	clearInterval(first)
});
intro.mouseenter(function(){
	intro.fadeOut()
})



var n = 0;
//banner弹出层自动切换图片
function Outoplay(){
	for(var i = 0;i<imgList.length;i++){
		imgList[i].className = "";
	}
	if(n<imgList.length-1){
		n++;
	}else{
		n = 0;
	}
	imgList[n].className = "show"
}



//设置点击播放
//找到点击按钮
var right = $(".clickRight");
var left = $(".clickLeft");
//怕按段当前所在图片
var m = 0;

right.click(function(){
	//清空显示类名banFaShow
	bannerbg.eq(m).fadeOut();
	for(var i = 0;i<bannerbg.length;i++){
		bannerbg.eq(i).removeClass("banFaShow")
	}
	var _this = $(this).siblings(".banFaShow");
	if(_this.length==0){
		if(m<bannerbg.length-1){
			m++;
		}else{
			m = 0;
		}
		bannerbg.eq(m).fadeIn();
		bannerbg.eq(m).addClass('banFaShow');
		updateCir()
	}
})

left.click(function(){
	bannerbg.eq(m).fadeOut();
	//清空显示类名banFaShow
	for(var i = 0;i<bannerbg.length;i++){
		bannerbg.eq(i).removeClass("banFaShow")
	}
	var _this = $(this).siblings(".banFaShow");
	if(_this.length==0){
		if(m!==0){
			m--;
		}else{
			m = bannerbg.length-1;
		}
		bannerbg.eq(m).fadeIn();
		bannerbg.eq(m).addClass('banFaShow')
		updateCir()
	}
})

var sim = setInterval(function(){
	right.click()
},2000)
bannerbg.mouseenter(function(){
	clearInterval(sim)
});
bannerbg.mouseleave(function(){
	sim = setInterval(function(){
		right.click()
	},2000)
});
left.mouseenter(function(){
	clearInterval(sim)
});
left.mouseleave(function(){
	sim = setInterval(function(){
		right.click()
	},2000)
});

right.mouseenter(function(){
	clearInterval(sim)
});
right.mouseleave(function(){
	sim = setInterval(function(){
		right.click()
	},2000)
})


//添加非法属性
function feifa(){
	for(var i = 0;i<litterImg.length;i++){
		litterImg[i].setAttribute("index",i)
	}
	for(var j = 0;j<bigImg.length;j++){
		bigImg[j].setAttribute("order",j)
	}
}

//移上小图片切换大图片
bannerbg.mouseenter(function(){
	//移上显示相同图片
	//每次移上都重新获取图片
 	litterImg = $(".banFaShow .banner1Img");
	bigImg = $(".banFaShow .bannerSon_left a img");

	//在执行移动到小图片上改变大图片
	litterImg.mouseenter(function(){
		var _thisFa = $(this).closest(".banFaShow").hasClass("banFaShow");
		if(_thisFa){
			feifa();
			$(bigImg).removeClass("bannerSon_show")
			var thisIndex = this.getAttribute("index");
			var thisOrder = bigImg[thisIndex];
			$(thisOrder).addClass("bannerSon_show");
		}
	})	
})

//生成小点
var circle = $(".circle")
for(var i = 0;i<bannerbg.length;i++){
	var span = circle.append('<span></span>');
	$(".circle span").eq(i).attr({index: i});
}
$(".circle span").eq(0).addClass('yanse')

//更新小圆点
var spanlist = $(".circle span");
function updateCir(){
	for(var j = 0;j<spanlist.length-1;j++){
		spanlist.removeClass('yanse');
	}
	spanlist.eq(m).addClass('yanse')
}

//小圆点点击事件
spanlist.click(function(){
	//获取前点击的非法属性值
	var nowpicture = Number($(this).attr("index"));
	m = nowpicture;
	bannerbg.eq(m).fadeIn()
})
