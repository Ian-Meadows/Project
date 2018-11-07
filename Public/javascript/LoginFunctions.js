window.onload = function(){ 
	if(document.cookie === "true"){
		window.location.href = '/AfterLoginPage';
	}
    // your code
    document.getElementById("LoginButton").onclick = function(){
    	
		
    	var username = document.getElementById("UsernameInput").value;
    	var password = document.getElementById("PasswordInput").value;
		if(username === "user" && password === "password"){

			document.cookie="true";
			//document.location = 'After Login Page.html';
			window.location.href = '/AfterLoginPage';
		}
		else{
			document.getElementById("PasswordInput").value = "";
		}
		return false;	
	};  
};