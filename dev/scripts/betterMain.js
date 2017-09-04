const cocktailApp = {};

cocktailApp.lcboApiKey = 'MDpkMDI1ZmE1Mi04YzM4LTExZTctOTEzNi04ZjUwZWNlZjYzZDk6YWc5TmJBN2pJcHJROFJSTWhMMHZQejVhbWJydVdUdHdWamdP';

cocktailApp.getLcboInventory = function(query){
	$.ajax({
		url: 'https://lcboapi.com/products',
		method: 'GET',
		datatype: 'json',
		data: {
			per_page: 100,
			q: query
		},
		headers: {
			'Authorization': 'Token ' + cocktailApp.lcboApiKey,
		}
	}).then(function(res){
		var inventoryItem = res.result;
		console.log(inventoryItem);
		cocktailApp.lcboApiDisplay(inventoryItem);
	});
}

cocktailApp.lcboApiGetBoozeType = function(){
	$('form.whatBooze').on('submit', function(e){
		e.preventDefault();
		cocktailApp.lcboApiGetInventory($('input.inventoryChoice').val());
	});
}


cocktailApp.getLcboLocation = function(query){
	$.ajax({
		url: 'https://lcboapi.com/stores',
		method: 'GET',
		datatype: 'json',
		data: {
			per_page: 100,
			q: query
		},
		headers: {
			'Authorization': 'Token ' + cocktailApp.lcboApiKey,
		}
	}).then(function(res){
		var location = res.result;
		cocktailApp.getLocation(location);
		console.log(location);
	});
}

cocktailApp.getDrinkByIngredient = function(){

}

cocktailApp.getDrinkById = function() {

}

cocktailApp.getUserInput = function(){
 //get location



 //makes cocktail selection 


}

cocktailApp.events = function(){
	getUserInput();
}

cocktailApp.init = function(){

}

$(function(){

});