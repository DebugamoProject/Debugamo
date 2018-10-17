// document.getElementsByClassName("rightSide").innerHTML = `
// <nav class="nav">
// <a class="nav-link active">首頁</a>
// <a class="nav-link" >我的迪摩</a>
// <a id="login" class="nav-link" href="" >登入</a>
// <a class="nav-link disabled" >註冊</a>
// <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"></a>
// <div class="dropdown-menu">
//     <a class="dropdown-item" href="#">Option1</a>
//     <a class="dropdown-item" href="#">Option3</a>
//     <div class="dropdown-divider"></div>
//     <a class="dropdown-item" href="#">登出</a>
// </div>
// </nav>
// `

var default_rightSide = ` <nav class="nav">
<a class="nav-link active">首頁</a>
<a class="nav-link" >我的迪摩</a>
<a id="login" class="nav-link" href="" >登入</a>
<a class="nav-link disabled" >註冊</a>
<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"></a>
<div class="dropdown-menu">
    <a class="dropdown-item" href="#">Option1</a>
    <a class="dropdown-item" href="#">Option3</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">登出</a>
</div>
</nav>`

var login=`<div id="login-input">
<form id="login-form" class="form-inline">
    <div class="form-group mb-2">
        <label for="inputPassword2" class="sr-only">Password</label>
        <input type="password" class="form-control" id="inputPassword2" placeholder="Email">
    </div>
    <div class="form-group mx-sm-3 mb-2">
    <label for="inputPassword2" class="sr-only">Password</label>
    <input type="password" class="form-control" id="inputPassword2" placeholder="Password">
    </div>
    <button id="login-summit" type="submit" class="btn btn-primary mb-2">Login</button>
</form>
</div>`


$('.rightSide').append(default_rightSide);

$('#login').click(function (e) { 
    e.preventDefault();
    $('.nav').remove();
    $('.rightSide').append(login)
});

console.log('hello')

var leftSide = `
<div id="title" style="margin:0px auto;">
<a class="nav-link" href="">Debugamo : 幫幫迪摩</a>
</div>`

$('.leftSide').append(leftSide);