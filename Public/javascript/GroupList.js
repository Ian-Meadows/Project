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




function CreateGroupList(selector, data){

    var row$ = $('<tr>');
    var headerTr$ = $('<tr/>');
    var cellValue;


    // Set the column names, add to the table, selector
    headerTr$.append($('<th/>').html('Group'));
    headerTr$.append($('<th/>').html('Description'));
    headerTr$.append($('<th/>').html('Link'));

    $(selector).append(headerTr$); 

    // Gets scores and team names for each game and add to a table in the database
    for (var i = 0; i < data.length; i++) {

    	// Adjusts the color of the row depending on the game status
    	row$ = $('<tr>');

        // Group date 
        cellValue = data[i].name;
        row$.append($('<td/>').html(cellValue));

        //Group Description
        cellValue = data[i].description;
        row$.append($('<td/>').html(cellValue));

        // Group Link 
        cellValue = '<input type="submit" name=\"ViewGroup\" value=\"View Group\" /></form>';
        row$.append($('<td/>').html(cellValue));

          // Add the row data to the table
        $(selector).append(row$);
    }
}

function ButtonClicked(){
	console.log(this.id);
}