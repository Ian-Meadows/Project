$(document).ready(function(){
	alert('YEEEEET');
	var server = 'http://localhost:4000/test';
	$.get(server, function(data){
		alert(data.message);
	});
});