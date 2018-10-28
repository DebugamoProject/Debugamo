# DebugaMo

## 開發流程：

```js
規劃頁面功能 -->美編設計版面-------------------------->版面完成後畫圖 ----\
           +-> 前端寫JavaScript與簡單html，建立API +->前端寫html CSS----|> 完成
                                                +->後端寫框架--------/
```



python version == 2.7

**大家可以去Reference新增參考資料喔喔喔**

## 多國語言

目前規劃：

```html
key msg寫在json file ----> 由JavaScript像後端GET json file ----> 使用i18next API
```

## 資料庫欄位

這是目前規劃的資料庫欄位
請大家新增或更改

username VARCHAR(20)
userID VARCHAR(20)
password VARCHAR(50)
email VARCHAR(100)
birthday DATE
school VARCHAR(50)

class INTEGER

---

推個 [Create Login System With flask and MySQL](https://www.youtube.com/watch?v=6L3HNyXEais)

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

---
