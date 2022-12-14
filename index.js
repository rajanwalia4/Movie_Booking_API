const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');

const routes = require('./routes');

env.config();
const app = express(); // express app object

// configuring body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.set('debug', true);
routes(app);

app.listen(process.env.PORT, async () => {
    // this callback gets execcuted, once we successfully start the server on the given port
    console.log(`Server started on Port ${process.env.PORT} !!`);

    try {
        await mongoose.connect(process.env.DB_URL); // connected to the mongo server
        console.log("Successfully connected to mongo");
    } catch (err) {
        console.log("Not able to connect mongo", err);
    }
});