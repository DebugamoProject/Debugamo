var month='';
var year='';
var date=''
var ChooseYear = 0,ChooseMonth = 0;
let REPEAT_CHEACK_API ='/record'


//---------------------generate for form-------------------//
function generateYear(){
    for(var i = 2018; i >= 1911;i--)
        year += `<option class="year" value="${i}">${i}</option>`
}

function generateMonth(){
    for(var i = 1;i < 13;i++)
        month += `<option class="month" value="${i}">${i}</option>`
}

function generateDate(Year,Month) {
    $('.date').each(function (index, element) { 
        element.remove();
    });
    console.log('after remove')
    if(Year != 0 && Month != 0){
        $('#Notice').remove();
        var Fab_dates_amount = 0;
        var dates_amount = 0;
        if (Year % 4 != 0) Fab_dates_amount = 28;
        else if (Year % 400 == 0) Fab_dates_amount = 29;
        else if(Year % 100 == 0 && Year % 400 != 0) Fab_dates_amount = 28;
        else if(Year % 4 == 0 && Year % 100 != 0) Fab_dates_amount = 29;


        if(Month == 2) dates_amount = Fab_dates_amount;
        else if((Month <= 7 && Month % 2 == 1) || (Month >=8 && Month % 2 == 0))dates_amount = 31;
        else dates_amount = 30;

        date = '';
        for(var day = 1;day <= dates_amount;day++)
            date += `<option class="date" value="${day}">${day}</option>`
        $('#inputDate').append(date)
    }
}

// auto generate
generateMonth()
generateYear()

//========================================================//


function RepeatCheck(data) {
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
            result = response;
        }
    })
    return result;
}




//---------------------append html------------------------//

$('#Month select').append(month);
$('#inputYear').append(year);

//========================================================//






//--------------------Event Listener---------------------//

$('#Year').on('change',"select",function (e) {
    ChooseYear = $(this).children('option:selected').text();
    console.log(ChooseYear)
    generateDate(ChooseYear,ChooseMonth)
});
$('#Month').on('change','select',function(e){
    ChooseMonth = $(this).children('option:selected').text();
    console.log(ChooseMonth)
    generateDate(ChooseYear,ChooseMonth)
})
$('#inputEmail').change(function (e) { 
    e.preventDefault();
    RepeatCheck({
        "email":this.value
    })
});
$('#inputPassword').change(function(e){
    if($('#inputPasswordagain').val() != 0 && $('#inputPasswordagain').val() != this.value){
        $('#inputPasswordagain').css('background-color','#FFB6C1')
        if(document.getElementsByClassName('password-warning') != null)
            $('#password-again').append('<small class="password-warning"style="color:red;">false</small>')
    }
});
$('#inputPasswordagain').change(function(e){
    var value = $('#inputPassword').val()
    if(value != this.value){
        console.log('false')
        if(document.getElementsByClassName('password-warning') != null)
            $('#password-again').append('<small class="password-warning"style="color:red;">false</small>')
        $('#inputPasswordagain').css('background-color','#FFB6C1')
    }else{
        $('.password-warning').remove()
        $('#inputPasswordagain').css('background-color','#FFFFFF')
    }
});
//======================================================//
