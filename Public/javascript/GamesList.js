$(document).ready(function(){

	var url = 'http://www.nfl.com/liveupdate/scorestrip/ss.json';
      
    $.getJSON(url, function( data ) {
        var games = data.gms;

        var req = {
			username: document.cookie,
			games:games
		};

		$.ajax({
			url:'/GetGames',
			data:req
		}).done(function(data) {
  			console.log(data);
  			
		});



    });

	

});