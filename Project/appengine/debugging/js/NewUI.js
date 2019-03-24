

goog.provide('NewUI')

goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.ui.MenuButton');
goog.require('goog.ui.ContainerRenderer');
goog.require('goog.ui.menuBar');
goog.require('goog.ui.Component');
goog.require('BlocklyGames');

var newUI = NewUI;

newUI.init = function(){
    newUI.css();
    newUI.rightbar();
    newUI.target();
}

newUI.levelBar = function(){
    
}


// append css file at the end of head element
newUI.css = function(){
    var css_url = '/third-party/goog/css'
    var css = [
        // '/button.css',
        '/menu.css',
        '/menubar.css',
        '/menubutton.css',
        '/menuitem.css',
        '/menuseparator.css'
    ]
    var head = document.head;
    goog.array.forEach(css,function(css_data){
        var script = goog.dom.createDom(goog.dom.TagName.LINK,{'rel':'stylesheet','href':css_url + css_data});
        // console.log(script);
        head.appendChild(script);
    });
}


// set the rightbar of UI(need i18n!!!)
newUI.rightbar = function(){
    // bootstrap is better than google closure library.
    $('#rightBar').append(
        '<nav class="navbar navbar-expand-lg navbar-light">\
        <div class="collapse navbar-collapse" id="navbarSupportedContent">\
          <ul class="navbar-nav mr-auto">\
            <li class="nav-item active">\
              <a class="nav-link" id="home_btn" href="/user" style="color:white">Home <span class="sr-only">(current)</span></a>\
            </li>\
            <li class="nav-item dropdown">\
              <a class="nav-link dropdown-toggle" href="#" id="Option" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color:white">\
                遊戲選項\
              </a>\
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">\
                <a class="dropdown-item" href="javascript:void(0);" id="Restart">重新開始</a>\
                <a class="dropdown-item" href="javascript:void(0);" id="Help">幫助</a>\
                <a class="dropdown-item" href="javascript:void(0);" id="Clear">清除</a>\
                <a class="dropdown-item" href="javascript:void(0);" id="Guide">導覽</a>\
                <div class="dropdown-divider"></div>\
                <a class="dropdown-item" href="javascript:void(0);">問題回報</a>\
              </div>\
            </li>\
            <li class="nav-item dropdown">\
              <a class="nav-link dropdown-toggle" href="javascript:void(0);" id="Setting" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="color:white">\
                遊戲設定\
              </a>\
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">\
                <a class="dropdown-item" id="Music" href="javascript:void(0);">音樂</a>\
              </div>\
            </li>\
          </ul>\
        </div>\
      </nav>'
    )


    // so fucking google closure library! fuck!
    // var MENU = new goog.ui.Container();

    // var menubar = goog.ui.menuBar.create();
    // var menu_item = {
    //     '選項' : ['衝新開始','幫助','清除','解答','導覽'],
    //     '設定' : ['音樂']
    // }
    // var home_btn = new goog.ui.Button('回家');
    // home_btn.setId('home_btn');
    // MENU.setId('Home');
    // MENU.addChild(home_btn,true);
    // var menuName = Object.keys(menu_item)
    // goog.array.forEach(menuName,function(item){ // item is 'Home','Option'...
    //     var menu = new goog.ui.Menu();
    //     console.log(item);
    //     goog.array.forEach(menu_item[item],function(option){// optine is 'Logout',...
    //         var option_item = new goog.ui.MenuItem(option)
    //         option_item.setId(option);
            
    //         option_item.setDispatchTransitionEvents(goog.ui.Component.State.HOVER,true);
    //         menu.addItem(option_item);
    //     })
        
    //     var btn = new goog.ui.MenuButton(item,menu);
    //     btn.setId(item);
    //     console.log(btn.getElement())
    //     btn.setDispatchTransitionEvents(goog.ui.Component.State.ACTIVE,true);
    //     menubar.addChild(btn,true);
    // })
    // try{
    //     MENU.render(rootNode);
    //     menubar.render(rootNode);
    // }catch(e){
    //     console.log(e);
    //     console.log(rootNode)
    // }
}


newUI.target = function(){
    // var target = new goog.ui.Button();
    // target.createDom();
    var target = document.createElement('div');
    target.id = 'target_btn';
    target.innerHTML = '<span uk-icon="icon: bell; ratio: 2"></span>'
    var goal_right_box = document.getElementById('player-avatar-box')
    // target = target.getElement()
    // target.setAttribute('id','target_btn')
    goal_right_box.appendChild(target);
}

/**
 * edit the level wrapper's url
 */
newUI.levelWrapper = function(){
    var selectedLevel = JSON.parse(localStorage.selectedLevel);
    var id = 'level';
    for(var i = 0; i < selectedLevel.length; i++){
        var dotId = id + selectedLevel[i];
        var dot = document.getElementById(dotId);
        console.log(dot)
        //&user=321&task=Debugging&mode=backTrack
        dot.href += '&user=' + BlocklyGames.USER + '&task=' + BlocklyGames.TASK + '&mode=' + BlocklyGames.MODE;
    }
}