$(document).ready(function() {
	var div = document.getElementById("users");
	var req = {
		groupID: vars['id']
	};
	$.ajax({
			url:'/GetGroupUsers',
			data:req
		}).done(function(data) {
			if(data != "false"){
				ShowUsers(div, data.message);
			}
			else{
				alert("failed to get users");
			}
  			
		});


});


function ShowUsers(div, data){

	for(var i = 0; i < data.length; i++){

		var username = data[i].username;

		var newP = document.createElement("P");

		var text = document.createTextNode(username);
		newP.appendChild(text);

		//newP.style = "";

		div.appendChild(newP);



	}
}