<?php
header('Content-type: application/javascript');
?>
var protocol=document.location.protocol;
<?php
require_once("../webService/global.config.php");

echo "var serviceEndPoint=\"$SERVICEENDPOINT\";";
echo "var imageEndPoint=\"$IMAGEENDPOINT\";";
echo "var globalEndPoint=\"$GLOBALENDPOINT\";";
?>
<!--//
var urlpath=serviceEndPoint;
var globalpath=globalEndPoint;
var catCache={};

<?php
require('../webService/package.spot.php');
echo "var key='" . $_GET["skey"] . "';";
$session=getSession($_GET["skey"]);
$userUID=$session->user->userUID;
$userID=is_object(getSession($_GET["skey"])) ? getSession($_GET["skey"])->getUserID() : 0;
$userID=$session->user->userID;
$userMail=$session->user->userEmail;

echo "var user='';
user ='" . $userID . "';";
echo "var userUID='';
userUID ='" . $userUID . "';";
echo "var userMail='';
userMail ='" . $userMail . "';";

foreach($jsVars as $jsVarName=>$jsVarValue) {
	echo "var $jsVarName='$jsVarValue';";
}

if(isset($_GET["nlID"])) {
    echo "var nl='".$_GET["nlID"]."';";
}
?>
$(document).ready(function() {
  $('#LoginFail').hide();
  $('#loginuser').focus();
  $('#loginpass').keydown(function(event) { if(event.keyCode==13) { acquireKey($('#loginuser').val(),$('#loginpass').val(), $('#loginsystem').val()); } });
  $('#loginuser').keydown(function(event) { if(event.keyCode==13) { acquireKey($('#loginuser').val(),$('#loginpass').val(), $('#loginsystem').val()); } });
  $('#loginsystem').keydown(function(event) { if(event.keyCode==13) { acquireKey($('#loginuser').val(),$('#loginpass').val(), $('#loginsystem').val()); } });

   /*Utils.prototype.injectCatalogue($("#loginsprache"), "key", {'value':'key', 'langID':'langID'}, {'clear':true, 'getText':true, 'func':'fnLangs.loadAll', 'callback':function() { 
	    var langlang='<?php echo $_GET["lang"]; ?>';
	    var defaultLang='<?php echo DEFAULT_LANG; ?>';
	    $.each($("#loginsprache").find("option"), function(i,elem) {
			var langID=$(elem).attr("langID");
	        if (langID==langlang) {
	            var CookieDate = new Date;
	            CookieDate.setFullYear(CookieDate.getFullYear( ) +1);
	            document.cookie = 'trace2_lang='+$(this).val()+'; expires=' + CookieDate.toGMTString( ) + ';';//Lang Cookie erneuern
	            $(elem).attr("selected","selected");
	        }
	    });
	} });*/

    
    $("#loginsprache").change(function(i,ele) {
        if ($(this).val() != "") {
            //$('#loginsprache option:selected').each(function(){
                //alert($(this).attr("key"));)
            //});
            var CookieDate = new Date;
            CookieDate.setFullYear(CookieDate.getFullYear( ) +1);
            document.cookie = 'trace2_lang='+$(this).val()+'; expires=' + CookieDate.toGMTString( ) + ';';


            document.location="./index.php?lang="+$(this).val();
        }
    });

	$('#login_button_overlay').mouseover(function() {
		$('#login_button').stop().animate({opacity:'0.8'},200);
	});

	$('#login_button_overlay').mouseout(function() {
		$('#login_button').stop().animate({opacity:'1'},200);
	});
	$('#login_button_overlay').click(function(){
		acquireKey($('#loginuser').val(),$('#loginpass').val(), $('#loginsystem').val());
	});

	$('#login_button_cancel_overlay').mouseover(function() {
		$('#login_button_cancel').stop().animate({opacity:'0.7'},200);
	});

	$('#login_button_cancel_overlay').mouseout(function() {
		$('#login_button_cancel').stop().animate({opacity:'1'},200);
	});

	$("#loginuser").change(function() {
		$("#loginuser").removeClass("ui-state-error");
		$("#loginpass").removeClass("ui-state-error");
	});

	$("#loginpass").change(function() {
		$("#loginuser").removeClass("ui-state-error");
		$("#loginpass").removeClass("ui-state-error");
	});

	$('#login_button_cancel_overlay').click(function() {
		clearLoginData();
		$("#loginuser").removeClass("ui-state-error");
		$("#loginpass").removeClass("ui-state-error");
		if(!$("#LoginFail").is(":hidden")) {
			$("#LoginFail").hide("scale", {}, 700);
		}
		$("#loginuser").focus();
	});
});

function clearLoginData() {
	$('#loginuser').val("");
	$('#loginpass').val("");
}

function getParams(options, mode) {

	var params='&skey=' + key + '&lang=' + currLang + '&nlID='+nlID;
	options.skey=key;
	if(mode==1) {
	      return params;
	}
	if(mode==2) {
	      return options;
	}
}

function acquireKey(username, pass, system) {
var escp_pass = (escape(pass));
var cont_act="trace2.startSession";
var lurl=serviceEndPoint + "/service.php";


$.ajax({
	url: lurl,
	type: REQTYPE,
	dataType: "json",
	data: "function=" + cont_act + "&loginuser=" + username +  "&loginpassword=" + escp_pass + "&lang="+currLang+"&format=json",
	success: function(data) {
		message=data;
		if(message[0].code!=101) {
			$("#LoginFail").show("bounce", { times:2, distance:15 }, 700);
			$("#loginuser").addClass("ui-state-error");
			$("#loginpass").addClass("ui-state-error");
			$("#loginuser").focus();
			} else {
				  var key=message[0].content.skey;
				  var nl=message[0].content.nlID;
				  var lang=message[0].content.lang;
				  var serverSettings=message[0].content.currentSettings;
				  document.location="./myspotlist.php?skey=" + key+"&lang="+lang+"&nlID="+nl;
			}
		},
		error: function(data) {

		}
});

}

//-->