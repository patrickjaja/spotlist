(function() {
	var triggerBttn = document.getElementById( 'trigger-overlay-register' ),
		overlay = document.querySelector( 'div.overlay' ),
		closeBttn = overlay.querySelector( 'button.overlay-close' );
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };

	var triggerBttn2 = document.getElementById( 'trigger-overlay-video' ),
		overlay2 = document.querySelector( 'div.overlay2' ),
		closeBttn2 = overlay2.querySelector( 'button.overlay-close' );
		transEndEventNames2 = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName2 = transEndEventNames2[ Modernizr.prefixed( 'transition' ) ],
		support2 = { transitions : Modernizr.csstransitions };

	var triggerBttn3 = document.getElementById( 'trigger-overlay-help' ),
		overlay3 = document.querySelector( 'div.overlay3' ),
		closeBttn3 = overlay3.querySelector( 'button.overlay-close' );
		transEndEventNames3 = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName3 = transEndEventNames3[ Modernizr.prefixed( 'transition' ) ],
		support3 = { transitions : Modernizr.csstransitions };

	var triggerBttn4 = document.getElementById( 'trigger-overlay-contact' ),
		overlay4 = document.querySelector( 'div.overlay4' ),
		closeBttn4 = overlay4.querySelector( 'button.overlay-close' );
		transEndEventNames4 = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName4 = transEndEventNames4[ Modernizr.prefixed( 'transition' ) ],
		support4 = { transitions : Modernizr.csstransitions };

	function toggleOverlay() {
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
			classie.add( overlay, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
		}
	}

	function toggleOverlay2() {
		if( classie.has( overlay2, 'open' ) ) {
			classie.remove( overlay2, 'open' );
			classie.add( overlay2, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support2.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName2, onEndTransitionFn );
				}
				classie.remove( overlay2, 'close' );
			};
			if( support2.transitions ) {
				overlay2.addEventListener( transEndEventName2, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay2, 'close' ) ) {
			classie.add( overlay2, 'open' );
		}
	}
        
        function toggleOverlay3() {
		if( classie.has( overlay3, 'open' ) ) {
			classie.remove( overlay3, 'open' );
			classie.add( overlay3, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support3.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName3, onEndTransitionFn );
				}
				classie.remove( overlay3, 'close' );
			};
			if( support3.transitions ) {
				overlay3.addEventListener( transEndEventName3, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay3, 'close' ) ) {
			classie.add( overlay3, 'open' );
		}
	}
        
        function toggleOverlay4() {
		if( classie.has( overlay4, 'open' ) ) {
			classie.remove( overlay4, 'open' );
			classie.add( overlay4, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support4.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName4, onEndTransitionFn );
				}
				classie.remove( overlay4, 'close' );
			};
			if( support4.transitions ) {
				overlay4.addEventListener( transEndEventName4, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay4, 'close' ) ) {
			classie.add( overlay4, 'open' );
		}
	}
	triggerBttn.addEventListener( 'click', toggleOverlay );
        triggerBttn2.addEventListener( 'click', toggleOverlay2 );
        triggerBttn3.addEventListener( 'click', toggleOverlay3 );
        triggerBttn4.addEventListener( 'click', toggleOverlay4 );
	closeBttn.addEventListener( 'click', toggleOverlay );
        closeBttn2.addEventListener( 'click', toggleOverlay2 );
        closeBttn3.addEventListener( 'click', toggleOverlay3 );
        closeBttn4.addEventListener( 'click', toggleOverlay4 );
})();