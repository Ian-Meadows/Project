$(document).ready(function(){

	document.getElementById("JoinGroup").onclick = function(){

		var groupPassword = "";

		var groupName = document.getElementById("GroupName").value;
    	groupPassword = document.getElementById("GroupPassword").value;

    	var req = {
    		groupName:groupName,
    		password:groupPassword,
    		username:document.cookie
    	};




		$.ajax({
			url:'/JoinGroup',
			data:req
		}).done(function(data) {
    		if(data.message === "true"){
    			window.location.href = '/GroupList';
    		} 
    		else{
    			alert(data.message);
    			document.getElementById("GroupPassword").value = "";
    		}
		});

		/*
		if(groupName === "group" && groupPassword === "password"){
			window.location.href = '/GroupPage';
		}
		else{
			document.getElementById("GroupPassword").value = "";
		}
		*/
		return false;
	}
});