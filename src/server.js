import { createServer } from 'http';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import express from 'express';
import { urlencoded } from 'body-parser';
import MongoClient from './mongodb/client';
import login from './routes/login';
import index from './routes';

const app = express();

const mongodb = new MongoClient();

const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(morgan('combined'));
app.use(urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', index);
app.use('/login', login);

const server = createServer(app);

server.listen(port, () => {
    console.log(`Listening for events on ${server.address().port}`);
});

// mongodb.find('users', { id: 1 }).then(user => console.log(user));
// mongodb.add('users', {id: 1, name: 'Pawel', surname: 'Zuk'});