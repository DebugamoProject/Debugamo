let LANGUAGE_API = '/language/user/'
let UPDATE_API = '/user/'
let REPEAT_CHEACK_API = '/record'

var language_package;
var lang;

var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}


function IsLogin(){
  if(!('TRUE' == Cookies.get('login'))){
    alert('You have\'t login');
    window.location.replace('/login-register');
  }
}


$('#log-out').click(function(e){
  Cookies.set('login','FALSE');
  Cookies.remove('user')
})

IsLogin();

function getUserData(){
  user = Cookies.get('user');
  var data;
  $.ajax({
    type: "GET",
    url: "/user/"+user,
    async:false,
    success: function (response) {
       data = response;
    }
  });
  return data;
}
// getUserData();

function SetUserData(){
  var data = getUserData();
  $('#info').html(
    `<p id="ID">ID : <span>${data[1]}</span></p>
    <p id="level" data-18n="[html]level"> Level : <span>${data[7]}</span></p>`
  );
  $(`<span id="user-name" class="user-data" style="margin-right:10px;">${data[0]}</span>`).insertBefore('#name-edit')
  $(`<span id="user-id" class="user-data">${data[1]}</span>`).insertBefore('#ID-edit')
  $(`<span id="user-email" class="user-data">${data[3]}</span>`).insertBefore('#email-edit')
  $(`<span id="user-class" class="user-data">${data[5]}</span>`).insertBefore('#class-edit')
  $(`<span id="user-birthday" class="user-data">${data[6]}</span>`).insertBefore('#birthday-edit')
}
SetUserData();

//--------------language---------------//

function setLanguage(){
  var cookies = Cookies.get('lang')
  if(!cookies){
    Cookies.set('lang','zh',{expires: 7});
    lang = 'zh';
  }else{
    lang = Cookies.get('lang')
  }
  $.ajax({
    method : "GET",
    url : LANGUAGE_API + lang,
    async: false,
    success : function (response) {
      language_package = response;
    }
  })
}



//---------EDIT------------------//

$('#information').on('click',function(e){
  console.log('edit')
  $('#main-container').append(edit);
  $('body').localize();
  ReloadUserData();
})

var year,month;

function generateYear(){
  for(var i = 2018; i >= 1911;i--)
      year += `<option class="year" value="${i}">${i}</option>`
}

function generateMonth(){
  for(var i = 1;i < 13;i++)
      month += `<option class="month" value="${i}">${i}</option>`
}
function generateDate() {
  var Year = $('#year').val()
  var Month = $('#month').val()
  $('.date').each(function (index, element) {
      element.remove();
  });
  if(Year != 0 && Month != 0){
      // $('#DateNotice').remove();
      var Fab_dates_amount = 0;
      var dates_amount = 0;

      if ((Year % 4 == 0 && Year % 100 != 0)||(Year % 400 == 0)) Fab_dates_amount = 29;
      else Fab_dates_amount = 28;



      if(Month == 2) dates_amount = Fab_dates_amount;
      else if((Month <= 7 && Month % 2 == 1) || (Month >=8 && Month % 2 == 0))dates_amount = 31;
      else dates_amount = 30;

      date = '';
      for(var day = 1;day <= dates_amount;day++)
          date += `<option class="date" value="${day}">${day}</option>`
      $('#date').append(date)
  }
}
generateYear()
generateMonth()
$('#year').append(year);
$('#month').append(month);
generateDate();

$('#year').on('change',function (e) {
  ChooseYear = $(this).children('option:selected').text();
  console.log(ChooseYear)
  generateDate()
});
$('#month').on('change',function(e){
  ChooseMonth = $(this).children('option:selected').text();
  console.log(ChooseMonth)
  generateDate()
})

function Init(){
  $('#name-drop-down').slideUp();
}
Init();

$('.fas.fa-pen').on('hover',function(e){
  $(this).css('color','black');
});

$('.fas.fa-pen').on('mouseout',function(e){
  $(this).css('color','grey')
})

$('.edit').on('click',function(e){
  console.log('click');
  $(this).parent().parent().children('.edit-dropdown').slideToggle();
})

//----put data----//

function update_data(data,item) {
  var url = UPDATE_API + Cookies.get('user') +'/' + item
  
  $.ajax({
    type: "PUT",
    url: url,
    data: data,
    async:false,
    success: function (response) {
      console.log(response)
    }
  });
}

function ReloadUserData() {
  $('.user-data').remove()
  SetUserData();
}



//-----button-click-event-listening------///
$('#name-button').on('click',function(e) {
  var data = {
    "name": $('#edit-name').val()
  }
  update_data(data,'name')
  ReloadUserData();
  $('#Name-drop-down').slideToggle();
})

$('#id-button').on('click',function(e){
  if(!$('#id-notice').length){
    var data = {
      "gameID" : $('#edit-gameID').val()
    }
    update_data(data,'gameID')
    ReloadUserData();
    $('#ID-drop-down').slideToggle();
  }
})

$('#email-button').on('click',function (e) {  
  if(!$('#email-notice').length){
    var data = {
      "email" : $('#edit-email-input').val()
    }
    update_data(data,'email')
    Cookies.set('user',data['email'])
    ReloadUserData();
    $('#Email-drop-down').slideToggle();
  }
})

$('#password-button').on('click',function (e){
  if(!$('#confirm-notice').length){
    RepeatCheck({
      "password":$('#old-password').val()
    },'#old-password','Password isn\'t correct!','old-password-notice','True');
    if(!$('#old-password-notice').length){
      update_data({
        'password':$('#newpassword').val()
      },'password');
      ReloadUserData();
      $('#password-dropdown').slideToggle();
    }
  }
})

$('#birthday-button').on('click',function (e) {
  var data =  $('#year').val()+'-'+$('#month').val()+'-'+$('#date').val()
  update_data({
    "birthday":data
  },'birthday');
  ReloadUserData();
  $('#Birthday-drop-down').slideToggle();
})

$('#class-button').on('click',function (e){
  update_data({
    "class":$('#class-input').val()
  },'class')
  ReloadUserData();
  $('#class-dropdown').slideToggle();
})


//----Edit Repeat Cheack----//
function RepeatCheck(data,which_button_id,i18n_text,notice_id,judge){
  $.ajax({
    type: "POST",
    url: REPEAT_CHEACK_API,
    data: data,
    async:false,
    success: function (response) {
      console.log(response)
      if(response == judge)
        IsNotAvailable(which_button_id,i18n_text,notice_id)
      else IsAvailable(notice_id)
    }
  });
}

function IsNotAvailable(which_button_id,i18n_text,notice_id){
  console.log('is-not')
  $('#'+notice_id).remove();
  $(`<small id="${notice_id}" style="display:inline;color:red;" data-i18n="[html]${i18n_text}">${i18n_text}</small>`).insertAfter(which_button_id)
  $('#'+notice_id).localize();
  // $(which_button_id).append();
}

function IsAvailable(notice_id){
  $('#'+notice_id).remove();
}

$('#edit-gameID').on('change',function(e){
  // var text = $('#edit-gameID').val();
  var text = this.value;
  console.log(text);
  RepeatCheck({
    'gameID' : text
  },'#id-input','This ID has been registered','id-notice','False')
})

$('#edit-email-input').on('change',function(e){
  // var text = $('#edit-email-input').val();
  var text = this.value;
  console.log(text);
  console.log('email register')
  RepeatCheck({
    'email':text
  },'#email-input-div','This email has been registered','email-notice','False')
})

$('#old-password').on('change',function (e){
  $('#old-password-notice').remove();
})

//--------two passwords are same?----//

$('#newpassword').on('change',function(e){
  if(this.value == $('#confirm').val()){
    IsAvailable('confirm-notice')
  }
})

$('#confirm').on('change',function (e){
  var text = this.value;
  console.log(text)
  if(text != $('#newpassword').val()){
    IsNotAvailable('#password-confirm','Those passwords are not the same.','confirm-notice')
  }else{
    IsAvailable('confirm-notice')
  }
})

//--------Set Language---------//

setLanguage();

i18next.init({
  lng:`${lang}`,
  resources:language_package,
},function(err,t){
  jqueryI18next.init(i18next, $);
  console.log(language_package)
  $('body').localize();
})

$('select#language-select').on('change',function(e){
  lang = $('#language-select').val()
  console.log($('#language-select').val())
  Cookies.set('lang',lang);
  console.log('cookies set again')
  window.location.reload(true);
})

let edit = `
<style>

/*-------edit part----------*/

#edit{
    /* display: grid; */
    width: 90%;
    padding: 5%;
    padding-top: 5%;
    box-sizing: border-box;
    /* grid-template-rows: 80px 80px 80px 80px 80px; */
}

.item{
    width: 100%;
    padding: 10px;
    
}

#edit label{
    font-size: 16px;
} 

.item input{
    outline: none;
    border:none;
    border-bottom: 1px solid black;
    border-radius: 5px 5px 0px 0px;
    width: 20%;
    height: 30px;
    font-size: 18px;
    vertical-align: bottom;
    margin-right:10px;
    background-color:transparent;
}

.item input:focus{
    transition: 1s;
    background-color: rgb(255, 222, 180);
}

#name-ID{
    display: grid;
    grid-template-columns: 50% 50%;
}

#edit span{
    margin-right:10px;
}

#name-ID input{
    width: 50%;
}

#edit div.edit-dropdown{
    margin-top: 10px;
    background-color: antiquewhite;
    box-shadow:3px 3px 9px grey;
    /* height: 50px; */
    display: none;
    padding:10px;
    padding-left: 0px;
    height: 5%;
}


button{
    outline: none;
    height: 30px;
    font-size:14px;
    border-radius: 3px;
}

button:hover{
    transition: 0.5s;
    background-color: rgb(232, 226, 226);
}

.user-data{
    margin-right:10px;
}


#name-ID .edit-dropdown{
    width: 80%;
}

div#password-dropdown.edit-dropdown{
    font-size: 12px;
    height: 80px;
}
#password-dropdown.edit-dropdown input{
    width:18%
}

#Birthday-drop-down select{
    width: 60px;
    height: 30px;
    font-size: 14px;
}

</style>
<div id="edit">
<div id="edit-title">
  <span style="font-size: 40px" data-i18n="[append]edit.title.edit">Edit</span>
  <div style="border: 1px solid lightgrey"></div>
</div>
<div id="name-ID" class="item">
  <div id="name"> 
    <div style="display: inline">
      <label for="user-name" data-i18n="[append]edit.nameid.name.name">Name : </label>

      <i class="fas fa-pen edit" id="name-edit" style="color:grey"></i>
    </div>
    <div id="Name-drop-down" class="edit-dropdown">
      <label for="edit-name" data-i18n="[append]edit.nameid.name.name">Name : </label>
      <input type="text" id="edit-name"> <button id="name-button" data-i18n="[append]edit.button">submit</button>
      
    </div>
  </div>
  <div id="ID">
    <div>
      <label for="edit-id" data-i18n="[append]edit.nameid.id.gameid">gameID : </label>
      
      <i class="fas fa-pen edit" id="ID-edit" style="color:grey"></i>
    </div>
    <div id="ID-drop-down" class="edit-dropdown">
      <div style="width:100%" id="id-input">
        <label for="edit-id" data-i18n="[append]edit.nameid.id.gameid">gameID : </label>
        <input type="text" id="edit-gameID"> <button id="id-button" data-i18n="[append]edit.button">submit</button>
      </div>
      <!-- <small style="display:inline">adslfk;askljf;alskjf</small> -->
    </div>
  </div>
</div>
<div id="edit-email" class="item">
  <div>
    <label for="edit-email" data-i18n="[append]edit.email.email">Email : </label>
    <!-- <span id="user-email" class="user-data">example@gmail.com</span> -->
    <i class="fas fa-pen edit" id="email-edit"style="color:grey"></i>
  </div>
  <div id="Email-drop-down" class="edit-dropdown" style="width:50%;">
    <div id="email-input-div" style="width:100%;">
      <label for="edit-email" data-i18n="[append]edit.email.email">Email : </label>
      <input type="email" style="width:60%;" id="edit-email-input"> <button id="email-button" data-i18n="[append]edit.button">Submit</button>
    </div>
  </div>
</div>
<div id="edit-password" class="item">
  <div>
    <label for="password" data-i18n="[append]edit.password.password">Password :</label>
    <span id="password">********</span>
    <i class="fas fa-pen edit" style="color:grey"></i>
  </div>
  <div id="password-dropdown" class="edit-dropdown" style="display:none;width:90%;">
    <div >
      <label for="old-password" data-i18n="[append]edit.password.old-password">Old Password</label>
      <input type="password" style="display:inline;" id="old-password">
    </div>
    <div id="password-confirm">
      <label for="new-password" data-i18n="[append]edit.password.new-password">New Password</label>
      <input type="password" style="margin-top:5px;" id='newpassword'>
      <label for="comfirm" data-i18n="[append]edit.password.confirm">Confirm</label>
      <input type="password" id='confirm'>
      <button id="password-button" data-i18n="[append]edit.button">submit</button>
    </div>
  </div>
</div>
<div id="edit-birthday" class="item">
  <div>
    <label for="user-birthday" data-i18n="[append]edit.birthday">Birthday : </label>
    <i class="fas fa-pen edit" id="birthday-edit"style="color:grey"></i>
  </div>
  <div id="Birthday-drop-down" class="edit-dropdown" style="width:50%;">
    <label for="edit-birthday">Birthday : </label>
    <select name="year" id="year" class="form-cotrol"></select>
    <select name="month" id="month"></select>
    <select name="date" id="date"></select>
    <button style="margin-left:20px;" id="birthday-button" data-i18n="[append]edit.button">Submit</button>
  </div>
</div>
<div id="edit-class" class="item">
  <div>
    <label for="edit-class" data-i18n="[append]edit.class">Class : </label>
    
    <i class="fas fa-pen edit" id="class-edit"style="color:grey"></i>
  </div>
  <div id="class-dropdown" class="edit-dropdown" style="width:30%;">
    <label for="edit-class" data-i18n="[append]edit.class">Class : </label>
    <input type="text" style="width:38%" id="class-input">
    <button id="class-button" data-i18n="[append]edit.button">Submit</button>
  </div>
</div>
</div>
<script>

</script>
`