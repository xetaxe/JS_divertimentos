"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function newUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = { username: "" };
        newUser.username = document.getElementById("username_input").value;
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "/new_user");
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(newUser));
        xhttp.onload = function () {
            if (this.responseText === "exists") {
                document.getElementById("username").innerHTML = "User already exists";
            }
            else {
                window.location.replace('/chat.html');
                // document.body.innerHTML = this.responseText;
                // Old, with two HTTP requests
                // (async () => {
                // 	let x = await fetch("/chat");
                // 	let y = await x.text();
                // 	document.body.innerHTML = y;
                // })();
                //document.location = "/chat" <-- buscar info
            }
        };
    });
}
