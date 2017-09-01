'use strict';

var ohHey = "Hello World";

console.log(ohHey);

var cocktailApp = {};

cocktailApp.lcboApiKey = 'MDpkMDI1ZmE1Mi04YzM4LTExZTctOTEzNi04ZjUwZWNlZjYzZDk6YWc5TmJBN2pJcHJROFJSTWhMMHZQejVhbWJydVdUdHdWamdP';

function displayNext(elementClass) {
	return $(elementClass).css('display', 'static');
}

cocktailApp.lcboApiGetInventory = function (query) {
	$.ajax({
		url: 'https://lcboapi.com/products',
		method: 'GET',
		datatype: 'json',
		data: {
			per_page: 100,
			q: query
		},
		headers: {
			'Authorization': 'Token ' + cocktailApp.lcboApiKey
		}
	}).then(function (res) {
		var inventoryItem = res.result;
		console.log(inventoryItem);
		cocktailApp.lcboApiDisplay(inventoryItem);
	});
};

cocktailApp.lcboApiGetBoozeType = function () {
	$('form.whatBooze').on('submit', function (e) {
		e.preventDefault();
		cocktailApp.lcboApiGetInventory($('input.inventoryChoice').val());
	});
};

cocktailApp.lcboApiGetLocation = function (query) {
	$.ajax({
		url: 'https://lcboapi.com/stores',
		method: 'GET',
		datatype: 'json',
		data: {
			per_page: 100,
			q: query
		},
		headers: {
			'Authorization': 'Token ' + cocktailApp.lcboApiKey
		}
	}).then(function (res) {
		var location = res.result;
		console.log(location);
		cocktailApp.lcboApiLocationDisplay(location);
	});
};

$('.start').on('click', function () {
	// if(hasValue('#result')) {
	displayNext('#partOne');
	$('header').css('display', 'none');
	$('#partThree').css('display', 'none');
	// } else {
	// 	alert('Please complete the form.')
	// }
});

cocktailApp.getLocation = function () {
	$('form.place').on('submit', function (e) {
		e.preventDefault();
		cocktailApp.lcboApiGetLocation($('input.placeInput').val());
	});

	$('#submit').on('click', function () {
		// if(hasValue('#result')) {
		displayNext('#partTwo');
		$('.partOne').css('display', 'none');
		// } else {
		// 	alert('Please complete the form.')
		// }
	});
};

// cocktailApp.drinksApiKey = '6623';

cocktailApp.drinksApi = function (alcohol) {
	$.ajax({
		url: 'http://www.thecocktaildb.com/api/json/v1/6623/filter.php?i=' + alcohol,
		method: 'GET',
		datatype: 'json'
	}).then(function (res) {
		var drinkResult = res.drinks;
		console.log(drinkResult);
		cocktailApp.display(drinkResult);
	});
};

cocktailApp.drinksId = function (drinkId) {
	$.ajax({
		url: 'http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drinkId,
		method: 'GET',
		datatype: 'json'
	}).then(function (res) {
		var drinkRecipe = res.drinks;
		console.log(drinkRecipe);
		cocktailApp.display(drinkRecipe);
	});
};

cocktailApp.getCocktailType = function () {
	$('.typeOfLiquor').on('change', function (e) {
		e.preventDefault();
		console.log($('input[name="alchohol"]:checked').val());
		cocktailApp.drinksApi($('input[name="alchohol"]:checked').val());
	});
};

cocktailApp.display = function (cocktails) {
	console.log(cocktails);
	cocktails.forEach(function (cocktail) {
		if (cocktail.strDrinkThumb !== null) {
			$('.cocktailResults').append('<div class =\'cocktailResultsItem\' data-id=' + cocktail.idDrink + '>\n\t\t\t\t\t<img class = \'resultsImage\' src="' + cocktail.strDrinkThumb + '">\n\t\t\t\t\t<h3 class = \'resultsItemTitle\'>' + cocktail.strDrink + '</h3>\n\t\t\t\t</div>');
		} else {
			$('.cocktailResults').append('<div class =\'cocktailResultsItem\' data-id=' + cocktail.idDrink + '> \n\t\t\t\t\t<img class = \'resultsImage\' src="./dev/assets/imageComingSoon.jpg">\n\t\t\t\t\t<h3 class = \'resultsItemTitle\'>' + cocktail.strDrink + '</h3>\n\t\t\t\t</div>');
		}
	});

	$('.cocktailResults').on('click', '.cocktailResultsItem', function () {
		console.log('lol neat');
		$(this).siblings().hide();
		var drinkId = $(this).data('id');
		console.log(drinkId);
		cocktailApp.drinksId(drinkId);
		$('.cocktailResults').append('\n\t\t\t\t<div class =\'cocktailResultsItem\'>\n\t\t\t\t\t<p class="recipe">' + cocktail.strIngredient1 + '</p>\n\t\t\t\t\t<p class="recipe">' + strIngredient2 + '</p>\n\t\t\t\t</div>\n\t\t\t');
	});
};

cocktailApp.usersChoice = function () {
	$('.typeOfLiquor').on('click', 'label.liquorChoice', function () {
		console.log('wow so super neat');
		$(this).siblings().hide();
	});

	// $('.cocktailResults').on('click', '.cocktailResultsItem', function(){
	// 	console.log('lol neat');
	// 	$(this).siblings().hide();
	// 	console.log(drinkId);
	// });
};

cocktailApp.usersChoice();
cocktailApp.getCocktailType();
cocktailApp.getLocation();
cocktailApp.lcboApiGetBoozeType();