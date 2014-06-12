(function($){

	//Validate Forms
	function FlipSwitchManager(el, options) {

		this.html_text = '<div class="flipswitch_holder">\
							<div class="flipswitch_container">\
								<div class="flipswitch_option flipswitch_option1">\
									ON\
								</div>\
								<div class="flipswitch_option center">\
									<div class="flipswitch_center_left"></div>\
									<div class="flipswitch_center_right"></div>\
								</div>\
								<div class="flipswitch_option flipswitch_option2">\
									OFF\
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

		this.$control = null;
	}

	// Separate functionality from object creation
	FlipSwitchManager.prototype = {

		init: function() {
			var _this = this;

			_this.$control = $( _this.html_text );
			_this.$control.data( 'control', this.$el );
			$( '.flipswitch_option1', _this.$control ).html( _this.$el.data( 'on_text' ) );
			$( '.flipswitch_option2', _this.$control ).html( _this.$el.data( 'off_text' ) );
			if ( !_this.$el.attr( 'checked' ) ) {
				$( '.flipswitch_option1', _this.$control ).hide();
			}
			_this.$control.insertAfter( _this.$el );
			this.$el.hide();

			_this.$control.click( function() {
				$( '.flipswitch_option1', _this.$control ).animate({ width:'toggle'} );
				_this.$el.attr( 'checked', !_this.$el.attr( 'checked' ) );
			});
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
