# ToDoApp_mongo
# ToDoアプリの使い方

## 使用技術・言語

このアプリは以下の技術・言語を用いて開発されています。

- **Node.js**：JavaScriptランタイム環境。
- **Express**：Node.js用Webアプリケーションフレームワーク。
- **MongoDB**：NoSQLデータベース。
- **Mongoose**：MongoDB用のODM（Object Data Modeling）ライブラリ。
- **EJS & ejs-mate**：テンプレートエンジン。ejs-mateでレイアウト機能を拡張。
- **Bootstrap**：CSSフレームワーク。UIのスタイリングに使用。
- **method-override**：HTMLフォームでPUT/DELETEメソッドを利用可能にするためのミドルウェア。
- **静的ファイル配信**：`public`ディレクトリ内のCSS等をExpressで配信。

## 起動手順

1. **Git Bashターミナルを開き、対象のプロジェクトフォルダに移動します。**  
   ```
   cd /path/to/your/repository
   ```

2. **アプリを起動します。**  
   ```
   node app.js
   ```

3. **ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスします。**

---

※ Node.jsが未インストールの場合は、事前にインストールしてください。
