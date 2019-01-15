
function openNav(){
    document.getElementById("classSideNav").style.width = "250px";
}

function closeNav(){
    document.getElementById('classSideNav').style.width = "0";
}

$('.course').on('click',function(e){
    var content = $(this).parent().children('.dropdownContent').slideToggle();
    // if(content.css('display') == 'none')
    //     content.css('display','block')
    // else content.css('display','none')
})