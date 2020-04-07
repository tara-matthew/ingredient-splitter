$(document).ready(function() {

    $('.submit-btn').on('click', function() {
        var ingredients = $('.ingredients').val();
        console.log(checkIngredients(ingredients));
    })
})

function checkIngredients(ingredients) {

    var firstWord = getFirstWord(ingredients);
    var acceptedMeasurements = {
        '0': ['grams'],
        '1': ['g'],
        '2': ['kilograms'],
        '3': ['kg'],
        '4':['fluid', 'ounces'],
        '5': ['teaspoons'],
        '6': ['two', 'things'],
        '7': ['three', 'things', 'here']
    };

    if ($.isNumeric(firstWord)) {
        console.log('First word is a number!');
        var restOfString = returnRestOfString(ingredients);
        // Now check the next word
        var measurement = checkForMeasurement(restOfString, acceptedMeasurements);
        return measurement;

    }

    return 'Unit of measurement is in the first word. The rest is the ingredient';
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

function checkForMeasurement(restOfString, acceptedMeasurements) {
    if (restOfString.length == 1) {
        for (var property in acceptedMeasurements) {
            if (acceptedMeasurements[property].length == 1) {
                if (restOfString[0] == acceptedMeasurements[property]) {
                    return 'match found! It was ' + acceptedMeasurements[property];
                }
            }
        }

        return 'No match found';

    }
    else {
        for (var property in acceptedMeasurements) {
            var matches = 0;
            if (acceptedMeasurements[property].length > 1) {
                for (var i = 0; i < acceptedMeasurements[property].length; i ++) {
                    if (acceptedMeasurements[property][i] == restOfString[i]) {
                        matches++;
                        if (matches == acceptedMeasurements[property].length) {
                            return 'Match found! It was ' + acceptedMeasurements[property].join(' ');
                        }
                    } else {
                        break;
                    }
                }
            }
        }

        return 'no match found';

    }
}