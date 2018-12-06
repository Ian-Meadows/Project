$(document).ready(function(){

	var req = {
		username: document.cookie
	};

	var userInput = document.getElementById("usernameInput");
	var emailInput = document.getElementById("emailInput");
	var passwordInput = document.getElementById("passwordInput");

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
	document.getElementById("UpdateUser").onclick = function(){
		var password = "";
		password = passwordInput.value;
		var username = userInput.value;
		var email = emailInput.value;

		if(password === ""){
			password = userData[0].password;
		}

		var req = {
			oldUsername:document.cookie,
			username:username,
			email:email,
			password:password
		};

		$.ajax({
			url:'/UpdateUser',
			data:req
		}).done(function(data) {
			if(data.message == "true"){
				document.cookie = username;
				alert("updated accout");

				return true;

			}
			else{
				alert(data.message);
				return true;
			}
		});

	}
	

});