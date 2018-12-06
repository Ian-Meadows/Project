// Builds the HTML Table out of games.
function buildHtmlTable(selector) {
      var games;
      var gameData;
      var scoreColor;
      var url = 'http://www.nfl.com/liveupdate/scorestrip/ss.json';
      
      $.getJSON(url, function( data ) {
        games = data.gms;

        // Get data from database and get the data from the bets table

        var row$ = $('<tr>');
        var headerTr$ = $('<tr/>');

        // Set the column names, add to the table, selector
        headerTr$.append($('<th/>').html('Date'));
        headerTr$.append($('<th/>').html('Home'));
        headerTr$.append($('<th/>').html('Score'));
        headerTr$.append($('<th/>').html('Visitor'));
        headerTr$.append($('<th/>').html('Score'));
        headerTr$.append($('<th/>').html('Status'));
        headerTr$.append($('<th/>').html('Bet'));


        $(selector).append(headerTr$);

        var cellValue;


        // Gets scores and team names for each game and add to a table in the database
        for (var i = 0; i < games.length; i++) {

          // Adjusts the color of the row depending on the game status
          row$ = $('<tr>');

          scoreColor = getScoreColor(games[i].hs, games[i].vs)

          // Game date 
          cellValue = games[i].eid;
          if(cellValue== null) cellValue = "";
          row$.append($('<td/>').html(cellValue));

          // Home team name
          cellValue = games[i].hnn;
          if (cellValue == null) cellValue = "";
          row$.append($('<td/>').html(cellValue));

          // Home team score
          cellValue = games[i].hs;
          if (cellValue == null) cellValue = "";
          row$.append($(scoreColor[0]).html(cellValue));

          // Visitor team name
          cellValue = games[i].vnn;
          if (cellValue == null) cellValue = "";
          row$.append($('<td/>').html(cellValue));

          // Visitor team score
          cellValue = games[i].vs;
          if (cellValue == null) cellValue = "";
          row$.append($(scoreColor[1]).html(cellValue));

          // Game status
          cellValue = getStatus(games[i].q);
          if (cellValue == null) cellValue = "";
          row$.append($(getStatusColor(games[i].q)).html(cellValue));

          cellValue = '<button type="button">Bet</button>';
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

  if(status == 'H'){
    return 'Halftime';
  }

  return status;
}

function getStatusColor(status) {
  if(status == 'P'){
    return '<td style="color:orange">';
  }
  if (status == '1' || status == '2' || status == '3' || status == '4' || status == 'H'){
    return '<td style="color:green">';

  }

  return '<td>';
}

function getScoreColor(home, visitor) {
  if (home > visitor){
    return ['<td style="color:green">', '<td style="color:red">'];
  }

  if(home == visitor){
    return ['<td style="color:orange">', '<td style="color:orange">'];
  }

  return ['<td style="color:red">', '<td style="color:green">'];
  
}




