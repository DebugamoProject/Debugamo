// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace BlocklyGames.soy.
 */

goog.provide('BlocklyGames.soy');

goog.require('soy');
goog.require('soydata');


BlocklyGames.soy.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="Games_name">Debugamo</span><span id="Games_puzzle">\u62FC\u5716</span><span id="Games_maze">\u8FF7\u5BAE</span><span id="Games_bird">\u9CE5</span><span id="Games_turtle">\u70CF\u9F9C</span><span id="Games_movie">\u5F71\u7247</span><span id="Games_pondTutor">\u6C60\u5858\u5C0E\u5E2B</span><span id="Games_pond">\u6C60\u5858</span><span id="Games_genetics">\u907A\u50B3</span><span id="Games_linesOfCode1">\u60A8\u50C5\u4F7F\u7528\u4E00\u884C JavaScript \u901A\u904E\u9019\u95DC\uFF1A</span><span id="Games_linesOfCode2">\u60A8\u4F7F\u7528 %1 \u884C JavaScript \u901A\u904E\u9019\u95DC\uFF1A</span><span id="Games_showCode">\u50CF\u662F\u7F8E\u570B \u54C8\u4F5B \u548C \u67CF\u514B\u840A \u9019\u6A23\u7684\u9802\u5C16\u5927\u5B78\u4E5F\u90FD\u5728\u6559\u5B78\u9019\u7A2E\u7A4D\u6728\u5F0F\uFF08block-based\uFF09\u7684\u7A0B\u5F0F\u3002\u4E0D\u904E\u842C\u8B8A\u4E0D\u96E2\u5176\u5B97\uFF0C\u4F60\u7D44\u5408\u7684\u6BCF\u500B\u7A4D\u6728\uFF0C\u90FD\u53EF\u4EE5\u7528\u4EE5\u4E0B JavaScript\uFF08\u4E16\u754C\u6700\u5EE3\u6CDB\u4F7F\u7528\u7684\u7A0B\u5F0F\u8A9E\u8A00\u4E4B\u4E00\uFF09\u7A0B\u5F0F\u78BC\u4F86\u8868\u793A\uFF1A</span><span id="Games_nextLevel">\u6E96\u5099\u597D\u95D6\u7B2C %1 \u95DC\u4E86\u55CE\uFF1F(\u7B49\u5F85\u6309\u9215 5 \u79D2)</span><span id="Games_finalLevel">\u606D\u559C\u5B8C\u6210\u6240\u6709\u95DC\u5361\uFF01</span><span id="Games_linkTooltip">\u5132\u5B58\u7A4D\u6728\u7D44\u4E26\u63D0\u4F9B\u9023\u7D50\u3002</span><span id="Games_runTooltip">\u57F7\u884C\u60A8\u5BEB\u7684\u7A0B\u5F0F\u3002</span><span id="Games_runProgram">\u904B\u884C</span><span id="Games_resetTooltip">\u505C\u6B62\u7A0B\u5F0F\u4E26\u91CD\u65B0\u958B\u59CB\u95DC\u5361\u3002</span><span id="Games_resetProgram">\u91CD\u7F6E</span><span id="Games_help">\u8AAA\u660E</span><span id="Games_dialogOk">\u78BA\u5B9A</span><span id="Games_dialogCancel">\u53D6\u6D88</span><span id="Games_catLogic">\u908F\u8F2F</span><span id="Games_catLoops">\u8FF4\u5708</span><span id="Games_catMath">\u6578\u5B78\u5F0F</span><span id="Games_catText">\u6587\u5B57</span><span id="Games_catLists">\u6E05\u55AE</span><span id="Games_catColour">\u984F\u8272</span><span id="Games_catVariables">\u8B8A\u91CF</span><span id="Games_catProcedures">\u51FD\u6578</span><span id="Games_httpRequestError">\u547D\u4EE4\u51FA\u73FE\u932F\u8AA4\u3002</span><span id="Games_linkAlert">\u900F\u904E\u6B64\u9023\u7D50\u5206\u4EAB\u60A8\u7684\u7A4D\u6728\u7D44\uFF1A\n\n%1</span><span id="Games_hashError">\u5C0D\u4E0D\u8D77\uFF0C\u300C%1\u300D\u4E26\u672A\u5C0D\u61C9\u4EFB\u4F55\u5DF2\u4FDD\u5B58\u7684\u7A0B\u5F0F\u3002</span><span id="Games_xmlError">\u672A\u80FD\u8F09\u5165\u60A8\u4FDD\u5B58\u7684\u6A94\u6848\u3002\u6216\u8A31\u5B83\u662F\u7531\u5176\u4ED6\u7248\u672C\u7684Blockly\u5275\u5EFA\uFF1F</span><span id="Games_listVariable">\u6E05\u55AE</span><span id="Games_textVariable">\u6587\u5B57</span><span id="Games_breakLink">\u4E00\u65E6\u60A8\u958B\u59CB\u7DE8\u8F2FJavaScript\uFF0C\u60A8\u4E0D\u80FD\u8FD4\u56DE\u7DE8\u8F2F\u7A4D\u6728\u3002OK\u55CE\uFF1F</span><span id="Games_blocks">\u7A4D\u6728</div></div>';
};
if (goog.DEBUG) {
  BlocklyGames.soy.messages.soyTemplateName = 'BlocklyGames.soy.messages';
}


BlocklyGames.soy.titleSpan = function(opt_data, opt_ignored, opt_ijData) {
  return '<span id="title">' + ((opt_ijData.html) ? '<a href="index.html?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '">' : '<a href="./?lang=' + soy.$$escapeHtml(opt_ijData.lang) + '">') + 'Debugamo</a> : ' + soy.$$escapeHtml(opt_data.appName) + '</span>';
};
if (goog.DEBUG) {
  BlocklyGames.soy.titleSpan.soyTemplateName = 'BlocklyGames.soy.titleSpan';
}


BlocklyGames.soy.levelLinks = function(opt_data, opt_ignored, opt_ijData) {
  var output = ' &nbsp; ';
  var iLimit175 = opt_data.maxLevel + 1;
  for (var i175 = 1; i175 < iLimit175; i175++) {
    output += ' ' + ((i175 == opt_data.level) ? '<div class="level_number level_in_progress" id="level' + soy.$$escapeHtml(i175) + '"><span>' + soy.$$escapeHtml(i175) + '</span></div>' : (i175 == opt_data.maxLevel) ? '<a class="level_number" id="level' + soy.$$escapeHtml(i175) + '" href="?lang=' + soy.$$escapeHtml(opt_data.lang) + '&level=' + soy.$$escapeHtml(i175) + soy.$$escapeHtml(opt_data.suffix) + '"><span>' + soy.$$escapeHtml(i175) + '</span></a>' : '<a class="level_dot" id="level' + soy.$$escapeHtml(i175) + '" href="?lang=' + soy.$$escapeHtml(opt_data.lang) + '&level=' + soy.$$escapeHtml(i175) + soy.$$escapeHtml(opt_data.suffix) + '"></a>');
  }
  return output;
};
if (goog.DEBUG) {
  BlocklyGames.soy.levelLinks.soyTemplateName = 'BlocklyGames.soy.levelLinks';
}


BlocklyGames.soy.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};
if (goog.DEBUG) {
  BlocklyGames.soy.dialog.soyTemplateName = 'BlocklyGames.soy.dialog';
}


BlocklyGames.soy.doneDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogDone" class="dialogHiddenContent"><div id="congratHeader" style="font-size: large; margin: 1em;">\u606D\u559C\uFF01</div><div id="dialogLinesText" style="font-size: large; margin: 1em;"></div><pre id="containerCode"></pre><div id="dialogDoneText" style="font-size: large; margin: 1em;"></div><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0"><button id="doneCancel">\u53D6\u6D88</button><button id="doneOk" class="secondary" style="margin-left: 10px;">\u78BA\u5B9A</button></div></div>';
};
if (goog.DEBUG) {
  BlocklyGames.soy.doneDialog.soyTemplateName = 'BlocklyGames.soy.doneDialog';
}


BlocklyGames.soy.dialogShowCode = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogShowCode" class="dialogHiddenContent"><div id="dialogShowCodeLinesText"></div><pre id="containerShowCode"></pre>' + BlocklyGames.soy.ok(null, null, opt_ijData) + '</div>';
};
if (goog.DEBUG) {
  BlocklyGames.soy.dialogShowCode.soyTemplateName = 'BlocklyGames.soy.dialogShowCode';
}


BlocklyGames.soy.dialogRestoreCode = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogRestoreCode" class="dialogHiddenContent"><div id="dialogRestoreCodeLinesText"><i uk-icon="icon: warning; ratio: 3;" style="margin-right: 13px;"></i>\u4F60\u78BA\u5B9A\u8981\u56DE\u5FA9\u5230\u6700\u521D\u7684\u7A0B\u5F0F\u7A4D\u6728\u55CE\uFF1F\u6CE8\u610F\u4F60\u7121\u6CD5\u5FA9\u539F\u9019\u500B\u52D5\u4F5C\u3002</div><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0"><button id="restoreCancel">\u53D6\u6D88</button><button id="restoreOk" class="secondary" style="margin-left: 10px;">\u78BA\u5B9A</button></div></div>';
};
if (goog.DEBUG) {
  BlocklyGames.soy.dialogRestoreCode.soyTemplateName = 'BlocklyGames.soy.dialogRestoreCode';
}


BlocklyGames.soy.dialogRestartGame = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogRestartGame" class="dialogHiddenContent"><div id="dialogRestartGameLinesText"><i uk-icon="icon: warning; ratio: 3;" style="margin-right: 13px;"></i>\u4F60\u78BA\u5B9A\u8981\u6E05\u9664\u9032\u5EA6\u55CE\uFF1F\u6CE8\u610F\u9019\u500B\u52D5\u4F5C\u4E0D\u53EF\u56DE\u5FA9\u4E26\u6703\u56DE\u5230\u7B2C\u4E00\u95DC\u3002</div><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0"><button id="restartLogin">\u56DE\u767B\u5165\u9801\u9762</button><button id="restartLevelOne" class="secondary" style="margin-left: 10px;">\u56DE\u7B2C\u4E00\u95DC</button></div></div>';
};
if (goog.DEBUG) {
  BlocklyGames.soy.dialogRestartGame.soyTemplateName = 'BlocklyGames.soy.dialogRestartGame';
}


BlocklyGames.soy.dialogSubmitAnswer = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogSubmitAnswer" class="dialogHiddenContent"><div id="dialogSubmitAnswerLinesText"><i uk-icon="icon: push; ratio: 3;" style="margin-right: 13px;"></i>\u4F60\u78BA\u5B9A\u9019\u662F\u932F\u8AA4\u7684\u7A4D\u6728\u55CE\uFF1F\u4F60\u9084\u6709<span id="numOfChanceToAnswer"></span>\u6B21\u6A5F\u6703</div><div id="dialogDoneButtons" class="farSide" style="padding: 1ex 3ex 0"><button id="submitCancel">\u53D6\u6D88</button><button id="submitOk" class="secondary" style="margin-left: 10px;">\u78BA\u5B9A</button></div></div>';
};
if (goog.DEBUG) {
  BlocklyGames.soy.dialogSubmitAnswer.soyTemplateName = 'BlocklyGames.soy.dialogSubmitAnswer';
}


BlocklyGames.soy.abortDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogAbort" class="dialogHiddenContent">\u6B64\u95DC\u5361\u975E\u5E38\u56F0\u96E3\u3002\u60A8\u662F\u5426\u8981\u8DF3\u904E\u4E26\u9032\u5165\u4E0B\u4E00\u95DC\uFF1F\u60A8\u96A8\u6642\u53EF\u4EE5\u8FD4\u56DE\u9019\u95DC\u3002<div id="dialogAbortButtons" class="farSide" style="padding: 1ex 3ex 0"><button id="abortCancel">\u53D6\u6D88</button><button id="abortOk" class="secondary">\u78BA\u5B9A</button></div></div>';
};
if (goog.DEBUG) {
  BlocklyGames.soy.abortDialog.soyTemplateName = 'BlocklyGames.soy.abortDialog';
}


BlocklyGames.soy.storageDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogStorage" class="dialogHiddenContent"><div id="containerStorage"></div>' + BlocklyGames.soy.ok(null, null, opt_ijData) + '</div>';
};
if (goog.DEBUG) {
  BlocklyGames.soy.storageDialog.soyTemplateName = 'BlocklyGames.soy.storageDialog';
}


BlocklyGames.soy.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1em 3ex 0"><button class="secondary" style="background-color: #ffa400; border: 1px solid #ffa400" onclick="BlocklyDialogs.hideDialog(true)">\u78BA\u5B9A</button></div>';
};
if (goog.DEBUG) {
  BlocklyGames.soy.ok.soyTemplateName = 'BlocklyGames.soy.ok';
}


BlocklyGames.soy.startGame = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 0 3ex"><button class="primary" id="startGameBtn" onclick="Debugging.startGame();" disabled>\u9078\u64C7\u982D\u50CF\u958B\u59CB\u4EFB\u52D9</button><a style="display:block;" href="https://github.com/DebugamoProject/Debugamo" target="_blank"><img style="width: 50px;" src="debugging/public/img/github.png"></img></a></div>';
};
if (goog.DEBUG) {
  BlocklyGames.soy.startGame.soyTemplateName = 'BlocklyGames.soy.startGame';
}
