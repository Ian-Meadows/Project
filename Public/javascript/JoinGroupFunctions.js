window.onload = function(){



	document.getElementById("JoinGroup").onclick = function(){
		var groupName = document.getElementById("GroupName").value;
    	var groupPassword = document.getElementById("GroupPassword").value;

		if(groupName === "group" && groupPassword === "password"){
			
			document.location = 'Group Page.html';

		}
		else{
			document.getElementById("GroupPassword").value = "";
		}
		return false;
	};
};