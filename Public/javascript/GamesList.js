$(document).ready(function(){

	var url = 'https://www.nfl.com/liveupdate/scorestrip/ss.json';
      
    $.getJSON(url, function( data ) {
        var games = data.gms;

        var req = {
			username: document.cookie,
			games:games
		};

		$.ajax({
			url:'/GetGames/Insert',
			data:req
		}).done(function(data) {
  			console.log(data);
  			
		});



    });

	

});