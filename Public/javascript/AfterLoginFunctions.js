// Builds the HTML Table out of games.
function buildHtmlTable(selector) {
      var games;
      var gameData;
      var url = 'http://www.nfl.com/liveupdate/scorestrip/ss.json';
      
      $.getJSON(url, function( data ) {
        games = data.gms;       

        var row$ = $('<tr>');
        var headerTr$ = $('<tr/>');

        // Set the column names, add to the table, selector
        headerTr$.append($('<th/>').html('Home'));
        headerTr$.append($('<th/>').html('Score'));
        headerTr$.append($('<th/>').html('Visitor'));
        headerTr$.append($('<th/>').html('Score'));
        headerTr$.append($('<th/>').html('Status'))

        $(selector).append(headerTr$);


        // Gets scores and team names for each game and add to a table in the database
        for (var i = 0; i < games.length; i++) {

          // Adjusts the color of the row depending on the game status
          row$ = $(getRowColor(games[i].q));

          // Home team name
          var cellValue = games[i].hnn;
          if (cellValue == null) cellValue = "";
          row$.append($('<td/>').html(cellValue));

          // Homw team score
          var cellValue = games[i].hs;
          if (cellValue == null) cellValue = "";
          row$.append($('<td/>').html(cellValue));

          // Visitor team name
          var cellValue = games[i].vnn;
          if (cellValue == null) cellValue = "";
          row$.append($('<td/>').html(cellValue));

          // Visitor team score
          var cellValue = games[i].vs;
          if (cellValue == null) cellValue = "";
          row$.append($('<td/>').html(cellValue));

          // Game status
          var cellValue = getStatus(games[i].q);
          if (cellValue == null) cellValue = "";
          row$.append($('<td/>').html(cellValue));


          // Add the row data to the table
          $(selector).append(row$);
        }

       }); 
      }

// Makes the game status row look nice
function getStatus(status) {
  if (status == 'F'){
    return 'Final';
  }

  if (status == 'FO'){
    return 'Final OT';
  }

  if(status == 'P'){
    return 'Upcoming';
  }

  if(status == '1'){
    return status + 'st Quarter';
  } 

  if(status == '2'){
    return status + 'nd Quarter';
  } 

  if(status == '3'){
    return status + 'rd Quarter';
  } 
  if(status == '4'){
    return status + 'th Quarter';
  }

  return status;
}

function getRowColor(status) {
  if(status == 'P'){
    return '<tr bgcolor="yellow">';
  }
  if (status == '1' || status == '2' || status == '3' || status == '4'){
    return '<tr bgcolor="green">';

  }

  return '<tr>';
}








