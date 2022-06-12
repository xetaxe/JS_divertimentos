// Contains the Game information

const AVAILABLE_NAMES = ["Jonathan", "Sophie", "Jessica", "Nathan", "John", "Stuart", "Jimmy", "Robert", "Eric", "Leonora", "Carmen", "Andrew", "Leena", "Jane", "Wolfgang"];

class Game {
	constructor(numPlayers, numRounds) {
		this.numPlayers = numPlayers;
		this.numRounds = numRounds;
		this.activePlayers = [];
	}


	createPlayers(){
		if (this.numPlayers < 1) {
			window.alert("There are no active players!");
		}

		let playersNames = [];

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


	newRound(){
		if (this.activePlayers.length == 0) {return false;}

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
	}





}
