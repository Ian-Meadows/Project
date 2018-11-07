$(document).ready(function(){

	document.getElementById("JoinGroup").onclick = function(){
		var groupName = document.getElementById("GroupName").value;
    	var groupPassword = document.getElementById("GroupPassword").value;

    	var req = {
    		groupName:'groupName',
    		password:'password'
    	};

    	req.groupName = groupName;
		req.password = groupPassword;




		$.ajax({
			url:'/JoinGroup',
			data:req
		}).done(function(data) {
			alert(data.response);
    		if(data.response === "true"){
    			window.location.href = '/GroupPage';
    		} 
    		else{
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