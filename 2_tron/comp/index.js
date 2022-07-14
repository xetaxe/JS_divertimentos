"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use(express_1.default.json());
// app.use(express.urlencoded());
app.set("view options", { layout: false });
app.use(express_1.default.static('./comp/js'));
app.use(express_1.default.static('./html'));
app.use(express_1.default.static('./css'));
const users = [];
app.get('/', (req, res) => {
    res.sendFile('/index.html', { root: 'html' });
    users.length = 0;
});
app.get('/chat', (req, res) => {
    res.sendFile('/chat.html', { root: 'html' });
});
app.post('/new_user', (req, res) => {
    const newUser = req.body.username;
    if (users.length > 0 && users.includes(newUser)) {
        console.log(users);
        res.send("exists");
    }
    else {
        users.push(newUser);
        console.log(users);
        res.set('Content-Type', 'text/html');
        res.sendFile('/chat.html', { root: 'html' });
    }
});
app.get('*', (req, res) => {
    res.send('404! This is an invalid URL.');
});
app.listen(PORT, () => {
    console.log(`App available at: http://localhost:${PORT}`);
});
