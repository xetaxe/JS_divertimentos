// Contains each individual player's information


class Player {
	constructor(name) {
		this.name = name;
		this.score = 0;
		this.position = 0;
		this.previousPosition = 0;
	}

	updatePosition(index){
		this.previousPosition = this.position;
		this.position = index;
	}
}