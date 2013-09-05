// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scriptst


var tabHandler={


    onTabUpdate:function(tabId,  changeInfo,  tab){


	},
	tabChanged:function(activeInfo) {
		function tabChanged(tab){
    		
   		var parser = document.createElement('a');
		parser.href = tab.url;
		
		var regex=/^(www\.)?([^\.]+)/
		var matches=regex.exec(parser.hostname)
		var website=matches[2];
		console.log(website)

    	}
    	
    	chrome.tabs.get(activeInfo.tabId,tabChanged);
	},

	init:function(){
		chrome.tabs.onActivated.addListener(this.tabChanged);

	}



}

tabHandler.init();