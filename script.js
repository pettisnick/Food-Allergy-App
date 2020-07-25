var foodName, userAllergy, allergyInput, categoryInput, upcInput, safeToEat;

$(document).ready(function () {
    var allergyDrop = $('.allergy-dropdown');
    allergyDrop.on('click', function (event) {
        event.preventDefault();
        allergyDrop.toggleClass('is-active');
    });

    var categoryDrop = $('.category-dropdown');
    categoryDrop.on('click', function (event) {
        event.preventDefault();
        categoryDrop.toggleClass('is-active');
    });

    $('.allergy-item').on('click', function (event) {
        userAllergy = event.target.text.trim();
        $('#allergy-display').text(userAllergy);
        convertAllergy(userAllergy);
    });

    $('.category-item').on('click', function (event) {
        categoryInput = event.target.text.trim();
        $('#category-display').text(categoryInput);
    });

    $('.submit-btn').on('click', getData);
});

function convertAllergy(userAllergy) {
    if (userAllergy == "Dairy") {
        allergyInput = "DAIRY_FREE";
    } else if (userAllergy == "Eggs") {
        allergyInput = "EGG_FREE";
    } else if (userAllergy == "Peanuts") {
        allergyInput = "PEANUT_FREE";
    } else if (userAllergy == "Soy") {
        allergyInput = "SOY_FREE";
    } else if (userAllergy == "Wheat") {
        allergyInput = "WHEAT_FREE";
    } else if (userAllergy == "Tree Nuts") {
        allergyInput = "TREE_NUT_FREE";
    } else if (userAllergy == "Fish") {
        allergyInput = "FISH_FREE";
    } else if (userAllergy == "Shellfish") {
        allergyInput = "SHELLFISH_FREE";
    }
}

function getData() {
    var appID = "64be3214";
    var key = "a686c7f46157229e5073aeea40465ccd";
    var allergy = allergyInput;
    console.log(allergy);
    upcInput = $("#barcode-input").val().trim();
    console.log(upcInput);
    var edamamURL = "https://api.edamam.com/api/food-database/v2/parser?upc=" + upcInput + "&app_id=" + appID + "&app_key=" + key;
    console.log(edamamURL);

    //ajax function with url of the food barcode that we want to reach using GET
    $.get({
        url: edamamURL
    })
        .then(function (response) {
            console.log(response);
            foodName = response.hints[0].food.label; //get food label of user's barcode input
            var foodID = response.hints[0].food.foodId; //get food ID of user's barcode input
            console.log(foodID);
            getHealthLabel(foodID);
        });

    // Function to create the JSON object for the Edamam API push request, and execution
    function getHealthLabel(foodID) {
        var foodJSON = {};
        var ingredientsArray = new Array();
        var foodObject = { foodId: foodID };
        ingredientsArray.push(foodObject);
        foodJSON.ingredients = ingredientsArray;
        var url = "https://api.edamam.com/api/food-database/v2/nutrients?app_id=" + appID + "&app_key=" + key;

        $.ajax({
            method: "POST",
            url: url,
            headers: {
                "Content-Type": "application/json" //reuqired by Edamam API
            },
            data: JSON.stringify(foodJSON), 
        })
            .then(function (response) {
                console.log(response);
                var healthLabelsArray = response.healthLabels; //Get health labels (e.g. DAIRY-FREE)
                console.log(healthLabelsArray);
                var safe = healthLabelsArray.indexOf(allergy); //find index of user's allergy
                if (safe < 0) { //if the health labels does not include the user's allergy (if index is -1)
                    safeToEat = "false"; 
                } else {
                    safeToEat = "true";
                }
                storeData();
            });
    }


}

function storeData() {
    console.log(safeToEat);
    var foodObject = {
        name: foodName,
        allergy: userAllergy,
        category: categoryInput,
        item: upcInput,
        searchResult: safeToEat,
    }
    localStorage.setItem(foodName, JSON.stringify(foodObject));
    localStorage.setItem("lastKey", foodName);
    resultsScreen();
}

function resultsScreen() {
    window.location.href = "./results.html";
}