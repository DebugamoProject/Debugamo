var default_rightSide = ` <nav class="nav">
<a class="nav-link active">首頁</a>
<a class="nav-link" >我的迪摩</a>
<a id="log" class="nav-link" href="" >登入</a>
<a class="nav-link disabled" >註冊</a>
<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"></a>
<div class="dropdown-menu">
    <a class="dropdown-item" href="#">Option1</a>
    <a class="dropdown-item" href="#">Option3</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">登出</a>
</div>
</nav>`

var login=`<div style="margin:4px auto;display: inline-block;">
<div style="display:inline-block;width: auto;">
    <input type="text" id="email" placeholder="Email">
    <img id="blockly-input" src="./login.png" alt="">
    <input type="text" id="password" placeholder="Password">
    <div class="login-button" style="display:inline-block;width: 400px">
            <button id="login" type="submit" class="btn btn-primary mb-2">Login</button>
            <!-- <div></div> -->
            <button id="fast-login-fb" type="submit" class="btn btn-primary mb-2">Facebook 登入</button>
            <button id="login-summit-go" type="submit" class="btn btn-primary mb-2" style="background:red">Google+登入</button>
    </div>
</div>
</div>`


var block_xml=`<div id="blocklyDiv" style="height: 600px; width: 600px;margin-top: 50px;border-style: ridge">
<xml id="toolbox" style="display: none">
    <block type="controls_if"></block>
    <block type="controls_repeat_ext"></block>
    <block type="logic_compare"></block>
    <block type="math_number"></block>
    <block type="math_arithmetic"></block>
    <block type="text"></block>
    <block type="text_print"></block>
</xml>
</div>`

var set_xml='<xml>​<block type=​"controls_if" id=​"mwR;​[=8r5Q,+9lv[VVTg" x=​"129" y=​"56">​</block>​<block type=​"controls_repeat_ext" id=​"=qA5sm_fY:​2fwU1/​(WJR" x=​"238" y=​"71">​</block>​<block type=​"controls_repeat_ext" id=​"TQ`L:​7BU@r)​SQquh{oIo" x=​"68" y=​"162">​</block>​<block type=​"logic_compare" id=​"%n^q3F(;​rjG@P0IQ()​eu" x=​"313" y=​"220">​…​</block>​<field name=​"OP">​EQ​</field>​</block>​<block type=​"text" id=​"q[ps;​I=Cv3+o?mQ?+bP[" x=​"193" y=​"252">​…​</block>​<block type=​"math_number" id=​";​7vH6sHzw)​~YMME]​m^?{" x=​"110" y=​"257">​…​</block>​<block type=​"math_arithmetic" id=​"Ye_/​0V(L{L}​u}​YxTPGvh" x=​"121" y=​"327">​…​</block>​<block type=​"text_print" id=​"cO%K:​9Fc+(cxe@lY)​,-_" x=​"263" y=​"363">​</block>​</xml>​'
;
var xml = `<xml>​<block type=​"controls_if" id=​"GF=exg{WM1G,4bk}​{X6)​" x=​"196" y=​"120">​<value name=​"IF0">​<block type=​"logic_compare" id=​":​%nx,5#t-SZig9R]​}​)​m~">​<field name=​"OP">​EQ​</field>​</block>​</value>​<statement name=​"DO0">​<block type=​"text_print" id=​"K+{XvsLQ9i.GSgX5R*G8">​</block>​</statement>​<next>​<block type=​"controls_repeat_ext" id=​",!sFimF0Rz[,AqT^Uu3N">​</block>​</next>​</block>​</xml>​`;

var register = `<img src="./register.png" alt="" style="margin-left:740px;margin-top:50px;">`
$('.rightSide').append(default_rightSide);

$('#log').click(function (e) { 
    e.preventDefault();
    $('.nav').remove();
    $('.rightSide').append(login)
    $("#blockly-block").append(register);
    // $("#blockly-block").append(block_xml);
    // Blockly.Xml.workspaceToDom(workspace);
    // Blockly.Xml.domToWorkspace(xml, workspace);
});

console.log('hello')

var leftSide = `
<div id="title" style="margin:0px auto;">
<a class="nav-link" href="">Debugamo : 幫幫迪摩</a>
</div>`

$('.leftSide').append(leftSide);

$('.blocklyFlyout').remove();

// $('#test').click(function (e) { 
//     e.preventDefault();
//     xml = Blockly.Xml.workspaceToDom(workspace);
//     console.log(xml)
// });


