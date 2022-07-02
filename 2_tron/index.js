const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded());

var users = [];


app.listen(PORT, ()=> {
	console.log(`App available at: http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
	res.sendFile('index.html', {root:'html'});
});

app.post('/submit_username', (req, res) => {

	if(users.includes(req.body.username)){
		res.status(418).json({message: "Username already taken!"});
	} else{
		users.push(req.body.username);
		res.sendFile('chat.html', {root:'html'});
	}
});