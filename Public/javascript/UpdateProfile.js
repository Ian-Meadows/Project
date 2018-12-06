$(document).ready(function(){

	var req = {
		username: document.cookie
	};

	var userInput = getElementById("usernameInput");
	var emailInput = getElementById("emailInput");
	var passwordInput = getElementById("passwordInput");

	var userData;

	$.ajax({
			url:'/GetUserData',
			data:req
		}).done(function(data) {
			if(data.success == "true"){
				userData = data.message;
  				console.log(data);

  				userInput.value = userData[0].username;
  				emailInput.value = userData[0].email;

			}
			else{
				alert(data.message);
			}
			
  			
		});

	

});