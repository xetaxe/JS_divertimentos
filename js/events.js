var game;


$(document).ready(function() {

	let myChart;

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
		let gameSpeed = parseInt($("#game_speed").val());
		game.gameSpeed = (0.45) * gameSpeed * gameSpeed - 90 * gameSpeed + 5000;
	})


	//Create & reset game
	$("#create_game").click( function(){

		const players = parseInt($("#num_players").text());
		let rounds = parseInt($("#num_rounds").text());

		if (players == null || players == NaN || players < 2 || players > 15) {
			$("#test").text("Invalid number of players");
			return false;
		}
		if (isNaN(rounds)) {
			rounds = Infinity;
		} else if (rounds < 1 || rounds > 15) {
			$("#test").text("Invalid number of rounds");
			return false;
		}

		game = new Game(players, rounds);
		game.createPlayers();


		$("#game_table").empty();
		$("#game_table").append(`<div class="table_header">
			<div class="table_names">Name</div>
			<div class="table_scores">Score</div></div>`);

		for (let player of game.activePlayers){
			$("#game_table").append(`<div class="table_row" id="row_player_`+ player.divIndex + `">
			<div class="table_names">`+ player.name + `</div>
			<div class="table_scores">` + player.score + "</div></div>");
		}

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
		$("#game_table").append(`<div class="table_header">
			<div class="table_names">Name</div>
			<div class="table_scores">Score</div></div>
			<div id="wait_players">
			<div id="wait_players_message">Players go here...</div></div>`);

		$("#create_game").show();
		$("#players_options").show();
		$("#rounds_options").show();
		$("#speed_options").hide();
		$("#run_game").prop('disabled', true);
		$("#reset_game").hide();
		$("#canvas_message").show();

		myChart.destroy();
		myChart = null;

		return false;
	});


	//Start game
	$("#run_game").click( function(){

		if (game.activeGame == false){
			game.activeGame = true;

			let gameSpeed = parseInt($("#game_speed").val());
			game.gameSpeed = (0.45) * gameSpeed * gameSpeed - 90 * gameSpeed + 5000;

			$("#run_game").text("Stop Game");
			$("#reset_game").prop("disabled", true);
			if(myChart == null) {
				myChart = new Chart(
					document.getElementById("myChart"),
					game.chartConfig
				);
			}

		} else {
			game.activeGame = false;
			$("#run_game").text("Run Game");
			$("#reset_game").prop("disabled", false);
			clearInterval(game.gameInterval);
		}

		$("#canvas_message").hide();

		function gameLoop(){
			setTimeout(function() {
				if(game.currentRound < game.numRounds && game.activeGame == true){
					game.currentRound++;
					game.newRound();
					gameLoop();
					myChart.update();
					game.orderPlayers();
					swapPlayers(game);
					if(game.currentRound == game.numRounds){
						$("#run_game").text("Run Game");
						$("#run_game").prop("disabled", true);
						$("#reset_game").prop("disabled", false);
						return 0;
					}
	
				}
			}, game.gameSpeed);
		};

		gameLoop();

	});


	async function swapPlayers(game) {
		if (game.activePlayers.length == 0) {return false;}

		let distance = $("#row_player_1").outerHeight(true);

		for(let player of game.activePlayers) {
			let swapPosition = player.position - player.previousPosition;
			let yMove = (swapPosition * distance).toString();
			let rowId = "#row_player_" + player.divIndex;
	
			$(rowId).css('z-index', (game.numPlayers - swapPosition));
			$(rowId).animate({
				top: "+=" + yMove + "px",
			}, game.gameSpeed * 0.5)

			$(rowId).children().last().remove();
			$(rowId).append(`<div class="table_scores">` + player.score + "</div>");
		}

	}



});