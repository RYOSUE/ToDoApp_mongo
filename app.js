const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Todolist = require('./models/toDoList'); // モデルのインポート
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate'); // EJSのテンプレートエンジン


// モデルの定義とデータベース接続
mongoose.connect('mongodb://localhost:27017/todo-list',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('MongoDBコネクションOK !');
    })
    .catch(err => {
        console.error('MongoDBコネクションエラー:', err);
    });

app.use(express.urlencoded({ extended: true })); // URLエンコードされたデータのパース
app.use(express.json()); // JSONデータのパース
app.use(methodOverride('_method')); // PUTやDELETEメソッドのサポート
app.use(express.static(path.join(__dirname, 'public'))); // 静的ファイルの提供

app.engine('ejs', ejsMate); // EJSテンプレートエンジンの設定
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/todolists', async (req, res) => {
    const todolists = await Todolist.find({});
    res.render('todolists/index', { todolists });
});

app.get('/todolists/new', (req, res) => {
    res.render('todolists/new');
});

app.get('/todolists/:id', async (req, res) => {
    const todolist = await Todolist.findById(req.params.id);
    res.render('todolists/show', { todolist });
});

app.post('/todolists', async (req, res) => {
    const todolist = new Todolist(req.body.todolist);
    await todolist.save();
    res.redirect(`/todolists/${todolist._id}`);
});

app.get('/todolists/:id/edit', async (req, res) => {
    const todolist = await Todolist.findById(req.params.id);
    res.render('todolists/edit', { todolist });
});

app.put('/todolists/:id', async (req, res) => {
    const { id } = req.params;
    const todolist = await Todolist.findByIdAndUpdate(id, { ...req.body.todolist });
    res.redirect(`/todolists/${todolist._id}`);
});

app.delete('/todolists/:id', async (req, res) => {
    const { id } = req.params;
    await Todolist.findByIdAndDelete(id);
    res.redirect('/todolists');
});

app.listen(3000, () => {
    console.log("ポート3000でリクエストを待ち受け中...");
});