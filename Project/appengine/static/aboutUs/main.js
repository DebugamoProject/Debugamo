
$('.photo').hover( function(){
    
    var img = $(this).find('img');
    var intro = $(this).find('.introduction')[0];
    Stop(intro);
    fadeIn(img,intro);
    // $(img).fadeOut(700, ()=>{
    //     $(intro).fadeIn(700);
    // });

}, function(){
    console.log('out');
    var img = $(this).find('img');
    var intro = $(this).find('.introduction')[0];
    Stop(intro);
    fadeOut(img,intro);
    // $(intro).fadeOut(700, ()=>{
    //     $(img).fadeIn(700);
    // })
});

var Stop = (intro,img)=>{
    $(intro).stop();
    $(intro).css('display','none');
    $(img).stop();
    $(img).css('opacity','1');
}

var fadeIn = (img, intro)=>{
    $(img).fadeOut(700, ()=>{
        $(intro).fadeIn(700);
    });
}

var fadeOut = (img, intro) => {
    $(intro).fadeOut(700, ()=>{
        $(img).fadeIn(700);
    })
    $(intro).css('display','none');
}