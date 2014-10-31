(function($){

	//Validate Forms
	function FlipSwitchManager(el, options) {

		this.html_text = '<div class="flipswitch_holder ui-widget-content ui-corner-all ui-state-default">\
							<div class="flipswitch_container">\
								<div class="flipswitch_option flipswitch_option1">\
									<p>YES</p>\
								</div>\
								<div class="flipswitch_option center">\
									<div class="flipswitch_center_left"></div>\
									<div class="flipswitch_center_right"></div>\
								</div>\
								<div class="flipswitch_option flipswitch_option2">\
									<p>NO</p>\
								</div>\
							</div>\
						</div>';

		//Defaults:
		this.defaults = {
			custom_item_selector: false		// If the user is going to implement a custom dialog / new page when an item is selected
		};

		//Extending options:
		this.opts = $.extend({}, this.defaults, options);

		//Privates:
		this.$el = $(el);

		// The control displayed on screen (the actual switch)
		this.$control = null;

		// The type of element the result should be stored in (textbox / checkbox)
		this.element_type = null;
	}

	// Separate functionality from object creation
	FlipSwitchManager.prototype = {

		init: function() {
			var _this = this;

			// Find if we are working on a textbox or checkbox
			_this.element_type = _this.$el.attr( 'type' );

			// Create the actual flipswitch
			_this.$control = $( _this.html_text );
			_this.$control.addClass( 'h2' );
			if ( _this.$el.data( 'switch_width' ) == 'narrow' ) {
				_this.$control.addClass( 'narrow' );
			}
			if ( _this.$el.data( 'switch_width' ) == 'wide' ) {
				_this.$control.addClass( 'wide' );
			}
			// Note on the new control the original element
			_this.$control.data( 'control', this.$el );

			// Set the text to be displayed
			$( '.flipswitch_option1 p', _this.$control ).html( _this.$el.data( 'on_text' ) );
			$( '.flipswitch_option2 p', _this.$control ).html( _this.$el.data( 'off_text' ) );

			if ( !_this._get_value() ) {
				$( '.flipswitch_option1', _this.$control ).hide();
			}
			_this.$control.insertAfter( _this.$el );
			this.$el.hide();

			_this.$control.click( function() {
				$( '.flipswitch_option1', _this.$control ).animate({ width:'toggle'} );
				_this._set_value( !_this._get_value() );
				_this.$el.trigger( 'change' );
			});
		},

		/**
		 * Returns true / false over the value in the original element
		 * @returns {Boolean}
		 */
		_get_value: function() {

			_this = this;

			if ( _this.element_type == 'checkbox' ) {
				return _this.$el.prop( 'checked' );
			}
			else {
				return _this.$el.val() == 1;
			}

		},

		_set_value: function( value ) {

			_this = this;

			if ( _this.element_type == 'checkbox' ) {
				return _this.$el.prop( 'checked', value );
			}
			else {
				return _this.$el.val( value ? 1 : 0 );
			}
		},

		// User accessible function to set value
		set_value: function( value ) {
			var _this = this;

			// If the value currently held isn't what is to be set
			if ( _this._get_value() != value ) {
				// Trigger a change
				_this.$control.trigger( 'click' );
			}
		}
	};

	// The actual plugin
	$.fn.flipSwitchManager = function(param1, param2) {
		if(this.length) {
			this.each(function() {
				// If we have already been added to the element
				if ($(this).hasClass('hasFlipSwitchManager')) {
					var FlipSwitchManagerClass = $(this).data('flipSwitchManager');
					FlipSwitchManagerClass[param1](param2);
				}
				else {
					// Create a new validator and add it to the element
					var rev = new FlipSwitchManager(this, param1);
					rev.init();
					$(this).data('flipSwitchManager', rev);
					$(this).addClass('hasFlipSwitchManager');
				}
			});
		}
	};
})(jQuery);
