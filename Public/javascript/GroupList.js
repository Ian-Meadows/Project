$(document).ready(function() {
	var req = {
		username: document.cookie
	};
	$.ajax({
			url:'/GetGroups',
			data:req
		}).done(function(data) {
  			document.cookie = data.cookie;
    		if(document.cookie === "true"){
    			window.location.href = '/AfterLoginPage';
    		} 
    		else{
    			document.getElementById("PasswordInput").value = "";
    		}
		});
});