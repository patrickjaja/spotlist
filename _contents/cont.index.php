<?php

$inhalt='    
    <link rel="stylesheet" type="text/css" href="loading_white.css" />
	<div id="login">
            <img src="_images/spotlist_logo_small.png" class="logo_login"/>
            <h2><span class="fontawesome-lock"></span>Sign In</h2>
            
            <form action="javascript:signIn();" method="POST" name="spot_login" id="spot_login">
                
                <fieldset>
                        <p><label class="userInfo"></label></p>
                        <p><label for="email">E-Mail Adresse</label></p>
                        <p><input type="email" id="email" value="mail@address.com" onBlur="if(this.value==\'\')this.value=\'mail@address.com\'" onFocus="if(this.value==\'mail@address.com\')this.value=\'\'"></p>

                        <p><label for="password">Passwort</label></p>
                        <p><input type="password" id="password" value=""></p>
                        <p><input type="submit" value="Anmelden"></p>
                </fieldset>

            </form>
            
	</div>

        	<div class="container">	
			<div class="main clearfix" style="text-align: center ;">
				<nav id="menu" class="nav">					
					<ul>
						<li>
							<a href="javascript:void(0)" id="trigger-overlay-register">
								<span class="icon">
									<i aria-hidden="true" class="icon-blog"></i>
								</span>
								<span>Registrieren</span>
							</a>
						</li>
						<li>
							<a href="javascript:void(0)" id="trigger-overlay-video">
								<span class="icon"> 
									<i aria-hidden="true" class="icon-portfolio"></i>
								</span>
								<span>Videos</span>
							</a>
						</li>
						<!--<li>
							<a href="#">
								<span class="icon">
									<i aria-hidden="true" class="icon-portfolio"></i>
								</span>
								<span>Teilen</span>
							</a>
						</li>-->
						<li>
							<a href="javascript:void(0)" id="trigger-overlay-help">
								<span class="icon">
									<i aria-hidden="true" class="icon-team"></i>
								</span>
								<span>Hilfe</span>
							</a>
						</li>
						<li>
							<a href="javascript:void(0)" id="trigger-overlay-contact">
								<span class="icon">
									<i aria-hidden="true" class="icon-contact"></i>
								</span>
								<span>Kontakt</span>
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>	
                <div class="overlay overlay-hugeinc">
                    <nav style="display:none;" id="overlay_loading_animation">
                        <ul>
                            <li>
                        <div id="floatingCirclesG">
                                <div class="f_circleG" id="frotateG_01">
                                </div>
                                <div class="f_circleG" id="frotateG_02">
                                </div>
                                <div class="f_circleG" id="frotateG_03">
                                </div>
                                <div class="f_circleG" id="frotateG_04">
                                </div>
                                <div class="f_circleG" id="frotateG_05">
                                </div>
                                <div class="f_circleG" id="frotateG_06">
                                </div>
                                <div class="f_circleG" id="frotateG_07">
                                </div>
                                <div class="f_circleG" id="frotateG_08">
                            </div>
                        </div>
                            </li>
                        </ul>
                    </nav>
                    <button type="button" class="overlay-close">Close</button>
                    <nav class="overlayhide">
                            <ul>
                                    <li style="margin-bottom:40px;"><img src="_images/spotlist_register_logo.png"/></li>
                                    <li>E-Mail Adresse</li>
                                    <li><input type="text" class="reg_m"/></li>
                                    <li>Passwort</li>
                                    <li><input type="password" class="reg_p"/></li>
                                    <li><a href="javascript:void(0)" class="reg_s">>> Los geht`s</a></li>
                            </ul>
                    </nav>
		</div>
                <div class="overlay2 overlay-hugeinc">
			<button type="button" class="overlay-close">Close</button>
			<nav>
				<ul>
					<li><a href="#">Home11</a></li>
					<li><a href="#">About11</a></li>
					<li><a href="#">Work</a></li>
					<li><a href="#">Clients</a></li>
					<li><a href="#">Contact</a></li>
				</ul>
			</nav>
		</div>
                <div class="overlay3 overlay-hugeinc">
			<button type="button" class="overlay-close">Close</button>
			<nav>
				<ul>
					<li><a href="#">asgags</a></li>
					<li><a href="#">About</a></li>
					<li><a href="#">Work</a></li>
					<li><a href="#">Clients</a></li>
					<li><a href="#">Contact</a></li>
				</ul>
			</nav>
		</div>
                <div class="overlay4 overlay-hugeinc">
			<button type="button" class="overlay-close">Close</button>
			<nav>
				<ul>
					<li><a href="#">TTT</a></li>
					<li><a href="#">About</a></li>
					<li><a href="#">Work</a></li>
					<li><a href="#">Clients</a></li>
					<li><a href="#">Contact</a></li>
				</ul>
			</nav>
		</div>
               
      <script language="javascript" type="text/javascript" src="_js/overlay.js"></script>
<script>

			//  The function to change the class
			var changeClass = function (r,className1,className2) {
				var regex = new RegExp("(?:^|\\s+)" + className1 + "(?:\\s+|$)");
				if( regex.test(r.className) ) {
					r.className = r.className.replace(regex,\' \'+className2+\' \');
			    }
			    else{
					r.className = r.className.replace(new RegExp("(?:^|\\s+)" + className2 + "(?:\\s+|$)"),\' \'+className1+\' \');
			    }
			    return r.className;
			};	

			//  Creating our button in JS for smaller screens
			var menuElements = document.getElementById(\'menu\');
			menuElements.insertAdjacentHTML(\'afterBegin\',\'<button type="button" id="menutoggle" class="navtoogle" aria-hidden="true"><i aria-hidden="true" class="icon-menu"> </i> Menu</button>\');

			//  Toggle the class on click to show / hide the menu
			document.getElementById(\'menutoggle\').onclick = function() {
				changeClass(this, \'navtoogle active\', \'navtoogle\');
			}

			// http://tympanus.net/codrops/2013/05/08/responsive-retina-ready-menu/comment-page-2/#comment-438918
			document.onclick = function(e) {
				var mobileButton = document.getElementById(\'menutoggle\'),
					buttonStyle =  mobileButton.currentStyle ? mobileButton.currentStyle.display : getComputedStyle(mobileButton, null).display;

				if(buttonStyle === \'block\' && e.target !== mobileButton && new RegExp(\' \' + \'active\' + \' \').test(\' \' + mobileButton.className + \' \')) {
					changeClass(mobileButton, \'navtoogle active\', \'navtoogle\');
				}
			}
                        $("#trigger-overlay-register").click(function(e) {
                            $("#overlay_loading_animation").hide();
                            $(".overlayhide").show();                            
                        });
                        $(".reg_p").keyup(function(e) {
                                if(e.keyCode == 13) {
                                     $(".reg_s").trigger("click");   
                                }
                        });
                        $(".reg_m").keyup(function(e) {
                                if(e.keyCode == 13) {
                                     $(".reg_s").trigger("click");   
                                }
                        });
                        
                        $(".reg_s").click(function(e) {
                                $(".overlayhide").hide();
                                $("#overlay_loading_animation").fadeIn( "slow", function() {
                                    // Animation complete
                                });
                                var request=new Remote(
                                        \'fnRegister.create\',
                                        [{\'id\':\'u\', \'val\': encodeURIComponent($(".reg_m").val())}, 
                                         {\'id\':\'m\', \'val\': encodeURIComponent($(".reg_m").val())},
                                         {\'id\':\'p\', \'val\': encodeURIComponent($(".reg_p").val())}], 
                                        {}
                                );
                                request.call();
                                $(request).on("success", function(o) {
                                    setTimeout(function(){
                                        $("div.overlay").find(".overlay-close").trigger("click");
                                        $(".userInfo").html("Dein Account wurde erfolgreich freigeschaltet.");
                                        $("#email").val($(".reg_m").val());
                                        $(".userInfo").fadeIn( "slow", function() {
                                        
                                        });
                                    }, 1000);
                                });
                                $(request).on("error", function(o) {
                                    msgBox("Bitte nochmal versuchen", o.dataMessage[0].descr);
                                    setTimeout(function(){
                                        $("#overlay_loading_animation").hide();
                                        $(".overlayhide").show();  
                                    }, 1000);
                                    
                                });
                            
                            
                        });
                        
                        $("#password").keyup(function(e) {
                            if(e.keyCode == 13) {
                                    signIn();
                            }
                        });
                        
                function signIn() {
                           var jForm = $("#spot_login");

                            var request=new Remote(
                                    \'startSession\',
                                    [{\'id\':\'loginuser\', \'val\': encodeURIComponent($("#email").val())}, 
                                     {\'id\':\'loginpassword\', \'val\': encodeURIComponent($("#password").val())}], 
                                    $("#btnLogin")
                            );
                            request.call();
                            $(request).on("success", function(o) {
                                jForm[0].action = \'myspotlist.php\';

                                 jForm[0].submit();

                            });
                            
                            $(request).on("error", function(o) {
                                msgBox("Anmeldung","Irgendwas stimmt nicht. Bitte überprüfe deine Eingaben.");

                            });

                }
		</script>
';