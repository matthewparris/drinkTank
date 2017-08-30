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

// cocktailApp.drinksApiKey = '6623';

cocktailApp.drinksApi = function(alcohol) {
	$.ajax({
		url: `http://www.thecocktaildb.com/api/json/v1/6623/filter.php?i=${alcohol}`,
		method: 'GET',
		datatype: 'json'
	}).then(function(res){
		var drinkResult = res.drinks;
		console.log(drinkResult);
		cocktailApp.display(drinkResult);
	});

}

cocktailApp.getCocktailType = function () {
	$('form.typeOfCocktail').on('change', function(e){
		e.preventDefault();

		cocktailApp.drinksApi($('select[name=cocktailOption]').val());
		// console.log(alcohol);

	})
}

cocktailApp.display = function(cocktails) {
	console.log(cocktails);
	cocktails.forEach(function(cocktail) {
		$('.cocktailResults').append(
			`<div class ='cocktailResultsItem'> 
				<h3 class = 'resultsItemTitle'>${cocktail.strDrink}</h3>
				<img class = 'resultsImage' src="${cocktail.strDrinkThumb}">
			</div>`
			)
	});
	// for (let item in cocktails) {
	// 	console.log(cocktails[item].strDrink);

	// }
}



cocktailApp.getCocktailType();
cocktailApp.getLocation();
cocktailApp.lcboApiGetBoozeType();


