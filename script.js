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
      console.log("Food Allergy: " + (event.target.text).trim());
  });

  $('.category-item').on('click', function (event) {
    console.log("Food Category: " + (event.target.text).trim());
});
});