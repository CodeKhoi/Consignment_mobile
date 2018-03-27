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
	    $('#deductSection').show();
	}
  	
  	$('#removeBtn').on('click', function(event) {
  		event.preventDefault();

		var itemSelected = $('#itemSelection').val();
		$.get('/api/' + itemSelected, function(data) {
			for (var i = 0; i < data.length; i++) {
				var updateValue = $('#removeInput').val().trim();

				if (itemSelected === 'B2 110 SATIN COVER') {
					updateValue = $('#removeInput').val().trim() * 2500;
				}
				if (itemSelected === 'B2 100 GLOSS TEXT') {
					updateValue = $('#removeInput').val().trim() * 6000;
				}
				if (itemSelected === 'DEMO') {
					updateValue = $('#removeInput').val().trim() * 3000;
				}
				var deductInventory = data[i].item_qty - updateValue; 
			}
			$('#removeInput').val('');
			
			$.post('/api/remove', {
				item_qty: deductInventory,
				item_description: itemSelected
			})
			.then(function(data) {
			});
		});
		alert('DEDUCTION SUCCESSFUL');
		location.reload();
	});

	$('#deductModal').on('click', function() {
		var itemSelected = $('#itemSelection').val();
		var deductQty = $('#removeInput').val().trim();
		var div = $('<div>');

		div.append('<p> • Item Description: ' + itemSelected + '</p>');
		div.append('<p> • Deduct Amount: ' + deductQty + '</p>' + '<hr>');

		$('#deductModalData').append(div);
	});
}); //ready