import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import express from 'express';
import flash from 'connect-flash';
import bodyParser from 'body-parser';
import MongoClient from './mongodb/client';
import cors from './controllers/CorsController';
import login from './routes/login';
import user from './routes/user';
import index from './routes';

const app = express();

const mongodb = new MongoClient();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors);

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
app.use('/', index);
app.use('/login', login);
app.use('/user', user)

const server = createServer(app);

server.listen(port, () => {
    console.log(`Listening for events on ${server.address().port}`);
});

// mongodb.find('users', { id: 1 }).then(user => console.log(user));
// mongodb.add('users', {id: 1, name: 'Pawel', surname: 'Zuk'});