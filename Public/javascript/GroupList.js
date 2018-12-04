$(document).ready(function() {
	var req = {
		username: document.cookie
	};
	$.ajax({
			url:'/GetGroups',
			data:req
		}).done(function(data) {
  			if (data.success === "true") {
  				
  			}
		});
});