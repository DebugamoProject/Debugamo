
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

$('div.taskTitle').click(function (e) {
    e.preventDefault();
    console.log('touch');
    $(this).parent().children('ul').slideToggle();
})

$('.courseItem').on('click', function (e) {
    e.preventDefault();
    // console.log('courseItem Click');
    // console.log($('.hint').css('display'));
    if ($('.hint').css('display') === 'block') {
        $('.sec').toggle(400);
    }
    taskContentModify(this.id);
})

$('.userTaskItem').on('click', function (e) {
    e.preventDefault();

    console.log('usertaskitem click');
    if ($('.hint').css('display') === 'block') {
        $('.sec').toggle(400);
    }
    userTaskContentModify(this.id)
})

$('#add-class-trigger').on('click', function (e) {
    e.preventDefault();
    $(".course-data").empty();
    form = `<div id="add-title">
        <span style="font-size: 40px;">新增任務</span>
        <div style="border: 1px solid lightgrey"></div>
        </div>
        <div id="name" class='item'>
        <label for="className">任務名稱</label>
        <input type="text" id="inputName">
        </div>
        <!-- <div id="number" class='item'>
        <label for="classNumber">任務代碼</label>
        <input type="text" id="inputNumber">
        </div> -->
        <div id="private" class="item">
        <label for="classPrivate">私人任務</label>
        <select name="mode-selector" id="mode">
            <option selected>選擇任務型態</option>
            <option value="1">公開</option>
            <option value="0">保護</option>
            <option value="-1">私人</option>
        </select>
        <!-- <label for="yes">是</label> -->
        <!-- <button id="yes" value="true">是</button> -->
        <!-- <input type="checkbox" name="privateYes" id="yesBox"> -->
        <!-- <label for="yes">否</label> -->
        <!-- <button id="no" value="false">否</button> -->
        <!-- <input type="checkbox" name="privateNo" id="noBox"> -->
        </div>
        <div id="discription" class="">
        <p>任務描述</p>
        <textarea name="taskDiscription" id="inputDiscription" cols="100" rows="10"></textarea>
        </div>
        <div id="inherit">
        <label>加入任務</label>
        <div id="publicClass">
        </div>
        <button id="submitClasses">送出</button>
        </div>
        </div>`;
    $("#add-class").append(form);
})

/**
 * The function can run but it seems weird
 */

function addingClassContent() {
    mainContainerHandler();
    var content = document.getElementById('addclass')
    console.log(content.style.display)
    content.style.display = (content.style.display === 'none' ? 'block' : 'none');
}

function editContent() {
    mainContainerHandler();
    $('#userInfo').css('background-color', '#0f9ba8');
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

function tasksOverview() {
    mainContainerHandler();
    $('#missionOverview').css('background-color', '#0f9ba8');
    var tasks = $('#joinTask');
    if (tasks.css('display') === 'none')
        tasks.css('display', 'block');
    else
        tasks.css('display', 'none');
}

function myTaskShow() {
    mainContainerHandler();
    userCourseData = getUserTaskData();
    $('#missionList').css('background-color', '#0f9ba8');
    var tasks = $('#myTask');
    if (tasks.css('display') === 'none')
        tasks.css('display', 'block');
    else
        tasks.css('display', 'none');

}

function mainContainerHandler() {
    // console.log($('#headerRight li'));
    var li = $('#headerRight li');
    for (var i = 0; i < li.length; i++) {
        $(li[i]).css('background-color', '#00adbc');
    }

    // document.getElementById('#headerRight')
    var content = document.getElementById('right').children;
    if (content !== null) {
        console.log('main container handler')
        console.log(content)
        for (var i = 0; i < content.length; i++)
            content[i].style.display = 'none'
    }
}