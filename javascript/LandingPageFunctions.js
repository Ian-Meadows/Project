window.onload = function(){ 
	
	var p = document.getElementById("ButtonText");
	var cookie = document.cookie;
	if(cookie == "true"){
		p.innerHTML = "Profile";
	}
	else{
		p.innerHTML = "Login";
	}

	document.getElementById("LoginButton").onclick = function(){
		if(cookie == "true"){
			document.location = 'After Login Page.html';
		}
		else{
			document.location = 'Login Page.html';
		}
		return false;
	};



};