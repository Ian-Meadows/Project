$(document).ready(function() {

	var div = document.getElementById("GroupList");


	var req = {
		username: document.cookie
	};
	$.ajax({
			url:'/GetGroups',
			data:req
		}).done(function(data) {
  			console.log(data);
  			CreateGroupList(div, data);
		});
});




function CreateGroupList(div, data){


	for(var i = 0; i < data.length; i++){
		//console.log(data[i].name);

		//create elements

		var newP = document.createElement("P");
		var text = document.createTextNode(data[i].name);
		newP.appendChild(text);

		var newButton = document.createElement("BUTTON");
		text = document.createTextNode("CLICK ME");
		newButton.appendChild(text);
		
		//append elements to newDiv
		var newDiv = document.createElement("DIV");
		newDiv.appendChild(newP);
		newDiv.appendChild(newButton);
		
		//style stuff
		newDiv.style = "background-color:red; outline: 3px solid black; margin:15px";
		newP.style = "display:inline-block; margin-right:10px";
		newButton.style = "display:inline-block; margin-right:10px";

		newButton.setAttribute("id", data[i].id);

		//init class
		newButton.onclick = ButtonClicked;

		//append newDiv to div
		div.appendChild(newDiv);  
	}

}

function ButtonClicked(){
	console.log(this.id);
}