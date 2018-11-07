window.onload = function(){ 
	if(document.cookie === "true"){
		document.location = 'After Login Page.html';
	}
    // your code
    document.getElementById("LoginButton").onclick = function(){
    	
		
    	var username = document.getElementById("UsernameInput").value;
    	var password = document.getElementById("PasswordInput").value;
		if(username === "user" && password === "password"){

			var currentLoc = document.location; 

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