var game;

$(document).ready(function() {

	//Modify no. of players and rounds
	{
		let myInterval;

		$("#decr_players").click( function() {
			let currentValue = $("#num_players").val();
			if (currentValue > 2){
				currentValue--;
				$("#num_players").val(currentValue);
			}
		});
		$("#decr_players").mousedown( function() {
			myInterval = setInterval(function (){
				let currentValue = $("#num_players").val();
				if (currentValue > 2){
					currentValue--;
					$("#num_players").val(currentValue);
				}
			}, 100);
		});
		$("#decr_players").mouseup( function() {
			clearInterval(myInterval);
		});

		$("#incr_players").click( function() {
			let currentValue = $("#num_players").val();
			if (currentValue < 15){
				currentValue++;
				$("#num_players").val(currentValue);
			}
		});
		$("#incr_players").mousedown( function() {
			myInterval = setInterval(function (){
				let currentValue = $("#num_players").val();
				if (currentValue < 15){
					currentValue++;
					$("#num_players").val(currentValue);
				}
			}, 100);
		});
		$("#incr_players").mouseup( function() {
			clearInterval(myInterval);
		});


		$("#decr_rounds").click( function() {
			let currentValue = $("#num_rounds").val();
			if (currentValue > 1){
				currentValue--;
				$("#num_rounds").val(currentValue);
			} else if (currentValue == "Unlimited"){
				$("#num_rounds").val(15);
			}
		});
		$("#decr_rounds").mousedown( function() {
			myInterval = setInterval(function (){
				let currentValue = $("#num_rounds").val();
				if (currentValue > 1){
					currentValue--;
					$("#num_rounds").val(currentValue);
				} else if (currentValue == "Unlimited"){
					$("#num_rounds").val(15);
				}
			}, 100);
		});
		$("#decr_rounds").mouseup( function() {
			clearInterval(myInterval);
		});

		$("#incr_rounds").click( function() {
			let currentValue = $("#num_rounds").val();
			if (currentValue < 15){
				currentValue++;
				$("#num_rounds").val(currentValue);
			}else if (currentValue == 15){
				$("#num_rounds").val("Unlimited");
			}
		});
		$("#incr_rounds").mousedown( function() {
			myInterval = setInterval(function (){
				let currentValue = $("#num_rounds").val();
				if (currentValue < 15){
					currentValue++;
					$("#num_rounds").val(currentValue);
				}else if (currentValue == 15){
					$("#num_rounds").val("Unlimited");
				}
			}, 100);
		});
		$("#incr_rounds").mouseup( function() {
			clearInterval(myInterval);
		});
	}


	//Create & reset game
	$("#define_game").click( function(){

		const players = $("#num_players").val();
		const rounds = $("#num_rounds").val();

		if (players == null || players == NaN || players < 2 || players > 15) {
			$("#test").text("Invalid number of players");
			return false;
		}
		if (rounds == "Unlimited") {
			rounds = 2000;
		} else if (rounds == NaN || rounds < 1 || rounds > 15) {
			$("#test").text("Invalid number of rounds");
			return false;
		}

		game = new Game(players, rounds);
		game.createPlayers();
		game.displayPlayers();
		// game.createGame();
		$("#define_game").text("Redefine Game");
		$("#run_game").show();

		return false;
	});


	//Start game
	$("#run_game").click( function(){

		game.runGame();

	});

});
