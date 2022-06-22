// Contains the Game information

const AVAILABLE_NAMES = ["Jonathan", "Sophie", "Jessica", "Nathan", "John", "Stuart", "Jimmy", "Robert", "Eric", "Leonora", "Carmen", "Andrew", "Leena", "Jane", "Wolfgang", "Louise"];
const GAME_SPEEDS = [1000, 2000, 5000];
class Game {
	constructor(numPlayers, numRounds) {
		this.numPlayers = numPlayers;
		this.numRounds = numRounds;
		this.currentRound = 0;
		this.activeGame = 0;
		this.gameSpeed = 1;
		this.activePlayers = [];
		this.gameInterval;
		this.chartData = {};
		this.chartConfig = {};
	}


	createPlayers(){
		if (this.numPlayers < 1) {
			window.alert("There are no active players!");
		}

		let playersNames = [];
		this.activeGame = false;

		do{
			let indexName = AVAILABLE_NAMES[Math.floor(Math.random() * AVAILABLE_NAMES.length)];
			if (playersNames.includes(indexName) == false){
				playersNames.push(indexName);
			}
		}
		while(playersNames.length < this.numPlayers);

		for(let i=0; i<this.numPlayers; i++){
			
			let newPlayer = new Player(playersNames[i]);
			newPlayer.updatePosition(i+1);
			this.activePlayers.push(newPlayer);
		}

		this.chartData = {
						
			// labels: [
			// 	'January',
			// 	'February',
			// 	'March',
			// 	'April',
			// 	'May',
			// 	'June',
			// ],
			datasets: [{
				label: "none",
				pointRadius: 0,
				backgroundColor: 'rgb(255, 255, 255)', //Line color
				borderColor: 'rgb(255, 99, 132)',
				data: [0, 10, 5, 2, 20, 30, 45],
			}]
		}

		this.chartConfig = {
			type: 'line',
			data: this.chartData,
			options: {
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false
					}
				}
			}
		}

		return;
	}


	orderPlayers(){
		if (this.activePlayers.length == 0) {return false;}

		this.activePlayers.sort(function(a, b) { return (b.score - a.score);})

		for(let player of this.activePlayers) {
			player.updatePosition((this.activePlayers.indexOf(player) + 1));
		}
	}


	deleteGame(){
		this.numPlayers = 0;
		this.numRounds = 0;
		this.currentRound = 0;
		this.activeGame = 0;
		this.gameSpeed = 1;
		this.activePlayers = [];
		this.gameInterval;
		this.chartInfo;
	}

	// checkEndGame(){
	// 	if (this.currentRound < this.numRounds){
	// 		return false;
	// 	}

	// 	this.activeGame = false;
	// }

	changeSpeed(gameSpeed){
		this.gameSpeed = GAME_SPEEDS[gameSpeed];
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


	}

	runGame(){
		if (this.activePlayers.length == 0) {return false;}


	}

}
