$(document).ready(function(){

	var url = 'https://feeds.nfl.com/feeds-rs/scores.json';
      
    $.getJSON(url, function( data ) {

    	var gs = cutDownGameSize(data.gameScores);

        var req = {
			username: document.cookie,
			games:gs
		};

		$.ajax({
			url:'/GetGames/Insert',
			data:req
		}).done(function(data) {
  			//console.log(data)
		});
    });
});


function cutDownGameSize(games){

	var newGames = [];

	var weekday = new Array(7);
	weekday[0] = "Sun";
	weekday[1] = "Mon";
	weekday[2] = "Tue";
	weekday[3] = "Wed";
	weekday[4] = "Thu";
	weekday[5] = "Fri";
	weekday[6] = "Sat";

	for(var i = 0; i < games.length; i++){

		var toAdd = {
			gameId: "",
			status:"",
			homeNickname: "",
			visitorNickname: "",
			homeTeamScore: "",
			visitorTeamScore: "",
			edate: "",
			day: ""
		};

		if(games[i].score === null || games[i].score.phase.localeCompare('PREGAME') === 0){
			toAdd.status = 'P';
			toAdd.homeTeamScore = 0;
			toAdd.visitorTeamScore = 0;
		}else{
			toAdd.status = setGameStatus(games[i].score.phase);
			toAdd.homeTeamScore = games[i].score.homeTeamScore.pointTotal;
			toAdd.visitorTeamScore = games[i].score.visitorTeamScore.pointTotal;
		}

		toAdd.gameId = games[i].gameSchedule.gameKey;
		toAdd.homeNickname = games[i].gameSchedule.homeNickname;
		toAdd.visitorNickname = games[i].gameSchedule.visitorNickname;
		
		toAdd.edate = games[i].gameSchedule.gameId.toString().substring(0,8);
		toAdd.day = weekday[new Date(games[i].gameSchedule.gameDate).getDay()];

		newGames.push(toAdd);
	}

	return newGames;
}

function setGameStatus(status){
	if (status === "1Q"){
		return 1;
	}

	if (status === "2Q"){
		return 2;
	}

	if (status === "3Q"){
		return 3;
	}

	if (status === "4Q"){
		return 4;
	}

	if (status.includes("FINAL")){
		return "F";
	}

	return "H";
}
