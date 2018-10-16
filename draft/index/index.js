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

var rightSide = ` <nav class="nav">
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


$('.rightSide').append(rightSide);

$('#login').click(function (e) { 
    e.preventDefault();
    $('.nav').remove();
});

console.log('hello')