/**
 * Erstellt und implementiert die gesamten Einstellungen
 * @author Patrick Schreiber (pschrei@qits.de)
 * @copyright QITS GmbH
 * @version 1.0.4
 */

var requiredSettings;
jQuery.fn.settings = function(options) {
	var title=options.title || getText("settings");
	var saveFunc=options.saveFunc;
	var updateFunc=options.updateFunc;
	var loadFunc=options.loadFunc;
	var schemaTable=options.schemaTable;
	var schemaFunc=options.schemaFunc;
	var themesPath=options.themesPath;
	var extensions=options.extensions || false;
	requiredSettings = options.requiredSettings || false;
	initializeSettings();

	var btnNameAbbrechen = getText("Cancel");
	var btnNameSenden = getText("Send");
	var initdialog_buttons = {};
	initdialog_buttons[btnNameSenden] = function(){
		sendEditMyData(user);
		sendSettingsAllgemein();
		$(this).dialog('close');
	};
	initdialog_buttons[btnNameAbbrechen] = function(){ $(this).dialog('close'); };
	this.click(function(event) {
		var setModal="";
		if(typeof settings["messagesModal"]!="undefined") {
			(settings["messagesModal"]=="modal") ? setModal=true : setModal=false;
		} else {
			setModal=true;
		}
		$('#settings').remove();
		$('#settings').length!=0 ? "" : $("body").append("<div id=\"settings\"></div>");
		$('#settings').dialog({
	        dialogClass: 'insert',
	        autoOpen:false,
	        width: 580,
	        modal: setModal,
	        closeOnEscape: true,
	        buttons: initdialog_buttons
		 });
		 $('.ui-dialog').find('.ui-dialog-titlebar').html(title);
		 $("#settings").html("");
		 $("#settings").append('<div id="setting_tabs">' +
			'<ul>' +
				'<li><a href="#meineDaten">' + getText("myData") + '</a></li>' +
				'<li><a href="#Themes">' + getText("themes") + '</a></li>' +
			'</ul>' +
			'<div id="meineDaten"></div>' +
			'<div id="Themes"></div>' +
		'</div>');
		if(extensions!=false) {
				extensions.call(this);
		}
		$("#setting_tabs").tabs({ selected: 0 });

		$("#meineDaten").append('<div id="settings_meineDaten" class="ui-corner-all ui-widget-content"><div id="settings_showMeineDaten" style="margin: 10px;"></div></div>');
		$("#settings_showMeineDaten").append('<div style="float:left; width:120px;">' + getText("loginname") + '</div><div><input style="margin-bottom:2px; width:200px;" type="text" class="myOwnData ui-widget ui-state-default" id="edit_userUID"></div><div style="clear:both;"></div>');
		$("#settings_showMeineDaten").append('<div style="float:left; width:120px;">' + getText("firstname") + '</div><div><input style="margin-bottom:2px; width:200px;" type="text" class="myOwnData ui-widget ui-state-default" id="edit_userVorname"></div><div style="clear:both;"></div>');
		$("#settings_showMeineDaten").append('<div style="float:left; width:120px;">' + getText("lastname") + '</div><div><input style="margin-bottom:2px; width:200px;" type="text" class="myOwnData ui-widget ui-state-default" id="edit_userNachname"></div><div style="clear:both;"></div>');
		$("#settings_showMeineDaten").append('<div style="float:left; width:120px;">' + getText("email") + '</div><div><input style="margin-bottom:2px; width:200px;" type="text" class="myOwnData ui-widget ui-state-default" id="edit_userEmail"></div><div style="clear:both;"></div>');
		$("#settings_showMeineDaten").append('<div style="float:left; width:120px; margin-top:5px; margin-bottom:10px;">' + getText("password") + '</div><div id="openChangePW"><span class="ui-icon ui-icon-triangle-1-e" style="float:left;"></span> ' + getText("changePW") + '</div><div style="clear:both;"><div id="showChangePW"></div>');
		$("#showChangePW").hide();
		$("#showChangePW").append('<div style="float:left; width:145px; margin-left:15px;">' + getText("oldPW") + '</div><div><input style="margin-bottom:2px; width:200px;" type="password" class="ui-widget ui-state-default" id="oldPW"></div><div style="clear:both;"></div>');
		$("#showChangePW").append('<div style="float:left; width:145px; margin-left:15px;">' + getText("newPW") + '</div><div><input style="margin-bottom:2px; width:200px;" type="password" class="ui-widget ui-state-default" id="newPW"></div><div style="clear:both;"></div>');
		$("#showChangePW").append('<div style="float:left; width:145px; margin-left:15px;">' + getText("newPWwdh") + '</div><div><input style="margin-bottom:2px; width:200px;" type="password" class="ui-widget ui-state-default" id="newPW_wdh"></div><div style="clear:both;"></div>');
		$("#showChangePW").append('<button type="button" id="buttonChangePW" class="buttonChangePW ui-state-error ui-corner-all">' + getText("changePW") + '</button><div style="clear:both;"></div>');
		$("#buttonChangePW").click(function() {
			sendNewPassword(user);
		});
		$("#openChangePW").click(function() {
			if($("#showChangePW").is(":hidden")) {
				$("#showChangePW").slideDown("normal");
				$(this).find("span").removeClass("ui-icon-triangle-1-e");
				$(this).find("span").addClass("ui-icon-triangle-1-s");
				$(this).css("text-decoration","underline");
			} else {
				$("#showChangePW").slideUp("normal");
				$(this).find("span").removeClass("ui-icon-triangle-1-s");
				$(this).find("span").addClass("ui-icon-triangle-1-e");
				$(this).css("text-decoration","none");
			}
		});
		callOptions={
	            'func':"fnSimpleuser.load",
	            'data':"&id=" + user,
	            'success': function(message) {
					if(parse_message(message)) {
		               $("#edit_userUID").val(message[0].content.userUID);
		               $("#edit_userVorname").val(message[0].content.userVorname);
		               $("#edit_userNachname").val(message[0].content.userNachname);
		               $("#edit_userEmail").val(message[0].content.userEmail);
		            }
				}
			};
		callRemote(callOptions);
		$("#meineDaten").append('<div style="clear:both;"></div>');
		$("#Themes").append('<div id="settings_top_div" class="ui-corner-all ui-widget-content"><div id="settings_themes" style="margin: 10px;"></div></div><p>');
		$("#settings_themes").append("<span id=\"popupTheme\"></span>");
		$('#popupTheme').themes({
			themes: ['darkhive','eggplant','excitebike','hotsneaks','humanity','lefrog','mintchoc','qits','start','swankypurse','trontastic','uidarkness','vader']
		});
		$("#settings").dialog("open");
	});
return this;
};

/**
 * Speichert Setting im globalen Array
 * @param key
 * @param value
 * @return void
 */
function setSetting(key, value) {
	settings[key]=value;
}

/**
 * Speichert ein neues Setting
 * @param key
 * @param value
 * @param msg
 * @return void
 */
function sendSetting(key, value, callremotefunction) {
	callRemote({ 'func': callremotefunction,
		 'data' : '&keyname=' + encodeURIComponent(key) + "&val=" + encodeURIComponent(value),
		 'success': function(dataMessage) {
			setSetting(dataMessage[0].content.keyname, dataMessage[0].content.val);
			initializeSettings();
		}
	});
}

/**
 * Speichert ein neue Settings
 * @param key
 * @param value
 * @param msg
 * @return void
 */
function sendSettings(keyValue, callremotefunction, callback) {
	var saveSettings = "";
	var keys = "&keys=";
	var values = "&values=";
	var anz = 0;
	var keysServerStr="";
	var valuesServerStr="";
	$.each(keyValue, function (i,e) {
		keys += encodeURIComponent(i)+",";
		values += encodeURIComponent(e)+",";
		anz++;
	});

	if (anz) { keys=keys.substring(0, keys.length-1);values=values.substring(0, values.length-1); }
	saveSettings = keys + values;

	callRemote({ 'func': callremotefunction,
		 'data' :saveSettings,
		 'success': function(dataMessage) {
			setSetting(dataMessage[0].content.keyname, dataMessage[0].content.val);
			if (callback != false) {
				callback.call(this);
			}
			//initializeSettings();
		}
	});
}

/**
 * Speichert ein neues Session-Setting
 * @param key
 * @param value
 * @return void
 */
function sendSessionSetting(key, value) {
	callRemote({ 'func': 'fnSessionSettings.insert',
		 'data' : '&keyname=' + encodeURIComponent(key) + "&val=" + encodeURIComponent(value),
		 'success': function(dataMessage) { }
	});
}

/**
 * Initialisiert die gesetzten Settings f�r den angemeldeten Benuter
 * @return void
 */
function initializeSettings() {
	callAsyncRemote({ 'func': 'fnSettings.load',
		 'data' : '',
		 'async': false,
		 'success': function(dataMessage) {
			$.each(dataMessage[0].content, function(i, ele) {
				if(typeof ele.keyname !="undefined") {
					if(ele.keyname=="themeURL") {
						$("#futurenetStyle").attr("href", globalEndPoint+ele.val);
					}
					setSetting(ele.keyname, ele.val);
				}
			});
			if (requiredSettings != false) { setRequiredSettings(); };
		 }
	});
}


function setRequiredSettings() {
	var settings2save= new Object();
	$.each(requiredSettings, function (j, elem) {
		if (typeof settings[j] == "undefined") {
			settings2save[j]=elem;
		}
	});

	$.each(settings2save, function (n,m) {
		sendSetting(n, m, "fnSettings.insert");
	});
}

/**
 * Speichert die �nderungen von "Meine Daten"
 * @param mid
 * @return void
 */
function sendEditMyData(mid) {
	var data="";
	var formFields = new Array();
	var i = 0;
	var changePW="";
	var errornous=false;

	$.each($(".myOwnData"), function() {
		var feldId=$(this).attr("id").split("_");
		var feldname=feldId[1];
		data+="&" + feldname+"=" + encodeURIComponent($(this).val());
		i++;
	});
	callRemote({ 'func': 'fnSimpleuser.update',
		 'data' : "&id=" + mid + data + changePW,
		 'success': function(dataMessage) {
			msgBox(getText("changeData"), getText("changeDatasuccess"), "");
		}
	});
}

/**
 * Speichert ein ge�ndertes Benutzerpasswort
 * @param mid
 * @return void
 */
function sendNewPassword(mid) {
	var changePW="";
	var errornous=false;
	if (($("#newPW").val()!=$("#newPW_wdh").val()) && ($("#showChangePW").is(":visible"))) {
		msgBox(getText("editMyData"), getText("errSamePW"), "");
		errornous=true;
	}
	if(!errornous) {
		changePW="&newPW=" + encodeURIComponent($("#newPW").val()) + '&oldPW=' + encodeURIComponent($("#oldPW").val());
		callRemote({ 'func': 'fnSimpleuser.updatePassword',
			 'data' : "&id=" + mid + changePW,
			 'success': function(dataMessage) {
				msgBox(getText("changePW"), getText("changePWsuccess"), "");
			}
		});
	}
}

