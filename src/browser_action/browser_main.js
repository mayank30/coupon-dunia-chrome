function update(){
        chrome.extension.sendRequest({'action' : 'fetchCoupons'},
                function(coupons) {
                     console.log(coupons);
                     alert();
                }
        );

}

        update();


