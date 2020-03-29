import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import express from 'express';
import flash from 'connect-flash';
import bodyParser from 'body-parser';
import cors from './controllers/CorsController';
import login from './routes/login';
import user from './routes/user';
import index from './routes';

const app = express();

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
app.use('/user', user);

(async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017', { 
            useUnifiedTopology: true, 
            useNewUrlParser: true 
        });
        console.log('Database connected');
        app.listen(port, () => {
            console.log(`Listening for events on ${port}`);
        });
    } catch(err) {
        console.log(err);
    }
})();
