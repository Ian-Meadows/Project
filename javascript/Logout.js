window.onload = function{
	document.getElementById("LogoutButton").onclick = function(){
		Logout();
	};
};

Logout = function(){
	document.cookie="";
}