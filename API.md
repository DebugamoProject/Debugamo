# 前端API

## 原則

如果發現底下的API有誤
原則可以幫你更快找到前端post的form-data

---

* 按buttom的post會使用表單的name來做post
    ex:
    ```html
    <form method="POST">
        <input name="password">
        <input name="email">
        <buttom type="submit"></buttom>
    </form>
    ```
    form-data:
    ```json
    "password":"123456"
    "email":"123456787@gmail.com"
    ```
* 沒有表單的post(event listener)會在JavaScript中用$.ajax

---

## 正文開始

### 登入

* **email & password**
  * ~~會直接使用form表單的post~~ 使用.ajax
    * `login-email` : email
    * `login-password` : password
    * 框架需要做的事情是從資料庫中判斷他的帳密是否正確
    * POST 位置：`/login`
    ```python
    loginSQL = "SELECT * FROM students WHERE email = '{}' and password = '{}'"
    ```

### 註冊

* **inputID**
  * ID 會用event listener 的方式跟資料庫確認ID是否重複
  * API :
    * `/register`
    * method: **POST**
    * JavaScript最上面有定為`/register`
    * 請完成後端時將`/register`換掉或是沿用都可以喔喔～

* **inputEmail**
  * email 一樣用event listener的方式跟資料庫確認email是否已註冊過
  * API :
    * `/register`
    * method: **POST**
    * JavaScript最上面有定為`/register`
    * 請完成後端時將`/register`換掉或是沿用都可以喔喔～

* **Grade**
  * grade是年級，分為elementary,junior,senior_high三種
  * 當grade被選取時，他會跟框架要一個json檔案格式的學校資料裡頭
  * 在app.py中有school物件的使用方式，詳細使用方式可以看 school.py
  * 為什麼不用javascript load json的方式，因為flask需要把檔案放在特定位置，不確定webapp2是否需要這樣做，乾脆用框架來做比較安全(?
  * 或是到時後再討論
  * API:
    * `SCHOOL_API+grade` (grade 是 elementary or junior or senior_high)
    * method: **GET**
    * 目前`SCHOOL_API`是`/school/`
    * 假設目前get的url是`/school/elementary`就會從後端索取所有小學的資料

* **註冊表單**
  * 這部分是用buttom submit的方式 **POST** Form-Data的所以API是各個input的name
  * 這部分會解釋input的name需要對應到SQL哪個欄位
  * 以下開始：
    * `name` : 使用者名字
    * `ID` : 使用者ID
    * `email` : 使用者email
    * `password` : 使用者password
    * `Year`+`-`+`Month`+`-`+`Date`:使用者生日(`Year Month Date`都是form-data的名稱，`-`需要自己新增在與資料庫溝通的時後，才會符合資料庫的格式)
    * `City`+`School`: 是使用者的學校的名稱

* **多國語言**
  * 這部分在javaScript使用的method是**GET**
  * API:
    * `LANGUAGE_API`
    * method: **GET**
    * 目前`LANGUAGE_API`是`/language/+lang`(lang會是語言 ex:en, zh ...)
    * 目前語言包是`LangPkg`
    * example: GET `language/en`就需要後端框架從LangPkg **GET** en.json 然後回傳給前端javaScript做處理
