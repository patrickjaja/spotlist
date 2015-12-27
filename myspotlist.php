<?php 
require_once("gui.load.php");
$gui=new GuiLoader("myspotlist.php");

echo $gui->getHTML();