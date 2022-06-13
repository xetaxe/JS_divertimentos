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

	$("#game_speed").change( function() {
		game.gameSpeed = parseInt($("#game_speed").val());
	})


	//Create & reset game
	$("#create_game").click( function(){

		const players = $("#num_players").val();
		let rounds = $("#num_rounds").val();

		if (players == null || players == NaN || players < 2 || players > 15) {
			$("#test").text("Invalid number of players");
			return false;
		}
		if (rounds == "Unlimited") {
			rounds = Infinity;
		} else if (rounds == NaN || rounds < 1 || rounds > 15) {
			$("#test").text("Invalid number of rounds");
			return false;
		}

		game = new Game(players, rounds);
		game.createPlayers();
		game.displayPlayers();

		$("#create_game").hide();
		$("#players_options").hide();
		$("#rounds_options").hide();
		$("#speed_options").show();
		$("#run_game").show();
		$("#reset_game").show();

		return false;
	});


	//Reset game
	$("#reset_game").click( function(){

		game.deleteGame();

		$("#create_game").show();
		$("#players_options").show();
		$("#rounds_options").show();
		$("#speed_options").hide();
		$("#run_game").hide();
		$("#reset_game").hide();

		return false;
	});


	//Start game
	$("#run_game").click( function(){

		if (game.activeGame == false){
			game.activeGame = true;
			$("#run_game").text("Stop Game");
		} else {
			game.activeGame = false;
			$("#run_game").text("Run Game");
			clearInterval(game.gameInterval);
		}


		function gameLoop(){
			setTimeout(function() {
				if(game.currentRound < game.numRounds && game.activeGame == true){
					console.log("hola");
					game.currentRound++;
					game.newRound();
					game.orderPlayers();
					game.displayPlayers();
					game.checkEndGame();
					gameLoop();
				}
			}, GAME_SPEEDS[game.gameSpeed]);
		};

		gameLoop();



		// game.gameInterval = setInterval( function(){
		// 	if(game.currentRound < game.numRounds && game.activeGame == true){
		// 		console.log("hola");
		// 		game.currentRound++;
		// 		game.newRound();
		// 		game.orderPlayers();
		// 		game.displayPlayers();
		// 		game.checkEndGame();
		// 	} else {
		// 		clearInterval(game.gameInterval);
		// 	}
		// }, GAME_SPEEDS[game.gameSpeed]);


	});

});
