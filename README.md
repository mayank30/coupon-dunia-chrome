Coupon Dunia
===============

This is a browser extension for a website: htttp://coupondunia.in. It sits in the browser innocuously, checking if the current website(ecommerce site) 
has any coupons available on CD. If there are, it shows the number of coupons in the badge on the browser extension. 
Clicking on the browser action shows the coupon codes and benefits.

I haven't made this available on Chrome webstore yet. If you want to try this out, download a zip and run it as an unpacked extension. 

http://developer.chrome.com/extensions/getstarted.html#unpacked

This is how it works:

1. Background page listens in on tab changes and udpations
1. In case of tab changes, we check for the websites coupons and store them in an in-memory object (as a hashmap).
1. The website coupons are available at coupondunia.in/sitename (flipkart for flipkart.in, dominos for dominoes.co.in ...)
1. We parse the dom to extract coupons and codes
1. The hash acts as a cache, so we don't go fetching coupons everytime.
1. On further updations, we try to fetch the site from a cache and see if the website has already been parsed.
1. If a website doesn't have coupons, cd returns a 404. In this case, we store empty coupon and deals arrays
1. Whenever the tab changes, we update the browser action badge with number of deals and coupons
1. When the browser action is clicked, we get the site's coupons from background page via messaging.

Uses: jquery, moustache.
