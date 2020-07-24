$(document).ready(function () {
    var dropdown = $('.dropdown1');
    dropdown.on('click', function(event) {
      event.preventDefault();
      dropdown.toggleClass('is-active');
    });

      var dropdown2 = $('.dropdown2');
    dropdown2.on('click', function(event) {
      event.preventDefault();
      dropdown2.toggleClass('is-active');
    });
});

       