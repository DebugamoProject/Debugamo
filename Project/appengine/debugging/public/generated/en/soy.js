// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Debugging.soy.
 */

goog.provide('Debugging.soy');

goog.require('soy');
goog.require('soydata');
goog.require('BlocklyGames.soy');


Debugging.soy.start = function(opt_data, opt_ignored, opt_ijData) {
  return '' + Debugging.soy.messages(null, null, opt_ijData) + Debugging.soy.header(null, null, opt_ijData) + '<div id="debugamo-container"><div id="debugamo-left-container"><div id="debugamo-world-container">' + Debugging.soy.canvasArea(null, null, opt_ijData) + Debugging.soy.gameButtons(null, null, opt_ijData) + '</div>' + Debugging.soy.missionGoalArea(null, null, opt_ijData) + '</div><div id="debugamo-right-container">' + Debugging.soy.missionGuide(null, null, opt_ijData) + Debugging.soy.codeEditor(null, null, opt_ijData) + '</div></div>' + BlocklyGames.soy.dialog(null, null, opt_ijData) + BlocklyGames.soy.doneDialog(null, null, opt_ijData) + BlocklyGames.soy.dialogShowCode(null, null, opt_ijData) + BlocklyGames.soy.dialogRestoreCode(null, null, opt_ijData) + BlocklyGames.soy.dialogRestartGame(null, null, opt_ijData) + BlocklyGames.soy.dialogSubmitAnswer(null, null, opt_ijData) + BlocklyGames.soy.abortDialog(null, null, opt_ijData) + BlocklyGames.soy.storageDialog(null, null, opt_ijData) + Debugging.soy.dialogHiddenContent(null, null, opt_ijData);
};
if (goog.DEBUG) {
  Debugging.soy.start.soyTemplateName = 'Debugging.soy.start';
}


Debugging.soy.dialogHiddenContent = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="help" class="dialogHiddenContent"><div style="padding-bottom: 0.7ex">' + ((opt_ijData.level == 1 || opt_ijData.level == 2) ? 'Make sure you use the variable "num_of_drink" correctly.' : (opt_ijData.level == 3 || opt_ijData.level == 4) ? 'This target needs to be hit many times. Use a \'while (true)\' loop to do something indefinitely.' + ((opt_ijData.level == 3) ? '<br><br><img src="pond/docs/whiletrue.png" height=90 width=164>' : (opt_ijData.level == 4) ? '<pre>while (true) {\n  ...\n}</pre>' : '') : (opt_ijData.level == 5 || opt_ijData.level == 6) ? 'This opponent moves back and forth, making it hard to hit. The \'scan\' expression returns the exact range to the opponent in the specified direction.' + ((opt_ijData.level == 5) ? '<br><br><img src="pond/docs/scan.png" height=36 width=134><br><br>' : (opt_ijData.level == 6) ? '<pre>scan(0)</pre>' : '') + 'This range is exactly what the \'cannon\' command needs to fire accurately.' : (opt_ijData.level == 7 || opt_ijData.level == 8) ? 'This opponent is too far away to use the cannon (which has a limit of 70 meters). Instead, use the \'swim\' command to start swimming towards the opponent and crash into it.' + ((opt_ijData.level == 7) ? '<br><br><img src="pond/docs/swim.png" height=41 width=131>' : (opt_ijData.level == 8) ? '<pre>swim(0);</pre>' : '') : (opt_ijData.level == 9) ? 'This opponent is also too far away to use the cannon. But you are too weak to survive a collision. Swim towards the opponent while your horizontal location is less than than 50. Then \'stop\' and use the cannon.' + ((opt_ijData.level == 9) ? '<br><br><img src="pond/docs/loc_x_50.png" height=37 width=191><br><br><img src="pond/docs/stop.png" height=30 width=63>' : (opt_ijData.level == 10) ? '<pre>getX() &lt; 50</pre><pre>stop();</pre>' : '') : (opt_ijData.level == 10) ? 'This opponent will move away when it is hit. Swim towards it if it is out of range (70 meters).' : '') + '</div>' + BlocklyGames.soy.ok(null, null, opt_ijData) + '</div><div id="begin" class="dialogHiddenContent"><div id="begin-box"><p>Welcome to the world of DebugaMo! Your mission is to help robot DemO to save animals or people in the building<br><br>A earthquake happened recently, fortunately with the help of national disaster warning message, most people get out of the dangereous building on time. While in a almost-collapsed building, there still are some animals and people waiting for rescue. Your job, from the safety of mission control, is to <span style="font-weight: 600;">communicate with DemO</span> to clean up the stones, and ultimately rescue all the living beings inside the building.<br><br>Unfortunately, there was an accident while transporting DemO to the disaster site and his logic chip is malfunctioning. It is up to you to figure out how to help DemO by<span style="font-weight: 600;"> fixing its logic chip,</span> and complete the mission!<br><div id="newPlayerForm"><form class="uk-text-center">\u8F38\u5165\u73A9\u5BB6\u8CC7\u8A0A\uFF1A<select class="uk-select uk-form-width-small uk-margin-small-right" id="playerSchool"><option value="" selected disabled hidden>\u5B78\u6821</option><option value="YH">\u53F0\u5357\u701B\u6D77\u4E2D\u5B78</option><option value="FG">\u6843\u5712\u5BCC\u5CA1\u570B\u4E2D</option><option value="WJ">\u53F0\u5317\u7121\u754C\u4E2D\u5B78</option><option value="NJ">\u53F0\u5317\u5357\u6A5F\u5834\u9B54\u8C46\u5B78\u9662</option><option value="PL">\u5357\u6295\u57D4\u91CC\u570B\u4E2D</option><option value="AN">anonymous</option></select><select class="uk-select uk-form-width-xsmall uk-margin-small-right" id="playerGrade"><option value="" selected disabled hidden>\u5E7E\u5E74</option><option value="7">7\u5E74</option><option value="8">8\u5E74</option><option value="9">9\u5E74</option><option value="0">anonymous</option></select><select class="uk-select uk-form-width-xsmall uk-margin-small-right" id="playerClass"><option value="" selected disabled hidden>\u5E7E\u73ED</option><option value="1">1\u73ED</option><option value="2">2\u73ED</option><option value="3">3\u73ED</option><option value="4">4\u73ED</option><option value="5">5\u73ED</option><option value="6">6\u73ED</option><option value="7">7\u73ED</option><option value="8">8\u73ED</option><option value="9">9\u73ED</option><option value="10">10\u73ED</option><option value="0">anonymous</option></select><div class="uk-display-inline"><input class="uk-input uk-margin-small-right" style="width: 60px;" type="text" placeholder="\u5EA7\u865F" id="playerNumber"></div><div class="uk-display-inline"><input class="uk-input uk-form-width-small" type="text" placeholder="\u59D3\u540D" id="playerName"></div></form></div></div>' + BlocklyGames.soy.startGame(null, null, opt_ijData) + '</div><div id="developing" class="dialogHiddenContent"><div id="begin-box"><img class="showCodeRobot" src="debugging/public/img/robot.happy.png"></img>\u5927\u6210\u529F\uFF5E\u611F\u8B1D\u60A8\u7684\u904A\u73A9\u8207\u53C3\u8207\uFF5E\u8FEA\u6469\u56E0\u70BA\u6709\u4F60\u7684\u5E6B\u52A9\u624D\u80FD\u5B8C\u6210\u9019\u6B21\u63F4\u6551\u4EFB\u52D9\uFF0C\u5C07\u5EFA\u7269\u4E2D\u6240\u6709\u5C0F\u52D5\u7269\u8207\u4EBA\u985E\u90FD\u6551\u51FA\u3002<br><br><span style="display: none;"><br></span><br>\u611F\u8B1D\u60A8\u7684\u53C3\u8207\u8207\u904A\u73A9\u3002<br><br><br><br><button class="secondary" onclick="BlocklyDialogs.hideDialog(true)">\u56DE\u5230\u904A\u6232</button></div></div><div id="current_xml" style="position:absolute;left:-1000px;top:-1000px"></div>';
};
if (goog.DEBUG) {
  Debugging.soy.dialogHiddenContent.soyTemplateName = 'Debugging.soy.dialogHiddenContent';
}


Debugging.soy.messages = function(opt_data, opt_ignored, opt_ijData) {
  return BlocklyGames.soy.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Debugging_hello">Hello master~ I\'m robot DemO. :D</span><span id="Debugging_when_run">when run</span><span id="Debugging_msg_levelFailed1">Level Failed...</span><span id="Debugging_msg_levelFailed2">Oops...</span><span id="Debugging_msg_levelFailed3">Something\'s wrong...</span><span id="Debugging_msg_noGoal">DemO doesn\'t reach the position of goal.</span><span id="Debugging_msg_noCloseEnough">DemO is not close enough to the target position.</span><span id="Debugging_msg_noGoalKitten">DemO doesn\'t put kitten on the right place.</span><span id="Debugging_msg_noGoalKittens">DemO doesn\'t put one of the kittens on the right place.</span><span id="Debugging_msg_noGoalDog">DemO doesn\'t put dog on the right place.</span><span id="Debugging_msg_noGoalDogs">DemO doesn\'t put one of the dogs on the right place.</span><span id="Debugging_msg_noGoalPuppy">DemO doesn\'t puppy on the right place.</span><span id="Debugging_msg_noGoalPuppys">DemO doesn\'t one of the puppies on the right place.</span><span id="Debugging_msg_noGoalRock">DemO doesn\'t put rock to the right place.</span><span id="Debugging_msg_noGoalPiglet">DemO doesn\'t put piglet on the right place.</span><span id="Debugging_msg_noGoalBird">DemO doesn\'t put bird on the right place.</span><span id="Debugging_msg_noGoalBirds">DemO doesn\'t put one of the birds on the right place.</span><span id="Debugging_msg_noGoalRocks">DemO doesn\'t put all the rocks to the right place.</span><span id="Debugging_msg_noGoalHuman">DemO doesn\'t put the patient to the right place.</span><span id="Debugging_msg_noGoalWrongVariable">The goal variable doesn\'t set correctly.</span><span id="Debugging_msg_noGoalrobotDidntSayGoalSentence">DemO didn\'t said the sentence in the goal.</span><span id="Debugging_msg_noGoalInfection">DemO doesn\'t put the infected animals at the right place.</span><span id="Debugging_msg_noGoalThereIsStillRock">DemO doesn\'t remove all the rocks.</span><span id="Debugging_msg_errTooManySteps">You create a loop that never end...check the termination condition of your loop.</span><span id="Debugging_msg_errListNotExist">The list you try to get does not exist yet! Check your spelling of the list.(missing \'s\'?)</span><span id="Debugging_msg_errGrabNoSuchThing">There is no such a thing to Grab in this level.</span><span id="Debugging_msg_errGrabUndefined">Did you specify what you wanna grab?</span><span id="Debugging_msg_errGrabWrongPosition">DemO can only grab a thing at DemO\'s position :(</span><span id="Debugging_msg_errGrabDontKnowWhichToGrab">DemO doesn\'t know which thing to Grab.</span><span id="Debugging_msg_errGrabAlreadyGrabbed">DemO already grabbed the thing. Check code if you wanna grab something else?</span><span id="Debugging_msg_errDropNoSuchThing">There is no such a thing to Drop in this level.</span><span id="Debugging_msg_errDropHaventGrabYet">DemO haven\'t grab it yet.</span><span id="Debugging_msg_errDropDontKnowWhichToDrop">DemO doesn\'t know which thing to Drop.</span><span id="Debugging_msg_errGotoNoSuchThing">There is no such a thing to Goto in this level.</span><span id="Debugging_msg_errGotoDontKnowWhichToGoto">DemO doesn\'t know which thing to Goto.</span><span id="Debugging_msg_errGotoCannotGotoMultipleThingsAtOnce">DemO cannot goto multiple things at one time.</span><span id="Debugging_msg_errGotoEmptyList">DemO doesn\'t know where to go... the list is empty.</span><span id="Debugging_msg_errGotoCannotGotoAList">DemO doesn\'t know where to go.</span><span id="Debugging_msg_errSayTextNotDefined">The variable in the DemO_Say block is not defined yet.</span></div>';
};
if (goog.DEBUG) {
  Debugging.soy.messages.soyTemplateName = 'Debugging.soy.messages';
}


Debugging.soy.header = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="header"><div class="leftSide">' + BlocklyGames.soy.titleSpan({appName: 'Debugging Mission'}, null, opt_ijData) + '<div class="levelWraper">' + BlocklyGames.soy.levelLinks({level: opt_ijData.level, maxLevel: opt_ijData.maxLevel, lang: opt_ijData.lang, suffix: ''}, null, opt_ijData) + '</div></div><div class="rightSide" id=\'rightBar\'></div></div>';
};
if (goog.DEBUG) {
  Debugging.soy.header.soyTemplateName = 'Debugging.soy.header';
}


Debugging.soy.canvasArea = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="canvas-container"><table id="grid-table"><tbody><tr><td></td><td><div class="position-numbers" id="column-numbers" style="height:12px;"></div></td></tr><tr><td style="vertical-align: top; padding: 0; margin: 0; font-size:0;"><div class="position-numbers" id="row-numbers" style="width:12px;"></div></td><td style="vertical-align: top; padding: 0; margin: 0; font-size:0;"><canvas id="playground" width="800" height="800"></td></tr></tbody></table></canvas></div>';
};
if (goog.DEBUG) {
  Debugging.soy.canvasArea.soyTemplateName = 'Debugging.soy.canvasArea';
}


Debugging.soy.gameButtons = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="game-buttons"><button id="runButton" class="primary" title="Makes the robot do what the blocks say."><span>&#9658; Run</span></button><button id="resetButton" class="warning" title="Undo what the robot has done."><span>&#8634; Reset</span></button><div class="switch-container"><img src="debugging/public/img/turtle.png"></img><img src="debugging/public/img/rabbit.png"></img><label class="switch"><input type="checkbox" id="speedMode"><span class="slider round" onclick="Game.speedModeChange()"></span></label></div><button id="stepButton" class="primary" title="Makes the robot do what one blocks say."><span>Step</span></button></div>';
};
if (goog.DEBUG) {
  Debugging.soy.gameButtons.soyTemplateName = 'Debugging.soy.gameButtons';
}


Debugging.soy.missionGoalArea = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="mission-goal-container"><div id="mission-goal-box"><div id="player-avatar-box"><img id="player-avatar"></img></div><svg id="goal-arrow" height="30" width="30"><polyline points="25,25 5,25 25,5" stroke-dasharray="3,3" style="stroke: white; stroke-width: 1; fill: white;"></polyline></svg><div id="goal-right-box"><p id="goalHeader">Got it, DemO, our mission is:</p><p id="evaluationOptionHeader">Ok DemO, I think the answer is:</p><ul class="uk-list uk-list-striped" id="goal-list"></ul></div></div></div>';
};
if (goog.DEBUG) {
  Debugging.soy.missionGoalArea.soyTemplateName = 'Debugging.soy.missionGoalArea';
}


Debugging.soy.missionGuide = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="mission-guide-container"><div id="mission-guide-box"><div id="robot-guide-icon"><img src="debugging/public/img/robot.default.png"></img></div><svg id="guide-arrow" height="30" width="30"><polyline points="25,25 5,25 25,5" stroke-dasharray="3,3" style="stroke: white; stroke-width: 1; fill: white;"></polyline></svg><div id="guide-inner-box"><p></p></div><div id="mission-guide-button"><button id="guidePreviousButton" title="Show previous guide text"><i uk-icon="icon: chevron-up"></i><span>prev</span></button><button id="guideNextButton" title="Show next guide text"><i uk-icon="icon: chevron-down"></i><span>next</span></button></div></div></div>';
};
if (goog.DEBUG) {
  Debugging.soy.missionGuide.soyTemplateName = 'Debugging.soy.missionGuide';
}


Debugging.soy.codeEditor = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="debugamo-code-editor-container"><div id="codeModeHeaders"><div id="toolbox-header">Blocks</div><div id="workspace-header"><div id="workspace-header-span">Debug Workspace</div><div id="showCodeHeader" class="right-side"><i uk-icon="icon: code; ratio: 0.7" style="position:relative;bottom:1px;right:2px;"></i>Show Code</div><div id="restoreBlockHeader" class="right-side"><i uk-icon="icon: refresh; ratio: 0.7" style="position:relative;bottom:1px;right:2px;"></i>Original Blocks</div></div></div><div id="debugamo-code-editor">' + Debugging.soy.toolbox(null, null, opt_ijData) + '<div id="blockly"></div></div></div>';
};
if (goog.DEBUG) {
  Debugging.soy.codeEditor.soyTemplateName = 'Debugging.soy.codeEditor';
}


Debugging.soy.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="all-blocks" style="display: none;"><category id="Debugamo" name="Debugamo" colour="90"><block type="When_Run" id="When_Run"></block><block type="Move_Robot" id="Move_Robot"></block><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="variables_get"><field name="VAR">kitten</field></block></value></block><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="variables_get"><field name="VAR">kitten</field></block></value></block><block type="Robot_Drop" id="Robot_Drop"><value name="DROP_NAME"><block type="variables_get"><field name="VAR">kitten</field></block></value></block><block type="Robot_Say" id="Robot_Say"><value name="SAY_TEXT"><shadow type="text"><field name="TEXT">\u8AAA\u4E9B\u4EC0\u9EBC\u5462\uFF1F</field></shadow></value></block><block type="Check_Infection" id="Check_Infection"></block><block type="Check_Infection_Before" id="Check_Infection_Before"></block><block type="Robot_Remove_Rock" id="Robot_Remove_Rock"></block><block type="Robot_Remove_Glass" id="Robot_Remove_Glass"></block><block type="There_Is_Rock" id="There_Is_Rock"></block><block type="There_Is_Glass" id="There_Is_Glass"></block><block type="variables_set" id="variables_set"></block><block type="variables_get" id="variables_get"></block><block type="lists_getIndex" id="lists_getIndex"><value name="VALUE"><block type="variables_get"><field name="VAR">list</field></block></value></block><block type="lists_getIndexSimple" id="lists_getIndexSimple"><value name="VALUE"><block type="variables_get"><field name="VAR">list</field></block></value></block><block type="lists_split_simple", id="lists_split_simple"><value name="LIST_TEXT"><shadow type="text_list"><field name="TEXT">"cat", "dog"</field></shadow></value></block><block type="controls_repeat_ext" id="controls_repeat_ext"><value name="TIMES"><block type="math_number"><field name="NUM">10</field></block></value></block><block type="text" id="text"></block><block type="text_list" id="text_list"></block><block type="text_join" id="text_join"></block><block type="controls_if" id="controls_if"></block><block type="controls_whileUntil" id="controls_whileUntil"></block><block type="logic_compare" id="logic_compare"></block><block type="logic_boolean" id="logic_boolean"></block><block type="math_number" id="math_number"></block></category><category id="Logic" colour="210" name="Logic"><block type="controls_if" id="controls_if"></block><block type="logic_compare" id="logic_compare"></block><block type="logic_operation"></block><block type="logic_negate"></block><block type="logic_boolean" id="logic_boolean"></block><block type="logic_null"></block><block type="logic_ternary"></block></category><category id="Loops" colour="120" name="Loops"><block type="controls_repeat_ext" id="controls_repeat_ext"><value name="TIMES"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block><block type="controls_whileUntil" id="controls_whileUntil"></block><block type="controls_for"><value name="FROM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="TO"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="BY"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block><block type="controls_forEach"></block><block type="controls_flow_statements"></block></category><category id="Math" colour="230" name="Math"><block type="math_number"></block><block type="math_arithmetic"><value name="A"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block><block type="math_single"><value name="NUM"><shadow type="math_number"><field name="NUM">9</field></shadow></value></block><block type="math_trig"><value name="NUM"><shadow type="math_number"><field name="NUM">45</field></shadow></value></block><block type="math_constant"></block><block type="math_number_property"><value name="NUMBER_TO_CHECK"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block><block type="math_change"><value name="DELTA"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block><block type="math_round"><value name="NUM"><shadow type="math_number"><field name="NUM">3.1</field></shadow></value></block><block type="math_on_list"></block><block type="math_modulo"><value name="DIVIDEND"><shadow type="math_number"><field name="NUM">64</field></shadow></value><value name="DIVISOR"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block><block type="math_constrain"><value name="VALUE"><shadow type="math_number"><field name="NUM">50</field></shadow></value><value name="LOW"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="HIGH"><shadow type="math_number"><field name="NUM">100</field></shadow></value></block><block type="math_random_int"><value name="FROM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="TO"><shadow type="math_number"><field name="NUM">100</field></shadow></value></block><block type="math_random_float"></block></category><category id="Text" colour="160" name="Text"><block type="text" id="text"></block><block type="text_join" id="text_join"></block><block type="text_append"><value name="TEXT"><shadow type="text"></shadow></value></block><block type="text_length"><value name="VALUE"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block><block type="text_isEmpty"><value name="VALUE"><shadow type="text"><field name="TEXT"></field></shadow></value></block><block type="text_indexOf"><value name="VALUE"><block type="variables_get"><field name="VAR">text</field></block></value><value name="FIND"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block><block type="text_charAt"><value name="VALUE"><block type="variables_get"><field name="VAR">text</field></block></value></block><block type="text_getSubstring"><value name="STRING"><block type="variables_get"><field name="VAR">text</field></block></value></block><block type="text_changeCase"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block><block type="text_trim"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block><block type="text_print"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block><block type="text_prompt_ext"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block></category><category id="Lists" colour="260" name="Lists"><block type="lists_create_with"><mutation items="0"></mutation></block><block type="lists_create_with"></block><block type="lists_repeat"><value name="NUM"><shadow type="math_number"><field name="NUM">5</field></shadow></value></block><block type="lists_length"></block><block type="lists_isEmpty"></block><block type="lists_indexOf"><value name="VALUE"><block type="variables_get"><field name="VAR">list</field></block></value></block><block type="lists_getIndex" id="lists_getIndex"><value name="VALUE"><block type="variables_get"><field name="VAR">list</field></block></value></block><block type="lists_getIndexSimple" id="lists_getIndexSimple"><value name="VALUE"><block type="variables_get"><field name="VAR">list</field></block></value></block><block type="lists_setIndex"><value name="LIST"><block type="variables_get"><field name="VAR">list</field></block></value></block><block type="lists_getSublist"><value name="LIST"><block type="variables_get"><field name="VAR">list</field></block></value></block><block type="lists_split"><value name="DELIM"><shadow type="text"><field name="TEXT">,</field></shadow></value></block><block type="lists_split_simple" id="lists_split_simple"><value name="LIST_TEXT"><shadow type="text_list"><field name="TEXT">"cat", "dog"</field></shadow></value></block><block type="lists_sort"></block></category><category id="Colour" colour="20" name="Color"><block type="colour_picker"></block><block type="colour_random"></block><block type="colour_rgb"><value name="RED"><shadow type="math_number"><field name="NUM">100</field></shadow></value><value name="GREEN"><shadow type="math_number"><field name="NUM">50</field></shadow></value><value name="BLUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block><block type="colour_blend"><value name="COLOUR1"><shadow type="colour_picker"><field name="COLOUR">#ff0000</field></shadow></value><value name="COLOUR2"><shadow type="colour_picker"><field name="COLOUR">#3333ff</field></shadow></value><value name="RATIO"><shadow type="math_number"><field name="NUM">0.5</field></shadow></value></block></category><sep></sep><category id="Variables" colour="330" custom="VARIABLE" name="Variables"></category><category id="Functions" colour="290" custom="PROCEDURE" name="Functions"></category></xml><xml id="toolbox" style="display: none;"></xml>';
};
if (goog.DEBUG) {
  Debugging.soy.toolbox.soyTemplateName = 'Debugging.soy.toolbox';
}
