/**
 * Global variables
 */

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

"use strict";

(function () {
	var isNoviBuilder = window.xMode;
	var userAgent = navigator.userAgent.toLowerCase(),
		initialDate = new Date(),

		$document = $( document ),
		$window = $( window ),
		$html = $( "html" ),

		isDesktop = $html.hasClass( "desktop" ),
		isIE = userAgent.indexOf( "msie" ) != -1 ? parseInt( userAgent.split( "msie" )[ 1 ] ) : userAgent.indexOf( "trident" ) != -1 ? 11 : userAgent.indexOf( "edge" ) != -1 ? 12 : false,
		isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ),
		isSafari = !!navigator.userAgent.match( /Version\/[\d\.]+.*Safari/ ),
		plugins = {
			bootstrapTooltip:        $( "[data-toggle='tooltip']" ),
			copyrightYear:           $( '.copyright-year' ),
			rdNavbar:                $( ".rd-navbar" ),
			materialParallax:        $( ".parallax-container" ),
			rdMailForm:              $( ".rd-mailform" ),
			rdInputLabel:            $( ".form-label" ),
			regula:                  $( "[data-constraints]" ),
			owl:                     $( ".owl-carousel" ),
			isotope:                 $( ".isotope" ),
			radio:                   $( "input[type='radio']" ),
			checkbox:                $( "input[type='checkbox']" ),
			counter:                 $( ".counter" ),
			pageLoader:              $( "#page-loader" ),
			captcha:                 $( '.recaptcha' ),
			lightGallery:            $( '[data-lightgallery="group"]' ),
			lightGalleryItem:        $( '[data-lightgallery="item"]' ),
			lightDynamicGalleryItem: $( '[data-lightgallery="dynamic"]' ),
			bootstrapDateTimePicker: $( "[data-time-picker]" ),
			slick:                   $( '.slick-slider' )
		};

	// Initialize scripts that require a loaded window
	$window.on('load', function () {
		// Material Parallax
		if ( plugins.materialParallax.length ) {
			if ( !isNoviBuilder && !isIE && !isMobile) {
				plugins.materialParallax.parallax();
			} else {
				for ( var i = 0; i < plugins.materialParallax.length; i++ ) {
					var $parallax = $(plugins.materialParallax[i]);

					$parallax.addClass( 'parallax-disabled' );
					$parallax.css({ "background-image": 'url('+ $parallax.data("parallax-img") +')' });
				}
			}
		}
	});

	/**
	 * Initialize All Scripts
	 */
	$( function () {
		/**
		 * @desc Initialize owl carousel plugin
		 * @param {object} c - carousel jQuery object
		 */
		function initOwlCarousel ( c ) {
			var aliaces = [ "-", "-xs-", "-sm-", "-md-", "-lg-", "-xl-", "-xxl-" ],
				values = [ 0, 480, 576, 768, 992, 1200, 1600 ],
				responsive = {};

			for ( var j = 0; j < values.length; j++ ) {
				responsive[ values[ j ] ] = {};
				for ( var k = j; k >= -1; k-- ) {
					if ( !responsive[ values[ j ] ][ "items" ] && c.attr( "data" + aliaces[ k ] + "items" ) ) {
						responsive[ values[ j ] ][ "items" ] = k < 0 ? 1 : parseInt( c.attr( "data" + aliaces[ k ] + "items" ), 10 );
					}
					if ( !responsive[ values[ j ] ][ "stagePadding" ] && responsive[ values[ j ] ][ "stagePadding" ] !== 0 && c.attr( "data" + aliaces[ k ] + "stage-padding" ) ) {
						responsive[ values[ j ] ][ "stagePadding" ] = k < 0 ? 0 : parseInt( c.attr( "data" + aliaces[ k ] + "stage-padding" ), 10 );
					}
					if ( !responsive[ values[ j ] ][ "margin" ] && responsive[ values[ j ] ][ "margin" ] !== 0 && c.attr( "data" + aliaces[ k ] + "margin" ) ) {
						responsive[ values[ j ] ][ "margin" ] = k < 0 ? 30 : parseInt( c.attr( "data" + aliaces[ k ] + "margin" ), 10 );
					}
				}
			}

			// Enable custom pagination
			if ( c.attr( 'data-dots-custom' ) ) {
				c.on( "initialized.owl.carousel", function ( event ) {
					var carousel = $( event.currentTarget ),
						customPag = $( carousel.attr( "data-dots-custom" ) ),
						active = 0;

					if ( carousel.attr( 'data-active' ) ) {
						active = parseInt( carousel.attr( 'data-active' ) );
					}

					carousel.trigger( 'to.owl.carousel', [ active, 300, true ] );
					customPag.find( "[data-owl-item='" + active + "']" ).addClass( "active" );

					customPag.find( "[data-owl-item]" ).on( 'click', function ( e ) {
						e.preventDefault();
						carousel.trigger( 'to.owl.carousel', [ parseInt( this.getAttribute( "data-owl-item" ) ), 300, true ] );
					} );

					carousel.on( "translate.owl.carousel", function ( event ) {
						customPag.find( ".active" ).removeClass( "active" );
						customPag.find( "[data-owl-item='" + event.item.index + "']" ).addClass( "active" )
					} );
				} );
			}

			if ( c.attr( 'data-nav-custom' ) ) {
				c.on( "initialized.owl.carousel", function ( event ) {
					var carousel = $( event.currentTarget ),
						customNav = $( carousel.attr( "data-nav-custom" ) );

					// Custom Navigation Events
					customNav.find( ".owl-arrow-next" ).click( function ( e ) {
						e.preventDefault();
						carousel.trigger( 'next.owl.carousel' );
					} );
					customNav.find( ".owl-arrow-prev" ).click( function ( e ) {
						e.preventDefault();
						carousel.trigger( 'prev.owl.carousel' );
					} );
				} );
			}


			c.on( "initialized.owl.carousel", function () {
				initLightGalleryItem( c.find( '[data-lightgallery="item"]' ), 'lightGallery-in-carousel' );
			} );

			c.owlCarousel( {
				autoplay:      isNoviBuilder ? false : c.attr( "data-autoplay" ) === "true",
				loop:          isNoviBuilder ? false : c.attr( "data-loop" ) !== "false",
				items:         1,
				center:        c.attr( "data-center" ) === "true",
				dotsContainer: c.attr( "data-pagination-class" ) || false,
				navContainer:  c.attr( "data-navigation-class" ) || false,
				mouseDrag:     isNoviBuilder ? false : c.attr( "data-mouse-drag" ) !== "false",
				nav:           c.attr( "data-nav" ) === "true",
				dots:          c.attr( "data-dots" ) === "true",
				dotsEach:      c.attr( "data-dots-each" ) ? parseInt( c.attr( "data-dots-each" ), 10 ) : false,
				animateIn:     c.attr( 'data-animation-in' ) ? c.attr( 'data-animation-in' ) : false,
				animateOut:    c.attr( 'data-animation-out' ) ? c.attr( 'data-animation-out' ) : false,
				responsive:    responsive,
				navText:       c.attr( "data-nav-text" ) ? $.parseJSON( c.attr( "data-nav-text" ) ) : [],
				navClass:      c.attr( "data-nav-class" ) ? $.parseJSON( c.attr( "data-nav-class" ) ) : [ 'owl-prev', 'owl-next' ]
			} );
		}

		/**
		 * @desc Initialize the gallery with set of images
		 * @param {object} itemsToInit - jQuery object
		 * @param {string} [addClass] - additional gallery class
		 */
		function initLightGallery ( itemsToInit, addClass ) {
			if ( !isNoviBuilder ) {
				$( itemsToInit ).lightGallery( {
					thumbnail: $( itemsToInit ).attr( "data-lg-thumbnail" ) !== "false",
					selector: "[data-lightgallery='item']",
					autoplay: $( itemsToInit ).attr( "data-lg-autoplay" ) === "true",
					pause: parseInt( $( itemsToInit ).attr( "data-lg-autoplay-delay" ) ) || 5000,
					addClass: addClass,
					mode: $( itemsToInit ).attr( "data-lg-animation" ) || "lg-slide",
					loop: $( itemsToInit ).attr( "data-lg-loop" ) !== "false"
				} );
			}
		}

		/**
		 * @desc Initialize the gallery with dynamic addition of images
		 * @param {object} itemsToInit - jQuery object
		 * @param {string} [addClass] - additional gallery class
		 */
		function initDynamicLightGallery ( itemsToInit, addClass ) {
			if ( !isNoviBuilder ) {
				$( itemsToInit ).on( "click", function () {
					$( itemsToInit ).lightGallery( {
						thumbnail: $( itemsToInit ).attr( "data-lg-thumbnail" ) !== "false",
						selector: "[data-lightgallery='item']",
						autoplay: $( itemsToInit ).attr( "data-lg-autoplay" ) === "true",
						pause: parseInt( $( itemsToInit ).attr( "data-lg-autoplay-delay" ) ) || 5000,
						addClass: addClass,
						mode: $( itemsToInit ).attr( "data-lg-animation" ) || "lg-slide",
						loop: $( itemsToInit ).attr( "data-lg-loop" ) !== "false",
						dynamic: true,
						dynamicEl: JSON.parse( $( itemsToInit ).attr( "data-lg-dynamic-elements" ) ) || []
					} );
				} );
			}
		}

		/**
		 * @desc Initialize the gallery with one image
		 * @param {object} itemToInit - jQuery object
		 * @param {string} [addClass] - additional gallery class
		 */
		function initLightGalleryItem ( itemToInit, addClass ) {
			if ( !isNoviBuilder ) {
				$( itemToInit ).lightGallery( {
					selector: "this",
					addClass: addClass,
					counter: false,
					youtubePlayerParams: {
						modestbranding: 1,
						showinfo: 0,
						rel: 0,
						controls: 0
					},
					vimeoPlayerParams: {
						byline: 0,
						portrait: 0
					}
				} );
			}
		}

		/**
		 * Init Bootstrap tooltip
		 * @description  calls a function when need to init bootstrap tooltips
		 */
		function initBootstrapTooltip ( tooltipPlacement ) {
			if ( window.innerWidth < 599 ) {
				plugins.bootstrapTooltip.tooltip( 'destroy' );
				plugins.bootstrapTooltip.tooltip( {
					placement: 'bottom'
				} );
			} else {
				plugins.bootstrapTooltip.tooltip( 'destroy' );
				plugins.bootstrapTooltip.tooltipPlacement;
				plugins.bootstrapTooltip.tooltip();
			}
		}

		/**
		 * isScrolledIntoView
		 * @description  check the element whas been scrolled into the view
		 */
		function isScrolledIntoView ( elem ) {
			if ( !isNoviBuilder ) {
				return elem.offset().top + elem.outerHeight() >= $window.scrollTop() && elem.offset().top <= $window.scrollTop() + $window.height();
			} else {
				return true;
			}
		}

		/**
		 * @desc Attach form validation to elements
		 * @param {object} elements - jQuery object
		 */
		function attachFormValidator(elements) {
			// Custom validator - phone number
			regula.custom({
				name: 'PhoneNumber',
				defaultMessage: 'Invalid phone number format',
				validator: function() {
					if ( this.value === '' ) return true;
					else return /^(\+\d)?[0-9\-\(\) ]{5,}$/i.test( this.value );
				}
			});

			for (var i = 0; i < elements.length; i++) {
				var o = $(elements[i]), v;
				o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
				v = o.parent().find(".form-validation");
				if (v.is(":last-child")) o.addClass("form-control-last-child");
			}

			elements.on('input change propertychange blur', function (e) {
				var $this = $(this), results;

				if (e.type !== "blur") if (!$this.parent().hasClass("has-error")) return;
				if ($this.parents('.rd-mailform').hasClass('success')) return;

				if (( results = $this.regula('validate') ).length) {
					for (i = 0; i < results.length; i++) {
						$this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error");
					}
				} else {
					$this.siblings(".form-validation").text("").parent().removeClass("has-error")
				}
			}).regula('bind');

			var regularConstraintsMessages = [
				{
					type: regula.Constraint.Required,
					newMessage: "The text field is required."
				},
				{
					type: regula.Constraint.Email,
					newMessage: "The email is not a valid email."
				},
				{
					type: regula.Constraint.Numeric,
					newMessage: "Only numbers are required"
				},
				{
					type: regula.Constraint.Selected,
					newMessage: "Please choose an option."
				}
			];


			for (var i = 0; i < regularConstraintsMessages.length; i++) {
				var regularConstraint = regularConstraintsMessages[i];

				regula.override({
					constraintType: regularConstraint.type,
					defaultMessage: regularConstraint.newMessage
				});
			}
		}

		/**
		 * @desc Check if all elements pass validation
		 * @param {object} elements - object of items for validation
		 * @param {object} captcha - captcha object for validation
		 * @return {boolean}
		 */
		function isValidated(elements, captcha) {
			var results, errors = 0;

			if (elements.length) {
				for (var j = 0; j < elements.length; j++) {

					var $input = $(elements[j]);
					if ((results = $input.regula('validate')).length) {
						for (k = 0; k < results.length; k++) {
							errors++;
							$input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
						}
					} else {
						$input.siblings(".form-validation").text("").parent().removeClass("has-error")
					}
				}

				if (captcha) {
					if (captcha.length) {
						return validateReCaptcha(captcha) && errors === 0
					}
				}

				return errors === 0;
			}
			return true;
		}

		/**
		 * @desc Validate google reCaptcha
		 * @param {object} captcha - captcha object for validation
		 * @return {boolean}
		 */
		function validateReCaptcha(captcha) {
			var captchaToken = captcha.find('.g-recaptcha-response').val();

			if (captchaToken.length === 0) {
				captcha
					.siblings('.form-validation')
					.html('Please, prove that you are not robot.')
					.addClass('active');
				captcha
					.closest('.form-wrap')
					.addClass('has-error');

				captcha.on('propertychange', function () {
					var $this = $(this),
						captchaToken = $this.find('.g-recaptcha-response').val();

					if (captchaToken.length > 0) {
						$this
							.closest('.form-wrap')
							.removeClass('has-error');
						$this
							.siblings('.form-validation')
							.removeClass('active')
							.html('');
						$this.off('propertychange');
					}
				});

				return false;
			}

			return true;
		}

		/**
		 * @desc Initialize Google reCaptcha
		 */
		window.onloadCaptchaCallback = function () {
			for (var i = 0; i < plugins.captcha.length; i++) {
				var
					$captcha = $(plugins.captcha[i]),
					resizeHandler = (function() {
						var
							frame = this.querySelector( 'iframe' ),
							inner = this.firstElementChild,
							inner2 = inner.firstElementChild,
							containerRect = null,
							frameRect = null,
							scale = null;

						inner2.style.transform = '';
						inner.style.height = 'auto';
						inner.style.width = 'auto';

						containerRect = this.getBoundingClientRect();
						frameRect = frame.getBoundingClientRect();
						scale = containerRect.width/frameRect.width;

						if ( scale < 1 ) {
							inner2.style.transform = 'scale('+ scale +')';
							inner.style.height = ( frameRect.height * scale ) + 'px';
							inner.style.width = ( frameRect.width * scale ) + 'px';
						}
					}).bind( plugins.captcha[i] );

				grecaptcha.render(
					$captcha.attr('id'),
					{
						sitekey: $captcha.attr('data-sitekey'),
						size: $captcha.attr('data-size') ? $captcha.attr('data-size') : 'normal',
						theme: $captcha.attr('data-theme') ? $captcha.attr('data-theme') : 'light',
						callback: function () {
							$('.recaptcha').trigger('propertychange');
						}
					}
				);

				$captcha.after("<span class='form-validation'></span>");

				if ( plugins.captcha[i].hasAttribute( 'data-auto-size' ) ) {
					resizeHandler();
					window.addEventListener( 'resize', resizeHandler );
				}
			}
		};

		// Google ReCaptcha
		if (plugins.captcha.length) {
			$.getScript("//www.google.com/recaptcha/api.js?onload=onloadCaptchaCallback&render=explicit&hl=en");
		}

		/**
		 * Page loader
		 * @description Enables Page loader
		 */
		if ( plugins.pageLoader.length > 0 ) {
			setTimeout( function () {
				plugins.pageLoader.addClass( "loaded" );
				$window.trigger( "resize" );
			}, 100 );
		}

		/**
		 * Is Mac os
		 * @description  add additional class on html if mac os.
		 */
		if ( navigator.platform.match( /(Mac)/i ) ) $html.addClass( "mac-os" );

		/**
		 * Is Safari
		 * @description  add additional class on html if mac os.
		 */
		if ( isSafari ) $html.addClass( "safari-browser" );

		// Adds some loosing functionality to IE browsers (IE Polyfills)
		if (isIE) {
			if (isIE === 12) $html.addClass("ie-edge");
			if (isIE === 11) $html.addClass("ie-11");
			if (isIE < 10) $html.addClass("lt-ie-10");
			if (isIE < 11) $html.addClass("ie-10");
		}

		/**
		 * Bootstrap Tooltips
		 * @description Activate Bootstrap Tooltips
		 */
		if ( plugins.bootstrapTooltip.length ) {
			var tooltipPlacement = plugins.bootstrapTooltip.attr( 'data-placement' );
			initBootstrapTooltip( tooltipPlacement );
			$( window ).on( 'resize orientationchange', function () {
				initBootstrapTooltip( tooltipPlacement );
			} )
		}

		// Add custom styling options for input[type="radio"]
		if (plugins.radio.length) {
			for (var i = 0; i < plugins.radio.length; i++) {
				$(plugins.radio[i]).addClass("radio-custom").after("<span class='radio-custom-dummy'></span>")
			}
		}

		// Add custom styling options for input[type="checkbox"]
		if (plugins.checkbox.length) {
			for (var i = 0; i < plugins.checkbox.length; i++) {
				$(plugins.checkbox[i]).addClass("checkbox-custom").after("<span class='checkbox-custom-dummy'></span>")
			}
		}

		/**
		 * UI To Top
		 * @description Enables ToTop Button
		 */
		if ( isDesktop && !isNoviBuilder ) {
			$().UItoTop( {
				easingType:     'easeOutQuart',
				scrollSpeed: 0, //remove if css smooth-scroll is not enabled
				containerClass: 'ui-to-top fa fa-angle-up'
			} );
		}

		// RD Navbar
		if ( plugins.rdNavbar.length ) {
			var
				navbar = plugins.rdNavbar,
				aliases = { '-': 0, '-sm-': 768, '-md-': 992, '-lg-': 1200 },
				responsive = {};

			for ( var alias in aliases ) {
				var link = responsive[ aliases[ alias ] ] = {};
				if ( navbar.attr( 'data'+ alias +'layout' ) )          link.layout        = navbar.attr( 'data'+ alias +'layout' );
				if ( navbar.attr( 'data'+ alias +'device-layout' ) )   link.deviceLayout  = navbar.attr( 'data'+ alias +'device-layout' );
				if ( navbar.attr( 'data'+ alias +'hover-on' ) )        link.focusOnHover  = navbar.attr( 'data'+ alias +'hover-on' ) === 'true';
				if ( navbar.attr( 'data'+ alias +'auto-height' ) )     link.autoHeight    = navbar.attr( 'data'+ alias +'auto-height' ) === 'true';
				if ( navbar.attr( 'data'+ alias +'stick-up-offset' ) ) link.stickUpOffset = navbar.attr( 'data'+ alias +'stick-up-offset' );
				if ( navbar.attr( 'data'+ alias +'stick-up' ) )        link.stickUp       = navbar.attr( 'data'+ alias +'stick-up' ) === 'true';
				if ( isNoviBuilder ) link.stickUp = false;
				else if ( navbar.attr( 'data'+ alias +'stick-up' ) )   link.stickUp       = navbar.attr( 'data'+ alias +'stick-up' ) === 'true';
			}

			plugins.rdNavbar.RDNavbar({
				anchorNav: !isNoviBuilder,
				stickUpClone: (plugins.rdNavbar.attr("data-stick-up-clone") && !isNoviBuilder) ? plugins.rdNavbar.attr("data-stick-up-clone") === 'true' : false,
				responsive: responsive,
				callbacks: {
					onStuck: function () {
						var navbarSearch = this.$element.find('.rd-search input');

						if (navbarSearch) {
							navbarSearch.val('').trigger('propertychange');
						}
					},
					onDropdownOver: function () {
						return !isNoviBuilder;
					},
					onUnstuck: function () {
						if (this.$clone === null)
							return;

						var navbarSearch = this.$clone.find('.rd-search input');

						if (navbarSearch) {
							navbarSearch.val('').trigger('propertychange');
							navbarSearch.trigger('blur');
						}

					}
				}
			});
		}

		// Isotope
		if ( plugins.isotope.length ) {
			var isogroup = [];
			for ( var i = 0; i < plugins.isotope.length; i++ ) {
				var isotopeItem = plugins.isotope[ i ],
					isotopeInitAttrs = {
						itemSelector: '.isotope-item',
						layoutMode:   isotopeItem.getAttribute( 'data-isotope-layout' ) ? isotopeItem.getAttribute( 'data-isotope-layout' ) : 'masonry',
						filter:       '*'
					};

				if ( isotopeItem.getAttribute( 'data-column-width' ) ) {
					isotopeInitAttrs.masonry = {
						columnWidth: parseFloat( isotopeItem.getAttribute( 'data-column-width' ) )
					};
				} else if ( isotopeItem.getAttribute( 'data-column-class' ) ) {
					isotopeInitAttrs.masonry = {
						columnWidth: isotopeItem.getAttribute( 'data-column-class' )
					};
				}

				var iso = new Isotope( isotopeItem, isotopeInitAttrs );
				isogroup.push( iso );
			}


			setTimeout( function () {
				for ( var i = 0; i < isogroup.length; i++ ) {
					isogroup[ i ].element.className += " isotope--loaded";
					isogroup[ i ].layout();
				}
			}, 200 );

			var resizeTimout;

			$( "[data-isotope-filter]" ).on( "click", function ( e ) {
				e.preventDefault();
				var filter = $( this );
				clearTimeout( resizeTimout );
				filter.parents( ".isotope-filters" ).find( '.active' ).removeClass( "active" );
				filter.addClass( "active" );
				var iso = $( '.isotope[data-isotope-group="' + this.getAttribute( "data-isotope-group" ) + '"]' ),
					isotopeAttrs = {
						itemSelector: '.isotope-item',
						layoutMode:   iso.attr( 'data-isotope-layout' ) ? iso.attr( 'data-isotope-layout' ) : 'masonry',
						filter:       this.getAttribute( "data-isotope-filter" ) === '*' ? '*' : '[data-filter*="' + this.getAttribute( "data-isotope-filter" ) + '"]'
					};
				if ( iso.attr( 'data-column-width' ) ) {
					isotopeAttrs.masonry = {
						columnWidth: parseFloat( iso.attr( 'data-column-width' ) )
					};
				} else if ( iso.attr( 'data-column-class' ) ) {
					isotopeAttrs.masonry = {
						columnWidth: iso.attr( 'data-column-class' )
					};
				}
				iso.isotope( isotopeAttrs );
			} ).eq( 0 ).trigger( "click" )
		}

		/**
		 * WOW
		 * @description Enables Wow animation plugin
		 */
		if ( isDesktop && !isNoviBuilder && $html.hasClass( "wow-animation" ) && $( ".wow" ).length ) {
			new WOW().init();
		}

		/**
		 * Slick carousel
		 * @description  Enable Slick carousel plugin
		 */
		if ( plugins.slick.length ) {
			var i;
			for ( i = 0; i < plugins.slick.length; i++ ) {
				var $slickItem = $( plugins.slick[ i ] );

				$slickItem.on( 'init', function ( slick ) {
					initLightGallery( $( '[data-lightgallery="group-slick"]' ), 'lightGallery-in-carousel' );
					initLightGallery( $( '[data-lightgallery="item-slick"]' ), 'lightGallery-in-carousel' );
				} );

				$slickItem.slick( {
					slidesToScroll: parseInt( $slickItem.attr( 'data-slide-to-scroll' ) ) || 1,
					asNavFor:       $slickItem.attr( 'data-for' ) || false,
					dots:           $slickItem.attr( "data-dots" ) == "true",
					infinite:       isNoviBuilder ? false : $slickItem.attr( "data-loop" ) == "true",
					focusOnSelect:  false,
					arrows:         $slickItem.attr( "data-arrows" ) == "true",
					swipe:          $slickItem.attr( "data-swipe" ) == "true",
					autoplay:       isNoviBuilder ? false : $slickItem.attr( "data-autoplay" ) == "true",
					centerMode:     $slickItem.attr( "data-center-mode" ) == "true",
					centerPadding:  $slickItem.attr( "data-center-padding" ) ? $slickItem.attr( "data-center-padding" ) : '0.50',
					mobileFirst:    true,
					responsive:     [
						{
							breakpoint: 0,
							settings:   {
								slidesToShow: parseInt( $slickItem.attr( 'data-items' ) ) || 1,
								swipe:        $slickItem.attr( 'data-swipe' ) || false
							}
						},
						{
							breakpoint: 479,
							settings:   {
								slidesToShow: parseInt( $slickItem.attr( 'data-xs-items' ) ) || 1,
								swipe:        $slickItem.attr( 'data-xs-swipe' ) || false
							}
						},
						{
							breakpoint: 767,
							settings:   {
								slidesToShow: parseInt( $slickItem.attr( 'data-sm-items' ) ) || 1,
								swipe:        $slickItem.attr( 'data-sm-swipe' ) || false
							}
						},
						{
							breakpoint: 992,
							settings:   {
								slidesToShow: parseInt( $slickItem.attr( 'data-md-items' ) ) || 1,
								swipe:        $slickItem.attr( 'data-md-swipe' ) || false
							}
						},
						{
							breakpoint: 1200,
							settings:   {
								slidesToShow: parseInt( $slickItem.attr( 'data-lg-items' ) ) || 1,
								swipe:        $slickItem.attr( 'data-lg-swipe' ) || false
							}
						}
					]
				} )
					.on( 'afterChange', function ( event, slick, currentSlide, nextSlide ) {
						var $this = $( this ),
							childCarousel = $this.attr( 'data-child' );

						if ( childCarousel ) {
							$( childCarousel + ' .slick-slide' ).removeClass( 'slick-current' );
							$( childCarousel + ' .slick-slide' ).eq( currentSlide ).addClass( 'slick-current' );
						}
					} );
			}
		}

		$( '.slick-style-1' ).on( 'click', '.slick-slide', function ( e ) {
			e.stopPropagation();
			var index = $( this ).data( "slick-index" ),
				targetSlider = $( '.slick-style-1' );
			if ( targetSlider.slick( 'slickCurrentSlide' ) !== index ) {
				targetSlider.slick( 'slickGoTo', index );
			}
		} );

		// lightGallery
		if (plugins.lightGallery.length) {
			for (var i = 0; i < plugins.lightGallery.length; i++) {
				initLightGallery(plugins.lightGallery[i]);
			}
		}

		// lightGallery item
		if (plugins.lightGalleryItem.length) {
			// Filter carousel items
			var notCarouselItems = [];

			for (var z = 0; z < plugins.lightGalleryItem.length; z++) {
				if (!$(plugins.lightGalleryItem[z]).parents('.owl-carousel').length &&
					!$(plugins.lightGalleryItem[z]).parents('.swiper-slider').length &&
					!$(plugins.lightGalleryItem[z]).parents('.slick-slider').length) {
					notCarouselItems.push(plugins.lightGalleryItem[z]);
				}
			}

			plugins.lightGalleryItem = notCarouselItems;

			for (var i = 0; i < plugins.lightGalleryItem.length; i++) {
				initLightGalleryItem(plugins.lightGalleryItem[i]);
			}
		}

		// Dynamic lightGallery
		if (plugins.lightDynamicGalleryItem.length) {
			for (var i = 0; i < plugins.lightDynamicGalleryItem.length; i++) {
				initDynamicLightGallery(plugins.lightDynamicGalleryItem[i]);
			}
		}

		// Owl carousel
		if ( plugins.owl.length ) {
			for ( var i = 0; i < plugins.owl.length; i++ ) {
				var c = $( plugins.owl[ i ] );
				plugins.owl[ i ].owl = c;

				initOwlCarousel( c );
			}
		}

		/**
		 * RD Input Label
		 * @description Enables RD Input Label Plugin
		 */
		if ( plugins.rdInputLabel.length ) {
			plugins.rdInputLabel.RDInputLabel();
		}

		/**
		 * Regula
		 * @description Enables Regula plugin
		 */
		if ( plugins.regula.length ) {
			attachFormValidator( plugins.regula );
		}

		// RD Mailform
		if (plugins.rdMailForm.length) {
			var i, j, k,
				msg = {
					'MF000': 'Successfully sent!',
					'MF001': 'Recipients are not set!',
					'MF002': 'Form will not work locally!',
					'MF003': 'Please, define email field in your form!',
					'MF004': 'Please, define type of your form!',
					'MF254': 'Something went wrong with PHPMailer!',
					'MF255': 'Aw, snap! Something went wrong.'
				};

			for (i = 0; i < plugins.rdMailForm.length; i++) {
				var $form = $(plugins.rdMailForm[i]),
					formHasCaptcha = false;

				$form.attr('novalidate', 'novalidate').ajaxForm({
					data: {
						"form-type": $form.attr("data-form-type") || "contact",
						"counter": i
					},
					beforeSubmit: function (arr, $form, options) {

						if (isNoviBuilder)
							return;

						var form = $(plugins.rdMailForm[this.extraData.counter]),
							inputs = form.find("[data-constraints]"),
							output = $("#" + form.attr("data-form-output")),
							captcha = form.find('.recaptcha'),
							captchaFlag = true;

						output.removeClass("active error success");

						if (isValidated(inputs, captcha)) {

							// veify reCaptcha
							if (captcha.length) {
								var captchaToken = captcha.find('.g-recaptcha-response').val(),
									captchaMsg = {
										'CPT001': 'Please, setup you "site key" and "secret key" of reCaptcha',
										'CPT002': 'Something wrong with google reCaptcha'
									};

								formHasCaptcha = true;

								$.ajax({
									method: "POST",
									url: "bat/reCaptcha.php",
									data: {'g-recaptcha-response': captchaToken},
									async: false
								})
									.done(function (responceCode) {
										if (responceCode !== 'CPT000') {
											if (output.hasClass("snackbars")) {
												output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + captchaMsg[responceCode] + '</span></p>')

												setTimeout(function () {
													output.removeClass("active");
												}, 3500);

												captchaFlag = false;
											} else {
												output.html(captchaMsg[responceCode]);
											}

											output.addClass("active");
										}
									});
							}

							if (!captchaFlag) {
								return false;
							}

							form.addClass('form-in-process');

							if (output.hasClass("snackbars")) {
								output.html('<p><span class="icon text-middle fa fa-circle-o-notch fa-spin icon-xxs"></span><span>Отправляем</span></p>');
								output.addClass("active");
							}

							var formdata = collectData();

							// exclude "кесельман" from lyrics and music
							var keyword = "кесельман";
							if (
							  (formdata['lyrics'] != null && formdata['lyrics'].toLowerCase().includes(keyword.toLowerCase())) ||
							  (formdata['music'] != null && formdata['music'].toLowerCase().includes(keyword.toLowerCase()))
							) {
							  throw new Error('Forbidden content: "Кесельман" found in lyrics or music.');
							}
														
							formdata["id"] = Date.now()+genRanHex(6);
							formdata["time"] = fullDate(new Date());
							formdata["show"] = 1;
							formdata["name"] = formdata["name"].replace(/"/g,"");
							updateSheets(formdata,"nomination");
						} else {
							return false;
						}
					},
					error: function (result) { /* there's no actual form submit because it's JS only
						if (isNoviBuilder)
							return;

						var output = $("#" + $(plugins.rdMailForm[this.extraData.counter]).attr("data-form-output")),
							form = $(plugins.rdMailForm[this.extraData.counter]);

						output.text(msg[result]);
						form.removeClass('form-in-process');

						if (formHasCaptcha) {
							grecaptcha.reset();
						} */
					},
					success: function (result) { /* there's no actual form submit because there's JS only 
						if (isNoviBuilder)
							return;

						var form = $(plugins.rdMailForm[this.extraData.counter]),
							output = $("#" + form.attr("data-form-output")),
							select = form.find('select');

						form
							.addClass('success')
							.removeClass('form-in-process');

						if (formHasCaptcha) {
							grecaptcha.reset();
						}

						result = result.length === 5 ? result : 'MF255';
						output.text(msg[result]);

						if (result === "MF000") {
							if (output.hasClass("snackbars")) {
								output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + msg[result] + '</span></p>');
							} else {
								output.addClass("active success");
							}
						} else {
							if (output.hasClass("snackbars")) {
								output.html(' <p class="snackbars-left"><span class="icon icon-xxs mdi mdi-alert-outline text-middle"></span><span>' + msg[result] + '</span></p>');
							} else {
								output.addClass("active error");
							}
						}

						form.clearForm();

						if (select.length) {
							select.select2("val", "");
						}

						form.find('input, textarea').trigger('blur');

						setTimeout(function () {
							output.removeClass("active error success");
							form.removeClass('success');
						}, 3500); */
					}
				});
			}
		}

		/**
		 * jQuery Count To
		 * @description Enables Count To plugin
		 */
		if ( plugins.counter.length ) {
			var i;

			for ( i = 0; i < plugins.counter.length; i++ ) {
				var $counterNotAnimated = $( plugins.counter[ i ] ).not( '.animated' );
				$document
					.on( "scroll", $.proxy( function () {
						var $this = this;

						if ( (!$this.hasClass( "animated" )) && (isScrolledIntoView( $this )) ) {
							$this.countTo( {
								refreshInterval: 40,
								from:            0,
								to:              parseInt( $this.text(), 10 ),
								speed:           $this.attr( "data-speed" ) || 1000,
								formatter:       function ( value, options ) {
									if ( $this.attr( 'data-zero' ) == 'true' ) {
										value = value.toFixed( options.decimals );
										if ( value < 10 ) {
											return '0' + value;
										}
										return value;
									} else {
										return value.toFixed( options.decimals );
									}
								}
							} );
							$this.addClass( 'animated' );
						}
					}, $counterNotAnimated ) )
					.trigger( "scroll" );
			}
		}

		/**
		 * Bootstrap Date time picker
		 */
		if ( plugins.bootstrapDateTimePicker.length ) {
			var i;
			for ( i = 0; i < plugins.bootstrapDateTimePicker.length; i++ ) {
				var $dateTimePicker = $( plugins.bootstrapDateTimePicker[ i ] );
				var options = {};

				options[ 'format' ] = 'dddd DD MMMM YYYY - HH:mm';
				if ( $dateTimePicker.attr( "data-time-picker" ) == "date" ) {
					options[ 'format' ] = 'dddd DD MMMM YYYY';
					options[ 'minDate' ] = new Date();
				} else if ( $dateTimePicker.attr( "data-time-picker" ) == "time" ) {
					options[ 'format' ] = 'HH:mm';
				}

				options[ "time" ] = ($dateTimePicker.attr( "data-time-picker" ) != "date");
				options[ "date" ] = ($dateTimePicker.attr( "data-time-picker" ) != "time");
				options[ "shortTime" ] = true;

				$dateTimePicker.bootstrapMaterialDatePicker( options );
			}
		}

		// Copyright Year (Evaluates correct copyright year)
		if ( plugins.copyrightYear.length ) {
			plugins.copyrightYear.text( initialDate.getFullYear() );
		}

	} );
}());

function alert_message(msg) {
	var output = $("#" + $(".rd-mailform").attr("data-form-output"));
	if (output.hasClass("snackbars")) {
		output.html('<p><span class="icon text-middle fa fa-circle-o-notch fa-spin icon-xxs"></span><span>'+msg+'</span></p>');
		output.addClass("active");
	}
}

function collectData()
{
	var formdata = {};
	$("#nominate-form .form-input").each(function(index) {
		formdata[String($(this).attr('name'))] = $(this).attr('value');
	});
	return formdata;
}

function updateSheets(formdata, sheet) {
	if (sheet == "nomination") var g_url = "https://script.google.com/macros/s/AKfycbxVv3Xofr3fW4kVYHZJ8yibvy7A8x_seiiy4FikZCiuwFk-rHQqcn4GZPhRmBC59eKY/exec";
	if (sheet == "rate") var g_url = "https://script.google.com/macros/s/AKfycbz8ocstX-X0WF7_Nf185aR7hY8AxAjvjiB4nK0Gdivyf45rrqWM0nJhEb5XmG_njQxa/exec"
	if (sheet == 'like') var g_url = "https://script.google.com/macros/s/AKfycbxYjxAxPKnV7GkhZLyE2xMQwT91YadVUUah1DPuqvOsZZ3A_rIwqREbpx9ojed48WwhbQ/exec";
	
	fetch(g_url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams(formdata)
	})
	.then(response => response.json())
	.then(data => {
		if (sheet == "nomination") formClear(true,"Песня успешно номинирована!"); 
		if (sheet == "rate") {
			formClear(true, "Ваш голос учтен!");
			setCookie(formdata['id'], formdata['stars'], 365);

			//votes_by_id[formdata['id']]['votes']++;
			if (formdata['id'] !== undefined) {
			    const id = formdata['id'];
			    if (!votes_by_id[id]) {
			        votes_by_id[id] = { votes: 0 };
			    }
			    votes_by_id[id].votes++;
			} else {
			    console.error('formdata["id"] is undefined');
			}			
			
			votes_by_id[formdata['id']]['total'] = votes_by_id[formdata['id']]['total'] + parseInt(formdata['stars']);
			$(".post-boxed__stars[rate-id='" + formdata['id'] + "']").attr("class", ("post-boxed__stars voted " +getRating(formdata['id'])));
		}
		if (sheet=="like") {
			showMsg("Лайк отправлен!", "success");
			setCookie(formdata['id'], true, 365);
			likes_by_id[formdata['id']]++;
		}
	}).catch(error => {
		if (sheet == "nomination") formClear(false, "Не удалось добавить данные", true, false); 
		if (sheet == "rate") formClear("Перезагрузите страницу и попробуйте еще раз!", false); 
		if (sheet == "like") showMsg("Перезагрузите страницу и попробуйте еще раз!", "error");
	});
}

function formClear(status, success_message, required=true, reset=true) {
	var form = $(".rd-mailform"),
	output = $("#" + form.attr("data-form-output"));

	if (status == required) {
		var cls = "success", msg = success_message, icon = "mdi-check";
	} else {
		var cls = "error", msg = "Ошибка: "+String(status), icon = "mdi-alert-outline";
	}

	form.addClass(cls).removeClass('form-in-process');

	if (reset) form.trigger('reset');

	output.text(msg);

	if (output.hasClass("snackbars")) {
		output.html('<p><span class="icon text-middle mdi '+icon+' icon-xxs"></span><span>' + msg + '</span></p>');
	} else {
		output.addClass("active "+cls);
	}

	setTimeout(function () {
		output.removeClass("active");
	}, 3500);
}

function readSheets(sheet_url, success_function, target_table) {
	var xhr = $.ajax({
		url: sheet_url,
		dataType: "text"
	}).success(
		function (data) {
			var sheet_data = data.split(/\r?\n|\r/);
			var keys = sheet_data[0].split('\t');
			var show_id = -1;
			for (var i = 0; i < keys.length; i++) if (keys[i]=='show') { show_id = i; break; }
			var new_data = [];
			for (var i = 1; i < sheet_data.length; i++)
    		{
				var tmp = sheet_data[i].split('\t');
				if (tmp[show_id]=="1")
				{
					sheet_data[i] = {};
					for (var j=0; j<keys.length-1; j++) {
						sheet_data[i][keys[j]] = tmp[j];
					}
					new_data.push(sheet_data[i]);
				}
			}
			success_function(new_data, target_table);
		}
	).error (
		function (xhr) { return false; }
	);
}

function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function getRating(id,type='css') {
	if (votes_by_id[id]) {
		if (type=='css') return "stars-"+Math.round(votes_by_id[id]['total']/votes_by_id[id]['votes']/0.5)*5;
		if (type=='exact') return Math.round(votes_by_id[id]['total']/votes_by_id[id]['votes']*100)/100;
		if (type=='total') return votes_by_id[id]['total'];
		if (type=='votes') return votes_by_id[id]['votes'];
	} else {
		if ((type=='votes')||(type=='exact')) return 0;
		return "";
	}
}

function processNominations(data,target_table) {
	if (data.length<1) {
		target_table.closest('.fixed-height').addClass('hide');
		target_table.closest('.post-boxed__main').find('.table-header').addClass('hide');
		target_table.closest('.cell-md-6').removeClass('loading');
		$("#music-trophy").removeClass('hide');
		return;
	}
	var row = target_table.find("tr");
	row = row.eq(row.length-1);
	var n = row.length-1;
	for (var i = data.length - 1; i >= 0; i--) {
		row.find(".cell-name").eq(0).text(data[i]["name"].trim());
		var author = (data[i]["music"]==data[i]["lyrics"]) ? data[i]["music"] : data[i]["music"] + "&nbsp;/ " + data[i]["lyrics"];
		if (author != null && author.toLowerCase().includes('кесельман'.toLowerCase())) continue;
 		row.find(".cell-author").eq(0).html(author);
		var rater = row.find(".cell-rate .post-boxed__stars").eq(0);
		rater.attr("class","post-boxed__stars");
		if (getCookie(data[i]["id"])!="") rater.addClass('voted');
		rater.attr("rate-id",data[i]["id"]);
		rater.attr("data-toggle","modal");
		rater.attr("data-target","#exampleModal");
		rater.addClass(getRating(data[i]["id"]));
		if (data[i]["link"]!="") {
			row.find(".cell-link a").eq(0).attr("href",data[i]["link"]);
		}
		else row.find(".cell-link a").eq(0).addClass("hide");
		target_table.find("tbody").append("<tr>"+row.html()+"</tr>");
	}
	row.remove();
	target_table.closest('.cell-md-6').removeClass('loading');
	target_table.removeClass('hide');
	if (target_table.outerHeight()<300) target_table.closest('.post-boxed__main').find('th.cell-rate').addClass('smaller');

	$(".post-boxed__stars").each( function() {
		$(this).find("span").each( function(index) {
			$(this).on("click", function() {
				var id = $(this).closest(".post-boxed__stars").attr("rate-id");
				var name = "«" + $(this).closest("tr").find('.cell-name').text()+"»";
				var author = $(this).closest("tr").find('.cell-author').text();
				$("#modal-name").text(name);
				$("#modal-author").text(author);
				$("#modal-votes").text(getRating(id,'votes'));
				$("#modal-average").text(getRating(id,'exact'));
				if (!$(".post-boxed__stars[rate-id='"+id+"']").hasClass('voted'))
				{
					$("#radio-container").removeClass('hide');
					$("#your-vote").addClass('hide');
					$("#modal-submit").text = "Голосовать";
					$("input:radio[name=vote]").eq(index).attr("checked",true);
					$("#modal-submit").on("click", function() {
						var vote = $("input:radio[name='vote']:checked").val();
						var formdata = { 'id' : id, 'stars' : vote, 'ip_address' : user_ip, 'time' : fullDate(new Date()) };
						updateSheets(formdata,'rate');
						alert_message('Отправляем оценку');
						$('#modal_closer').trigger('click');
						$(".post-boxed__stars[rate-id='"+formdata['id']+"']").addClass('voted');
					// else { $('#exampleModal').modal('toggle'); alert("вы уже проголосовали за эту песню!");  }
						//alert(id + ":" + vote + ":" + name + ":" + author);
					});
				} else {
					$("#radio-container").addClass('hide');
					$("#your-vote").removeClass('hide');
					$("#modal-submit").text = "Закрыть";
					$("#modal-submit").on("click", function() { $('#modal_closer').trigger('click'); });

				}
			});
			$(this).hover(function() {
				$(this).closest(".post-boxed__stars").addClass("stars-"+(index+1));
			},
			function () {
				$(this).closest(".post-boxed__stars").removeClass("stars-"+(index+1));
			});
		});
	} );

}

function fullDate(now) {
	var result = new Date().toLocaleString("en-US", {timeZone: "America/Los_Angeles"});
	return result;
}

var user_ip = "";
$.getJSON("https://api.ipify.org?format=json", function(data) {	user_ip = data.ip;});

$('.rd-navbar-nav .inline').click(function() {
	$('.rd-navbar-toggle').trigger('click');
});
