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
			let indexName = AVAILABLE_NAMES[Math.floor(Math.random * AVAILABLE_NAMES.length)];
			if (playersNames.includes(indexName) == false){
				playersNames.push(indexName);
			}
		}
		while(playersNames.length < this.numPlayers);

		console.log(playersNames);

		for(let i=0; i<this.numPlayers; i++){
			
			let newPlayer = new Player(playersNames[i]);
			this.activePlayers.push(newPlayer);
		}
	}
}

var newGame = new Game(10, 10);
newGame.createPlayers();
console.log(newGame.activePlayers);
