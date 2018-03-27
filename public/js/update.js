$(document).ready(function() {
	Materialize.updateTextFields();
    $(".button-collapse").sideNav();
    $('.modal').modal();

	function getOptionItem() {
		$.get('/api/all', function(data) {
		  for (var i = 0; i < data.length; i++) {
		    var optionSection = $('<option></option>');
		    optionSection.append(data[i].item_description);
		    $('#itemSelection').append(optionSection);
		  }
		});
	}

	getOptionItem();

	function changeItem() {
		var optionSelected = $('#itemSelection');
		optionSelected.on('change', handleItemSelected);
	}

	changeItem();

	function handleItemSelected() {
	    var newItemSelected = $('#itemSelection').val();
	    $('#updateSection').show();
	    $('#addInventory').val('');
  	}

  	$('#updateInventory').on('click', function(event) {
		event.preventDefault();

		var itemSelected = $('#itemSelection').val();
		$.get('/api/' + itemSelected, function(data) {
			for (var i = 0; i < data.length; i++) {
				var updateValue = $('#addInventory').val().trim();

				if (itemSelected === 'B2 110 SATIN COVER') {
					updateValue = $('#addInventory').val().trim() * 2500;
				}
				if (itemSelected === 'B2 100 GLOSS TEXT') {
					updateValue = $('#addInventory').val().trim() * 6000;
				}
				if (itemSelected === 'DEMO') {
					updateValue = $('#addInventory').val().trim() * 3000;
				}
				var updateInventory = (data[i].item_qty) + parseInt(updateValue);
				var updateConsignment = (data[i].consignment_received) + parseInt(updateValue);
			
			}
			$('#addInventory').val('');

			$.post('/api/enter', {
				item_qty: updateInventory,
				consignment_received: updateConsignment,
				item_description: itemSelected
			})
			.then(function(data) {
			});
		});
		alert('UPDATE SUCCESSFUL');
		location.reload();
	});

	$('#updateModal').on('click', function() {
		var itemSelected = $('#itemSelection').val();
		var updateQty = $('#addInventory').val().trim();
		var div = $('<div>');


		div.append('<p> • Item Description: ' + itemSelected + '</p>');
		div.append('<p> • Update Amount: ' + updateQty + '</p>' + '<hr>');

		$('#updateModalData').append(div);
	});
}); //ready








