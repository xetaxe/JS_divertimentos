export async function newUser(username:string) {
	const newUser = {"username": username};

	const xhttp = new XMLHttpRequest();
	xhttp.open("POST", "/login");
	xhttp.setRequestHeader("Content-Type", "application/json");
	xhttp.send(JSON.stringify(newUser));

	xhttp.onload = function() {
		if (this.responseText === "exists") {
			 return "User already exists";
		} else {
			// window.location.replace('/chat.html')
		}
	}
}