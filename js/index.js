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
