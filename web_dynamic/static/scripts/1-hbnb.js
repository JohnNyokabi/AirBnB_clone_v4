$(document).ready(function () {
    let amenities = {};
    $('input[type=checkbox]').change(function () {
	let name = $(this).attr('data-name');
	let id = $(this).attr('data-id');
	if ($(this).is(':checked')) {
	    amenities[id] = name;
	} else if (!$(this).is(':checked')) {
	    delete amenities[id];
	}
	console.log(amenities);
	if (object.values(amenities).length === 0) {
	    $('.amenities h4').html("&nbsp;")
	} else {
	    $('.amenities h4').text(object.values(amenities).join(', '));
	}
    });
});
