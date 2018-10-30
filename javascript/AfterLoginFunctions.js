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

        $(selector).append(headerTr$);


        // Gets scores and team names for each game and add to a table in the database
        for (var i = 0; i < games.length; i++) {

          row$ = $('<tr/>');

          var cellValue = games[i].hnn;
          if (cellValue == null) cellValue = "";
          row$.append($('<td/>').html(cellValue));

          var cellValue = games[i].hs;
          if (cellValue == null) cellValue = "";
          row$.append($('<td/>').html(cellValue));

          var cellValue = games[i].vnn;
          if (cellValue == null) cellValue = "";
          row$.append($('<td/>').html(cellValue));

          var cellValue = games[i].vs;
          if (cellValue == null) cellValue = "";
          row$.append($('<td/>').html(cellValue));

          // Add the row data to the table
          $(selector).append(row$);
        }

       }); 
      }


