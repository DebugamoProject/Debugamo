let LANGUAGE_API = '/language/user/'
let UPDATE_API = '/user/'
let REPEAT_CHEACK_API = '/record'
var data = getClassData();
var userCourseData = getUserTaskData();

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
  // if(!('TRUE' == Cookies.get('login'))){
  //   alert('You have\'t login');
  //   window.location.replace('/login-register');
  // }
  return ;
}

$('#log-out').click(function(e){
  Cookies.set('login','FALSE');
  Cookies.remove('user');
  window.location.replace('/');
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
  // console.log(data)
  return data;
}
// getUserData();

function SetUserData(){
  var data = getUserData();
  document.getElementById('UserInfoName').innerHTML = data['name'];
  document.getElementById('UserInfoID').innerHTML = data['id'];
  document.getElementById('UserInfoLevel').innerHTML = '等級 : ' + data['level'];
  var exp = data['exp'];
  var expBar = document.getElementById('expBar');
  expBar.innerText = exp;
  expBar.style.width = `${exp}%`
  
  // $('#info').html(
  //   `<p id="ID">ID : <span>${data[1]}</span></p>
  //   <p id="level" data-18n="[html]level"> Level : <span>${data[6]}</span></p>`
  // );
  $(`<span id="user-name" class="user-data" style="margin-right:10px;">${data['name']}</span>`).insertBefore('#name-edit')
  $(`<span id="user-id" class="user-data">${data['id']}</span>`).insertBefore('#ID-edit')
  $(`<span id="user-email" class="user-data">${data['email']}</span>`).insertBefore('#email-edit')
  // $(`<span id="user-class" class="user-data">${data[4]}</span>`).insertBefore('#class-edit')
  $(`<span id="user-birthday" class="user-data">${data['birthday']}</span>`).insertBefore('#birthday-edit')
}
SetUserData();

//--------------language---------------//

function setLanguage(){
  var cookies = Cookies.get('lang')
  if(!cookies){
    Cookies.set('lang','zh-hant',{expires: 7});
    lang = 'zh-hant';
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


//------- participate Class ----------//

/**
 * load the class Data
 */

function getClassData(){
  var user = Cookies.get('user');
  var data;
  $.ajax({
    type: "GET",
    url: "/class/" + user + '/search',
    async: false,
    success: function (response) {
      data = response;
    }
  });
  return data;
}

function ClassDataDomCreater(){
  
  for(var i of data){
    var name = i['name'];
    $('#mainTasklist').append(`<li id="${name}" class="courseItem"><a href="javascript:void(0);">${i['name']}</a></li>`);
  }
  // $('#mainTasklist').append('<li><a href="javascript:void(0);">Home</a></li>');
}

function userClassDataDomCreater(){
  for(var i of userCourseData){
    var name = i['name'];
    $('#userTaskList').append(`<li class="userTaskItem" id="${name}"><a href="javascript:void(0);">${name}</a></li>`);
  }
}

function taskContentModify(name){
  document.getElementById('taskName').innerHTML = name;
  for(var i of data){
    
    console.log(i["description"]);
    if(i['name'] == name){
      document.getElementById('taskDescription').innerText = i["description"];
      document.getElementById('joinBonus').innerHTML = '解完任務的會得到經驗值 : ' + i['exp'] + ' exp'
      document.getElementById('taskDescription').innerHTML = i['target'];
      // document.getElementById('getCourse').onclick = `addCourse('${name}');`
      $('#getCourse').attr('onclick',`addCourse('${name}');`);
      break;
    }
  }
}

function userTaskContentModify(name){
  console.log('in userTaskContentModify name is ' + name);

  document.getElementById('userTaskName').innerHTML = name;

  for(var i of userCourseData){
    if(i['name'] == name){
      document.getElementById('userTaskBonus').innerHTML = '解完任務的會得到經驗值 : ' + i['exp'] + ' exp'
      document.getElementById('usertaskDescription').innerHTML = i['target'];
      $('#startMission').attr('href', `/debugging?lang=zh-hant&level=1${i['url']}&mode=gamming`);
      $('#backTrackMission').attr('href',`/debugging?lang=zh-hant&level=1${i['url']}&mode=backTrack`)
      // document.getElementById('getCourse').onclick = `addCourse('${name}');`
      // $('#getCourse').attr('onclick',`addCourse('${name}');`);
    }
  }
}

/**
 * participating a course
 * this function will be called by "onclick" attribute
 * @param {*} courseName 
 */
function addCourse(courseName){
  var user = Cookies.get('user');
  $.ajax({
    type: "POST",
    url: "/class/" + user,
    data: {
      "course" : courseName,
      "user" : user
    },
    success: function (response) {
      var courseItem = document.getElementById(courseName + 'Btn');
      courseItem.setAttribute('disabled','true');
      courseItem.style.cursor = 'not-allowed';
      $(courseItem).css('background','grey');
    },
    error: function () {
      alert('Server Error Please Report it to us');
    }
  });
}

ClassDataDomCreater();
userClassDataDomCreater();


//--------------user's task----------------//

function getUserTaskData(){
  var userEmail = Cookies.get('user');
  var userTaskData;
  $.ajax({
    type: "GET",
    url: "/class/" + userEmail + "/userTask",
    async: false,
    success: function (response) {
      userTaskData = response;
    }
  });
  // console.log('[load] user Task Data');
  // console.log(userTaskData);
  return userTaskData;
}

