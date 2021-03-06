// create header

var setUp = function (){
    // need to load the langPkg

}

var midSizeInit = function(e){
    var bodySize = document.querySelector('body').getBoundingClientRect().width;
    // console.log(bodySize.width);
    var jumpbotron = document.getElementById('welcome');
    var jumbotronSize = jumpbotron.getBoundingClientRect().width;

    var remainpx = (bodySize - jumbotronSize);
    var welcome = document.getElementById('welcome');
    welcome.style.left = remainpx / 2 + 'px';
    // console.log(bodySize);
    if(bodySize > 1000){
        welcome.style.top = '25%';
    }else{
        document.getElementById('mid').style.height = 500 + 'px';
        welcome.style.top = '';
    }
    
    // console.log(jumbotronSize);
}

var midImageEffect = function(e){
    var midimage = document.getElementById('midimage');
    midimage.style.filter = 'blur(3px)';
    setTimeout(1500,function(){
        var welcome = document.getElementById('welcome');
        // $('#welcome').toggle(true);
        welcome.style.display = '';
    })
    
}

window.addEventListener('resize',function(e){
    midSizeInit(e);
})

var init = function (e){
    midSizeInit(e);
    midImageEffect(e);
    registerFormInit();
    // contentSizeInit(e);
}


var contentSizeInit = function(e){
    var bodySize = document.querySelector('body').getBoundingClientRect().width;
    if(bodySize < 500){
        document.getElementById('about').style.padding = 50 + 'px';
        document.getElementById('content-left').style.borderRight = '0px';

    }else{
        document.getElementById('about').style.padding = 100 + 'px';
        document.getElementById('content-left').style.borderRight = '1px';
    }
}

var mask = function(){
    var component = ['login','register'];
    for(var i = 0; i < component.length; i++){
        document.getElementById(component[i]).className = 'nav-link';
        document.getElementById(component[i] + '-form').style.display = 'none';
        document.getElementById(component[i] + '-button').style.display = 'none';
    }
}

var displayForm = function(e){
    var id = this.id;
    // console.log(this.className)
    mask();
    this.className = 'nav-link active';
    
    document.getElementById(id + '-form').style.display = 'block';
    document.getElementById(id + '-button').style.display = 'block';
}


// add event listener;
var component = ['login','register']
for(var i = 0; i < component.length; i++){
    document.getElementById(component[i]).addEventListener('click',displayForm)
}



window.addEventListener('load',init);



// $('#year').on('change',function(){
//     var year = this.value;
//     var monthHTML = generateMonth();
//     var DateHTML = generateDate(year,1);
//     $('.month').remove();
//     $('.date').remove();
//     $('#inputMonth').append(monthHTML);
//     $('#inputDate').append(DateHTML);
// })

// $('#month').on('change',function(){
//     var year = document.getElementById('year').value
//     var month = this.value;
//     var DateHTML = generateDate(year,month);
//     $('.date').remove();
//     $('#date').append(DateHTML);
// })