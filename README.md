# DebugaMo

## 進度
> [time=Tue, Oct 9, 2018 9:26 PM]
> 

發現YoEugene 的repo fork from [this repo](https://github.com/Roger-Wu/blockly-games) 無聊可以上去看一下

目前找到key file
/appegine/debugging
是整個網頁前端的資料夾
~~其他的東西像是maze...之類的好像不太重要~~

> [time=Sat, Oct 13,2018 9:35 PM]


### 今日做的事情

今天終於可以在local host 運行DebugoMo。今天在debugging資料夾中發現template.soy 發現是整個網頁的模板，於是一直在找是誰使用了這個模板來運行。找著找著順便上網爬文才發現需要compile .soy檔才會出現.js檔，於是就覺得應該是makefile幫我們compile好的。去看makefile發現自己的判斷沒錯，就是makefile搞的鬼哈哈。

makefile