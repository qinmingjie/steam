//禁止a链接刷新
var Alist = $("a");
Alist.attr({
	href: "javascript:void(0)"
});



var bannerbg = $(".bannerFa");
var bannerFa = $(".banFaShow");
var a = false;

//轮播图函数封装
//传入产参数
//1.left,right当前点击的左右按钮名字类名
//2.box要进行操作的盒子
//3.show添加哪一个类名就能让他显示
//4.穿入小圆点的父级判断更新哪个个小圆点
function bannerMove(left,right,box,show,cirFa){
	//找到左右按钮
	var Left = $(left);//左边点击按钮
	var Right = $(right);//右边点击按钮
	var moveBox = $(box);//所有的图片盒子集合


	//去掉传入类名参数前面的点
	var newleft = left.slice(1);
	var newright = right.slice(1);
	var newshow = show.slice(1);
	//判断图片位置
	//给父级元素设置非法属性值
	for(var i = 0;i<moveBox.length;i++){
		moveBox.eq(i).attr({"index":i})
	}
	//绑定右单击事件
	Right.click(function(){
		//让m的值等于非法属性防止变量冲突，因为每个轮播图用的都是自己身上定义的非法属性所以不会起冲突
		m = Number($(show).attr("index"));
		//让许所有的盒子消失
		moveBox.eq(m).fadeOut()
		//先清空所有让大盒子显示的类名
		for(var i = 0;i<moveBox.length;i++){
			moveBox.eq(i).removeClass(newshow);
		}
		//判断当前是否在最后一张
		if(m<moveBox.length-1){
			m++;
		}else{
			m = 0;
		}
		//判断更新哪个小圆点
		updateCricle(cirFa)
		//给第n张添加能让它显示的类名
		moveBox.eq(m).fadeIn()
		moveBox.eq(m).addClass(newshow);
	})

	//绑定左单击事件
	Left.click(function(){
		m = Number($(show).attr("index"));
		//让当前的盒子隐藏
		moveBox.eq(m).fadeOut();
		//清空所有让显示的类名
		for(var i = 0;i<moveBox.length;i++){
			moveBox.eq(i).removeClass(newshow);
		}
		//判断当前图片是不是在第一张
		if(m!==0){
			m--;  //不在第一张让他每次点击自减1
		}else{
			m = moveBox.length-1; //在第一张让他去最后一张
		}
		updateCricle(cirFa)
		//让当前去的图片盒子显示
		moveBox.eq(m).fadeIn();
		//加上显示类名
		moveBox.eq(m).addClass(newshow)
	})
}
bannerMove(".FirLeft",".FirRight",".bannerFa",".banFaShow",".FirstCircle");
bannerMove(".SecLeft",".SecRight",".location",".yhshow",".SecCircle");
bannerMove(".ThiLeft",".ThiRight",".guanzhu",".ThibanShow",".ThiCircle");
bannerMove(".FourLeft",".FourRight",".FourthBanner",".FourthShow",".FourCircle")
//封装弹出层
//传入参数
//1.传入banner图类名(最大的盒子)
//2.传入内部弹出层的类名
//3.传入让当前张数显示的类名，用来确定所有的操作是在当前显示张数上
//4.获取this
function popups(father,popups,opin){
	var a = false;
	//找到最大盒子
	var Father = $(father);
	//找到弹出层
	var popu = $(father).find(popups);

	//将所有传入的类名去掉点
	var newFather = father.slice(1);
	var newPopups = popups.slice(1);
	var newOpin = opin.slice(1);

	Father.mouseenter(function(){
		if(!a){
			//占到当前移上的大盒子this
			var _this = $(this);
			//判断他是否有让他显示的判断类名
			var panduan = _this.hasClass(newOpin);
			//如果存在则让他显示
			if(panduan == true){
				popu.fadeIn()
				a = true;
			}
		}
	});
	//鼠标移除隐藏
	Father.mouseleave(function(){
		//占到当前移上的大盒子this
		var _this = $(this);
		//判断他是否有让他显示的判断类名
		var panduan = _this.hasClass(newOpin);
		//如果存在则让他显示
		if(panduan == true){
			popu.fadeOut()
		}
		a = false
	});
	//移上弹出框弹出框隐藏
	popu.mouseenter(function(){
		$(this).fadeOut();
	})
}
popups(".bannerFa",".popups",".banFaShow")


//弹出层图片自动播放函数封装
//传入参数
//1.传入banner图类名(最大的盒子)
//2.传入用来显示当前的类名，用来判断所有的操作是否应该执行
//3.传入包含图片的盒子类名
//4.让图片显示的类名
function autoplay(father,imgName,opin,imgshow){
	//找到传入参数的最大盒子
	var Father = $(father);
		//找到装切换图片的盒子
		var Img = $(imgName);
	
		//去掉类名上的点
		var newFather = father.slice(1);
		var newImg = Img.slice(1);
		var newOpin = opin.slice(1);
		var ImgShow = imgshow.slice(1);

		//var Opin = $(opin);如果写在外面那么每次改变图层移上的时候他的值不会变
	Father.mouseenter(function(){
		//每次移上都应该重新获取需要判断的是否是在当前显示的这张banner图里进行操作
		var Opin = $(opin);
		if($(this).hasClass(newOpin) == true){
			var n = 0;
			//找到弹出层里面图片集合
			var imglist = Opin.find(imgName).find("img")
			// console.log(imglist)
			//循环清除让图片显示的类名
			imgauto = setInterval(function(){
				for(var i = 0;i<imglist.length;i++){
					imglist[i].className = "";
				}
				//判断让其循环显示
				imglist.eq(n).fadeOut()
				if(n<imglist.length-1){
					n++;
				}else{
					n = 0;
				}
				// console.log(imglist[n])
				imglist.eq(n).fadeIn()
				imglist[n].className = ImgShow;
			},800)
		}
	});
	Father.mouseleave(function(){
		clearInterval(imgauto)
	})
}
autoplay(".bannerFa",".Img",".banFaShow",".show")

//小圆点的函数
//自动生成小圆点个数
//传入参数
//1.大banner图的类名用来确定生成几个圆点；
//2.生成的小圆点的父元素类名用来确定小圆点放在那里；
function initCircle(father,location){
	//几个banner
	var Father = $(father);
	//小圆点位置
	var Loca = $(location);
	for(var i = 0;i<Father.length;i++){
		//插入小圆点
		Loca.append('<span></span>');
		//小圆点添加非法属性
		$(location).find("span").eq(i).attr({index:i})
	}
	// 让第一个校园点默认显示
	Loca.find("span").eq(0).addClass('yanse')
}
initCircle(".bannerFa",".FirstCircle");
initCircle(".location",".SecCircle");
initCircle(".guanzhu",".ThiCircle");
initCircle(".FourthBanner",".FourCircle");

//更新小圆点
//传入参数
//1.小圆点所在位子的父元素类名
function updateCricle(spanfather){
	var spanFa = $(spanfather);
	var spanlist = spanFa.find("span");
	// 清空所有span显示类名show
	spanlist.removeClass('yanse');
	//放在点击事件里更新所以确定span的第几个是用变量n
	spanlist.eq(m).addClass('yanse');
}

//小圆点点击事件
//传入参数
//1.banner名，确定要操作的是哪几个banner
//2.小圆点位置
//3.让小圆点显示变色的类名
//4.让banner图显示的类名
function circleClick(father,fathershow,circle,circleshow){
	//找到banner图和圆点集合
	var banner = $(father);
	var circlelist = $(circle).find("span")

	//将传入的类名去掉点
	var newbanner = father.slice(1);
	var newbanShow = fathershow.slice(1);
	var newcircle = circle.slice(1);
	var newcirShow = circleshow.slice(1);
	

	//给圆点绑定但单击事件
	circlelist.click(function(){
		// 清空所有的让banner显示的类名,小圆点变色的类名
		banner.removeClass(newbanShow);
		banner.fadeOut()
		$(circlelist).removeClass(newcirShow);
		//获取非法属性值
		var _this = $(this).attr("index");
		m = _this
		//让当前的显示
		banner.eq(_this).fadeIn();
		banner.eq(_this).addClass(newbanShow)
		circlelist.eq(_this).addClass(newcirShow)
	})
}
circleClick(".bannerFa",".banFaShow",".FirstCircle",".yanse");
circleClick(".location",".yhshow",".SecCircle",".yanse");
circleClick(".guanzhu",".ThibanShow",".ThiCircle",".yanse");
circleClick(".FourthBanner",".FourthShow",".FourCircle",".yanse");


//*************************未设置成函数方法***************************/
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

//******tab选项卡******/
function gametab(){
	//找到所有的选项卡标题分类
	var alist = document.getElementsByClassName("fenlei");
	var gamelist = document.getElementsByClassName("gameList")
	//给所有分类添加非法属性
	for(var i = 0;i<alist.length;i++){
		$(alist).eq(i).attr({"index":i});
	}
	//给要炒作的盒子添加非法属性
	for(var j = 0;j<gamelist.length;j++){
		$(gamelist).eq(j).attr({"index":j});
	}
	//绑定单击事件
	$(alist).click(function(){
		//获取当前点击的非法属性
		var _this = $(this).attr("index");
		//清空所有操作盒子的类名
		$(gamelist).removeClass('show');
		$(alist).removeClass('remen');
		//让点击的对应盒子显示
		$(this).addClass('remen');
		$(gamelist).eq(_this).addClass('show');
	});

	// 当鼠标移上的时候进行判断
	$(gamelist).mouseenter(function(){
		//给含有类名show的盒子里的游戏项目添加非法属性
		if($(this).hasClass('show')){
			//找到当前盒子里面的game项目添加非法属性
			var leftgame = $(this).find('.game1');
			var rightimg = $(this).find(".gameRight")
			console.log(rightimg)
			for(var k = 0;k<leftgame.length;k++){
				leftgame.eq(k).attr({index:k});
				rightimg.eq(k).attr({index:k});
			}
			leftgame.mouseenter(function(){
				//输出当前移上的game的非法属性值
				var gamethis = $(this).attr("index")
				//清空所有的让右边图片显示的类并显示当前的	
				rightimg.removeClass('show');
				rightimg.eq(gamethis).addClass('show')
			})
		}
		//绑定鼠标移上换右边图片事件
		//每次鼠标移上先判断是否在显示的盒子类操作
	});
}
gametab()


