var actions={
	
	fetchCoupons:function(request,callback){
		callback(currentCoupons);

	}
}

function onRequest(request, sender, callback) {
	alert("onRequest")
       actions[request.action](request,callback);

}

// Wire up the listener.
chrome.extension.onRequest.addListener(onRequest);
