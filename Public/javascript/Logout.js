function WindowLoaded(){
	
	document.getElementById("LogoutButton").onclick = function(){
	
		Logout();


		window.location.href = '/LoginPage';

		return false;


	};




};

function Logout(){
	document.cookie="";
}

