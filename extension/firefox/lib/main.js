var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

var Request = require("sdk/request").Request;

var any = /.*\.amazon\..*/;

pageMod.PageMod({
	include: [any],
	contentScriptFile: [
						data.url("components/jquery.min.js"),
						data.url("firefox.js"),
						data.url("shared/inject.js")
					],
	contentStyleFile: [
						data.url("shared/inject.css")
					],
	contentScriptWhen: "ready",
	onAttach: function(worker) {
		worker.port.on('ratings.load', function(query) {
			Request({
				url: 'http://www.omdbapi.com/',
				content: query,
				overrideMimeType: "application/json; charset=utf-8",
				onComplete: function (response) {
					worker.port.emit('ratings.return', response.json);
				}
			}).get();
		});
	}
});