// Builds the HTML Table out of games.
function buildGroupHtmlTable(selector, groupid) {
      var games;
      var gameData;
      var scoreColor;
      console.log(groupid)
      $.ajax('/GetGames/Get', function(data) {

       }).done(function(data){
                
        var games = data.message;
        var row$ = $('<tr>');
        var headerTr$ = $('<tr/>');
        var cellValue;

        // Set the column names, add to the table, selector
        headerTr$.append($('<th/>').html('Date'));
        headerTr$.append($('<th/>').html('Home'));
        headerTr$.append($('<th/>').html('Score'));
        headerTr$.append($('<th/>').html('Visitor'));
        headerTr$.append($('<th/>').html('Score'));
        headerTr$.append($('<th/>').html('Status'));
        headerTr$.append($('<th/>').html('Bet'));

        $(selector).append(headerTr$);

        // Gets scores and team names for each game and add to a table in the database
        for (var i = 0; i < games.length; i++) {

          // Adjusts the color of the row depending on the game status
          row$ = $('<tr>');

          scoreColor = getScoreColor(games[i].homescore, games[i].visitorscore)

          // Game date 
          cellValue = games[i].dayofweek;
          if(cellValue== null) cellValue = "";
          row$.append($('<td/>').html(cellValue));

          // Home team name
          cellValue = games[i].home;
          if (cellValue == null) cellValue = "";
          row$.append($('<td/>').html(cellValue));

          // Home team score
          cellValue = games[i].homescore;
          if (cellValue == null) cellValue = "";
          row$.append($(scoreColor[0]).html(cellValue));

          // Visitor team name
          cellValue = games[i].visitor;
          if (cellValue == null) cellValue = "";
          row$.append($('<td/>').html(cellValue));

          // Visitor team score
          cellValue = games[i].visitorscore;
          if (cellValue == null) cellValue = "";
          row$.append($(scoreColor[1]).html(cellValue));

          // Game status
          cellValue = getStatus(games[i].status);
          if (cellValue == null) cellValue = "";
          row$.append($(getStatusColor(games[i].status)).html(cellValue));

          cellValue = '<form action=\"MakeBetPage\" method=\"get\"><input type="hidden" name=\'id\' value = '+games[i].id+'><input type="hidden" name=\"home\" value = '+games[i].home+'><input type="hidden" name=\"visitor\" value = '+games[i].visitor+'><input type=\"hidden\" name=\"groupid\" id=\"groupid\" value='+groupid+'><input type="submit" name=\"bet\" value=\"Bet\" /></form>';
          row$.append($('<td/>').html(cellValue));

          // Add the row data to the table
          $(selector).append(row$);
        }

       });


}



// Makes the game status row look nice
function getStatus(status) {
  if (status == 'F' || status == 'D'){
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




