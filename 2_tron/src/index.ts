import express from 'express';
import Game from './js/game.js';

const app = express();
const PORT = 5000;

let game:object;

app.use(express.json());
// app.use(express.urlencoded());
// app.set("view options", {layout: false});
app.use(express.static('./comp/js'));
app.use(express.static('./html'));
app.use(express.static('./css'));

const users: string[] = [];


app.get('/', (req, res) => {
	res.sendFile('/index.html', {root:'html'});
});

// app.get('/chat', (req, res) => {
// 	res.sendFile('/chat.html', {root:'html'});
// });

app.post('/login', (req, res) => {

	const newUser:string = req.body.username;
	if(users.length > 0 && users.includes(newUser)){
		console.log(users);
		res.send("exists");
	} else{
		users.push(newUser);
		console.log(users);

		res.set('Content-Type', 'text/html');
		res.sendFile('/chat.html', {root:'html'});
	}
});

app.get('*', (req, res) => {
	res.send('404! This is an invalid URL.');
  });

app.listen(PORT, ()=> {
	console.log(`App available at: http://localhost:${PORT}`);
});