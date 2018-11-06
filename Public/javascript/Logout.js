function WindowLoaded(){
	
	document.getElementById("LogoutButton").onclick = function(){
	
		Logout();
	};




};

function Logout(){
	document.cookie="";
}

