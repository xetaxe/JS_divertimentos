"use strict";
// import { Game } from './game';
function createGame() {
    console.log("Hola");
    let game = new Game();
    $("#test").text("Hola");
    console.log(game);
}
console.log("odn");
$("#testbutton").on("click", createGame);
