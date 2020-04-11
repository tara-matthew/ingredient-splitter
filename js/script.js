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
        '6': ['pint'],
        '7': ['pints'],
        '8': ['mg'],
        '9': ['pound'],
        '10': ['lb']
    };

    if ($.isNumeric(firstWord)) {
        console.log('First word is a number!');
        var restOfString = returnRestOfString(ingredients);
        // Now check the next word
        var measurement = checkForMeasurement(restOfString, acceptedMeasurements);
        if (measurement) {
            var stringAfterMeasurement = returnStringAfterMeasurement(measurement.length, restOfString);
            return stringAfterMeasurement;
        }

        return 'The rest of the string is the ingredient';

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
    for (var property in acceptedMeasurements) {
        if (acceptedMeasurements[property].length < 1) {
            return true;
        } else if (acceptedMeasurements[property][0] == restOfString[0]) {
            return checkForMeasurement(
                restOfString.slice(1),
                {'0': acceptedMeasurements[property].slice(1)}
            );
        }
    }
}

    //No measurement
    return false;

}

function returnStringAfterMeasurement(measurementLength, restOfString) {
    if (restOfString.length > measurementLength) {
        return restOfString.slice(measurementLength);
    }

    return 'Where is the ingredient?';
}