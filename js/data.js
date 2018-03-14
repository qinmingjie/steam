var newscript1 = document.createElement("script");
var newscript2 = document.createElement("script");
var body = $("body")
body[0].appendChild(newscript1)
newscript1.setAttribute("src","http://192.168.1.100:81?callback=callbackfn");
newscript2.setAttribute("src","http://192.168.1.100:81?callback=callbackfn2");
body[0].appendChild(newscript2);
//用来看页面中的cookie条数
var cookNumber = 0;



//请求轮播图数据
function callbackfn(data){
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
		var nameText1 = document.getElementsByClassName("popups")[i].getElementsByClassName("popName")[0];
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
		var gameid = newdata.gameId;

		
		//在复制的模板里写入游戏名数据
		//克隆放游戏名的盒子并放入一个游戏名
		var nameText = document.createElement("span");

		nameText.innerHTML = gamename;
		nameText1.innerHTML = gamename;
		//将游戏名所在的盒子插入到第i个banner里的游戏名盒子的父元素里
		document.getElementsByClassName("bannerSon_text")[i].appendChild(nameText)

		// //写入大图链接
		var bigImg = $(".bannerSon_left").eq(i).find("a")[0];
		var litterimg = document.getElementsByClassName("img_fa")[i].getElementsByClassName("litterimg");
		var popuImg = document.getElementsByClassName("Img")[i].getElementsByTagName("a");

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
			litterimg[n].setAttribute("href",url)
			newlitterclone.setAttribute("src",imgurl[n])

			//弹出层图片写入
			var newpopImg = popuImg[n].appendChild(popImg)
			newpopImg.setAttribute("src",imgurl[n])
			
			
			// bigImg.appendChild(newimgclone);
		}
		$(bigImg).find("img").eq(0).addClass('bannerSon_show')
		newlitterclone.setAttribute("class","bannerSon_show")

		// newclone.setAttribute("class","bannerSon_show")
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
			var labelA = document.createElement("a");
			labelA.setAttribute("href","13")
			labelA.innerHTML = biaoqian[c]
			labelFa.appendChild(labelA)
		}

		//弹出层用户评测篇数数据
		//找到p评测篇数的父元素及子元素来写入数据
		var userevealute = document.getElementsByClassName("pince_p2")[i];
		var userevealText =  userevealute.getElementsByTagName("span")[0];
		var userevealuteI = userevealute.getElementsByTagName("i")[0];
		//判断游戏是否受人喜欢
		if(numberEvalute==1){
			userevealuteI.innerHTML = "多半差评";
			userevealuteI.style.color = "tomato";
		}
		if(numberEvalute==2){
			userevealuteI.innerHTML = "褒贬不一";
			userevealuteI.style.color = "#ffa500";
		}
		if(numberEvalute==4){
			userevealuteI.innerHTML = "特别好评";
			userevealuteI.style.color = "#66c0f4";
		}


		//给评测数字加逗号
		var strEvaluate = String(evaluate)
		//判断一个篇数里应该有几个逗号
		var comma = Math.ceil(strEvaluate.length/3) - 1
		//逗号有几个就切割多少次
		for(var k = 1;k<comma+1;k++){
			var str = strEvaluate.slice(-3*k);
		}
		//判断截取3的倍数后还剩几个字符
		var residue = strEvaluate.length - str.length
		//让后从后往前数添加逗号
		userevealText.innerHTML = "(" + strEvaluate.slice(0,residue) + "," + str + ")篇评测";		


		//此时模板已经克隆插入完毕找到的就是当前页面种所有的banner大盒子
		var bannerclone = document.getElementsByClassName("bannerFa")
		//给大盒子设置非法属性来放游戏id值
		bannerclone[i].setAttribute("gameId",gameid)

		//给当前盒子下所有的a链接设置链接地址
		var a_gameId = bannerclone[i].getElementsByTagName("a");
		for(var g = 0;g<a_gameId.length;g++){
			a_gameId[g].setAttribute("href",url);
			a_gameId[g].setAttribute("target","_blank");

		//**************************a链接点击获取当前游戏id值**********************************************/
			//给所有的a链接绑定单击事件。让她返回gameId
			a_gameId[g].onclick = function(){
				//点击时找到点击元素的父元素
				var a_fa = this.parentNode;
				//获取点击时a链接的href地址
				a_url = this.getAttribute("href")
				//用dowhile循环来向上一直找父元素
				do{
					//让a_fa等与前一个a_fa的父元素来进行向上循环
					a_fa = a_fa.parentNode;
					//每次找到一个父元素就看她有没有gameid这个属性
					var a_faHasId = a_fa.getAttribute("gameId");
					//如果a_faHasClass返回的值不是null的时候将返回的gameid值和游戏名放入变量
					if(a_faHasId!==null){
						cookNumber++
						//获取到非法属性中填入的游戏id
						Num_gameId = a_faHasId;
						//获取到页面中填入的游戏名
						gameT = a_fa.getElementsByClassName("bannerSon_text")[0].getElementsByTagName("span")[0].innerHTML
					}
				}while(a_faHasId!==null)	//如果a_faHasClass返回的值不是null的时候停止循环



				//生成cookie写入游戏名
				setCookie(Num_gameId,gameT,7);
			}
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

		showlitterImg.mouseleave(function(){
			feifa()
			$(big).removeClass('bannerSon_show')
			$(big).eq(0).addClass('bannerSon_show')
		});
	})
}


//请求最近访问数据保存cookie
//当点击链接后记录当前的游戏名，记录到cookie中并将游戏名写入在最近，在下册
//给轮播图里的绑定单击事件
// function zuijinlook(){
// 	console.log(cookNumber)
// }
window.onload = function(){
	var str = document.cookie
	//将cookie从分号截取成数组
	var arrstr = str.split(";")
	//声明一个数组用来放id个游戏名	
	var Idarr = [];
	for(var i = 0;i<arrstr.length;i++){
		//从分号开始截取得到的数组从等号截取，获得id和游戏名的数组放入一个数组
		var resultId = arrstr[i].toString().split("=");
		Idarr.push(resultId)
	}

	//找到放最近查看的盒子
	var zuijin = document.getElementsByClassName("chakan")[0];
	// 生成span插入到最近查看里
	var span = document.createElement("span");
	span.setAttribute("class","cardtext");
	span.innerHTML = "最近查看";
	zuijin.appendChild(span);
	// 枚举完成截取后的数组
	for(var j = 0;j<Idarr.length;j++){
		//循环多少次则有多少个cookie，第i个数组里的下标为0的是id,1的是游戏名字
		// console.log(Idarr)
		var cookgameId = Idarr[j][0];
		var cookgameName = Idarr[j][1];
		//每循环一次就生成一个a标签
		var aElement = document.createElement("a");
		//a标签的innerHTML是数组中的cookgameId
		aElement.innerHTML = cookgameName;
		aElement.setAttribute("href","")
		zuijin.appendChild(aElement)
	}
}

function callbackfn2(data){
		console.log(data)
	for(i in data){
		fngameId = data[i].gameId;
		fngameUrl = data[i].url;
	}
	// fn2_gameurl = data.
}
// removeCookie(["710130","477160","466560","593380","493900"])