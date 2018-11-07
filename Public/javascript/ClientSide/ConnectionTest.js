$(document).ready(function(){
	//alert('YEEEEET');
	var server = '/test';
	$.get(server, function(data){
		alert(data.message);
	});
});