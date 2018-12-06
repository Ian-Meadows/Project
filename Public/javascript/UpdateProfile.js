$(document).ready(function(){

	var req = {
		username: document.cookie
	};

	var userInput;
	var emailInput;


	$.ajax({
			url:'/GetUserData',
			data:req
		}).done(function(data) {
  			console.log(data);
  			
		});

});