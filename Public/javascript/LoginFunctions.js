$(document).ready(function(){ 
	if(document.cookie != ""){
		window.location.href = '/AfterLoginPage';
	}
    // your code
    document.getElementById("LoginButton").onclick = function(){
    	
		
    	var username = document.getElementById("UsernameInput").value;
    	var password = document.getElementById("PasswordInput").value;

		var req = {
			username:'username',
			password:'password'
		};
		req.username = username;
		req.password = password;

		$.ajax({
			url:'/Login',
			data:req
		}).done(function(data) {
  			
    		if(data.passed === "true"){
    			document.cookie = data.cookie;
    			window.location.href = '/AfterLoginPage';
    		} 
    		else{
    			document.cookie = "";
    			document.getElementById("PasswordInput").value = "";
    		}
		});
    	/*
		if(username === "user" && password === "password"){

			document.cookie="true";
			//document.location = 'After Login Page.html';
			window.location.href = '/AfterLoginPage';
		}
		else{
			document.getElementById("PasswordInput").value = "";
		}
		*/
		return false;	
	};  
});