
$('#submitClasses').click(function(e){
    e.preventDefault();
    
    let SelectCoures = new Object;
    /*  just debugging course for now  */

    let courses = document.getElementsByClassName('course-item');
    let id = '';
    let checkbox_status, selected_tasks = [];
    for(let i = 0; i < courses.length; i++) {
        id = courses[i].id;
        checkbox_status = document.getElementById(id).checked;
        if(checkbox_status === true) {
            selected_tasks.push(id);
        }
    }

    /*  just adding debugging's tasks  */
    SelectCoures['Debugging'] = selected_tasks;

    // console.log(courses[0].innerHTML);

    // for (var i of courses){
    //     // var selectedClasses = new Array
    //     var levels = $(i).find('.level');
    //     console.log(levels);
    //     for(var j = 0; j < levels.length; j++){
    //         if($(levels[j]).css('box-shadow') != 'none'){
    //             console.log($(levels[j]).find('.gameParent'))
    //             if(! ($(levels[j]).find('.gameParent').text() in SelectCoures)){
    //                 SelectCoures[$(levels[j]).find('.gameParent').text()] = new Array;
    //             }
    //             SelectCoures[$(levels[j]).find('.gameParent').text()].push($(levels[j]).find('.levelNum').text())
    //         }
    //     }
    // }
    // for(var i in SelectCoures){
    //     SelectCoures[i] = new Set(SelectCoures[i])
    // }
    // console.log(SelectCoures)
    // var keys = '';
    // for(var i in SelectCoures){
    //     keys += (i + ',')
    // }

    // for(var i in SelectCoures){
    //     levels = ''
    //     for(var j of SelectCoures[i]){
    //         levels += (j + ',')
    //     }
    //     SelectCoures[i] = levels;
    // }
    
    data = {
        "name" : $('#inputCourseName').val(),
        "description" : $('#inputDescription').val(),
        "levels" : SelectCoures,
    }
    // "mode" : $('#mode').val(),
    
    // for(var i in SelectCoures){
    //     data[i] = SelectCoures[i];
    // }
    
    console.log(data);
    
    addNewClass(data);
    $('#createClassModal').modal('hide');
})

function addNewClass(new_course_data){
    $.ajax({
        type: "POST",
        url: "/class",
        data: new_course_data,
        success: function (response) {
            console.log(response);
        }
    });
}


function getDebuggingItem() {
    let courses_item;
    $.ajax({
        type: "GET",
        url: "/class",
        async: false,
        success: function (response) {
            courses_item = response[0];
        }
    });
    return courses_item;
}

function generateBackendLink() {
    // var user = Cookies.get('user');
    // var link = '/backend/' + user; 
    // $("#information").attr("href", link);
    // $("#course-setting").attr("href", link);

    // let statistic_link = '/backend/' + 'statistic/' + user; 
    // console.log(statistic_link);
    // $("#course-statistic").attr("href", statistic_link);
}

// generate backend link
generateBackendLink();
let course_item = getDebuggingItem();


function addSelectItemOption() {
    // let task_description = ['基本指令', '判斷式, ...];
    let course_item_json = JSON.parse(course_item[1]);
    // console.log(course_item_json);
    let debugging_item = course_item_json['Debugging'];
    let form = ``;
    for(var items of Object.keys(debugging_item)) {
        form = form + '<p>' + items + '</p>';
        for(var single_item of Object.keys(debugging_item[items])) {
            let identity = items + '_' + single_item;
            form = form + '<p>';
            form = form + '<input type="checkbox" name="' + identity + '" id="' + identity + '" style="margin-right: 5px" class="course-item">'
                        + '<label for="' + identity + '">' + debugging_item[items][single_item] + '</label>';
            
            form = form + '</p>'
            // console.log(debugging_item[items][single_item]);
        }
        form = form + '<br />';
    }
    // console.log(form);

    $(".select-course-item").append(form);
}

addSelectItemOption();
