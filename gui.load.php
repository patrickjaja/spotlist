<?php
class GuiLoader{
	public $HTML="";
	public function __construct($page) {
		require_once(dirname(__FILE__) . "/shared/SYSTEM/HOOKS/class.hooks.php");
		require_once(dirname(__FILE__) . "/webService/package.spot.php");
                require_once(dirname(__FILE__) . "/shared/package.main.php");
		require_once(dirname(__FILE__) . "/webService/global.config.php");
		
		
		$page=$this->getPage($page, $PUBLIC_SITES);		
		return $this->loadGUI($page);		
	}
	
	public function loadGUI($page) {

		include("dom.php");		
		include("_contents/cont.jsContent.php");
                if ($page!="index.php")
                include("_contents/cont.nav.php");
                include("_contents/cont.footer.php");
		if(file_exists("_contents/cont.".$page)) {
			include("_contents/cont.".$page);
		}  else {
			header("location: " . $this->getErrorPage());
		}	
               
		$dom=str_replace('##JSHELPER##', $jsContent, $dom);	
                $inhalt=str_replace('##NAVIGATION##', $navigation, $inhalt);
                $inhalt=str_replace('##FOOTER##', $footer, $inhalt);
		$this->HTML=str_replace('##CONTENT##', $inhalt, $dom);
		return $this;
	}	
	
	public function getPage($page, $publicSites) {		
		$sessionKey=retrieveSkey();		
		if((empty($sessionKey) && (!in_array($page, $publicSites)))) {
			return "index.php";	
		} else {
                    if ($page=="index.php") {
                        return "myspotlist.php";
                    } else {
			return $page;
                    }
		}
	}
	
	public function isPublic($page,$PUBLIC_SITES) {
		if(in_array($page, $PUBLIC_SITES)) {
			return true;
		} else {
			return false;
		}
	}
	
	public function getNavigation($page) {
		$sessionKey=retrieveSkey();
		if(empty($sessionKey)) {
			return "unlogged";
		} else if (!isset($_GET["mandantID"])) {
			return "unlogged";
		} else if (empty($_GET["mandantID"])) {
			return "unlogged";
		}
		return "logged";
	}
	
	public function getUserbar($userbar) {
		$sessionKey=retrieveSkey();		
		if(empty($sessionKey)) {
			return $userbar["unlogged"];
		} else if (!isset($_GET["mandantID"])) {
			return $userbar["unlogged"];
		} else if (empty($_GET["mandantID"])) {
			return $userbar["unlogged"];
		}
		$userbar=$userbar["logged"];
		$session=getSession(retrieveSkey());
		return str_replace('##USERMAIL##', $session->sessionUser, $userbar);
	}
	
	public function getHTML() {
		return $this->HTML;
	}
	private function getErrorPage() {
		return "404.php";
	}
	private function noRequirementsPage() {
		return "login.php";
	}
}