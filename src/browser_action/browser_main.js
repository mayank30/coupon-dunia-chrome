window.console=chrome.extension.getBackgroundPage().console
function render(template,object){
	chrome.extension.getBackgroundPage().console.log("Hello")
	//var contents=$.tmpl(template,object)
    var contents=Mustache.render(template,object);
	console.log(contents);

}
function update(){
        chrome.extension.sendRequest({'action' : 'fetchCoupons'},
                function(couponsObj) {
                    // chrome.extension.getBackgroundPage().console.log('coupons');
                     //chrome.extension.getBackgroundPage().console.log($.tmpl);
                     var template=$("#coupons-template").html()
                   //$(".coupons").html(template 	)
                   //$couponscontent=$.tmpl(template,coupons)
                 	var coupons=couponsObj.coupons;
                 	var deals=couponsObj.deals;
                 		 chrome.extension.getBackgroundPage().console.log(coupons);
                         var contents=Mustache.render(template,couponsObj);
                         $("#coupons").html(contents);
      //            	for(var i in coupons){
      //            		chrome.extension.getBackgroundPage().console.log("d");
						// render(template,coupons[i]);
						// chrome.extension.getBackgroundPage().console.log("e");

      //            	}
                }
        );

}

        update();


