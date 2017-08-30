const ohHey = "Hello World";

console.log(ohHey);

var cocktailApp = {}

cocktailApp.lcboApiKey = 'MDpkMDI1ZmE1Mi04YzM4LTExZTctOTEzNi04ZjUwZWNlZjYzZDk6YWc5TmJBN2pJcHJROFJSTWhMMHZQejVhbWJydVdUdHdWamdP';

cocktailApp.lcboApiGetInventory = function(query) {
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

cocktailApp.lcboApiGetLocation = function(query) {
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
		console.log(location);
		cocktailApp.lcboApiLocationDisplay(location);
	});
} 

cocktailApp.getLocation = function (){
	$('form.place').on('submit', function(e){
		e.preventDefault();
		cocktailApp.lcboApiGetLocation($('input.placeInput').val())
	})
}

cocktailApp.getLocation();
cocktailApp.lcboApiGetBoozeType();


