const ohHey = "Hello World";

console.log(ohHey);

var cocktailApp = {}

cocktailApp.lcboApiKey = 'MDpkMDI1ZmE1Mi04YzM4LTExZTctOTEzNi04ZjUwZWNlZjYzZDk6YWc5TmJBN2pJcHJROFJSTWhMMHZQejVhbWJydVdUdHdWamdP';

function displayNext (elementClass) {
  return $(elementClass).css('display', 'static');
}

//PART 0 AKA LANDING PAGE STYLING
$('.start').on('click', function() {
	// if(hasValue('#result')) {
	  displayNext('#partOne');
	  $('header').css('display', 'none');
	  $('#partThree').css('display', 'none');
	// } else {
	// 	alert('Please complete the form.')
	// }
});

// PART 1 - GRAB USER'S LOCATION INPUT AND GET DATA FOR LCBO LOCATIONS NEARBY
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

cocktailApp.getLocation = function (){
	$('form.place').on('submit', function(e){
		e.preventDefault();
		$('#partOne').css('display', 'none');
		cocktailApp.lcboApiGetLocation($('input.my-input').val());
	})
}

// PART 2 - ON CLICK OF LIQUOR CHOICE, GRAB DATA FROM COCKTAIL API AND DISPLAY 3 COCKTAILS ON THE PAGE AND A LOAD MORE BUTTON THAT SHOWS 3 MORE AT EVERY CLICK

// cocktailApp.drinksApiKey = '6623';
cocktailApp.drinksApi = function(alcohol) {
	$.ajax({
		url: `http://www.thecocktaildb.com/api/json/v1/6623/filter.php?i=${alcohol}`,
		method: 'GET',
		datatype: 'json'
	}).then(function(res){
		var drinkResult = res.drinks;
		// console.log(drinkResult, ' drink results');
		cocktailApp.display(drinkResult);
		cocktailApp.loadMore();	
	});
}

cocktailApp.usersChoice = function() {
	$('input[type=checkbox]').on('click', function(){
		// console.log('wow so super neat');
		usersInput = $(this).val();
		$('.partTwoHeader').text(`${usersInput}, got it. Now here's some cocktails you can make with that. `);
	  	console.log(usersInput + 'lalala');
		$(this).siblings().hide();
		$(this).css('display', 'none');
		cocktailApp.drinksApi($('input[name="alchohol"]:checked').val());
		$('#loadMore').show();
	});
}

// the image and h3 are produced upon user's selection of liquor choice
// once user selects liquor AND cocktail, the ingredients will be produced
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

	$('.cocktailResults').on('click', '.cocktailResultsItem', function(){
		console.log('lol neat');
		$(this).siblings().hide();
		console.log(this);

		var drinkId = $(this).data('id');

		cocktailApp.drinksId(drinkId);
		let checkInventory = cocktailApp.lcboApiGetInventory($('input[name="alchohol"]:checked').val()); //syncs users choice with LCBOs inventory
	});
}

cocktailApp.loadMore = function () {
    $('.cocktailResultsItem').slice(0, 3).show();
    $('#loadMore').on('click', function(e) {
        e.preventDefault();
        $('.cocktailResultsItem:hidden').slice(0, 3).slideDown();
        if ($('.cocktailResultsItem:hidden').length == 0) {
            $('#load').fadeOut('slow');
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 1500);
		$('#top').click(function () {
		    $('.partTwo').animate({
		        scrollTop: 0
		    }, 600);
		    return false;
		});

		$(window).scroll(function () {
			console.log("THIS");
			console.log($(this));
		    if ($(this).scrollTop() > 50) {
		        $('.totop a').fadeIn();
		    } else {
		        $('.totop a').fadeOut();
		    }
		});
    });
};


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



// RESULTS ARE PRODUCED ONCE THE LIQUOR OF CHOICE AND COCKTAIL HAVE BEEN SELECTED

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

cocktailApp.lcboApiDisplay = function (lcboInventory) {
	lcboInventory.forEach(function(inventory){
		// console.log(inventory);
		$('.lcboResults').append(`
			<h3> ${inventory.name} </h3>
			<img src='${inventory.image_thumb_url}'>
			`)
	})

}


// cocktailApp.lcboApiGetBoozeType = function(){
// 	$('form.whatBooze').on('submit', function(e){
// 		e.preventDefault();
// 		cocktailApp.lcboApiGetInventory($('input.inventoryChoice').val());
// 	});
// }

cocktailApp.init = function() {
	cocktailApp.getLocation();
	// cocktailApp.lcboApiGetBoozeType();
	cocktailApp.usersChoice();
	
} 

$(function(){
	cocktailApp.init();
})
