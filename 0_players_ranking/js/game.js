// Contains the Game information

const AVAILABLE_NAMES = ["Jonathan", "Sophie", "Jessica", "Nathan", "John", "Stuart", "Jimmy", "Robert", "Eric", "Leonora", "Carmen", "Andrew", "Leena", "Jane", "Wolfgang", "Louise"];
class Game {
	constructor(numPlayers, numRounds) {
		this.numPlayers = numPlayers;
		this.numRounds = numRounds;
		this.currentRound = 0;
		this.activeGame = 0;
		this.gameSpeed = 1000;
		this.activePlayers = [];
		this.gameInterval;

		//Chart data and configs
		this.chartData = {
			labels: ["0"],
			datasets: []
		};
		this.chartConfig = {
			type: 'line',
			data: {},
			options: {
				stacked: false,
				maintainAspectRatio: false,
				plugins: {
					legend: { display: false }
				},
				scales: {
					y: { 
						suggestedMin: 0,
						suggestedMax: 20,
						ticks: { stepSize: 20 }
					},
					x: {
						grid: {
							display: false,
						},
						ticks: {
							display: false
						}
					}
				}
			}  
		};
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
			newPlayer.updatePosition(i + 1);
			newPlayer.divIndex = i + 1;
			this.activePlayers.push(newPlayer);

			let playerData = {
				label: newPlayer.name,
				pointRadius: 0,
				cubicInterpolationMode: 'monotone',
				borderColor: "#" + Math.floor(Math.random()*16777215).toString(16),
				data: [0]
			}

			this.chartData.datasets.push(playerData);
			this.chartConfig.data = this.chartData;
		}
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
		this.gameSpeed = 1000;
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


	newRound(){
		if (this.activePlayers.length == 0) {return false;}

		let maxScore = 0;
		let minScore = this.currentRound * this.numPlayers;

		this.chartData.labels.push(this.currentRound.toString());

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
			let totalScore = this.activePlayers[i].score;
			if (totalScore > maxScore) {
				maxScore = totalScore;
			}
			if (totalScore < minScore) {
				minScore = totalScore;
			}

			for(let obj of this.chartData.datasets) {
				if ( Object.values(obj).indexOf(this.activePlayers[i].name) > -1) {
					obj.data.push(totalScore);
				}
			}
		}


		const delayBetweenPoints = this.gameSpeed;
		const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : 0;

		const animation = {
			x: {
				easing: 'linear',
				duration: delayBetweenPoints,
			  },
			y: {
				easing: 'easeOutQuad',
				duration: 0,
				from: previousY,
				delay(ctx) {
					if (ctx.type !== 'data' || ctx.yStarted) {
					  return 0;
					}
					ctx.yStarted = true;
					return ctx.index * delayBetweenPoints;
				}
			}
		};


		this.chartConfig.options.animation = animation;

		this.chartConfig.options.scales.y.suggestedMax = maxScore;
		this.chartConfig.options.scales.y.suggestedMin = Math.max(0, minScore - 20);

		let chartxScroll = Math.min(10, 20 - this.numPlayers);
		if (this.currentRound > chartxScroll) {
			this.chartConfig.options.scales.x.min = (this.currentRound - chartxScroll).toString();
		}
	}

}
