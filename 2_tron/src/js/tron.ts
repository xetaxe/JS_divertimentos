import * as Login from './login.js';

$("#login_button").on('click', function(e) {
    e.preventDefault();

	let username = (<HTMLInputElement>document.getElementById("username")).value;

	if(username.length == 0) {
		$("#login_error").text("Write a username first!");
	} else if (username.length > 20){
		$("#login_error").text("Your username is too long!");
	}



    var self = (<HTMLInputElement>document.getElementById("login_button"));
    $('#toggleText').slideUp('fast', function() {
         self.form?.submit();
    });
});