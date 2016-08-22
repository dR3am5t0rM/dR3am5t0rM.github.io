var logger = {
	node: $("#logger"),
	log: function(message) {
		var log = document.createElement("div");
		$(log).addClass("log")
			  .html(message);

		$("#logger").append(log);

		//scroll to bottom
		$("#logger").scrollTop($("#logger")[0].scrollHeight)

		//remove if too many logs
		if ($("#logger").children().length > 7) {
			$("#logger").find(":first-child").remove();
		}
	},

	clear: function() {
		logger.node.html("");
	}	
};