var month='';
var year='';
var date=''
var ChooseYear = 2019,ChooseMonth = 1;

let REPEAT_CHEACK_API ='/record'
let LANGUAGE_API = '/language/login/'

var language_package;
var lang;

function setLanguage(){
    var cookies = Cookies.get('lang')
    if(!cookies){
        Cookies.set('lang','zh-hant',{expires: 7});
        lang = 'zh-hant';
        // console.log('set cookies')
    }else{
        lang = Cookies.get('lang')
        // console.log('cookies has already set')
    }
    $.ajax({
        method:"GET",
        url:LANGUAGE_API +lang,
        async:false,
        success : function(response){
            language_package = response
        }
    })
}



$('select#language-select').on('change',function(e){
    lang = $('#language-select').val()
    // console.log($('#language-select').val())
    Cookies.set('lang',lang);
    console.log('cookies set again')
    window.location.reload(true);
})



//=======================================================//

function RepeatCheck(data,div_id,name,input_id,text) {
    var result;
    $.ajax({
        method:"POST",
        url: REPEAT_CHEACK_API,
        data:data,
        async:false,
        error:function(response){
            console.log('repeat check failed');
            console.log(response)
        },
        success: function(response){
            console.log('repeat check successful')
            console.log(response)
            result = response;
        }
    })
    if(result == 'False'){
        IsnotAvailable(div_id,name,input_id,text)
    }else
        IsAvailable(name,input_id)
}

function IsnotAvailable(div_id,name,input_id,text){
    console.log('isnot available')
    console.log(`divid = ${div_id}`)
    $('.'+name+'-'+'warning').remove();
    
    $(div_id).append(`<small class="${name+'-'+'warning'}"style="color:red;margin-left:10px;">${text}</small>`)
    // $(`.${name+'-'+'warning'}`).localize();
    $(input_id).css('background-color','#FFB6C1')
}

function IsAvailable(name,input_id){
    $('.'+name+'-'+'warning').remove()
    $(input_id).css('background-color','#FFFFFF')
}

function LoginOrRegister(API,userdata){
    var result;
    
    $.ajax({
        method:"POST",
        url:API,
        data:userdata,
        async:false,
        success:function(response){
            result = response;
            // window.location.replace('/user')
        },
        error:function(response){
            alert('Server Problem ! Please Report It to Us')
        }
    })
   
    return (result == 'successful') ? true : false;
}



//-----------------Post the data---------------------------//

// let button_click = document.getElementsByClassName('form-button')
// console.log(button_click)
// for(var i of button_click){
//     i.addEventListener('keyup',function(e){
//         e.preventDefault();
//         e.keyCode===13 && $('login-email').val() ? $('#normal-button').click() : $('#register-button').click();
//     })
// }

$(document).keypress(function(e){
    console.log(e.which);
    console.log(e.which == 13);
    if(e.which == 13 &&  $('#login-email').val())
        $('#login-button').click()
    else if (e.which == 13 && emptyCheck(getformData()))
        $('#register-button').click();
});

//--------login---------------------//
$('#login-button').click(function(e){
    console.log($('#login-email').val())
    // window.location.replace('./user')
    var data = {
        "login-email":$('#login-email').val(),
        "login-password":$('#login-password').val()
    }
    if(!LoginOrRegister('./login',data)) alert('Wrong Password')
    else{
        Cookies.set('login','TRUE')
        Cookies.set('user',data['login-email'])
        window.location.replace('/user'); 
    }
});

function getformData(){
    var data = {
        "name" : $('#inputName').val(),
        "gameID" : $('#inputID').val(),
        "email" : $('#inputEmail').val(),
        "password" : $('#inputPassword').val(),
        "identity" : $('#inputIdentity').val(),
        "Year" : $('#inputYear').val(),
        "Month" : $('#inputMonth').val(),
        "Date" : $('#inputDate').val()
    }
    return data;
}

function emptyCheck(data){
    for(var i of Object.keys(data)){
        if(data[i] == '' || data[i] == 'none'){
            return false;
        }
    }
    return true;
}

//--------------------Event Listener---------------------//

$('#inputYear').on('change',function (e) {
    ChooseYear = $(this).children('option:selected').text();
    console.log(ChooseYear)
    var dt = generateDate(ChooseYear, ChooseMonth);
    $('.date').remove();
    console.log(dt);
    $('#inputDate').append(dt);
});

$('#inputMonth').on('change',function(e){
    ChooseMonth = $(this).children('option:selected').text();
    console.log(ChooseMonth)
    var dt = generateDate(ChooseYear, ChooseMonth);
    $('.date').remove();
    $('#inputDate').append(dt);
})

$('#inputEmail').change(function (e) {
    e.preventDefault();
    if(this.value)
        RepeatCheck({
            "email":this.value
        },'#Email','email','#inputEmail','這個Email已經有人使用過了喔')
    else{
        $('.email-warning').remove()
        console.log('connot be zero')
    }
});

$('#inputPassword').change(function(e){
    if($('#inputPasswordagain').val() != 0 && $('#inputPasswordagain').val() != this.value){
        IsnotAvailable('#password-again','password','#inputPasswordagain','兩組密碼不一樣喔！')
    }else
        IsAvailable('password','#inputPasswordagain')
});

$('#inputPasswordagain').change(function(e){
    var value = $('#inputPassword').val()
    if(value != this.value){
        console.log('false')
        IsnotAvailable('#password-again','password','#inputPasswordagain','兩組密碼不一樣喔！')
    }else{
        // $('.password-warning').remove()
        // $('#inputPasswordagain').css('background-color','#FFFFFF')
        IsAvailable('password','#inputPasswordagain')
    }
});

$('#inputID').change(function(e){
    if(this.value)
    RepeatCheck({
        'gameID':this.value
    },'#ID','id','#inputID','這個ID已經有人使用過了喔');
    else{
        $('.id-warning').remove()
        console.log('connot be zero');
    }
})


$('#register-button').click(function (e) {
    var data = getformData();

    if(emptyCheck(data) && check(data)){
        if(!LoginOrRegister('./register',data))alert('Fail to register')
        else{
            Cookies.set('login','TRUE')
            Cookies.set('user',data['email'])
            window.location.replace('/user');
        }
    }else{
        alert("不可以有欄位為空喔");
    }
})

//-------------------register----------------------//

var generateYear = function(){
    var year = '';
    for(var i = 2019; i >= 1911; i--){
        year += `<option class="year" value="${i}">${i}</option>`;
    }
    return year;
}

var generateMonth = function(){
    var month = '';
    for(var i = 1; i< 13; i++){
        month += `<option class="month" value="${i}">${i}</option>`;
    }
    return month;
}

var generateDate = function(Year,Month){
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
        return date;
    }
}

var registerFormInit = function(){
    var yearHTML = generateYear();
    var monthHTML = generateMonth();
    var DateHTML = generateDate(2019,1);

    $('#inputYear').append(yearHTML);
    $('#inputMonth').append(monthHTML);
    $('#inputDate').append(DateHTML);
}

//----------------------------------------//
function check(data){
    // check password
    if(data['password'].length < 8 || data['password'].length > 16){
        alert('密碼長度不對喔！');
        return false;
    }

    if(!!$('.id-warning').length){
        alert('ID不對喔');
        return false;
    }

    if(!!$('email-warning').length){
        alert('Email不對喔');
        return false;
    }

    return true;
}