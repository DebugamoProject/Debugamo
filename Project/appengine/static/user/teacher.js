
$('#submitClasses').click(function(e){
    e.preventDefault();
    
    var SelectCoures = new Object;
    var courses = document.getElementsByClassName('class');
    for (var i of courses){
        var selectedClasses = ''
        var levels = $(i).find('.level');
        console.log(levels);
        for(var j = 0; j < levels.length; j++){
            if($(levels[j]).css('box-shadow') != 'none'){
                selectedClasses += $(levels[j]).find('.levelNum').text() + ',';
            }
        }
        SelectCoures[i.id] = selectedClasses;
    }
    var keys = '';
    for(var i in SelectCoures){
        keys += (i + ',')
    }
    
    data = {
        "name" : $('#inputName').val(),
        "mode" : $('#mode').val(),
        "description" : $('#inputDiscription').val(),
        "games" : keys,
    }

    for(var i in SelectCoures){
        data[i] = SelectCoures[i];
    }
    
    console.log(data);
    
    addNewClass(data);
})

function addNewClass(SelectCoures){
    $.ajax({
        type: "POST",
        url: "/class",
        data: SelectCoures,
        success: function (response) {
            console.log(response);
        }
    });
}