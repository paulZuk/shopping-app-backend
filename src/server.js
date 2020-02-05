import { createServer } from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import MongoClient from './mongodb/client';

const app = express();

const mongodb = new MongoClient();

const port = process.env.PORT || 3000;

app.use(bodyParser());

const server = createServer(app);

mongodb.init((db) => {
    app.locals.db = db;

    console.log('Database connected');
    server.listen(port, () => {
        console.log(`Listening for events on ${server.address().port}`);
    });
});