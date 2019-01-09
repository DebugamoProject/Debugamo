

goog.provide('NewUI')

goog.require('goog.dom');
goog.require('goog.dom.TagName');
goog.require('goog.ui.MenuButton');
goog.require('goog.ui.ContainerRenderer');
goog.require('goog.ui.menuBar');
goog.require('goog.ui.Component');

var newUI = NewUI;

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
        console.log(script);
        head.appendChild(script);
    });
}


// set the rightbar of UI(need i18n!!!)
newUI.rightbar = function(rootNode){
    var MENU = new goog.ui.Container();

    var menubar = goog.ui.menuBar.create();
    var menu_item = {
        'Option' : ['Restart','Help','Clear','Solution','Guide'],
        'Setting' : ['Music']
    }
    var home_btn = new goog.ui.Button('Home');
    home_btn.setId('home_btn');
    MENU.setId('Home');
    MENU.addChild(home_btn,true);
    var menuName = Object.keys(menu_item)
    goog.array.forEach(menuName,function(item){ // item is 'Home','Option'...
        var menu = new goog.ui.Menu();
        console.log(item);
        goog.array.forEach(menu_item[item],function(option){// optine is 'Logout',...
            var option_item = new goog.ui.MenuItem(option)
            option_item.setId(option);
            
            option_item.setDispatchTransitionEvents(goog.ui.Component.State.HOVER,true);
            menu.addItem(option_item);
        })
        
        var btn = new goog.ui.MenuButton(item,menu);
        btn.setId(item);
        console.log(btn.getElement())
        btn.setDispatchTransitionEvents(goog.ui.Component.State.ACTIVE,true);
        menubar.addChild(btn,true);
    })
    try{
        MENU.render(rootNode);
        menubar.render(rootNode);
    }catch(e){
        console.log(e);
        console.log(rootNode)
    }
}


newUI.target = function(){
    var target = new goog.ui.Button();
    // target.setId('target_btn');
    target.createDom();
    var goal_right_box = document.getElementById('player-avatar-box')
    target = target.getElement()
    target.setAttribute('id','target_btn')
    goal_right_box.appendChild(target);
}