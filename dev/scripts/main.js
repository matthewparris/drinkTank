const ohHey = "Hello World";

console.log(ohHey);

var cocktailApp = {}

cocktailApp.lcboApiKey = 'MDpkMDI1ZmE1Mi04YzM4LTExZTctOTEzNi04ZjUwZWNlZjYzZDk6YWc5TmJBN2pJcHJROFJSTWhMMHZQejVhbWJydVdUdHdWamdP';

function displayNext (elementClass) {
  return $(elementClass).show();
}

//PART 0 AKA LANDING PAGE STYLING
$('.start').on('click', function() {
	  displayNext('#partOne');
	  $('header').css('display', 'none');
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


//DYNAMIC CSS STYLES THAT MIGHT HAVE TO BE RELOCATED************

$('.start').on('click', function() {
	// if(hasValue('#result')) {
	  displayNext('#partOne');
	  $('header').css('display', 'none');
	  $('#partOnertThree').css('display', 'none');
	// } else {
	// 	alert('Please complete the form.')
	// }
});

$('input[type=checkbox]').on('click', function() {
	// if(hasValue('#result')) {
	usersInput = $(this).val();
	  $('.partTwoHeader').text(`${usersInput}, got it. Now here's some cocktails you can make with that. `)

	$('#loadMore').css('display', 'static');
});

cocktailApp.getLocation = function (){
	$('form.place').one('submit', function(e){
		e.preventDefault();
		displayNext('#partTwo');
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
		usersInput = $(this).val();
		$('.partTwoHeader').text(`${usersInput}, got it. Now here's some cocktails you can make with that. `);
		$('.theAppDetails').css('position', 'relative');
		$('.theAppDetails').css('top', '0');
		$('.theAppDetails').css('left', '0');
		$('.theAppDetails').css('transform', 'none');
		// $('#partTwoHeader').css('transform', 'none');
		$('html,body').animate({
     		scrollTop: $("#partTwo").offset().top},
     	'slow');

	  	console.log(usersInput + 'lalala');
		$(this).siblings().hide();
		$(this).css('display', 'none');
		cocktailApp.drinksApi($('input[name="alchohol"]:checked').val());
		$('#loadMore').css('display', 'block');
	});
}

// the image and h3 are produced upon user's selection of liquor choice
// once user selects liquor AND cocktail, the ingredients will be produced
cocktailApp.display = function(cocktails) {
	console.log(cocktails);
	cocktails.forEach(function(cocktail) {
		if (cocktail.strDrinkThumb !== null){
			$('.cocktailResultsContainer').append(
				`<div class ='cocktailResultsItem' data-id=${cocktail.idDrink}>
					<img class = 'resultsImage' src="${cocktail.strDrinkThumb}">
					<h3 class = 'resultsItemTitle'>${cocktail.strDrink}</h3>
					<p class="recipeIngredients"> </p> <span class="recipeIngredient"></span>
				</div>
			`)
		}
		else {
			$('.cocktailResultsContainer').append(
				`<div class ='cocktailResultsItem' data-id=${cocktail.idDrink}> 
					<img class = 'resultsImage' src="./dev/assets/imageComingSoon.jpg">
					<h3 class = 'resultsItemTitle'>${cocktail.strDrink}</h3>
					<p class="recipeIngredients"> </p>
				</div>`
			)
		}
	});

<<<<<<< HEAD
	$('.cocktailResults').one('click', '.cocktailResultsItem', function(){
		console.log('lol neat');
		$(this).siblings().hide();
		console.log(this);
=======
	$('.cocktailResults').on('click', '.cocktailResultsItem', function(){
		$('.cocktailResults').off();

		$('.cocktailResultsItem:hover').css('transform', 'none');
		$(this).css('float','none');
		$(this).css('hover','none');
		$(this).css('margin','0 auto');
		$(this).siblings().hide();
		// usersCocktailChoice = $(this).val();
		// displayNext('#partThree');
		// $('header').css('display', 'none');
		// $('#partOne').css('display', 'none');
		// $('#partTwo').css('display', 'none');
		$('.cocktailResults').css('position', 'relative');
		$('#loadMore').css('display', 'none');
		$('.partTwoHeader').text(`Let's make you that cocktail`);
>>>>>>> 2d58ee50ce5e4c5fa53ce5c07fee830f8f062fd3
		var drinkId = $(this).data('id');
		cocktailApp.drinksId(drinkId);
		let checkInventory = cocktailApp.lcboApiGetInventory($('input[name="alchohol"]:checked').val()); //syncs users choice with LCBOs inventory
	});
		cocktailApp.lcboApiGetInventory();
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
		// console.log(inventoryItem);
		cocktailApp.lcboApiDisplay(inventoryItem);
	});
}

cocktailApp.lcboApiDisplay = function (lcboInventory) {
<<<<<<< HEAD
	lcboInventory.forEach(function(inventory){
		// console.log(inventory);
		$('.lcboResults').append(`
			<h3> ${inventory.name} </h3>
			<img src='${inventory.image_thumb_url}'>
			`)
		});
=======
>>>>>>> 2d58ee50ce5e4c5fa53ce5c07fee830f8f062fd3

    lcboInventory.forEach(function(inventory){
        // console.log(inventory);
        if (inventory.image_thumb_url !== null){
            $('.lcboResults').append(`
            	<div class='lcboDrinkOptions'>
            	<h3> ${inventory.name} </h3>
            	<img src='${inventory.image_thumb_url}'>
            	</div>
                `)
        }
        else{
            $('.lcboResults').append(`
                <div class='lcboDrinkOptions'>
                <h3> ${inventory.name} </h3>
                <img class = 'resultsImage' src='./dev/assets/bottleComingSoon.png'>
                </div>
                `)
        }
    });
}



cocktailApp.init = function () {
	cocktailApp.usersChoice();
	// cocktailApp.lcboApiDisplay();
	// cocktailApp.getCocktailType();
	cocktailApp.getLocation();
	// cocktailApp.lcboApiGetInventory();
	cocktailApp.loadMore();
};

$(function(){
	cocktailApp.init();
})
