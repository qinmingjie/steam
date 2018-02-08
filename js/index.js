//轮播图函数封装
//传入产参数
//1.left,right当前点击的左右按钮名字类名
//2.box要进行操作的盒子
//3.show添加哪一个类名就能让他显示
function bannerMove(left,right,box,show){
	//找到左右按钮
	var Left = $(left);//左边点击按钮
	var Right = $(right);//右边点击按钮
	var moveBox = $(box);//所有的图片盒子集合

	//去掉传入类名参数前面的点
	var newleft = left.slice(1);
	var newright = right.slice(1);
	var newshow = show.slice(1);
	//判断图片位置
	var n = 0;
	//绑定右单击事件
	Right.click(function(){
		//让许所有的盒子消失
		moveBox.eq(n).fadeOut()
		//先清空所有让大盒子显示的类名
		for(var i = 0;i<moveBox.length;i++){
			moveBox.eq(i).removeClass(newshow);
		}
		//判断当前是否在最后一张
		if(n<moveBox.length-1){
			n++;
		}else{
			n = 0;
		}
		// console.log(n)
		//给第n张添加能让它显示的类名
		moveBox.eq(n).fadeIn()
		moveBox.eq(n).addClass(newshow);
	})

	//绑定左单击事件
	Left.click(function(){
		//让当前的盒子隐藏
		moveBox.eq(n).fadeOut();
		//清空所有让显示的类名
		for(var i = 0;i<moveBox.length;i++){
			moveBox.eq(i).removeClass(newshow);
		}
		//判断当前图片是不是在第一张
		if(n!==0){
			n--;  //不在第一张让他每次点击自减1
		}else{
			n = moveBox.length-1; //在第一张让他去最后一张
		}
		//让当前去的图片盒子显示
		moveBox.eq(n).fadeIn();
		//加上显示类名
		moveBox.eq(n).addClass(newshow)
	})
}
bannerMove(".FirLeft",".FirRight",".bannerFa",".banFaShow");
bannerMove(".SecLeft",".SecRight",".location",".yhshow");






//弹出层
//找到父级元素
var bannerbg = $(".bannerFa");
var bannerFa = $(".banFaShow");
var intro = $(".banFaShow .intro");
bannerbg.mouseenter(function(){
	console.log(1)
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



var m = 0;
//banner弹出层自动切换图片
function Outoplay(){
	for(var i = 0;i<imgList.length;i++){
		imgList[i].className = "";
	}
	if(m<imgList.length-1){
		m++;
	}else{
		m = 0;
	}
	imgList[m].className = "show"
}

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


//自动播放
// setInterval(function(){
// 	console.log(0)
// 	rightClick(".clickRight",".bannerFa",".banFashow")
// },1500)
//弹出层函数封装
// function rightClick(right,box,show){
// 	//找到左右按钮
// 	var Left = $(left);//左边点击按钮
// 	var Right = $(right);//右边点击按钮
// 	var moveBox = $(box);//所有的图片盒子集合

// 	//去掉传入类名参数前面的点
// 	var newleft = left.slice(1);
// 	var newright = right.slice(1);
// 	var newshow = show.slice(1);
// 	//判断图片位置
// 	var n = 0;
// 	//绑定右单击事件
// 	Right.click(function(){
// 		//让许所有的盒子消失
// 		moveBox.eq(n).fadeOut()
// 		//先清空所有让大盒子显示的类名
// 		for(var i = 0;i<moveBox.length;i++){
// 			moveBox.eq(i).removeClass(newshow);
// 		}
// 		//判断当前是否在最后一张
// 		if(n<moveBox.length-1){
// 			n++;
// 		}else{
// 			n = 0;
// 		}
// 		// console.log(n)
// 		//给第n张添加能让它显示的类名
// 		moveBox.eq(n).fadeIn()
// 		moveBox.eq(n).addClass(newshow);
// 	})
// }