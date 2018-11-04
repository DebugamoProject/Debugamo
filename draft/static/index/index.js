let LANGUAGE_API = '/language/index/'

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