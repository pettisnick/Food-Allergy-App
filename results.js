$(document).ready(function () {
    var lastSearched = localStorage.getItem("lastKey"); //get item last searched from local storage
    var foodObject = JSON.parse(localStorage.getItem(lastSearched)); //get food details of item last searched
    var searchList = JSON.parse(localStorage.getItem("userSearch")); //get search array from local storage
    
    renderSearchCriteria(foodObject); //display what the user searched for
    renderResult(foodObject); //display primary result (to eat or not eat)
    renderHistory(searchList); //update history dropdown

    $('.search-dropdown').on('click', function (event) { //on click of search history, show user menu of previously searched
        event.preventDefault();
        $('.search-dropdown').toggleClass('is-active');
    });

    $(".history-item").on("click", displaySelect);

    $('.search-btn').on('click', searchScreen);
})

//Function to display selected history item
function displaySelect(event) {
    event.preventDefault();
    var historyItem = event.target.textContent;
    var historyObject = JSON.parse(localStorage.getItem(historyItem));
    renderSearchCriteria(historyObject);
    renderResult(historyObject);
}

//Function to update search criteria display
function renderSearchCriteria(itemObject) {
    console.log(itemObject.allergy);
    $("#allergyInput").attr("value", itemObject.allergy);
    $("#categoryInput").attr("value", itemObject.category);
    $("#itemInput").attr("value", itemObject.name);
}
//Function to update main result (to eat or not eat)
function renderResult(itemObject) {
    var foodImgUrl = itemObject.image;
    $("#food-img").attr("src", foodImgUrl);
    $("#food-img").attr("alt", "image of food");
    var result = itemObject.searchResult;
    if (result == "true") {
        $("#resultPhrase").text("You're good to go! Enjoy!");
    } else {
        $("#resultPhrase").text("Stop! " + itemObject.name + " has " + itemObject.allergy);
    }
    var imgUrl = "./Assets/" + result + ".png";
    $("#results-img").attr("src", imgUrl);
    $("#results-img").attr("alt", "image with sign of result");
   
}
//Function to update history
function renderHistory(list){
    list.forEach(function (food) {
        var itemEl = $("<a class='history-item'>");
        itemEl.text(food);
        $(".history-content").append(itemEl);    
    })
}

//Function to redirect
function searchScreen() {
    window.location.href = "./index.html"; //redirect to Landing Page
}