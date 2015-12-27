<?php
require("webService/global.config.php");
$sessionKey=retrieveSkey();
$isLogged=0;
if(!empty($sessionKey)) $isLogged=1;
$session=getSession($sessionKey);
$userFirstname=$session->user->userVorname;
$userLastname=$session->user->userNachname;
$userUID=$session->user->userUID;
$jsContent="<script type='text/javascript'>	
			var protocol=document.location.protocol;
		 	var serviceEndPoint='$SERVICEENDPOINT/';
			var globalEndPoint='$GLOBALENDPOINT/';
			var GUI='$GUI';
			var DEV='$DEV';
			var urlpath=serviceEndPoint;
			var userFirstname='$userFirstname';
			var userLastname='$userLastname';
			var userUID='$userUID';
			var isLogged='$isLogged';";
$jsContent.='</script>';
?>