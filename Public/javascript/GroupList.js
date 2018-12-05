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

		//poll buttons
		var poll1Button = document.createElement("BUTTON");
		text = document.createTextNode("poll1");
		poll1Button.appendChild(text);

		var poll2Button = document.createElement("BUTTON");
		text = document.createTextNode("poll2");
		poll2Button.appendChild(text);

		//vote buttons
		var vote1Button = document.createElement("BUTTON");
		text = document.createTextNode("vote1");
		vote1Button.appendChild(text);

		var vote2Button = document.createElement("BUTTON");
		text = document.createTextNode("vote2");
		vote2Button.appendChild(text);


		
		//append elements to newDiv
		var newDiv = document.createElement("DIV");
		newDiv.appendChild(newP);
		newDiv.appendChild(poll1Button);
		newDiv.appendChild(poll2Button);
		newDiv.appendChild(vote1Button);
		newDiv.appendChild(vote2Button);
		
		if(data[i].groupowner === document.cookie){
			var groupOwnerButton = document.createElement("BUTTON");
			var t;
			if(data[i].pollstatus === "not started"){
				t = document.createTextNode("Create new Poll");
			}
			else if(data[i].pollstatus === "polling"){
				t = document.createTextNode("End Poll");
			}
			else{
				t = document.createTextNode("hmm");
			}

			groupOwnerButton.appendChild(t);
			newDiv.appendChild(groupOwnerButton);

			groupOwnerButton.style = "display:inline-block; margin-right:10px";

			groupOwnerButton.setAttribute("id", data[i].id);
			
			groupOwnerButton.onclick = GroupOwnerButtonClicked;
		}

		//style stuff
		newDiv.style = "background-color:red; outline: 3px solid black; margin:15px";
		newP.style = "display:inline-block; margin-right:10px";
		poll1Button.style = "display:inline-block; margin-right:10px";
		poll2Button.style = "display:inline-block; margin-right:10px";
		vote1Button.style = "display:inline-block; margin-right:10px";
		vote2Button.style = "display:inline-block; margin-right:10px";

		poll1Button.setAttribute("id", data[i].id);
		poll2Button.setAttribute("id", data[i].id);
		vote1Button.setAttribute("id", data[i].id);
		vote2Button.setAttribute("id", data[i].id);

		//init class
		poll1Button.onclick = PollButton1Clicked;
		poll2Button.onclick = PollButton2Clicked;
		vote1Button.onclick = VoteButton1Clicked;
		vote2Button.onclick = VoteButton2Clicked;

		//append newDiv to div
		div.appendChild(newDiv);  
	}

}

function GroupOwnerButtonClicked(){

}

function PollButton1Clicked(){

}

function PollButton2Clicked(){
	
}

function VoteButton1Clicked(){

}

function VoteButton2Clicked(){

}