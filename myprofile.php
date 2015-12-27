<?php 
require_once("gui.load.php");
$gui=new GuiLoader("myprofile.php");

echo $gui->getHTML();