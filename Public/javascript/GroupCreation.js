$(document).ready(function(){ 

	document.getElementById("CreationButton").onclick = function(){

		var password = '';
		var name = '';

		var name = document.getElementById("GroupName").value;
		password = document.getElementById("GroupPassword").value;

		if(name != ''){
			var req = {
				GroupName:name,
				GroupPassword:password
			};

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