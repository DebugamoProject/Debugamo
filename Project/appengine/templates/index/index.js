// create header

var setUp = function (){
    // need to load the langPkg

}

var midSizeInit = function(e){
    var bodySize = document.querySelector('body').getBoundingClientRect().width;
    // console.log(bodySize.width);
    var jumpbotron = document.getElementById('welcome');
    var jumbotronSize = jumpbotron.getBoundingClientRect().width;

    var remainpx = (bodySize - jumbotronSize);
    var welcome = document.getElementById('welcome');
    welcome.style.left = remainpx / 2 + 'px';
    // console.log(bodySize);
    if(bodySize > 1000){
        welcome.style.top = '25%';
    }else{
        document.getElementById('mid').style.height = 500 + 'px';
        welcome.style.top = '';
    }
    
    // console.log(jumbotronSize);
}

var midImageEffect = function(e){
    var midimage = document.getElementById('midimage');
    midimage.style.filter = 'blur(3px)';
    setTimeout(1500,function(){
        var welcome = document.getElementById('welcome');
        // $('#welcome').toggle(true);
        welcome.style.display = '';
    })
    
}

window.addEventListener('resize',function(e){
    midSizeInit(e);
})

var init = function (e){
    midSizeInit(e);
    midImageEffect(e);
    registerFormInit();
    // contentSizeInit(e);
}


var contentSizeInit = function(e){
    var bodySize = document.querySelector('body').getBoundingClientRect().width;
    if(bodySize < 500){
        document.getElementById('about').style.padding = 50 + 'px';
        document.getElementById('content-left').style.borderRight = '0px';

    }else{
        document.getElementById('about').style.padding = 100 + 'px';
        document.getElementById('content-left').style.borderRight = '1px';
    }
}

var mask = function(){
    var component = ['login','register'];
    for(var i = 0; i < component.length; i++){
        document.getElementById(component[i]).className = 'nav-link';
        document.getElementById(component[i] + '-form').style.display = 'none';
    }
}

var displayForm = function(e){
    var id = this.id;
    // console.log(this.className)
    mask();
    this.className = 'nav-link active';
    
    document.getElementById(id + '-form').style.display = 'block';
}


// add event listener;
var component = ['login','register']
for(var i = 0; i < component.length; i++){
    document.getElementById(component[i]).addEventListener('click',displayForm)
}



window.addEventListener('load',init);

console.log('nav show');
console.log(document.getElementById('navbarNavDropdown').className);
;

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

    $('#year').append(yearHTML);
    $('#month').append(monthHTML);
    $('#date').append(DateHTML);
}

$('#year').on('change',function(){
    var year = this.value;
    var monthHTML = generateMonth();
    var DateHTML = generateDate(year,1);
    $('.month').remove();
    $('.date').remove();
    $('#month').append(monthHTML);
    $('#date').append(DateHTML);
})

$('#month').on('change',function(){
    var year = document.getElementById('year').value
    var month = this.value;
    var DateHTML = generateDate(year,month);
    $('.date').remove();
    $('#date').append(DateHTML);
})