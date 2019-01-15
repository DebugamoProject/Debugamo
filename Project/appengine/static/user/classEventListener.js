
$('.dropdownBar').on('click', function (e) {
    e.preventDefault();
    console.log(this)
    $(this).parent().parent().children('.levels').slideToggle();
})

$('.up').on('click', function (e) {
    e.preventDefault();
    $(this).parent().parent().children('.levels').slideToggle();
});

$('.level').click(function (e) {
    e.preventDefault();
    var shadow = $(this).css('box-shadow')
    if (shadow != 'rgb(128, 128, 128) 3px 3px 3px 0px')
        $(this).css('box-shadow', 'rgb(128, 128, 128) 3px 3px 3px 0px');
    else
        $(this).css('box-shadow', 'none');
})
