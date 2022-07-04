"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
var users = [];
app.listen(PORT, () => {
    console.log(`App available at: http://localhost:${PORT}`);
});
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'html' });
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
