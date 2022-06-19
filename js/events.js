var game;


$(document).ready(function() {


	//Modify no. of players and rounds
	{
		let myInterval;

		$("#decr_players").click( function() {
			let currentValue = parseInt($("#num_players").text());
			if (currentValue > 2){
				currentValue--;
				$("#num_players").text(currentValue);
			}
		});
		$("#decr_players").mousedown( function() {
			myInterval = setInterval(function (){
				let currentValue = parseInt($("#num_players").text());
				if (currentValue > 2){
					currentValue--;
					$("#num_players").text(currentValue);
				}
			}, 100);
		});
		$("#decr_players").mouseup( function() {
			clearInterval(myInterval);
		});

		$("#incr_players").click( function() {
			let currentValue = parseInt($("#num_players").text());
			if (currentValue < 15){
				currentValue++;
				$("#num_players").text(currentValue);
			}
		});
		$("#incr_players").mousedown( function() {
			myInterval = setInterval(function (){
				let currentValue = parseInt($("#num_players").text());
				if (currentValue < 15){
					currentValue++;
					$("#num_players").text(currentValue);
				}
			}, 100);
		});
		$("#incr_players").mouseup( function() {
			clearInterval(myInterval);
		});


		$("#decr_rounds").click( function() {
			let currentValue = $("#num_rounds").text();
			if (currentValue == "∞"){
				currentValue = 15;
				$("#num_rounds").text(currentValue);
			} else {
				currentValue = parseInt(currentValue);
				if (currentValue > 1){
					currentValue--;
					$("#num_rounds").text(currentValue);
				}
			}
		});
		$("#decr_rounds").mousedown( function() {
			myInterval = setInterval(function (){
				let currentValue = $("#num_rounds").text();
				if (currentValue == "∞"){
					currentValue = 15;
					$("#num_rounds").text(currentValue);
				} else {
					currentValue = parseInt(currentValue);
					if (currentValue > 1){
						currentValue--;
						$("#num_rounds").text(currentValue);
					}
				}
			}, 100);
		});
		$("#decr_rounds").mouseup( function() {
			clearInterval(myInterval);
		});

		$("#incr_rounds").click( function() {
			let currentValue = parseInt($("#num_rounds").text());
			if (currentValue < 15){
				currentValue++;
				$("#num_rounds").text(currentValue);
			} else if (currentValue == 15){
				$("#num_rounds").html("∞");
			}
		});
		$("#incr_rounds").mousedown( function() {
			myInterval = setInterval(function (){
				let currentValue = parseInt($("#num_rounds").text());
				if (currentValue < 15){
					currentValue++;
					$("#num_rounds").text(currentValue);
				}else if (currentValue == 15){
					$("#num_rounds").text("∞");
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

		const players = parseInt($("#num_players").text());
		let rounds = parseInt($("#num_rounds").text());

		console.log(rounds);

		if (players == null || players == NaN || players < 2 || players > 15) {
			$("#test").text("Invalid number of players");
			return false;
		}
		if (isNaN(rounds)) {
			console.log("Hola");
			rounds = Infinity;
		} else if (rounds < 1 || rounds > 15) {
			$("#test").text("Invalid number of rounds");
			return false;
		}

		console.log(rounds);

		game = new Game(players, rounds);
		game.createPlayers();
		game.displayPlayers();

		$("#create_game").hide();
		$("#players_options").hide();
		$("#rounds_options").hide();
		$("#speed_options").show();
		$("#run_game").prop("disabled", false);
		$("#reset_game").show();

		return false;
	});


	//Reset game
	$("#reset_game").click( function(){

		game.deleteGame();

		$("#game_table").empty();
		$("#game_table").append("<tr><th>Name</td><th>Score</th></tr>");

		$("#create_game").show();
		$("#players_options").show();
		$("#rounds_options").show();
		$("#speed_options").hide();
		$("#run_game").prop('disabled', true);
		$("#reset_game").hide();

		return false;
	});


	//Start game
	$("#run_game").click( function(){

		if (game.activeGame == false){
			game.activeGame = true;
			$("#run_game").text("Stop Game");
			$("#reset_game").prop("disabled", true);
		} else {
			game.activeGame = false;
			$("#run_game").text("Run Game");
			$("#reset_game").prop("disabled", false);
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
					if(game.currentRound == game.numRounds){
						$("#run_game").text("Run Game");
						$("#run_game").prop("disabled", true);
						$("#reset_game").prop("disabled", false);
					}
					gameLoop();
				}
			}, GAME_SPEEDS[game.gameSpeed]);
		};

		gameLoop();

	});

});
