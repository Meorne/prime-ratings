(function($) {
	'use strict';
	
	var $body = $('body');
	$body.on('ratings.load',function(e, query) {
		$.getJSON('http://www.omdbapi.com/', query, function(data) {
			$body.trigger('ratings.return', [data]);
		});
	});
})(window.jQuery);