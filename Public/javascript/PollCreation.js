$(document).ready(function() {

	var oldCookie = document.cookie;
	var username = '';
	var groupID = '';

	var onUsername = true;

	for (var i = 0; i < oldCookie.length; i++) {
		if(onUsername){
			if(oldCookie.charAt(i) == ','){
				onUsername = false;
			}
			else{
				username+=oldCookie.charAt(i);
			}
		}
		else{
			groupID+=oldCookie.charAt(i);
		}
	}
	groupID = parseInt(groupID, 10);


	document.cookie = username;

	document.getElementById("CreatePoll").onclick = function(){

		var pollOption1 = document.getElementById("pollOption1").value;
		var pollOption2 = document.getElementById("pollOption2").value;
		var poll = document.getElementById("poll").value;

		var req = {
			username: document.cookie,
			groupID: groupID,
			pollOption1: pollOption1,
			pollOption2: pollOption2,
			poll: poll
		};
		$.ajax({
				url:'/CreatePoll',
				data:req
			}).done(function(data) {
				console.log("wat");
	  			if(data.message === "true"){
	  				window.location.href = '/GroupList';
	  			}
	  			else{
	  				alert(data.message);
	  			}
			});

		return false;

	}

	/*
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
		*/
});