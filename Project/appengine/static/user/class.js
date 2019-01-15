function getPublicClass() {
    var courses;
    $.ajax({
        type: "GET",
        url: "/class",
        async: false,
        success: function (response) {
            console.log('Post successful')
            console.log(response)
            courses = response;
            // return response
        }
    });
    return courses;
}

var init = function () {
    var courses = courseProcess()
    coursesSetup(courses);
}

var courseProcess = function () {
    var courses = getPublicClass();
    // console.log(course)
    for (var i of courses) {
        i[1] = JSON.parse(i[1])
        // console.log(i)
    }
    return courses;
}

var coursesSetup = function (courses) {
    var classes = new Array();

    for (var i of courses) {
        var Class = document.createElement('div');
        Class.className = 'class';
        Class.id = i[0];
        var img_info = document.createElement('div')
        img_info.className = 'img-info'
        img_info.style = 'background-color:white;height:200px;border-radius:5px;border:1px solid black';
        var classImg = document.createElement('div')
        classImg.className = 'classImg';
        img_info.append(classImg);
        var classInfo = document.createElement('div');
        classInfo.className = 'classInfo';
        classInfo.innerHTML = (`
    <div class="className">
      <label for="name">名稱 : </label>
      <span>${i[0]}</span>
    </div>
    <div class="classDeveloper">
        <label for="developer">創作者 : </label>
        <span>${i[2]}</span>
    </div>
    <div class="classDiscription">
      <label for="discription">描述 : </label>
      <span>${i[3]}</span>
    </div>`)
        img_info.append(classInfo);
        var divider = document.createElement('div')
        divider.style = 'border: 1px solid grey';
        var dropdownicon = document.createElement('div');
        dropdownicon.className = 'dropdownBar';
        dropdownicon.innerHTML = '<i class="fas fa-angle-down"></i>';
        img_info.append(divider);
        img_info.append(dropdownicon);

        var levels = document.createElement('div');
        levels.className = 'levels';
        levels.style = 'display:none';

        var up = document.createElement('div');
        up.className = 'up';
        $(up).append('<i class="fas fa-angle-up"></i>');
        $(up).append('<div style="border: 1px solid grey"></div>');
        levels.append(up);
        for(var j in i[1]){
            for(var k in i[1][j]){
                // console.log(k);
                for(var l in i[1][j][k]){
                    var level = document.createElement('div');
                    level.className = 'level';
                    level.id = `level${k}-${l}`;
                    $(level).append(`<span class="levelNum">${k} - ${l}</span>`);
                    $(level).append(`<span class="levelDiscription">${i[1][j][k][l]}</span>`);
                    levels.append(level);
                }
            }
        }
        Class.append(img_info);
        Class.append(levels);
        classes.push(Class);
    }
    var test = document.getElementById('publicClass');
    for(var i of classes){
        test.append(i);
    }
    
}

init();



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

