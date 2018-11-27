$(document).ready(function(){ 

	document.getElementById("CreationButton").onclick = function(){

		var name = document.getElementById("username").value;
		var password = document.getElementById("password").value;
		var repassword = document.getElementById("repassword").value;

		if(password === repassword){
			var account = {
				username:name,
				password:repassword
			};

			$.ajax({
				url:'/CreateAccount',
				data:account
			}).done(function(data) {
				/*
  				document.cookie = data.cookie;
    			if(document.cookie === "true"){
    				window.location.href = '/AfterLoginPage';
    			} 
    			else{
    				document.getElementById("PasswordInput").value = "";
    			}
    			*/
			});
		}

		return false;
	};



});