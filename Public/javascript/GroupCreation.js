$(document).ready(function(){ 

	document.getElementById("CreationButton").onclick = function(){

		var name = document.getElementById("GroupName").value;
		var password = document.getElementById("GroupPassword").value;
		var des = document.getElementById("GroupDescription").value;
		var numUsers = document.getElementById("GroupUsers").value;

		if(name != ''){
			var req = {
				GroupName:name,
				GroupPassword:password,
				GroupDes:des,
				GroupUsers:numUsers,
				username: document.cookie
			};

			console.log(req)

			$.ajax({
				url:'/CreateGroup',
				data:req
			}).done(function(data) {
				/*
  				document.cookie = data.cookie;
    			if(document.cookie === "true"){
    				window.location.href = '/AfterLoginPage';
    			} 
    			else{
    				document.getElementById("PasswordInput").value = "";
    			}
    			*/
			});
		}

		return false;
	};



});