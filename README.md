# DebugaMo

python version == 2.7

**大家可以去Reference新增參考資料喔喔喔**

## 進度
> [time=Tue, Oct 9, 2018 9:26 PM]
> 

發現YoEugene 的repo fork from [this repo](https://github.com/Roger-Wu/blockly-games) 無聊可以上去看一下

目前找到key file
/appegine/debugging
是整個網頁前端的資料夾
~~其他的東西像是maze...之類的好像不太重要~~

> [time=Sat, Oct 13,2018 9:35 PM]


今天終於可以在local host 運行DebugoMo。今天在debugging資料夾中發現template.soy 發現是整個網頁的模板，於是一直在找是誰使用了這個模板來運行。找著找著順便上網爬文才發現需要compile .soy檔才會出現.js檔，於是就覺得應該是makefile幫我們compile好的。去看makefile發現自己的判斷沒錯，就是makefile搞的鬼哈哈。

## Introduction

The Website is composed of template.soy. The .soy file needs to be compiled to .js file. 
* [.Soy file command](https://developers.google.com/closure/templates/docs/commands)
* [.Soy Compile Example](https://developers.google.com/closure/templates/docs/helloworld_js)

**makefile** help us to generate the .js file or translate en to zh-hant.

`extract-msgs` : 
Extract the key msgs, which are ready to translate and developer inserted in .soy file. The extracted msgs are all in a temporary .xlf file and next step is to covert .xlf to .json.


`common-en` : 
Compile template.soy to soy.js

`comman-zh` : 
Not only compile template.soy but also extract-msg.

## Makefile Usage

```
make debugging-i18n-en
```

```
make debugging-en
```
---
```
make debugging-18n-zh
```

```
make debugging-zh (optional)
```

## Deploy

* On local host
    * [install gcloud](https://cloud.google.com/sdk/install)
    * `dev_appserver.py app.yaml`
* On Google App Engine
    * `gcloud app deploy`
**Note** If you want to deploy on google app engine, you need to have prepartion to receiev the the bill if you run out...


---

## find.py

Help you find string in all files.
**Note :** Due to using re module, please give more information in string when using the program or you may receiev a lot of trash filepath. 

### Usage

python version == 3.6.6

```
python3 find.py string1 string2 ...
```

## findpath.py

Help you find the file path.

### Usage

python version == 3.6.6

```
python3 findpath.py filename1 filename2 ...
```
