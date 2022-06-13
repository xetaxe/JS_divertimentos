// Contains the Game information

const AVAILABLE_NAMES = ["Jonathan", "Sophie", "Jessica", "Nathan", "John", "Stuart", "Jimmy", "Robert", "Eric", "Leonora", "Carmen", "Andrew", "Leena", "Jane", "Wolfgang"];
const GAME_SPEEDS = [500, 1000, 2000];
class Game {
	constructor(numPlayers, numRounds) {
		this.numPlayers = numPlayers;
		this.numRounds = numRounds;
		this.currentRound = 0;
		this.activeGame = 0;
		this.gameSpeed = 2;
		this.activePlayers = [];
	}


	createPlayers(){
		if (this.numPlayers < 1) {
			window.alert("There are no active players!");
		}

		let playersNames = [];
		this.activeGame = 0;

		do{
			let indexName = AVAILABLE_NAMES[Math.floor(Math.random() * AVAILABLE_NAMES.length)];
			if (playersNames.includes(indexName) == false){
				playersNames.push(indexName);
			}
		}
		while(playersNames.length < this.numPlayers);

		console.log(playersNames);

		for(let i=0; i<this.numPlayers; i++){
			
			let newPlayer = new Player(playersNames[i]);
			newPlayer.updatePosition(i+1);
			this.activePlayers.push(newPlayer);
		}

		return;
	}


	orderPlayers(){
		if (this.activePlayers.length == 0) {return false;}

		this.activePlayers.sort(function(a, b) { return (b.score - a.score);})

		console.log(this.activePlayers);

		for(let player of this.activePlayers) {
			player.updatePosition((this.activePlayers.indexOf(player) + 1));
		}
	}


	displayPlayers(){
		if (this.activePlayers.length == 0) {return false;}

		$("#game_table").empty();
		$("#game_table").append("<tr><th>Name</td><th>Score</th></tr>");

		for (let player of this.activePlayers){
			$("#game_table").append("<tr><td>" + player.position + ". " + player.name + "</td><td>" + player.score + "</td></tr>");
		}
	}

	createGame(){
		if (this.activePlayers.length == 0) {return false;}

		this.createPlayers();
		this.displayPlayers();
	}

	checkEndGame(){
		if (this.currentRound < this.numRounds){
			return false;
		}

		this.activeGame = 0;
	}


	newRound(){
		if (this.activePlayers.length == 0) {return false;}

		this.currentRound++;

		const scores = []
		for(let i=1; i <=this.activePlayers.length; i++){
			scores.push(i);
		}
		
		//Shuffle scores with Fisher-Yates algorithm
		for (let i=scores.length - 1; i>0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = scores[i];
			scores[i] = scores[j];
			scores[j] = temp;
		}

		for(let i=0; i< this.activePlayers.length; i++){
			this.activePlayers[i].score += scores[i];
		}

		this.orderPlayers();
		this.displayPlayers();
		this.checkEndGame();
	}

	runGame(){
		if (this.activePlayers.length == 0) {return false;}
		
		this.activeGame = 1;

		do{
			let myInterval = setInterval( function(){
				this.newRound();
			}, GAME_SPEEDS[this.gameSpeed]);
		}while (this.currentRound < this.numRounds);



	}





}
