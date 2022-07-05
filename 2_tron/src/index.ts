import express from 'express';
const app = express();
const PORT = 5000;

app.use(express.json());
// app.use(express.urlencoded());
app.use(express.static('./comp/js'));
app.use(express.static('./html'));
app.use(express.static('./css'));

const users: string[] = [];


app.get('/', (req, res) => {
	res.sendFile('/index.html', {root:'html'});
	users.length = 0;
});

app.get('/chat', (req, res) => {
	res.sendFile('/chat.html', {root:'html'});
});

app.post('/new_user', (req, res) => {

	const newUser:string = req.body.username;
	if(users.length > 0 && users.includes(newUser)){
		console.log(users);
		res.send("exists");
	} else{
		users.push(newUser);
		console.log(users);
		res.send("new");
	}
});

app.get('*', (req, res) => {
	res.send('404! This is an invalid URL.');
  });

app.listen(PORT, ()=> {
	console.log(`App available at: http://localhost:${PORT}`);
});