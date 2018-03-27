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

	function itemSwitched() {
		var optionSelected = $('#itemSelection');
		optionSelected.on('change', handleItemSelected);
	}

	itemSwitched();

	function handleItemSelected(data) {
	    var newItemSelected = $('#itemSelection').val();
	    $('#searchSection').show();

	    $.get('/api/' + newItemSelected, function(data) {
		searchResults(data);
		})
  	}	

	function searchResults(data) {
		if (data.length !== 0) {

			$('#searchSection').show();
			$('#searchContent').empty();
			$('#searchContent').show();
			
			for (var i = 0; i < data.length; i++) {

				var div = $('<div>');

				div.append('<p> • Substrate: ' + data[i].item_description + '</p>');
				div.append('<p> • Consignment received: ' + data[i].consignment_received + '</p>');
				div.append('<p> • Current inventory: ' + data[i].item_qty + '</p>');

				$('#searchContent').append(div);
			}
		}
	}	
	$('#deductConsignment').on('click', function(event) {
		event.preventDefault();

		var itemSelected = $('#itemSelection').val();
		$.get('/api/' + itemSelected, function(data) {
			for (var i = 0; i < data.length; i++) {
				var updateValue = $('#deductReceived').val().trim();
				var updateConsignment = data[i].consignment_received - updateValue;
			}
			$('#deductReceived').val('');

			$.post('/api/deduct', {
				consignment_received: updateConsignment,
				item_description: itemSelected
			})
			.then(function(data) {
			});
			alert('DEDUCTION SUCCESSFUL');
			location.reload();
		});
	});

	$('#searchModal').on('click', function() {
		var itemSelected = $('#itemSelection').val();
		var searchQty = $('#deductReceived').val().trim();
		var div = $('<div>');

		div.append('<p> • Item Description: ' + itemSelected + '</p>');
		div.append('<p> • Deduct Amount (sheets): ' + searchQty + '</p>' + '<hr>');

		$('#searchModalData').append(div);
	});
}); //ready