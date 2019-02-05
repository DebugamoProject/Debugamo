
goog.provide('cookies');

var Cookies = cookies;

/**
 * 
 */
Cookies.getCookies = function(name){
    console.log(document.cookie)
    var cookie = decodeURIComponent(document.cookie);
    
}

window.addEventListener('load',Cookies.getCookies);