const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'mydatabase';

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.post('/addRow', (req, res) => {
    const row = req.body;
    MongoClient.connect(url, function (err, client) {
        if (err) throw err;
        const db = client.db(dbName);
        const collection = db.collection('records');
        collection.insertOne(row, function (err, result) {
            if (err) throw err;
            console.log("Record added successfully");
            res.send();
            client.close();
        });
    });
});
