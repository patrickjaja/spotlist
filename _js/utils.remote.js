/**
 * AJAX Implementation
 * @author Patrick Schönfeld (pschoen@qits.de)
 * @copyright QITS GmbH
 * @version 1.0.0
 * Dependencies:
 *  jquery.tablesorter.min - 2.10.6
 * Events:
 *	save
 *	update
 *	delete
 *	insert
 *	initialized
 */

var globalRemoteEvents = "Events";
//Werte bzw. Standard Konstruktor
var Remote = function(funcName
						,data//Array mit, Restriction Object noch übergeben key/val
						, refObj) //Aufrufende Objekt Referenz z.B. zum Events triggern oder Daten auslesen
						{ 
	this.functionName= "&function="+this.appName+funcName;
	this.data= otoString(data);
	this.refObj = refObj;
	
	function otoString (obj) {
		var returnString = "";
		for(var elem in data) {
			returnString += "&" + data[elem].id + "=" + data[elem].val + "";
		}
		//return encodeURI(returnString);
		return returnString;
	};
};

Remote.prototype.functionName="";
Remote.prototype.urlpath=urlpath + "service.php"; //session.js.php globalEndpoint
Remote.prototype.appName=appName+".";
Remote.prototype.responseFormat="json";
Remote.prototype.defaultURIExtensions= "format=json&skey=" + key +  "&lang="+currLang;
Remote.prototype.data="";
Remote.prototype.type=REQTYPE;
Remote.prototype.refObj={};

Remote.prototype.test = function() {
    alert(this.funcName);
};

Remote.prototype.call = function() {
	var me=this;
	jQuery.ajax({
		url: me.urlpath,
		data: me.defaultURIExtensions +  me.functionName + me.data,
		type: me.type,
		success: function(result) {
			var message = result;
			if (me.parse_message(message)) {
//				var contentSize = message[0].content.length;
//				if (typeof(contentSize) == "undefined") {
//					$(me).triggerHandler({//Event an das aktuelle Objekt binden
//						type: "emptyResult",
//						dataMessage: message,
//						remoteObj: me,
//						refObj: me.refObj
//					});
//				} else {
					$(me).triggerHandler({//Event an das aktuelle Objekt binden
						type: "success",
						dataMessage: message,
						remoteObj: me,
						refObj: me.refObj
					});
//				}
				
			} else {
				$(me).triggerHandler({
					type: "error",
					dataMessage: message,
					remoteObj: me,
					refObj: me.refObj
				});
			}
		},
		error: function(data) {
			$(me).triggerHandler({
				type: "error",
				dataMessage: data,
				remoteObj: me,
				refObj: me.refObj
			});
		},
		dataType: me.responseFormat
	});
};



Remote.prototype.parse_message=function(message) {
	  if((message[0].answer=="ERROR")) {
	    return false;
	  }
          return true;
};