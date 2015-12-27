/**
 * 
 * @author Patrick Schönfeld (pschoen@qits.de)
 * @class futureScript API Klasse
 * @copyright QITS GmbH
 * @version 1.0.0
 * TODO: API.futureNet Funktionen überführen
 * 
 * Dependencies
 * 		jQuery > 1.7.1
 * 		fS.settings (wegen dialog modal setting)
 * 		getText Funktion aus API.futureNet.js
 */



//Werte bzw. Standard Konstruktor
var Utils = function() {

}

Utils.prototype.isLoaded = false;

Utils.prototype.test = function() {
    alert(this.isLoaded);
};

//untested
Utils.prototype.msgBox = function(title, content) {
    $('#messages').dialog({
        autoOpen: false,
        buttons: {
            "OK": function() {
                $(this).dialog('close');
            }
        }
    });
    $('#messages').dialog("close");
    $('#ui-dialog-title-messages').html(title);
    $('#messages').html(content);
    $('#messages').dialog("open");
}

Utils.prototype.newArrayIndex = function(array, fieldName) {
	if (array != null) {
		var newArr = [];
		$.each(array, function(i, elem) {
			newArr[parseInt(elem[fieldName])] = elem;
		});
		return newArr;
	} 
	return "";
};

//Untested
Utils.prototype.arrayToString = function(array, zep) {
    var returnString = "";
    $.each(array, function(i, elem) {

    });
};

Utils.prototype.arrayToURLString = function(array) {
    var returnString = "";
    $.each(array, function(i, elem) {
        returnString += "&" + i + "=" + elem + "";
    });
    //return encodeURI(returnString);
    return returnString;
};

//"gmap" is an instance of the google map

//creating the class to exntend the google map OverlayView class
function MapLocationIcon(id, lat, lng, title, icon_class) {
    this.lat = lat;
    this.lng = lng;
    this.title = title; //eg. A,B,C.D
    this.icon_class = icon_class; //the position of the spritesheet for the icon background
    this.pos = new google.maps.LatLng(lat, lng);
}

//attributes -> {'htmlattribut':'Response Feldname'}
Utils.prototype.injectCatalogue = function(jQuerySelectElem, visibleAttribute, attributes, options) {
    var callRemoteData = "";
    var html = "";
    if (options.clear) {
        html += "<option value=''></option>";
    }
    if (options.data) {
        callRemoteData = options.data;
    } else {
        callRemoteData = {};
    }
    var data = utils.CallRemote(options.func, callRemoteData, {'async': false});

    $.each(data[0].content, function(i, elem) {
        html += "<option ";
        $.each(attributes, function(htmlattri, responseName) {
            html += htmlattri + "='" + elem[responseName] + "'";
        });
          if (options.getText) {
             html+=">"+getText(elem[visibleAttribute])+"</option>";
         } else {
             html+=">"+elem[visibleAttribute]+"</option>";
         }
    });
    jQuerySelectElem.append(html);
    if (options.callback) {
        options.callback.call(this);
    }
}

Utils.prototype.CallRemote = function(functionName, data, options) {
    var oAsync = true;
    if (typeof(options.async) != "undefined") {
        oAsync = options.async;
    }
    var data = utils.arrayToURLString(data);
    if (oAsync == true) { //Asynchroner Aufruf, übergibt die Daten an eine SuccessCallback Function
        jQuery.ajax({
            url: urlpath + "service.php",
			type: REQTYPE,
			data : "function=" + appName + "." + functionName + "&format=json&skey=" + key + "&nlID=" + globalNL + data + "&lang=" + currLang,
            success: function(result) {
                message = result;
                if (parse_message(message)) {
                    if (options.success) {
                        options.success(message);
                    }
                    if (options.done) {
                        options.done(message);
                    }
                } else {
                    if (options.fail) {
                        options.fail(message);
                    }
                    if (options.done) {
                        options.done(message);
                    }
                }
            },
            error: function(data) {
                if (options.done) {
                    options.done(message);
                }
                utils.hidePreloader();
                msgBox("Fehler", "Es ist ein unerwarteter Fehler bei der Kommunikation mit dem Server aufgetreten.");
            },
            async: oAsync,
            dataType: "json"
        });
    } else { //Synchroner Aufruf, liefert den geparsten JSON String zurück
        var syncRet = jQuery.ajax({
            url: urlpath + "service.php",
			data: "function=" + appName + "." + functionName + "&format=json&skey=" + key + "&nlID=" + globalNL + data,
            type: REQTYPE,
			success: function(result) {
                message = result;
                if (parse_message(message)) {
                    if (options.success) {
                        options.success(message);
                    }
                } else {
                    if (options.fail) {
                        options.fail(message);
                    }
                }
            },
            error: function(data) {
                utils.serverCommunicationError();
            },
            async: oAsync,
            dataType: "json"
        }).responseText;
        return $.parseJSON(syncRet);
    }
};

Utils.prototype.serverCommunicationError = function() {
    msgBox("Fehler", "Es ist ein unerwarteter Fehler bei der Kommunikation mit dem Server aufgetreten.");
}

Utils.prototype.showPreloader = function(text,id) {
	var internalID="";
	if (typeof(id) != "undefined") {
		internalID = id;
	}
    if ($("#generalPreloaderUtil"+internalID).length != 0) { //Found element and clear

    } else {
        $("body").append("<div id='generalPreloaderUtil"+internalID+"' class='generalPreloaderUtil'><div id='generalPreloaderInnerUtil"+internalID+"' class='generalPreloaderInnerUtil'></div></div>");
    }
    $("#generalPreloaderUtil"+internalID).css("left", (screen.availWidth - 16 - 300) / 2);
    $("#generalPreloaderUtil"+internalID).css("top", (screen.availHeight - 200) / 2);

    $("#generalPreloaderInnerUtil"+internalID).html("<div style='float:left; position:relative;top:2px;'><img src=\"IMAGES/ajax-loader_grey.gif\" style=\"margin-right:10px;height:20px;width:20px;\"/></div>" +
            "<div class='preloadertext'>" + text + "</div>");
    $("#generalPreloaderUtil"+internalID).show();
};

Utils.prototype.resizeDialog = function(jQueryElem, str_width) {
    if (jQueryElem.width() <= str_width) {
        jQueryElem.animate({
            width: str_width
        }, 1500);
    }
}

//Initialisieren eines neuen jQuery Dialogs
Utils.prototype.dialog = function(id, dialogOptions, buttons) {
    var setModal = "";
    var btnNameCancel = getText("Cancel");
    var initdialog_buttons = {};
    initdialog_buttons[btnNameCancel] = function() {
        $(this).dialog('close');
    };
    var defaultOptions = {autoOpen: false, width: 400, buttons: initdialog_buttons};

    //get user settings
    if (typeof settings["messagesModal"] != "undefined") {
        if (settings.messagesModal == "modal") {
            setModal = false;
        } else {
            setModal = true;
        }
    } else {
        setModal = true;
    }
    defaultOptions.modal = setModal;

    //override default Options
    $.each(dialogOptions, function(i, elem) {
        defaultOptions[i] = elem;
    });

    //overwrite default Buttons
    if (typeof buttons != "undefined") {
        var userButtons = {};
        $.each(buttons, function(i, elem) {
            var tmpButtonName = getText(i);
            userButtons[tmpButtonName] = elem;
        });
        //always show cancel button
        //userButtons[btnNameCancel]=function(){ $(this).dialog('close'); };
        defaultOptions.buttons = userButtons;
    }

    //Init Dialog DIV
    $("#" + id).remove();
    $("#" + id).length != 0 ? "" : $("body").append("<div id='" + id + "'></div>");
    $('#' + id).dialog(defaultOptions);
};

Utils.prototype.datePicker = function(jQueryElem, default_date) {
    jQueryElem.datepicker({dateFormat: getLang('dd.mm.yy')});

    if (typeof(default_date) != "undefined" && default_date == true) {
        jQueryElem.datepicker('setDate', new Date());
    }

    jQueryElem.datepicker('option', 'dayNamesMin', [getText('So'), getText('Mo'), getText('Di'), getText('Mi'), getText('Do'), getText('Fr'), getText('Sa')]);
    jQueryElem.datepicker('option', 'monthNames', [getText("january"), getText("february"), getText("march"), getText("april"), getText("may"), getText("june"), getText("july"), getText("august"), getText("september"), getText("october"), getText("november"), getText("december")]);
	
}

Utils.prototype.dateTimePicker = function(jQueryElem, callback, default_date) {
	jQueryElem.datetimepicker({
		dateFormat: getLang('dd.mm.yy'),
		addSliderAccess: true,
		sliderAccessArgs: { touchonly: false },
		timeText: getText('timepicker_timetext'),
		hourText: getText('timepicker_hourtext'),
		minuteText: getText('timepicker_minutetext'),
		secondText: getText('timepicker_secondtext'),
		onSelect: function (selectedDateTime){
			callback.call(selectedDateTime, selectedDateTime);
		}
	});
	
    if (typeof(default_date) != "undefined" && default_date == true) {
        jQueryElem.datepicker('setDate', new Date());
    }

    jQueryElem.datetimepicker('option', 'dayNamesMin', [getText('So'), getText('Mo'), getText('Di'), getText('Mi'), getText('Do'), getText('Fr'), getText('Sa')]);
    jQueryElem.datetimepicker('option', 'monthNames', [getText("january"), getText("february"), getText("march"), getText("april"), getText("may"), getText("june"), getText("july"), getText("august"), getText("september"), getText("october"), getText("november"), getText("december")]);
}


//Liefert immer das date im Format yyyy-mm-dd zurück
Utils.prototype.convertDate = function(datestring) {
    if (datestring == "undefined") {
        return "";
    }
    if (datestring != "" && datestring != "0000-00-00" && datestring != "0000-00-00 00:00:00") {
        if (getLang('dd.mm.yy') == "dd.mm.yy") {
            var tmpDate = datestring.split(".");
            datestring = tmpDate[2] + "-" + tmpDate[1] + "-" + tmpDate[0];
        }
    }
    return datestring;
}

Utils.prototype.hidePreloader = function(id) {
	var internalID="";
	if (typeof(id) != "undefined") {
		internalID = id;
	}
    $("#generalPreloaderUtil"+internalID).fadeOut("normal");
};

//Globales Objekt bereitstellen
var utils = new Utils();