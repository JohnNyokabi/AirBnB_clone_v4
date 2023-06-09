$('document').ready(function () {
  const amenity = {};
  $('input[type=checkbox]').change(function () {
    const name = $(this).attr('data-name');
    const id = $(this).attr('data-id');
    if ($(this).is(':checked')) {
      amenity[id] = name;
    } else if (!$(this).is(':checked')) {
      delete amenity[id];
    }
    console.log(amenity);
    if (Object.values(amenity).length === 0) {
      $('.amenities h4').html('&nbsp;');
    } else {
      $('.amenities h4').text(Object.values(amenity).join(', '));
    }
  });
});
