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

  $.get('http://0.0.0.0:5001/api/vi/status/', function (data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  function postAmenity (amenities) {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify(amenities),
      success: function (data) {
        data.sort(function (a, b) {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        $('section.places').empty();
        $.each(data, function (i, place) {
          $('section.places').append('<article>' +
          ('<div class="title">') +
          ('<h2>' + place.name + '</h2>') +
          ('<div class="price_by_night">') +
          ('$' + place.price_by_night) +
          ('</div>') +
          ('</div>') +
          ('<div class="information">') +
          ('<div class="max_guest">') +
          ('<i class="fa fa-users fa-3x" aria-hidden="true"></i>') +
          ('<br />') +
          (place.max_guest + ' Guests') +
          ('</div>') +
          ('<div class="number_rooms">') +
          ('<i class="fa fa-bed fa-3x" aria-hidden="true"></i>') +
          ('<br />') +
          (place.number_rooms + ' Bedrooms') +
          ('</div>') +
          ('<div class="number_bathrooms">') +
          ('<i class="fa fa-bath fa-3x" aria-hidden="true"></i>') +
          ('<br />') +
          (place.number_bathrooms + ' Bathroom') +
          ('</div>') +
          ('</div>') +
          ('<div class="description">') +
          (place.description) +
          ('</div>') +
          ('</article>'));
        });
      }
    });
  }

  postAmenity({});

  $('button').click(function () {
    const payload = {};
    const ids = Object.keys(amenity);
    payload.amenities = ids;
    postAmenity(payload);
    console.log('Clicked');
  });
});
