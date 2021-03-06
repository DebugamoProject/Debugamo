
//---------EDIT------------------//
// function editContent() {
//     var edit = $('#edit')
//     if (edit.css('display') == 'block') {
//         edit.css('display', 'none')
//     } else {
//         console.log('none')
//         edit.css('display', 'block');
//     }
//     ReloadUserData();
// }

var year, month;

function generateYear() {
    for (var i = 2018; i >= 1911; i--)
        year += `<option class="year" value="${i}">${i}</option>`
}

function generateMonth() {
    for (var i = 1; i < 13; i++)
        month += `<option class="month" value="${i}">${i}</option>`
}
function generateDate() {
    var Year = $('#year').val()
    var Month = $('#month').val()
    $('.date').each(function (index, element) {
        element.remove();
    });
    if (Year != 0 && Month != 0) {
        // $('#DateNotice').remove();
        var Fab_dates_amount = 0;
        var dates_amount = 0;

        if ((Year % 4 == 0 && Year % 100 != 0) || (Year % 400 == 0)) Fab_dates_amount = 29;
        else Fab_dates_amount = 28;



        if (Month == 2) dates_amount = Fab_dates_amount;
        else if ((Month <= 7 && Month % 2 == 1) || (Month >= 8 && Month % 2 == 0)) dates_amount = 31;
        else dates_amount = 30;

        date = '';
        for (var day = 1; day <= dates_amount; day++)
            date += `<option class="date" value="${day}">${day}</option>`
        $('#date').append(date)
    }
}
generateYear()
generateMonth()
$('#year').append(year);
$('#month').append(month);
generateDate();

$('#year').on('change', function (e) {
    ChooseYear = $(this).children('option:selected').text();
    console.log(ChooseYear)
    generateDate()
});
$('#month').on('change', function (e) {
    ChooseMonth = $(this).children('option:selected').text();
    console.log(ChooseMonth)
    generateDate()
})

function Init() {
    $('#name-drop-down').slideUp();
}

Init();

$('.fas.fa-pen').on('hover', function (e) {
    $(this).css('color', 'black');
});

$('.fas.fa-pen').on('mouseout', function (e) {
    $(this).css('color', 'grey')
})

$('.edit').on('click', function (e) {
    console.log('click');
    $(this).parent().parent().children('.edit-dropdown').slideToggle();
})

//----put data----//

function update_data(data, item) {
    var url = UPDATE_API + Cookies.get('user') + '/' + item

    $.ajax({
        type: "PUT",
        url: url,
        data: data,
        async: false,
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
$('#name-button').on('click', function (e) {
    var data = {
        "name": $('#edit-name').val()
    }
    update_data(data, 'name')
    ReloadUserData();
    $('#Name-drop-down').slideToggle();
})

$('#id-button').on('click', function (e) {
    if (!$('#id-notice').length) {
        var data = {
            "gameID": $('#edit-gameID').val()
        }
        update_data(data, 'gameID')
        ReloadUserData();
        $('#ID-drop-down').slideToggle();
    }
})

$('#email-button').on('click', function (e) {
    if (!$('#email-notice').length) {
        var data = {
            "email": $('#edit-email-input').val()
        }
        update_data(data, 'email')
        Cookies.set('user', data['email'])
        ReloadUserData();
        $('#Email-drop-down').slideToggle();
    }
})

$('#password-button').on('click', function (e) {
    if (!$('#confirm-notice').length) {
        RepeatCheck({
            "password": $('#old-password').val()
        }, '#old-password', 'Password isn\'t correct!', 'old-password-notice', 'True');
        if (!$('#old-password-notice').length) {
            update_data({
                'password': $('#newpassword').val()
            }, 'password');
            ReloadUserData();
            $('#password-dropdown').slideToggle();
        }
    }
})

$('#birthday-button').on('click', function (e) {
    var data = $('#year').val() + '-' + $('#month').val() + '-' + $('#date').val()
    update_data({
        "birthday": data
    }, 'birthday');
    ReloadUserData();
    $('#Birthday-drop-down').slideToggle();
})

$('#class-button').on('click', function (e) {
    update_data({
        "class": $('#class-input').val()
    }, 'class')
    ReloadUserData();
    $('#class-dropdown').slideToggle();
})


//----Edit Repeat Cheack----//
function RepeatCheck(data, which_button_id, i18n_text, notice_id, judge) {
    $.ajax({
        type: "POST",
        url: REPEAT_CHEACK_API,
        data: data,
        async: false,
        success: function (response) {
            console.log(response)
            if (response == judge)
                IsNotAvailable(which_button_id, i18n_text, notice_id)
            else IsAvailable(notice_id)
        }
    });
}

function IsNotAvailable(which_button_id, i18n_text, notice_id) {
    console.log('is-not')
    $('#' + notice_id).remove();
    $(`<small id="${notice_id}" style="display:inline;color:red;">${i18n_text}</small>`).insertAfter(which_button_id)
    // $(which_button_id).append();
}

function IsAvailable(notice_id) {
    $('#' + notice_id).remove();
}

$('#edit-gameID').on('change', function (e) {
    // var text = $('#edit-gameID').val();
    var text = this.value;
    console.log(text);
    RepeatCheck({
        'gameID': text
    }, '#id-input', 'This gameID is registered', 'id-notice', 'False')
})

$('#edit-email-input').on('change', function (e) {
    // var text = $('#edit-email-input').val();
    var text = this.value;
    console.log(text);
    console.log('email register')
    RepeatCheck({
        'email': text
    }, '#email-input-div', 'This email has been registered', 'email-notice', 'False')
})

$('#old-password').on('change', function (e) {
    $('#old-password-notice').remove();
})

//--------two passwords are same?----//

$('#newpassword').on('change', function (e) {
    if (this.value == $('#confirm').val()) {
        IsAvailable('confirm-notice')
    }
})

$('#confirm').on('change', function (e) {
    var text = this.value;
    console.log(text)
    if (text != $('#newpassword').val()) {
        IsNotAvailable('#password-confirm', 'Those passwords are not the same', 'confirm-notice')
    } else {
        IsAvailable('confirm-notice')
    }
})