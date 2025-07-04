const mongoose = require('mongoose');
const Todolist = require('../models/toDoList'); // モデルのインポート
const todos = require('./todos'); // todolistの初期データ

// モデルの定義とデータベース接続
mongoose.connect('mongodb://localhost:27017/todo-list',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('MongoDBコネクションOK !');
    })
    .catch(err => {
        console.error('MongoDBコネクションエラー:', err);
    });

const seedDB = async () => {
    await Todolist.deleteMany({}); // 既存のデータを削除
    await Todolist.insertMany(todos); // 初期データを挿入
    console.log('DBに初期データを挿入しました');
    await Todolist.save();
}

seedDB().then(() => {
    mongoose.connection.close(); // データベース接続を閉じる
    console.log('MongoDBコネクションを閉じました');
}).catch(err => {
    console.error('DB初期化エラー:', err);
    mongoose.connection.close(); // エラー時も接続を閉じる
});