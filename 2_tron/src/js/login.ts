async function newUser() {
	const newUser = {username: ""};
	newUser.username = (document.getElementById("username_input") as HTMLInputElement).value;

	const xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/new_user");
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(newUser));

	xhttp.onload = function() {
		if (this.responseText === "exists") {
			document.getElementById("username")!.innerHTML="User already exists";
		} else {
			window.location.replace('/chat.html')

			// document.body.innerHTML = this.responseText;

			// Old, with two HTTP requests
			// (async () => {
			// 	let x = await fetch("/chat");
			// 	let y = await x.text();
			// 	document.body.innerHTML = y;
			// })();
			//document.location = "/chat" <-- buscar info
		}
	}
}