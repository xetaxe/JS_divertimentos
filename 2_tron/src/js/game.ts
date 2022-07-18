export default class Game {

	gameCode:string;
	numPlayers:number;
	numRounds:number;
	gridState:number[][];

	constructor(gameCode:string){
		this.numPlayers = 0;
		this.numRounds = 0;
		this.gridState = Array(200).fill(0).map(() => Array(200).fill(0));
		this.gameCode = gameCode;
	}

}