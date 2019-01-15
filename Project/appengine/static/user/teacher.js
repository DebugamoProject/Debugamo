
$('#submitClasses').click(function(e){
    e.preventDefault();
    
    var SelectCoures = new Object;
    var courses = document.getElementsByClassName('class');
    for (var i of courses){
        // var selectedClasses = new Array
        var levels = $(i).find('.level');
        console.log(levels);
        for(var j = 0; j < levels.length; j++){
            if($(levels[j]).css('box-shadow') != 'none'){
                console.log($(levels[j]).find('.gameParent'))
                if(! ($(levels[j]).find('.gameParent').text() in SelectCoures)){
                    SelectCoures[$(levels[j]).find('.gameParent').text()] = new Array;
                }
                SelectCoures[$(levels[j]).find('.gameParent').text()].push($(levels[j]).find('.levelNum').text())
            }
        }
        // SelectCoures[i.id] = selectedClasses;
    }
    for(var i in SelectCoures){
        SelectCoures[i] = new Set(SelectCoures[i])
    }
    console.log(SelectCoures)
    var keys = '';
    for(var i in SelectCoures){
        keys += (i + ',')
    }

    for(var i in SelectCoures){
        levels = ''
        for(var j of SelectCoures[i]){
            levels += (j + ',')
        }
        SelectCoures[i] = levels;
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