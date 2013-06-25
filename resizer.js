var imgresizer = {};

(function() {
	var container, image, dimensions, position = {};

	function drag(event) {
		var y = (event.clientY - position.top),
			x = (event.clientX - position.left);

		if (y < 0 && (y + image.height()) > container.height()) {
			image.css({'marginTop' : y + 'px'});
		}
		
		if (x < 0 && (x + image.width()) > container.width()) {
			image.css({'marginLeft' : x + 'px'});
		}
		
	}

	imgresizer.init = function(element) {
		container = jQuery(element);
		image = container.children('img');

		container
			.on('mousedown', function(event) {
				position.top = event.clientY - parseInt(image.css('marginTop')) - image.position().top;
				position.left = event.clientX - parseInt(image.css('marginLeft')) - image.position().left;

				jQuery(window).on('mousemove', drag)
					.mouseup(function() {
						jQuery(window).off('mousemove', drag);
					});
			})
			.on('dragstart', function() {
				return false;
			});

	};

	imgresizer.getPosition = function() {
		return {
			x: parseInt(image.css('marginTop')),
			y: parseInt(image.css('marginLeft'))
		}
	}
	
}());
