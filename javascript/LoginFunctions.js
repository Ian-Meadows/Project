window.onload = function(){ 
    // your code
    document.getElementById("LoginButton").onclick = function(){
    	
		
    	var username = document.getElementById("UsernameInput").value;
    	var password = document.getElementById("PasswordInput").value;
		if(username == "user" && password == "password"){
			document.location = 'Profile Page.html';
		}
		return false;	
	};  
};

