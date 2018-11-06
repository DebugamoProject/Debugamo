var month='';
var year='';
var date=''
var ChooseYear = 0,ChooseMonth = 0;


let LANGUAGE_API = '/language/login/'

var language_package;
var lang;

function setLanguage(){
    var cookies = Cookies.get('lang')
    if(!cookies){
        Cookies.set('lang','zh',{expires: 7});
        lang = 'zh';
        console.log('set cookies')
    }else{
        lang = Cookies.get('lang')
        console.log('cookies has already set')
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

setLanguage();



$('select#language-select').on('change',function(e){
    // if($('#language-select').val() == '繁體中文'){
    //     console.log('zh has been selected');
    //     lang = 'zh'
    // }
    // else if($('#language-select').val() == 'English'){
    //     console.log('en has been selected');
    //     lang = 'en'
    // }
    lang = $('#language-select').val()
    // console.log($('#language-select').val())
    Cookies.set('lang',lang);
    console.log('cookies set again')
    window.location.reload(true);
})

i18next.init({
    lng:`${lang}`,
    resources:language_package,
},function(err,t){
    // console.log(lang)
    // console.log(language_package)
    jqueryI18next.init(i18next, $);
    $('body').localize();
    // $('form').localize();
    // $('#language-select').localize();
})

function generateYear(){
    for(var i = 2018; i >= 1911;i--)
        year += `<option class="year" value="${i}">${i}</option>`
}

function generateMonth(){
    for(var i = 1;i < 13;i++)
        month += `<option class="month" value="${i}">${i}</option>`
}

function generateDate() {
    var Year = $('#inputYear').val()
    var Month = $('#inputMonth').val()
    $('.date').each(function (index, element) {
        element.remove();
    });
    if(Year != 0 && Month != 0){
        $('#DateNotice').remove();
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
        $('#inputDate').append(date)
    }
}

generateMonth()
generateYear()
generateDate()
$('#inputMonth').append(month);
$('#inputYear').append(year);
// generateCityandSchool()

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
    $(div_id).append(`<small class="${name+'-'+'warning'}"style="color:red;">${text}</small>`)
    $(input_id).css('background-color','#FFB6C1')
}

function IsAvailable(name,input_id){
    $('.'+name+'-'+'warning').remove()
    $(input_id).css('background-color','#FFFFFF')
}



//--------------------Event Listener---------------------//

$('#inputYear').on('change',function (e) {
    ChooseYear = $(this).children('option:selected').text();
    console.log(ChooseYear)
    generateDate()
});
$('#inputMonth').on('change',function(e){
    ChooseMonth = $(this).children('option:selected').text();
    console.log(ChooseMonth)
    generateDate()
})
$('#inputEmail').change(function (e) {
    e.preventDefault();
    RepeatCheck({
        "email":this.value
    },'#Email','email','#inputEmail','this email have been used')
});
$('#inputPassword').change(function(e){
    if($('#inputPasswordagain').val() != 0 && $('#inputPasswordagain').val() != this.value){
        IsnotAvailable('#password-again','password','#inputPasswordagain','this password is not available')
    }else
        IsAvailable('password','#inputPasswordagain')
});
$('#inputPasswordagain').change(function(e){
    var value = $('#inputPassword').val()
    if(value != this.value){
        console.log('false')
        IsnotAvailable('#password-again','password','#inputPasswordagain','this password is not available')
    }else{
        // $('.password-warning').remove()
        // $('#inputPasswordagain').css('background-color','#FFFFFF')
        IsAvailable('password','#inputPasswordagain')
    }
});
$('#inputID').change(function(e){
    RepeatCheck({
        'ID':this.value
    },'#ID','id','inputID','this id have been used');
})
