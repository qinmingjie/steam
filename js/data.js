var newscript = document.createElement("script");
var body = $("body")
newscript.setAttribute("src","http://192.168.1.100:81?callback=callbackfn");
body[0].appendChild(newscript)

function callbackfn(data){
	console.log(data)
	//找到模板盒子
	var banner = document.getElementsByClassName("bannerFa")[0];
	var bannercir = document.getElementsByClassName("FirLeft")[0];
	var bannerfa = document.getElementsByClassName("firstBanner")[0];

	//生成模板将模板复制放入盒子
	for(var j = 0;j<data.length-1;j++){
		//每循环一次克隆一次模板
		var newbanner = banner.cloneNode(true);
		bannerfa.insertBefore(newbanner,bannercir);
	}


	//所有的数据放在一个数组里面需要循环来列出数组中每个对象
	for(var i = 0;i<data.length;i++){
		//将每个对象赋给变量
		var newdata = data[i];
		//获取对象中的数据
		var gamename = newdata.name; //获取游戏名
		var imgurl = newdata.imgUrl;	//获取图片
		var discount = newdata.discount; //判断是否打折
		var throught = newdata.isSale; 	//获取折数
		var originMoney = newdata.originPrice;	//获取原始价格
		var nowMoney = newdata.price;	//获取现价
		var system = newdata.platform;	//获取支持系统
		var	biaoqian = newdata.label;	//获取游戏标签
		var evaluate = newdata.evaluatingCount;		//获取评测篇数
		var numberEvalute = newdata.evaluate;		//获取评价类型（褒贬不一等）
		var date = newdata.date;	//获取游戏发行时间
		var url = newdata.url;   //图片链接数据

		//在复制的模板里写入游戏名数据
		//克隆放游戏名的盒子并放入一个游戏名
		var nameText = document.createElement("span");
		nameText.innerHTML = gamename;
		//将游戏名所在的盒子插入到第i个banner里的游戏名盒子的父元素里
		document.getElementsByClassName("bannerSon_text")[i].appendChild(nameText)

		//写入大图链接
		var bigImg = $(".bannerSon_left").eq(i).find("a")[0];
		var litterimg = document.getElementsByClassName("img_fa")[i].getElementsByClassName("litterimg");
		var popuImg = document.getElementsByClassName("Img")[i].getElementsByTagName("a");
		bigImg.setAttribute("href",url);
		bigImg.setAttribute("target","_blank");

		//写入大图图片数据
		for(var n in imgurl){
			var imgclone = document.createElement("img");
			var smallImg = document.createElement("img");
			var popImg = document.createElement("img");
			
			//大图片写入
			var newclone = bigImg.appendChild(imgclone)
			newclone.setAttribute("src",imgurl[n]);

			//小图片写入
			var newlitterclone = litterimg[n].appendChild(smallImg);
			newlitterclone.setAttribute("src",imgurl[n])

			//弹出层图片写入
			var newpopImg = popuImg[n].appendChild(popImg)
			newpopImg.setAttribute("src",imgurl[n])
			
			
			// bigImg.appendChild(newimgclone);
		}
		newlitterclone.setAttribute("class","bannerSon_show")
		newclone.setAttribute("class","bannerSon_show")
		newpopImg.setAttribute("class","show")
		

		//写入系统支持数据
		// 找到系统图标的父元素
		var system_fa = document.getElementsByClassName("system-icon")[i];
		for(d in system){
			var system_icon = document.createElement("div");
			var systemImg = document.createElement("img");
			var newsystemIcon = system_fa.appendChild(system_icon);
			var newsystemImg = newsystemIcon.appendChild(systemImg)
			newsystemIcon.setAttribute("class","system-icon1");
			var system_text = system[d];
			newsystemImg.setAttribute("src","img/"+ system_text + ".png")
		}

		//写入价格变动数据
		var money_fa = document.getElementsByClassName("money")[i];
		var money = money_fa.getElementsByClassName("gray_green")[0];
		var origmoney = money_fa.getElementsByClassName("lineThrough")[0];
		var nowmoney = money_fa.getElementsByClassName("moneyl")[0];
		nowmoney.innerHTML = "￥" + nowMoney
		if(throught){
			money.innerHTML = Math.round(((nowMoney-originMoney)/originMoney)*100) + "%"
			origmoney.innerHTML = "￥" + originMoney
		}
		else{
			money.style.display = "none"
			money_fa.style.backgroundColor = "transparent"
		}


		//弹出层发行时间数据
		var gameTime = document.getElementsByClassName("faxin")[i];
		var cutDate = date.split("-")
		gameTime.innerHTML = "发行于：" + cutDate[0] + "年" + cutDate[1] +"月" + cutDate[2] +"日";
		//弹出层游戏标签
		var labelFa = document.getElementsByClassName("biaoqian")[i];
		for(c in biaoqian){
			// if(c>=4){
			// 	break
			// }
			var labelA = document.createElement("a");
			labelA.setAttribute("href","13")
			labelA.innerHTML = biaoqian[c]
			labelFa.appendChild(labelA)
		}

		//弹出层用户评测篇数数据
		//找到p评测篇数的父元素及子元素来写入数据
		var userevealute = document.getElementsByClassName("pince_p2")[i];
		var userevealText =  userevealute.getElementsByTagName("span");
		var userevealuteI = userevealute.getElementsByTagName("i")[0];
		//给数据加小数点
		if(numberEvalute==1){
			userevealuteI.innerHTML = "多半差评";
			userevealuteI.style.color = "tomato"
		}
		if(numberEvalute==2){
			userevealuteI.innerHTML = "褒贬不一";
			userevealuteI.style.color = "#ffa500"	
		}
		if(numberEvalute==4){
			userevealuteI.innerHTML = "特别好评";
			userevealuteI.style.color = "#66c0f4"
		}
		

	}

	var bannerbg = $(".bannerFa");
	var bannerFa = $(".banFaShow");
	//生成小圆点
	initCircle(".bannerFa",".FirstCircle");
	//小圆点点击
	circleClick(".bannerFa",".banFaShow",".FirstCircle",".yanse");
	//右箭头点击
	bannerMove(".FirLeft",".FirRight",".bannerFa",".banFaShow",".FirstCircle");
	//弹出层
	popups(".bannerFa",".popups",".banFaShow")
	//弹出层自动播放
	autoplay(".bannerFa",".Img",".banFaShow",".show")
	//移上小图片变为大图片
	bannerbg.mouseenter(function(){
		//移上显示相同图片
		//每次移上都重新获取图片
	 	showlitterImg = $(".banFaShow .banner1Img");
		big = $(".banFaShow .bannerSon_left a img");

		//在执行移动到小图片上改变大图片
		showlitterImg.mouseenter(function(){
			var _thisFa = $(this).closest(".banFaShow").hasClass("banFaShow");
			if(_thisFa){
				feifa();
				$(big).removeClass("bannerSon_show")
				var thisIndex = this.getAttribute("index");
				var thisOrder = big[thisIndex];
				$(thisOrder).addClass("bannerSon_show");
			}
		})	
	})

}
