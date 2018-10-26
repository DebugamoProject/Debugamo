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
    },'#Email','email','#inputEmail')
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
//======================================================//