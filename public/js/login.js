function clicked() {
	var user = document.getElementById('username');
	var pass = document.getElementById('password');

	var userCred = 'admin';
	var passCred = 'corefact';

	if (user.value == userCred) {
		if (pass.value == passCred) {
		document.location.href = '/deduct';
		} else {
			alert('Invalid username or password');
		}
	} else {
		alert('Invalid username or password');
	}
};