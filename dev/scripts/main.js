const ohHey = "Hello World";

console.log(ohHey);

var cocktailApp = {}

cocktailApp.lcboApiKey = 'MDpkMDI1ZmE1Mi04YzM4LTExZTctOTEzNi04ZjUwZWNlZjYzZDk6YWc5TmJBN2pJcHJROFJSTWhMMHZQejVhbWJydVdUdHdWamdP';

function displayNext (elementClass) {
  return $(elementClass).css('display', 'static');
}


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
		cocktailApp.getLocation(location);
		console.log(location);
	});
} 

//DYNAMIC CSS STYLES THAT MIGHT HAVE TO BE RELOCATED************

$('.start').on('click', function() {
	// if(hasValue('#result')) {
	  displayNext('#partOne');
	  $('header').css('display', 'none');
	  $('#partThree').css('display', 'none');
	// } else {
	// 	alert('Please complete the form.')
	// }
});

$('input[type=checkbox]').on('click', function() {
	// if(hasValue('#result')) {
	usersInput = $(this).val();
	  $('.partTwoHeader').text(`${usersInput}, got it. Now here some cocktails you can make with that. `)
});

cocktailApp.getLocation = function (){
	$('form.place').on('submit', function(e){
		e.preventDefault();
		cocktailApp.lcboApiGetLocation($('input.my-input').val());
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
		// console.log(drinkResult);
		cocktailApp.display(drinkResult);
	});
}

cocktailApp.drinksId = function(drinkId){
	$.ajax({
		url: `http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`,
		method: 'GET',
		datatype: 'json',
	}).then(function(res){
		var drinkRecipe = res.drinks;
		console.log(drinkRecipe);
		const ingredients = [];
		const measurement = [];
		for (let i = 1; i <= 15; i++) {
			const ingredient = drinkRecipe[0][`strIngredient${i}`];
			const measure = drinkRecipe[0][`strMeasure${i}`];
			if (ingredient !== "") {
				ingredients.push(ingredient, measure);
				// measurement.push(measure);
			}
		}
		ingredients.forEach(function(ingredient) {
			$('.recipeIngredients').append(`<p>${ingredient}</p>`);
		});
		measurement.forEach(function(measure){
			$('span.recipeIngredient').append(`${measure}`)
		});
	});
}

cocktailApp.getCocktailType = function () {
	$('.typeOfLiquor').on('change', function(e){
		e.preventDefault();
		console.log($('input[name="alchohol"]:checked').val());
		cocktailApp.drinksApi($('input[name="alchohol"]:checked').val()); //gets items from cocktail DB based on user choice
	});
}

cocktailApp.display = function(cocktails) {
	console.log(cocktails);
	cocktails.forEach(function(cocktail) {
		if (cocktail.strDrinkThumb !== null){
			$('.cocktailResults').append(
				`<div class ='cocktailResultsItem' data-id=${cocktail.idDrink}>
					<img class = 'resultsImage' src="${cocktail.strDrinkThumb}">
					<h3 class = 'resultsItemTitle'>${cocktail.strDrink}</h3>
					<p class="recipeIngredients"> </p> <span class="recipeIngredient"></span>
				</div>

			`)
		}
		else {
			$('.cocktailResults').append(
				`<div class ='cocktailResultsItem' data-id=${cocktail.idDrink}> 
					<img class = 'resultsImage' src="./dev/assets/imageComingSoon.jpg">
					<h3 class = 'resultsItemTitle'>${cocktail.strDrink}</h3>
					<p class="recipeIngredients"> </p>
				</div>`
			)
		}
	});

	$('.cocktailResults').one('click', '.cocktailResultsItem', function(){
		console.log('lol neat');
		$(this).siblings().hide();
		var drinkId = $(this).data('id');
		// console.log(drinkId);
		cocktailApp.drinksId(drinkId);
		let checkInventory = cocktailApp.lcboApiGetInventory($('input[name="alchohol"]:checked').val()); //syncs users choice with LCBOs inventory
		// console.log(checkInventory);
	});
}

cocktailApp.lcboApiDisplay = function (lcboInventory) {
	lcboInventory.forEach(function(inventory){
		$('.lcboResults').append(`
			<h3> ${inventory.name} </h3>
			<img src='${inventory.image_thumb_url}'>
			`)
	})

}

cocktailApp.usersChoice = function() {
	$('.typeOfLiquor').on('click', 'label.liquorChoice', function(){
		console.log('wow so super neat');
		$(this).siblings().hide();
	});
}

cocktailApp.usersChoice();
cocktailApp.getCocktailType();
cocktailApp.getLocation();
cocktailApp.lcboApiGetBoozeType();
cocktailApp.lcboApiGetLocation();
cocktailApp.lcboApiDisplay();


