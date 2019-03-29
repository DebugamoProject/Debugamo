function getPublicClass(URL) {
    var courses;
    $.ajax({
        type: "GET",
        url: URL,
        async: false,
        success: function (response) {
            console.log('Post successful')
            // console.log(response)
            courses = response;
            // return response
        }
    });
    return courses;
}

var courseProcess = function (URL) {
    var courses = getPublicClass(URL);
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
        levels.className = 'levels dropdownContent';
        levels.style = 'display:none';

        var up = document.createElement('div');
        up.className = 'up';
        $(up).append('<i class="fas fa-angle-up"></i>');
        $(up).append('<div style="border: 1px solid grey"></div>');
        levels.append(up);

        for(var j in i[1]){
            // console.log(Object.keys(i[1]))
            for(var k in i[1][j]){
                
                for(var l in i[1][j][k]){
                    var level = document.createElement('div');
                    level.className = `level`;
                    level.id = `level${k}-${l}`;
                    $(level).append(`<span class="levelNum">${k} - ${l}</span>`);
                    $(level).append(`<span class="levelDiscription" style="margin-left:50px;">${i[1][j][k][l]}</span>`);
                    $(level).append(`<sapn class='gameParent' style="display:none;">${j}</span>`)
                    levels.append(level);
                }
            }
        }
        Class.append(img_info);
        Class.append(levels);
        classes.push(Class);
    }
    return classes
}

// get member

function getCourseMembers(URL) {
    var members;
    $.ajax({
        type: "GET",
        url: URL,
        async: false,
        success: function (response) {
            members = response;
        }
    });
    return members;
}

// add member

function addMemberProcess(URL) {
    var members;
    $.ajax({
        type: "POST",
        url: URL,
        async: false,
        success: function (response) {
            members = response;
        }
    });
    return members;
}