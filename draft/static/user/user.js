let LANGUAGE_API = '/language/user/'
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
    // $('#info').localize();
}
// SetUserData();

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
function Init(){
  $('#name-drop-down').slideUp();
}
Init();

$('.fas.fa-pen').hover(function(e){
  $(this).css('color','black');
});

$('.fas.fa-pen').mouseout(function(e){
  $(this).css('color','grey')
})

$('body:not(#name)').click(function (e) {
  // $('.edit-dropdown').css('display','none');
  console.log('back')
  $('.edit-dropdown').slideUp();
})


$('#edit-name').click(function (e) {
  console.log('click')
  $('.edit-dropdown').slideToggle();
})
// setLanguage();

// i18next.init({
//   lng:`${lang}`,
//   resources:language_package,
// },function(err,t){
//   jqueryI18next.init(i18next, $);
//   console.log(language_package)
//   $('body').localize();
// })

// $('select#language-select').on('change',function(e){
//   lang = $('#language-select').val()
//   console.log($('#language-select').val())
//   Cookies.set('lang',lang);
//   console.log('cookies set again')
//   window.location.reload(true);
// })