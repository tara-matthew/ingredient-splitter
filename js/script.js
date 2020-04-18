$(document).ready(function() {

    $('.submit-btn').on('click', function() {
        var ingredients = $('.ingredients').val();
        console.log(checkIngredients(ingredients));
    })
})

function checkIngredients(ingredients) {

    var acceptedMeasurements = {
        '0': ['grams'],
        '1': ['g'],
        '2': ['kilograms'],
        '3': ['kg'],
        '4': ['fluid', 'ounces'],
        '5': ['teaspoons'],
        '6': ['pint'],
        '7': ['pints'],
        '8': ['mg'],
        '9': ['pound'],
        '10': ['lb'],
        '11': ['three', 'things', 'here'],
        '12': ['this', 'is', 'four', 'things']
    };

    ingredients = ingredients.split(', ');
    var firstWord = [];
    var restOfString = [];
    var measurement = [];
    var stringAfterMeasurement = [];

    for (var i = 0; i < ingredients.length; i++) {
        firstWord[i] = getFirstWord(ingredients[i]);
        if ($.isNumeric(firstWord[i])) {
            console.log('First word is a number!');
            restOfString[i] = returnRestOfString(ingredients[i]);
            measurement[i] = checkForMeasurement(restOfString[i], acceptedMeasurements);
            if (measurement[i]) {
                stringAfterMeasurement[i] = (measurement[i].length >= 1 ? measurement[i]: 'Where is the ingredient?');
            } else {
                stringAfterMeasurement[i] = 'The rest of the string is the ingredient';
            }
        } else {
            stringAfterMeasurement[i] = 'Unit of measurement is in the first word. The rest is the ingredient';
        }
    }

    return stringAfterMeasurement;
}

function getFirstWord(ingredients) {
    ingredients = ingredients.split(" ");
    return ingredients[0];
}

function returnRestOfString(ingredients) {
    ingredients = ingredients.split(" ");
    var remainingIngredients = [];
    //TODO start at 0 and use modulus here or slice the array
    for (var i = 1; i < ingredients.length; i++) {
        remainingIngredients[i-1] = ingredients[i]
    }

    return remainingIngredients;
}

// Recursion!
function checkForMeasurement(restOfString, acceptedMeasurements) {
    for (var property in acceptedMeasurements) {
        if (acceptedMeasurements[property].length < 1) {
            return restOfString;
        } else if (acceptedMeasurements[property][0] == restOfString[0]) {
            return checkForMeasurement(
                restOfString.slice(1),
                {'0': acceptedMeasurements[property].slice(1)}
            );
        }
    }

    return false;
}