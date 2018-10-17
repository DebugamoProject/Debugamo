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
<a id="log" class="nav-link" href="" >登入</a>
<a class="nav-link disabled" >註冊</a>
<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"></a>
<div class="dropdown-menu">
    <a class="dropdown-item" href="#">Option1</a>
    <a class="dropdown-item" href="#">Option3</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">登出</a>
</div>
</nav>`

var login=`<div style="margin:4px auto;display: inline-block;">
<div style="display:inline-block;width: auto;">
    <input type="text" id="email" placeholder="Email">
    <img id="blockly-input" src="./login.png" alt="">
    <input type="text" id="password" placeholder="Password">
    <div class="login-button" style="display:inline-block;width: 400px">
            <button id="login" type="submit" class="btn btn-primary mb-2">Login</button>
            <!-- <div></div> -->
            <button id="fast-login-fb" type="submit" class="btn btn-primary mb-2">Facebook 登入</button>
            <button id="login-summit-go" type="submit" class="btn btn-primary mb-2" style="background:red">Google+登入</button>
    </div>
</div>
</div>`




$('.rightSide').append(default_rightSide);

$('#log').click(function (e) { 
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