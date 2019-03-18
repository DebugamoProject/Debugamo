
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

$('div.taskTitle').click(function(e){
    e.preventDefault();
    console.log('touch');
    $(this).parent().children('ul').slideToggle();
})

$('.courseItem').on('click',function(e){
    e.preventDefault();
    // console.log('courseItem Click');
    // console.log($('.hint').css('display'));
    if($('.hint').css('display') === 'block'){
        $('.sec').toggle(400);
    }
    taskContentModify(this.id);
})

$('.userTaskItem').on('click',function(e){
    e.preventDefault();

    console.log('usertaskitem click');
    if($('.hint').css('display') === 'block'){
        $('.sec').toggle(400);
    }
    userTaskContentModify(this.id)
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
    $('#userInfo').css('background-color','#0f9ba8');
    var edit = $('#edit')
    if (edit.css('display') === 'block') {
        edit.css('display', 'none')
    } else {
        console.log('none')
        edit.css('display', 'block');
    }
    console.log('editClock');
    ReloadUserData();
}

function tasksOverview(){
    mainContainerHandler();
    $('#missionOverview').css('background-color','#0f9ba8');
    var tasks = $('#joinTask');
    if(tasks.css('display') === 'none')
        tasks.css('display','block');
    else
        tasks.css('display','none');
}

function myTaskShow(){
    mainContainerHandler();
    userCourseData = getUserTaskData();
    $('#missionList').css('background-color','#0f9ba8');
    var tasks = $('#myTask');
    if(tasks.css('display') === 'none')
        tasks.css('display','block');
    else
        tasks.css('display','none');

}

function mainContainerHandler(){
    // console.log($('#headerRight li'));
    var li = $('#headerRight li');
    for(var i = 0; i < li.length; i++){
        $(li[i]).css('background-color','#00adbc');
    }

    // document.getElementById('#headerRight')
    var content = document.getElementById('right').children;
    if(content !== null){
        console.log('main container handler')
        console.log(content)
        for(var i = 0; i < content.length; i++)
            content[i].style.display = 'none'
    }
}