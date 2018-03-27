$(document).ready(function() {
    Materialize.updateTextFields();
    $(".button-collapse").sideNav();
    $('.modal').modal();

	$('#addSubstrate').on('click', function(e) {
		event.preventDefault();

		var newItem = $('#itemDescription').val().trim().toUpperCase();
		var newConsignment = $('#consignmentQty').val().trim();

		$.get('/api/all/', function(data) {
			var notPresent = data.map(i => i.item_description).indexOf(newItem) == -1;
			if (newItem !== '' && newConsignment !== '' && notPresent) {
				
				$.post('/api/new', {
					item_description: newItem,
					item_qty: newConsignment,
					consignment_received: newConsignment		
				})
				.then(function(data) {
				});
			} else {
				alert('Item already exist or missing information');
			}
			alert('Item ADDED successfully!');
			location.reload();
		});

		$('#itemDescription').val('');
		$('#consignmentQty').val('');
	});

	$('#addModal').on('click', function () {

		var newItem = $('#itemDescription').val().trim();
		var newItemQty = $('#consignmentQty').val().trim();
		var div = $('<div>');

		div.append('<p> • Item Description: ' + newItem + '</p>');
		div.append('<p> • Consignment QTY: ' + newItemQty + '</p>' + '<hr>');

		$('#modalData').append(div);
	});
});