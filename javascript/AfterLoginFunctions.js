// Builds the HTML Table out of games.
      function buildHtmlTable(selector) {
      var games;
      var gameData;
      var url = 'http://www.nfl.com/liveupdate/scorestrip/ss.json';
      
      $.getJSON(url, function( data ) {
        games = data.gms;

        
        var columns = addAllColumnHeaders(games, selector);
        console.log(games[0].length)
        for (var i = 0; i < games.length; i++) {
          var row$ = $('<tr/>');
          for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = games[i][columns[colIndex]];
            if (cellValue == null) cellValue = "";
            row$.append($('<td/>').html(cellValue));
          }
          $(selector).append(row$);
        }

       }); 
      }



      // Adds a header row to the table and returns the set of columns.
      // Need to do union of keys from all records as some records may not contain
      // all records.
      function addAllColumnHeaders(games, selector) {
        var columnSet = [];
        var headerTr$ = $('<tr/>');

        for (var i = 0; i < games.length; i++) {
          var rowHash = games[i];

          for (var key in rowHash) {
            if ($.inArray(key, columnSet) == -1) {
              columnSet.push(key);
              headerTr$.append($('<th/>').html(key));
            }
          }
        }
        $(selector).append(headerTr$);

        return columnSet;
      }