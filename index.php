<?php 

require_once("gui.load.php");
$gui=new GuiLoader("index.php");

echo $gui->getHTML();