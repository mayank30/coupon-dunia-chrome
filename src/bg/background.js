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
var couponfetcher=function(website){

	var request = $.ajax({
		  url: "http://www.coupondunia.in/"+website,
		  type: "GET",
		  
		  dataType: "html"
		});
	function parse(data){
		$page=$(data)
		
		$coupons=$page.find(".header-coupons-denomination");
		$deals=$page.find(".header-coupons-tags");
		var numericregex=/(\d+)/;
		var couponsCount=numericregex.exec($coupons.html())[1];
		var dealsCount=numericregex.exec($deals.html())[1];
		console.log(couponsCount+" "+dealsCount);
		if(couponsCount*1>0||dealsCount*1>0){//*1 converts it to a number, so we can compare
			
		}
		var coupons=[];
		var deals=[];
		$page.find("#activeCoupons").find(".coupon").each(function(data){
			var title=$(this).find(".crux .couponTitle").html().trim();
			var successRate=numericregex.exec($page.find(".couponstatcontainer .stats").html().trim())[1];

			var code=$(this).find(".crux .couponTitle").attr("code");
			
			var href=$(this).find(".crux a").attr("href");

			var dealbtn=$(this).find(".crux .dealButton");
			if(!dealbtn.length){
				var c= new coupon(title,successRate,href,code);
				
				coupons.push(c);
			
			}
			else{
				var d= new deal(title,successRate,href);
				
				deals.push(d);
			}
			cache.push(website,{coupons:coupons,deals:deals});

		})
		//console.log(cache)
	}
	request.done(parse);
	function donothing(){}
	request.fail(donothing);
}

var tabHandler={


    onTabUpdate:function(tabId,  changeInfo,  tab){


	},
	tabChanged:function(activeInfo) {
		function tabChanged(tab){
    		
   		var parser = document.createElement('a');//To extract the hostname, we create dom element 
		parser.href = tab.url;
		
		var regex=/^(www\.)?([^\.]+)/
		var matches=regex.exec(parser.hostname)//This gives us the hostname, we extract the website name
		var website=matches[2];
		couponfetcher(website)

    	}
    	
    	chrome.tabs.get(activeInfo.tabId,tabChanged);
	},

	init:function(){
		chrome.tabs.onActivated.addListener(this.tabChanged);

	}



}

tabHandler.init();