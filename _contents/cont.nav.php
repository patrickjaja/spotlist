<?php
$user=getSession();
$userObj=new simpleuser();
$userObj->load($user->__get("sessionUserID"));
$userName=$userObj->userUID;

$navigation='    
	<ul id="gn-menu" class="gn-menu-main">
				<li class="gn-trigger">
					<a class="gn-icon gn-icon-menu"><span>Menu</span></a>
					<nav class="gn-menu-wrapper">
						<div class="gn-scroller">
                                                    <ul class="gn-menu">
                                                        <li class="gn-search-item ttip_right" title="Deine Liste durchsuchen">
                                                                <input placeholder="Suchen" type="search" class="gn-search search_imdb">
                                                                <a class="gn-icon gn-icon-search"><span>Suchen</span></a>
                                                        </li>
                                                        <li>
                                                            <a class="gn-icon gn-icon-download">Abonnieren & Merken</a>
                                                            <ul class="gn-submenu">
                                                                    <li class="gn-search-item"><a class="gn-icon gn-icon-videos"><input placeholder="Serie hinzufügen" type="search" class="gn-search gn-search-item search_imdb" style="padding-left:0px;" id="search_complete">
                                                                    <span>Serie hinzufügen</span></a></li>
                                                                    <li><a class="gn-icon gn-icon-videos">Film hinzufügen</a></li>
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <a class="gn-icon gn-icon-download">Erledigt</a>
                                                            <ul class="gn-submenu">
                                                                    <li><a class="gn-icon gn-icon-videos">Serie nachtragen</a></li>
                                                                    <li><a class="gn-icon gn-icon-videos">Film nachtragen</a></li>
                                                            </ul>
                                                        </li>
                                                        <li><a class="gn-icon gn-icon-cog">Einstellungen</a></li>
                                                        <li><a class="gn-icon gn-icon-help">Hilfe</a></li>
                                                    </ul>
						</div><!-- /gn-scroller -->
					</nav>
				</li>
                                <li class="ttip hideonResu" title="Empfehlungen deiner Freunde"><a href="myspotlist.php">Startseite</a></li>
				<li class="ttip hideonResu" title="Bearbeite deine Liste von Filmen und Serien"><a href="spotdetails.php">SPOTLIST PFLEGEN</a></li>
                                <li style="width:20%;" class="ttip" title="Deine Spotlist durchsuchen"><div id="sb-search" class="sb-search">
						<form>
							<input class="sb-search-input" placeholder="Bitte einen Suchbegriff eingeben..." type="text" value="" name="search" id="search">
							<input class="sb-search-submit" type="submit" value="">
							<span class="sb-icon-search"></span>
						</form>
					</div></li>
                                <li><a class="fa-sign-out logout-btn" href="#"><span>abmelden</span></a></li>
                                <li class="ttip hideonResu" title="Dein Profil bearbeiten"><a href="myprofile.php" id="mein_profil">'.$userName.'</a></li>
                                
			</ul>
                        <script>
			new gnMenu( document.getElementById( \'gn-menu\' ) );
                        new UISearch( document.getElementById( \'sb-search\' ) );
                        
                        $("#search_complete").autocomplete({
                            source: function( request, response ) {
                                

                            var request=new Remote(
                                    \'mySpot.searchSerie\',
                                    [{\'id\':\'title\', \'val\': encodeURIComponent(request.term)}],
                                    {}
                            );
                            request.call();
                            $(request).on("success", function(o) {
                                var data=o.dataMessage[0].content;
                                response( $.map( data.results, function( item ) {
                                return {
                                  label: item.original_name,
                                  value: item.name,
                                  imgPath: item.imgPath
                                }
                              }));
                            });
                            $(request).on("error", function(o) {
                               alert("Fehlerhafte Geschichte die du hier eingibst. // abfangen");
                            });
                            },
                            minLength: 0,
                            select: function( event, ui ) {
                              
                            },
                            open: function() {
                                $(this).autocomplete(\'widget\').css(\'z-index\', 200);
                                $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
                            },
                            close: function() {
                              $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
                            }
                          }).data("ui-autocomplete")._renderItem = function (ul, item) {
                                    return $("<li></li>")
                                        .data("item.autocomplete", item)
                                        .append("<img src=\'"+item.imgPath+"\' height=\'50%\'>" + item.label + "</a>")
                                        .appendTo(ul);
                                };;
		</script>
';