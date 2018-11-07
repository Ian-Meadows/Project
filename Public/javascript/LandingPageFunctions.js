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
		var currentLoc = document.location;
		if(cookie == "true"){
			//document.location = currentLoc+'AfterLoginPage';
			window.location.href = '/AfterLoginPage';
		}
		else{
			//document.location = currentLoc+'LoginPage';
			window.location.href = '/LoginPage';
		}
		return false;
	};



};