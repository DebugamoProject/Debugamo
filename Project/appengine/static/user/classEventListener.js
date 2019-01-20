
$('.dropdownBar').on('click', function (e) {
    e.preventDefault();
    console.log(this)
    $(this).parent().parent().children('.dropdownContent').slideToggle();
})

$('.up').on('click', function (e) {
    e.preventDefault();
    $(this).parent().parent().children('.dropdownContent').slideToggle();
});

$('.level').click(function (e) {
    e.preventDefault();
    var shadow = $(this).css('box-shadow')
    if (shadow != 'rgb(128, 128, 128) 3px 3px 3px 0px')
        $(this).css('box-shadow', 'rgb(128, 128, 128) 3px 3px 3px 0px');
    else
        $(this).css('box-shadow', 'none');
})

/**
 * The function can run but it seems weird
 */

function addingClassContent(){
    mainContainerHandler();
    var content = document.getElementById('addclass')
    console.log(content.style.display)
    content.style.display = (content.style.display === 'none' ? 'block' : 'none');
}

function editContent() {
    mainContainerHandler();
    var edit = $('#edit')
    if (edit.css('display') === 'block') {
        edit.css('display', 'none')
    } else {
        console.log('none')
        edit.css('display', 'block');
    }
    ReloadUserData();
}

function tasksOverview(){
    mainContainerHandler();
    var tasks = $('#joinTask');
    if(tasks.css('display') === 'none')
        tasks.css('display','block');
    else
        tasks.css('display','none');
}

function mainContainerHandler(){
    var content = document.getElementById('main-container').children;
    console.log('main container handler')
    console.log(content)
    for(var i = 0; i < content.length; i++)
        content[i].style.display = 'none'
}