# 前端API

## 原則

如果發現底下的API有誤
原則可以幫你更快找到前端post的form-data

---

* 按buttom的post會使用表單的name來做post
    ex:
    ```html
    <form method="POST">
        <input name="password">
        <input name="email">
        <buttom type="submit"></buttom>
    </form>
    ```
    form-data:
    ```json
    "password":"123456"
    "email":"123456787@gmail.com"
    ```
* 沒有表單的post(event listener)會在JavaScript中用$.ajax

----