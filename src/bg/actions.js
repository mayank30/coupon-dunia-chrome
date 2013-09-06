var actions={
	
	fetchCoupons:function(request,callback){
		callback(window.currentCoupons);

	}
}

function onRequest(request, sender, callback) {
	
       actions[request.action](request,callback);

}

// Wire up the listener.
chrome.extension.onRequest.addListener(onRequest);
