/**
 * futureScript-API
 * @author Patrick Schreiber (pschrei@qits.de) / Patrick Sch�nfeld (pschoen@qits.de)
 * @copyright QITS GmbH
 * @version 1.0.5
 */

var Datum = new Date();
var Jahr = Datum.getFullYear();
var Tag = Datum.getDate();
var Monat = Datum.getMonth()+1;
var Stunde = Datum.getHours();
var Minute = Datum.getMinutes();
var Sekunde = Datum.getSeconds();
var zeit = Stunde+":"+Minute+":"+Sekunde;
var datum = Jahr+"-"+Monat+"-"+Tag;

/**
 * �ffnet eine Verbindung zum Server und liefert die Daten als JSON zur�ck.
 * @param options JSON String func=Funktionsname data=zus�tztliche Parameter, success=function zum aufruf bei Erfolg, fail = function zum aufruf bei fail.
 * @return void
 */
function callRemote(options) {	  
  var addParams=options.data || "";
  var fieldParams="";
  if(typeof(options.fields)!="undefined") {
	  $.each(options.fields, function(i,elem) {
		 fieldParams+="&" + i + "=" + encodeURIComponent(elem); 
	  });
	  addParams=fieldParams;
  }
  var func="spot." + options.func;  
  $.ajax({	        
    dataType: "json",
    type: REQTYPE,
    url: serviceEndPoint + "service.php",
    data:'function=' + func + '&format=json' + getParams(options,1) + addParams,
    success: function(data, textStatus, jqXHR){
	    message=data;
		if(parse_message(message)) {
		  if(options.success) options.success(message);
		  hideLoading();
		} else {
		  if(options.fail) options.fail(message);
		  hideLoading();
		}     
     }, 
     error: function(jqXHR,textStatus, errorThrown) {
    	 if(options.fail) options.fail(message);
		  hideLoading();

     }
  });
}



/**
 * �ffnet eine nicht asynchrone Verbindung zum Server und liefert die Daten als JSON zur�ck.
 * @param options
 * @return void
 */
function callAsyncRemote(options) {
  var url=urlpath + "service.php";
  var cont_act=appName + "." + options.func || "time2.void";
  var addParams=options.data || "";
  $.ajax({
        async: false,
        dataType: "json",
        url: url,
        data: "function=" + cont_act + addParams + getParams({},1) + "&format=json",
		type: REQTYPE,
        success: function(data){
      message=data;
        if(parse_message(message)) {
          if(options.success) options.success(message);
          hideLoading();
        } else {
          if(options.fail) options.fail(message);
          hideLoading();
        }
     }
      });
}
/**
 * L�scht den gesamt Cache unwiederruflich
 * @return void
 */
function flushCache() {
  cache = {};
}
/**
 * F�gt einen neuen Wert f�r den Katalog-Cache hinzu
 * @param cat
 * @param data
 * @return text
 */
function addCatCache(cat,data) {
  catCache.data[cat]=data;
}
/**
 * Entfernt einen bestimmten Wert aus dem Katalog-Cache
 * @param cat
 * @return void
 */
function removeCatCache(cat) {
  catCache.data[cat]={};
}
/**
 * L�scht den gesamten Katalog unwiederruflich
 * @return void
 */
function flushCatCache(){
  catCache = {};
  catCache.data = {};
  catCache.length = 0;
}
/**
 * Gibt einen benutzerdefinierten Wert zur�ck
 * @param text
 * @return string
 */
function getLang(text) {
  return text;
}
/**
 * Interpretiert einen Fehlercode aus der JSON-Message
 * @param message
 * @return boolean
 */
function parse_message(message) {

}
/**
 * Pr�ft ein Datum auf das korrekte Format (YYYY-MM-DD)
 * @param date
 * @return string || integer
 */
function checkDateFormat(date) {
  if(date.indexOf("-") != -1) {
    var dateSplit = date.split("-");
    var year = dateSplit[0];
    var month = dateSplit[1];
    var days = dateSplit[2];
    if (month.length == 1) {
      month = "0" + month;
    }
    if (days.length == 1) {
      days = "0" + days;
    }
    var newDateFormat = year + "-" + month + "-" + days;
    return newDateFormat;
  } else {
  return 1;
  }
}
/**
 * Dekodiert ein Zeitformat (00:00:00 => 00:00)
 * @param time
 * @return string
 */
function decodeTimeFormat(time) {
  var tmpTime=time.split(":");
  var newTime=tmpTime[0] + ":" + tmpTime[1];
  return newTime;
}
/**
 * Enkodiert ein Zeitformat (00:00 => 00:00:00)
 * @param time
 * @return string
 */
function encodeTimeFormat(time) {
  var tmpTime=time.split(":");
  var newTime=tmpTime[0] + ":" + tmpTime[1] + ":00";
  return newTime;
}
/**
 * Dekodiert ein Zeitformat (yyyy-mm-dd hh:mm:ss => hh:mm:ss)
 * @param date
 * @return string
 */
function decodeTimeFormatExt(date) {
  var tmpTime=date.split(" ");
  var tmpDate=tmpTime[1].split(":");
  var newTime=tmpDate[0] + ":" + tmpDate[1] + ":" + tmpDate[2];
  return newTime;
}
/**
 * Dekodiert ein Datumsformat (yyyy-mm-dd => dd.mm.yyyy)
 * @param date
 * @return string
 */
function decodeDateFormat(date) {
  var tmpDate=date.split("-");
  var newDate=tmpDate[2] + "." + tmpDate[1] + "." + tmpDate[0];
  return newDate;
}
/**
 * Dekodiert ein Datumsformat (yyyy-mm-dd hh:mm:ss => dd.mm.yyyy hh:mm:ss)
 * @param date
 * @return string
 */
function decodeDateFormatExt(date) {
  if (typeof date != "undefined" && date!==null ) {
  var tmpTime=date.split(" ");
  var tmpDate=tmpTime[0].split("-");
  var newDate=tmpDate[2] + "." + tmpDate[1] + "." + tmpDate[0] + " " + tmpTime[1];
  return newDate;
	} else {
		return "";
	}
}
/**
 * Enkodiert ein Datumsformat (dd.mm.yyyy => yyyy-mm-dd)
 * @param date
 * @return string
 */
function encodeDateFormat(date) {
  var tmpDate=date.split(".");
  var newDate=tmpDate[2] + "-" + tmpDate[1] + "-" + tmpDate[0];
  return newDate;
}
/**
 * Leert alle Input-Felder
 * @param idelems
 * @return void
 */
function clearForm(idelems) {
  $.each($(idelems), function () {
    if ($(this).attr("type") == "checkbox") {
      $(this).attr('checked', false);
    } else { $(this).val(""); }
  });
}
/**
 * Gibt eine benuterdefiniere MessageBox (Dialog) aus
 * @param title
 * @param content
 * @param msgType
 * @return void
 */
function msgBox(title, content) {
  var setModal="";

  $('#messages').remove();
  $('#messages').length!=0 ? "" : $("body").append("<div id=\"messages\"></div>");
  $('#messages').dialog({
    autoOpen: false,
    modal:setModal,
    buttons: {
      "OK": function() { $(this).dialog('close'); }
      }
  });
  $('#messages').dialog("close");
  
  $('#messages').html('<div style="line-height:20px;">' + content + '</div>'); 
  $('#messages').dialog("open");
  $('#messages').parent().find('.ui-dialog-title').html(title);
}
/**
 * Mit der Option dynFields wird je nach
 * TagElement ein Katalog aus valField und displayField zur�ckgegeben.
 * @param tagstyle
 * @param targetelem
 * @param catalogue
 * @param valField
 * @param displayField
 * @param options
 * @param Endpoint - fnCat.load aus anderer Anwendung?
 * @return void
 */
function injectCatalogue(tagstyle, targetelem, catalogue, valField, displayField, options) {
	  var url=urlpath+"service.php";
	  var cont_act="fnCat.load";
	  var selected='';
	  var extraparams='';
	  options.tagstyle=tagstyle;
	  options.targetelem=targetelem;
	  options.catalogue=catalogue;
	  options.valField=valField;
	  options.displayField=displayField;
	  orderField=options.orderField || displayField;

	  if(options.extraParams) {
	    extraparams=options.extraParams;
	  }
	  if(options.clear) {
	    $(targetelem).html('<' + tagstyle + ' value="0"></'+ tagstyle +'>');
	  }
	  if(options.bypassCache || options.useGrid) {
			var callOptions={};
			callOptions={
					'func':cont_act,
					'data':"&cat="+catalogue+"&orderby="+orderField + extraparams,
					'cookieName':options.cookieName,
					'serviceEndpoint':options.serviceEndpoint,
					'success': function(message) {
				      if(parse_message(message)) {
					        message=message[0];
					        fillInjection(message,options);
					      }
					}
				};
			//if (options.cookieName) { callOptions.push({}); }
			//if (options.serviceEndpoint) { callOptions.push({}); }
			callRemote(callOptions);
	  } else {
	    if(catCache.data[catalogue]) {
	      fillInjection(catCache.data[catalogue], options);
	    }else  {
			var callOptions={};
			callOptions={
					'func':cont_act,
					'data':"&cat="+catalogue+"&orderby="+orderField + extraparams,
					'cookieName':options.cookieName,
					'serviceEndpoint':options.serviceEndpoint,
					'success': function(message) {
				      if(parse_message(message)) {
					        message=message[0];
					        if(!options.justFillCache) { fillInjection(message,options); }
					          addCatCache(catalogue,message);
					      }
					}
				};
			//if (options.cookieName) { callOptions.push({'cookieName':options.cookieName}); }
			//if (options.serviceEndpoint) { callOptions.push({'serviceEndpoint':options.serviceEndpoint}); }
			callRemote(callOptions);
	    }
	  }
}


/**
 * Baut ein HTML Objekt (gef�llt durch injectCatalogue) und f�gt es in DOM ein
 * @param message
 * @param options
 * @return void
 */
function fillInjection(message, options) {
	var tagstyle=options.tagstyle || "option";
	var targetelem=options.targetelem;
	var prev_cont=$(targetelem).attr("prev_cont");
	var tagstyle=options.tagstyle || "option";
	var displayField=options.displayField || null;
	var valField=options.valField || null;
	var dynFields=options.dynFields || false;
	var selectField=options.selectField || false;
	var selectValue=options.selectValue ||false;
	$.each(message.content, function(i,item){
		if(item[selectField]==selectValue) {
			if(selectValue!=false) { selected="selected='selected' "; }
		} else {
			selected="";
		}
		if(typeof item[displayField]!="undefined") {			
			if (item[displayField]==prev_cont) { var selected='selected="selected"'; } else { selected=''; }
			$(targetelem).append("<" + tagstyle +" " + selected + " value='" + item[valField] + "'>" + item[displayField] + "</" + tagstyle + ">");
		}
	});
}
/**
 * Erstellt aus Wert X eine Uhrzeit und liefert dieses zur�ck <hh:mm> (f�r Inline-Editing)
 * @param DateTime
 * @return string || integer
 */
function checkTime(DateTime) {
  if (DateTime.length == 1) {
    var text = DateTime;
    DateTime="0"+text+":00";
  }
  if (DateTime.length == 2) {
    var text = DateTime;
    DateTime=text+":00";
  }
  if (DateTime.length == 3) {
    var text = DateTime;
    DateTime="0" + text[0]+":"+text[1]+text[2];
  }
  if (DateTime.length == 4) {
    var text = DateTime;
    if (text.indexOf(":") != -1) {
      var textSplit = text.split(":");
        var teil1 = textSplit[0];
        var teil2 = textSplit[1];
        if (teil1 < 9) {
         teil1 = "0" + teil1;
        }
        if (teil2 < 9) {
         teil2 = "0" + teil2;
        }
        DateTime=teil1 + ":" + teil2;
    } else {
      var time1 = text.substr(0, 2);
      var time2 = text.substr(2, 4);
      DateTime=time1 + ":" + time2;
    }
  }
  if (DateTime.length > 4) {
    if(checkTimeHelper(DateTime) == 1) {
      return 1;
    } else {
      return DateTime;
    }
  }
}
/**
 * Pr�ft ob ein Zeitraum korrekt ist <hh:mm> (f�r Inline-Editing)
 * @param Duration
 * @return integer
 */
function checkTimeHelper(Duration) {
  var text = Duration;
  var list = new Array(":",".",",","-","_"," ");
  for (var i = 0; i <= list.length; i++) {
   if(text.indexOf(list[i]) != -1) {
     text = text.replace(list[i],":");
     i = list.length;
   }
  }
  var Num = text.replace(":","");
  if((text.length == 5) && (isNaN(Num) == false)) {
    if(text.substr(0, 2) >= 24) {
      return 1;
    }
    if(text.substr(3, 5) >= 60) {
      return 1;
    }
    Duration=text;
  } else {
    return 1;
  }
}
/**
 * Blendet Overlay zum Ladevorgang ein
 * @return void
 */
function showLoading() {
  if($(".ui-dialog-buttonpane").length!=0) {
    $(".ui-dialog-buttonpane").append('<div id="loadingImage"><img src="java/futureScript/IMAGES/ajax-loader.gif" />&nbsp;&nbsp;Daten werden geladen...</div>');
  } else {
    $("body").append('<div id="loadingImageBody" class="ui-widget"><img src="java/futureScript/IMAGES/ajax-loader.gif" />&nbsp;&nbsp;Daten werden geladen...</div>');
  }
}
/**
 * Blendet Overlay zum Ladevorgang aus
 * @return
 */
function hideLoading() {
  $(".ui-dialog-buttonpane").find("#loadingImage").remove();
}

function initializeObjects() {
  $('#messages').dialog({ dialogClass: 'alert', modal:true, autoOpen:false
    , buttons: {
      "OK":function() {
        $(this).dialog('close');
      }
    }
  });
  $("#messages").bind( "dialogopen", function(event, ui) {
    $(".ui-dialog[aria-labelledby=ui-dialog-title-messages]").css("z-index", "9999999");
  });
  $("#messages").bind( "dialogclose", function(event, ui) {
    $(".ui-dialog").css("z-index", "999999");
  });

  $('.guibutton').mouseover(function() {
    $(this).addClass("ui-state-highlight");
    $(this).css("cursor","pointer");
  });

  $('.guibutton').mouseout(function() {
    $(this).removeClass("ui-state-highlight");
  });

  $('#currentUser').html(userUID);
}

function setLastMarker(markid) {
  printServCache.marker=markid;
}

function newTimer(func, cooldown) {
	 var timer = $.timer(function() {
	      func.call(this);
	});

	timer.set({ time : cooldown, autostart : true });
}

function getGridIds() {
	var entrys = new Array();
	$.each($("#major_table_tbody>tr"), function(i, ele) {
		entrys.push($(ele).attr("entryid"));
	});
	return entrys;
}

function refreshClientTime() {
	 Datum = new Date();
	 Jahr = Datum.getFullYear();
	 Tag = Datum.getDate();
	 Monat = Datum.getMonth()+1;
	 Stunde = Datum.getHours();
	 Minute = Datum.getMinutes();
	 Sekunde = Datum.getSeconds();
	if(Tag < 10) {
		Tag = "0" + Tag;
	}

	// bei einstelligem Monatswert Null voranstellen
	if(Monat < 10) {
		Monat = "0" + Monat;
	}
	var StdDisp  = ((Stunde < 10) ? "0" + Stunde : Stunde);
	var MinDisp  = ((Minute < 10) ? "0" + Minute : Minute);
	zeit = Stunde+":"+Minute+":"+Sekunde;
	datum = Jahr+"-"+Monat+"-"+Tag;
}

function injectAsyncCatalogue(tagstyle, targetelem, catalogue, valField, displayField, options, callback) {
	var url=urlpath+"service.php";
	var cont_act="printServ.fnCat.load";
	var selected='';
	var extraparams='';
	options.tagstyle=tagstyle;
	options.targetelem=targetelem;
	options.catalogue=catalogue;
	options.valField=valField;
	options.displayField=displayField;
	orderField=options.orderField || displayField;

	if(options.extraParams) {
		extraparams=options.extraParams;
	}
	if(options.clear) {
		$(targetelem).html('<' + tagstyle + ' value="0"></'+ tagstyle +'>');
	}
	if(options.bypassCache || options.useGrid) {
		$.ajax({
		    async: false,
		    dataType: "json",
		    url: url + "?function=" + cont_act + getParams({},1) + "&format=json&orderby=" + orderField  + extraparams +"&cat=" + catalogue + "&jsoncallback=?",
		    data:'',
		    success: function(data){

		    	if(parse_message(message)) {
					message=data[0];
					fillInjection(message,options);
					if(callback!=false && callback!=null) {
						callback.call(this);
					}
		    		if(options.success) options.success(message);
		    	} else {
		    		if(options.fail) options.fail(message);
		    	}
			 }
		  });
	} else {
		if(catCache.data[catalogue]) {
			fillInjection(catCache.data[catalogue], options);
		}else  {
			$.ajax({
			    async: false,
			    dataType: "json",
			    url: url + "?function=" + cont_act + getParams({},1) + "&format=json&orderby=" + orderField  + extraparams +"&cat=" + catalogue + "&jsoncallback=?",
			    data:'',
			    success: function(data){

			    	if(parse_message(message)) {
						message=data[0];
						if(!options.justFillCache) { fillInjection(message,options); }
						addCatCache(catalogue,message);

			    		if(options.success) options.success(message);
			    	} else {
			    		if(options.fail) options.fail(message);
			    	}
				 }
			  });
		}
	}
}

/**
 * Initialisiert einen AutoComplete f�r ein bestimmtes Input-Feld
 * @param elem
 * @param func
 * @param cat
 * @param tableID
 * @param tableName
 * @param options
 * @return void
 */
function initAutoComplete(elem, func, cat, tableID, tableName, dialog, options) {
	$("#" + elem).autocomplete("../service.php", {
	  extraParams:  getParams({ 'function':'trace2.'+func , 'cat':cat, 'format':'json'},2) ,
	  onData: function(data) {
	  		message=data;
	  		parse_message(message);
	  		var row= new Array();
	  		var values=false;
	  		if(message[0].code==101) {
		  		$.each(message[0].content, function(i, item) {
		  			if(typeof item[tableID]!="undefined") {
		  				row[i]=new Array(item[tableName],item[tableID]);
		  				values=true;
		  			}
		  		});
	  		}
		  	if(values) {
		  		if(dialog!=false) { hideDialogErrorMsg(dialog); }
		  		return row;
		  	} else {
		  		if(dialog!=false) { showDialogErrorMsg(dialog, "Keine passenden Eintr&auml;ge gefunden!");}
		  		return null;
		  	}
		},
	  	setAttribute:true,
	  	useJSON:true,
	  	selectFirst:true,
	  	autoSelect:true,
	  	cacheLength:0,
	  	autoFocus:true,
	  	autoFill:true,
	  	width:330,
	  	hoverClass: 'ui-state-active',
	  	resultsClass: 'ac_input ui-widget ui-state-default ui-corner-all',
	  	onSelect: function(val, attrib) {
	  		if(options.injectCatalogue) {
	  			injectCatalogue(options.tagstyle, options.targetID, options.cat, options.fieldID, options.displayField, {'extraParams':options.extraParams + attrib,  'dynFields':true, 'noTools':true, 'bypassCache':true, 'clear':true });
	  		}
	  		var element=elem.split("_");
	  		var field=element[0].split("-");
	  		if(options.inlineEditing) {
	  			sendEditInlineEntry(options.inlineEditing, element[1], field[1], attrib);
	  		}
	  		$("#" + elem).attr("entryid", attrib);
	  	}
	 });
	$(".ac_input").css("z-index", $(".ui-dialog").css("z-index")+1);
}

function getText(strText) {
	if(typeof texts[strText]!="undefined") {
		return texts[strText];
	} else {
		callRemote({ 'func': 'fnLang.insert',
			 'data' : "&strText=" + strText,
			 'success': function(dataMessage) {
				if(parse_message(dataMessage)) {

				}
			 }
		});
	}
}

function getDateTime() {
	var callOptions={};
	callOptions={
			'func':"fnJobs.getDateTime",
			'data':"",
			'success': function(message) {
				if(parse_message(message)) {
					datum = message[0]["content"]["datum"];
					zeit = message[0]["content"]["uhrzeit"];
				}
			}
		};
	callRemote(callOptions);
}

/* n = name */
function cLesen(n)
{
	var currhost=window.location.host;
 a = document.cookie;
 ab = a.split(';');

 res = '';
 i = 0;
 while(ab.length > i)
 {
  ab[i] = ab[i].replace(' ', '');
  n = n.replace(' ', '');
  cookiename = ab[i].split('=')[0];
  cookiewert = ab[i].split('=')[1];
  if(n == cookiename)
  {
   return(cookiewert);
  }
  i++;
 }
 return('');
}

//injection extra Params to String f�r URL. return: JSON data, f�r injectCatalogue
function solveExtraParams(exparams){
	var paramurlstr="";
	var retval = "";
	if (typeof exparams == "object") {
	$.each(exparams, function (i,elem) {
		paramurlstr += "&"+i+"="+elem;
	});
		//retval = {'extraParams':paramurlstr};
		retval=paramurlstr;
	} else {retval="";}
	return retval;
}

function extround(zahl,n_stelle) {
	zahl = (Math.round(zahl * n_stelle) / n_stelle);
   	return zahl;
}

function GET(v) {
	var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars[v];
}
