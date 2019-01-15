

'use strict'

goog.provide('Blockly.db')

var db = Blockly.db

db.init = function(url,cookie){
    db._url = url + cookie
    db._cookie = cookie;
    db.load();
}

db.load = function(){
    $.ajax({
        type: "GET",
        url: db._url,
        dataType: "JSON",
        async: false,
        success: function (response) {
            console.log(response)
        }
    });
}