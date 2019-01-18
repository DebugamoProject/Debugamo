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
  // if(!('TRUE' == Cookies.get('login'))){
  //   alert('You have\'t login');
  //   window.location.replace('/login-register');
  // }
  return ;
}

$('#log-out').click(function(e){
  Cookies.set('login','FALSE');
  Cookies.remove('user');
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
  console.log(data)
  return data;
}
// getUserData();

function SetUserData(){
  var data = getUserData();
  $('#info').html(
    `<p id="ID">ID : <span>${data[1]}</span></p>
    <p id="level" data-18n="[html]level"> Level : <span>${data[6]}</span></p>`
  );
  $(`<span id="user-name" class="user-data" style="margin-right:10px;">${data[0]}</span>`).insertBefore('#name-edit')
  $(`<span id="user-id" class="user-data">${data[1]}</span>`).insertBefore('#ID-edit')
  $(`<span id="user-email" class="user-data">${data[3]}</span>`).insertBefore('#email-edit')
  $(`<span id="user-class" class="user-data">${data[4]}</span>`).insertBefore('#class-edit')
  $(`<span id="user-birthday" class="user-data">${data[5]}</span>`).insertBefore('#birthday-edit')
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
  var data = getClassData();
  var rowContainer = new Array;
  var aRow = new Array;
  for(var i = 0; i < data.length; i++){
    var courseItem = document.createElement('div');
    courseItem.className = 'courseItem';
    courseItem.id = data[i]["name"];
    $(courseItem).append(`

      <button class="addCourseBtn" id='${data[i]["name"]}Btn' style="float:right;margin:5px;" onclick="addCourse('${data[i]["name"]}')">
          <i class="fas fa-plus"></i>
      </button>
      <div class="courseInformation" style="display: none">
        <p class="course-name">${data[i]["name"]}</p>
        <p class="course-description">${data[i]["description"]}</p>
      </div>
    
    `);
    aRow.push(courseItem);
    if((i + 1) % 4 === 0){
      rowContainer.push(aRow)
      aRow = new Array;
    }
  }
  if(aRow.length != 0)
    rowContainer.push(aRow);
  
  var jointask = $('#joinTask');
  for(var i = 0 ; i < rowContainer.length; i++){
    var row = document.createElement('div');
    row.className = 'row';
    for(var j = 0; j < rowContainer[i].length; j++){
      $(row).append(rowContainer[i][j]);
    }
    jointask.append(row);
  }
}

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