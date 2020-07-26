$(document).ready(function () {
    var lastSearched = localStorage.getItem("lastKey");
    var foodObject = JSON.parse(localStorage.getItem(lastSearched));
    
    renderResult(foodObject);
    renderHistory(lastSearched);

    var searchHistory = $('.search-dropdown');
    searchHistory.on('click', function (event) {
        event.preventDefault();
        searchHistory.toggleClass('is-active');
    });

    renderSearchCriteria(foodObject);
})

function renderResult(itemObject) {
    var result = itemObject.searchResult;
    if (result == "true") {
        $("#resultPhrase").text("You're good to go! Enjoy!");
    } else {
        $("#resultPhrase").text("Stop! " + itemObject.name + " has " + itemObject.allergy);
    }
    var imgUrl = "./Assets/" + result + ".png";
    $("#results-img").attr("src", imgUrl);
}

function renderHistory(lastItem){
    var itemEl = $("<a class='history-item'>");
    itemEl.text(lastItem);
    console.log(itemEl);
    $(".history-content").append(itemEl);
    console.log($(".history-content"))
}

function renderSearchCriteria(itemObject) {
    console.log(itemObject.allergy);
    $("#allergyInput").attr("value", itemObject.allergy);
    $("#categoryInput").attr("value", itemObject.category);
    $("#itemInput").attr("value", itemObject.name);
}
