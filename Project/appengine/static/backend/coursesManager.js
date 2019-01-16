function getCourse(){
    var url = window.location.href
    console.log(url)
    var courses = courseProcess(url + '/courses');
    courses = coursesSetup(courses);
    var coursesBar = new Array;
    for(var c of courses){
        var classItem = document.createElement('div')
        classItem.className = 'classItem';
        classItem.id = c.id;
        var a = document.createElement('a');
        a.href = 'javascript:void(0)';
        // a.id = c.id;
        a.className = 'course';
        a.innerText = c.id;
        $(classItem).append(a);
        $(classItem).append(`<div class="dropdownContent">
        <a href="javascript:void(0)" class='courseManage'>課程管理</a>
        <a href="javascript:void(0)" class='memberManage'>成員管理</a>
    </div>`);
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
    console.log(objCourses)
    return objCourses
}

function getMembers() {
    
}

var courses = getCourse();
// var courses = new Object;

$('.courseManage').on('click',function(){
    $('#task').children('div').remove();
    $('#task').append(courses[$(this).parent().parent().attr('id')]);
    $(this).parent().slideToggle();
})

$('.course').on('click',function(e){
    var content = $(this).parent().children('.dropdownContent').slideToggle();

})

$('.memberManage').on('click',function(e){
    $('#task').children('div').remove();
    $(this).parent().slideToggle();
})