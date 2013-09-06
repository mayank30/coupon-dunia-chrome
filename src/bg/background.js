// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scriptst

cache={
	_cache:{},
	push:function(key,obj){
		this._cache[key]=obj
		
	},
	pull:function(key){
		return this._cache[key];


	}
}
window.currentCoupons="";

function coupon(title,success,url,code){
	this.title=title;
	this.url=url;
	this.success=success;
	this.code=code;



}
function deal(title,success,url){
	this.title=title;
	this.url=url;
	this.success=success;
}
var couponfetcher=function(website,callback){

	var request = $.ajax({
		  url: "http://www.coupondunia.in/"+website,
		  type: "GET",
		  
		  dataType: "html"
		});

	function parse(data){
		

		$page=$(data)
		var numericregex=/(\d+)/;


		$coupons=$page.find(".header-coupons-denomination");
		$deals=$page.find(".header-coupons-tags");
		
			
		var coupons=[];
		var deals=[];
		$page.find("#activeCoupons").find(".coupon").each(function(data){
			var title=$(this).find(".crux .couponTitle").html().trim();
			var successRate=numericregex.exec($(this).find(".couponstatcontainer .stats").html().trim())[1];

			var code=$(this).find(".crux .couponTitle").attr("code");
			
			var href=$(this).find(".crux .couponTitle").attr("href");

			var dealbtn=$(this).find(".crux .dealButton");
			if(!dealbtn.length){
				var c= new coupon(title,successRate,href,code);
				
				coupons.push(c);
			
			}
			else{
				var d= new deal(title,successRate,href);
				
				deals.push(d);
			}
			

		})
		cache.push(website,{coupons:coupons,deals:deals});
		console.log("Callback");
		callback(website,{coupons:coupons,deals:deals})
		
	}
	request.done(parse);
	function onFail(){

		chrome.browserAction.setBadgeText({text:""})
		cache.push(website,{coupons:[],deals:[]});
		callback(website,{coupons:[],deals:[]})

	}
	request.fail(onFail);
}

var tabHandler={
 	processChange:function(tab){
    	console.log("Tab Changed or updated");

   		var parser = document.createElement('a');//To extract the hostname, we create dom element 
		parser.href = tab.url;

		var regex=/^(www\.)?([^\.]+)/
		var matches=regex.exec(parser.hostname)//This gives us the hostname, we extract the website name
		var website=matches[2];

		function updateBrowserAction(website,coupons){
			
			console.log("Calling the update Browser Action");

			window.currentCoupons=coupons;
			chrome.browserAction.setBadgeText({text:coupons.coupons.length+coupons.deals.length+""})
			
		}
		function getWebsiteCoupons(site){
			var coupons=cache.pull(site)
			if(!coupons){
				couponfetcher(site,updateBrowserAction)
				
			}
			else{
				updateBrowserAction(site,coupons)
			}

			
			
		}
		getWebsiteCoupons(website)
			console.log("Calling getwebsite for" +website);
		
  	},

    onTabUpdate:function(tabId,  changeInfo,  dtab){

    	chrome.tabs.get(tabId,tabHandler.processChange);


	},
	tabChanged:function(activeInfo) {
		
    	
    	chrome.tabs.get(activeInfo.tabId,tabHandler.processChange);
	},

	init:function(){
		chrome.tabs.onActivated.addListener(this.tabChanged);

	}



}

tabHandler.init();


function BrowserActionClicked(tab){

}
chrome.browserAction.onClicked.addListener(BrowserActionClicked)