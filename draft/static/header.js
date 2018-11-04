$('body').prepend(`<style>
.header{
background-color: #00adbc;
width: 100%;
height: 100%;
display: grid;
grid-template-columns: 2fr 4fr 3fr;
}
#left-side{
padding:10px;

text-align: center;
color: white;
}
#title{
margin: 8px auto;
}
#right-side{
padding: 10px;
padding-right: 15px;
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1.5fr;
text-align: center;
}
#right-side a.normal{
text-decoration: none;
background:none;
border: 0px;
color: white;
margin: 8px auto;
}
#right-side #setting{
background: none;
border: 0px;
color: white;
font-size: 15px;
height: 40px;
width: 100%;
text-align: left;
outline:none;
/* margin-top: 8px;
margin-bottom: 8px; */
}
#setting-dropdown-div{
background: #00adbc;
border-radius: 5px;
color: white;
text-decoration: none;
}
#setting-dropdown-div .dropdown-container a{
border-top:1px lightgrey solid;
font-size: 15px;
color: white;
}
.dropdown-container{
display: none;
/* display: inline; */
}
.dropdown-container a.dropdown-option{
padding: 5px;
text-decoration: none;
font-size: 20px;
box-sizing: border-box;
display: block;
border: none;
background: none;
width:100%;
text-align: left;
cursor: pointer;
outline: none;
border-bottom: 1px solid lightgrey;
}
.fa.fa-caret-down{
float: right;
}
</style>
<div class="header">
<div id="left-side">
    <p id="title">Debugamo : 幫幫迪摩</p>
</div>
<div id="mid"></div>
<div id="right-side">
    <a class="normal "href="">首頁</a>
    <a class="normal" href="">我的迪摩</a>
    <a class="normal"href="">登入</a>
    <a class="normal" href="">註冊</a>
    <div id="setting-dropdown-div">
        <button class="dropdown-btn" id="setting">設定
            <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-container">
            <a href="" class="dropdown-option">遊戲設定</a>
            <a href="" class="dropdown-option">個人資料設定</a>
            <a href="" class="dropdown-option">選項2</a>
        </div>
    </div>
</div>
</div>
<script>
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
dropdown[i].addEventListener("click", function() {
var dropdownContent = this.nextElementSibling;
if (dropdownContent.style.display === "block") {
dropdownContent.style.display = "none";
} else {
dropdownContent.style.display = "block";
}
});
}
    
</script>`)