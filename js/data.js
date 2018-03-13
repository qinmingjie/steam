var newscript = document.createElement("script");
var body = $("body")
newscript.setAttribute("src","http://www.qinsichina.com/steamDataAPI.php?callback=callbackfn");
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
	//生成小圆点
	initCircle(".bannerFa",".FirstCircle");

	//所有的数据放在一个数组里面需要循环来列出数组中每个对象
	for(var i = 0;i<data.length;i++){
		//将每个对象赋给变量
		var newdata = data[i];
		//获取对象中的数据
		var gamename = newdata.name; //获取游戏名
		var url = newdata.imgUrl;	//获取游戏地址
		var discount = newdata.discount; //判断是否打折
		var throught = newdata.isSale; 	//获取折数
		var originMoney = newdata.originPrice;	//获取原始价格
		var nowMoney = newdata.price;	//获取现价
		var system = newdata.platform;	//获取支持系统
		var	biaoqian = newdata.label;	//获取游戏标签
		var evaluate = newdata.evaluatingCount;		//获取评测篇数
		var date = newdata.date;	//获取游戏发行时间

		//在复制的模板里写入数据
		var nameText = document.getElementsByClassName("bannerSon_text")[i].childNodes[0];
		nameText.innerHTML = gamename;
	}
}
