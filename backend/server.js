require('dotenv').config();

const express=require("express");
const cors=require('cors');
const cookieParser=require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const errorMiddleware =require('./middleware/db.middleware');


const facultyRoutes=require('./routes/doctor.routes');
const subjectRoutes=require('./routes/disease.routes');
const userRoutes=require('./routes/user.routes');
const studentRoutes=require('./routes/patient.routes');

const { PORT, SESSION_SECRECT, MONGO_URI } = require('./config/env.config');
const connnectDB=require('./config/db.config');
const morganConfig = require('./config/morgan.config');
require('./strategy/google.aouth');
require('./strategy/discord.aouth');

const app=express();

connnectDB();
app.use(morganConfig);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin:'http://localhost:5173' ,
    credentials:true,
}));
app.use(cookieParser());
app.use(session({
    secret:SESSION_SECRECT,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        mongoUrl: MONGO_URI,

    }),
    cookie: {maxAge :1000*60*60*24}
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{ res.send('Server is ready'); });
app.use('/api/student',studentRoutes);
app.use('/api/subject',subjectRoutes);
app.use('/api/faculty',facultyRoutes);
app.use('/api/user',userRoutes);

app.get('/auth/google',
    passport.authenticate('google',{scope: ['email','profile']})
);

app.get('/auth/discord',
    passport.authenticate('discord',{scope: ['identify']})
);

app.get('/auth/google/callback',
        passport.authenticate('google',{
        successRedirect :'/protected',
        failureRedirect: '/auth/failure',
    })
);

app.get('/auth/discord/callback',
        passport.authenticate('discord',{
        successRedirect :'/protected',
        failureRedirect: '/auth/failure',
    })
);

app.use(errorMiddleware);

app.listen(PORT, () => console.log('Server Started at port : ',PORT));