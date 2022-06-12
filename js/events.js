var game;

$(document).ready(function() {

	//Create & redefine game

	$("#game_form").submit( function(){

		const players = $("#players").val();
		const rounds = $("#rounds").val();

		if (players == null || players == NaN || players < 2 || players > 15) {
			$("#test").text("Invalid number of players");
			return false;
		}
		if (rounds == NaN || rounds < 2 || rounds > 15) {
			$("#test").text("Invalid number of rounds");
			return false;
		}

		game = new Game(players, rounds);
		game.createPlayers();
		game.displayPlayers();
		$("#create_game").val("Redefine Game");
		$("#start_game").show();

		return false;
	});


	//Start game
	$("#start_game").click( function(){

		game.newRound();
		game.displayPlayers();

	})

});
