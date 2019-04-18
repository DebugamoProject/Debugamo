function getCourse(){
    var url = window.location.href
    console.log(url)
    var courses = courseProcess(url + '/courses');
    courses = coursesSetup(courses);
    var coursesBar = new Array;
    let is_first = true;
    for(var c of courses){
        var classItem = document.createElement('li')
        classItem.className = 'classItem list-group-item courseManage memberManage';
        if(is_first) {
            classItem.className = classItem.className + ' list-group-item-primary';
            is_first = false;
        }
        classItem.id = c.id;
        classItem.style = 'cursor: pointer';
        var a = document.createElement('nav');
        a.className = 'course';
        a.innerText = c.id;
        $(classItem).append(a);
    //     $(classItem).append(`<div class="dropdownContent">
    //     <a href="javascript:void(0)" class='courseManage'>課程管理</a>
    //     <a href="javascript:void(0)" class='memberManage'>成員管理</a>
    // </div>`);
        coursesBar.push(classItem);
    }
    var courseBar = document.getElementById('courses');
    // courseBar.append()
    for(var classes of coursesBar){
        courseBar.append(classes)
    }
    
    var objCourses = new Object;
    for(var c of courses){
        objCourses[c.id] = c;
        $(objCourses[c.id]).find('.dropdownBar').attr('onclick',"$(this).parent().parent().children('.levels').slideToggle();");
        $(objCourses[c.id]).find('.up').attr('onclick',"$(this).parent().slideToggle();");
    }
    // console.log(objCourses)
    return objCourses
}

function getMembers(id) {
    var url = window.location.href;
    var members = getCourseMembers(url + '/members' + '/' + id);
    return members;
}

var courses = getCourse();
// var courses = new Object;

$('.course').on('click',function(e){
    // var content = $(this).parent().children('.dropdownContent').slideToggle();

})

$(document).on('click', '.courseManage', function(){
    // remove all left pannel highlight
    $(".courseManage").removeClass('list-group-item-primary');

    if($('.task-list').length === 0) {
        let course_setting = `
            <div class="col-4" style="margin-top:20px">
                <div class="card-header text-center">學生列表</div>
                <ul class="list-group student-list course-data text-center"></ul>
            </div>
            <div class="col-4" style="margin-top: 20px">
                <div class="card-header text-center">關卡列表</div>
                <div class="text-center task-list course-data"></div>
            </div>`;
        $("#statistic-selected").remove();
        $("#side-selector .row").first().append(course_setting_html);
    }
    console.log('in course');
    console.log(courses);
    $('.task-list').children('div').remove();
    $('.task-list').append(courses[$(this)[0].id]);
    // $(this).parent().slideToggle();

    // highlight the left pannel course that is selected
    $('#courses #' + $(this)[0].id).addClass('list-group-item-primary');
})


$(document).on('click', '.memberManage', function(e){
    // $("#statistic-selected").remove();
    // $(this).parent().slideToggle();
    $('.student-list').empty();
    // setting current course attribute
    var id = $(this)[0].id;
    console.log(id);
    var members =  getMembers(id);
    console.log(members);
    // add members to list
    let item = '';
    for(var i = 0; i < members.length; i++) {
        item = '<li class="member_item list-group-item">' + members[i] + '</li>';
        $('.student-list').append(item);
    }
})

$('.new_member').on('click', function() {
    $('.methods .input_group').remove();
    var form = `
    <div class="input_group">
    <form name="input_form" method="post" >
    <input type="text" value="" id="input_member" onchange="getInputValue()">
    <span id="submit_member">Submit</sapn>
    </form>
    </div>
    `
    $('.methods').append(form);
})


$(document).on('click', '#submit_member', (function(){
    var url = window.location.href;
    var course_id = $('.current_course').attr('current_course');
 
    // var name = getInputValue();
    var name = getInputValue();
    url = url + '/add/' + course_id + '/' + name;
    console.log(url);
    var isAdded = addMemberProcess(url);
    console.log(isAdded);
    if(isAdded) {
        var item = '';
        item = '<li class="member_item">' + name + '</li>';
        $('.member').append(item);
    }
    else {
        console.log('not found');
    }
}))

function getInputValue() {
    var nameValue = document.forms["input_form"]["input_member"].value;
    return nameValue;
}


function initContent() {
    // class id for student
    $('#course_id_display').append('afefwe');

    let id = $('.memberManage.list-group-item-primary')[0].id
    // task-list
    $('.task-list').append(courses[id]);
    
    
    // student-list
    var members =  getMembers(id);
    // add members to list
    let item = '';
    for(var i = 0; i < members.length; i++) {
        item = '<li class="member_item list-group-item">' + members[i] + '</li>';
        $('.student-list').append(item);
    }
}

initContent();