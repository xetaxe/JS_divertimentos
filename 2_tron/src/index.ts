import express from 'express';
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

app.post('/new_user', (req, res) => {
	let reqContent = req;
});


// app.post('/new_user', (req, res) => {

// 	if(users.includes(req.body.username)){
// 		res.status(400).send("User alredy in use");
// 		return;
// 	} else{
// 		users.push(req.body.username);
// 		res.sendFile('chat.html', {root:'html'});
// 	}
// });