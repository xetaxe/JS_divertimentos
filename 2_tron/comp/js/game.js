export default class Game {
    constructor(gameCode) {
        this.numPlayers = 0;
        this.numRounds = 0;
        this.gridState = Array(200).fill(0).map(() => Array(200).fill(0));
        this.gameCode = gameCode;
    }
}
