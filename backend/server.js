require('dotenv').config();

const express=require("express");
const cors=require('cors');
const cookieParser=require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const dbMiddleware =require('./middleware/db.middleware');


const doctorRoutes=require('./routes/doctor.routes');
const diseaseRoutes=require('./routes/disease.routes');
const userRoutes=require('./routes/user.routes');
const patientRoutes=require('./routes/patient.routes');

const { PORT, SESSION_SECRECT, MONGO_URI } = require('./config/env.config');
const connectDB=require('./config/db.config');
const morganConfig = require('./config/morgan.config');
require('./strategy/google.aouth');
require('./strategy/discord.aouth');

const app=express();

connectDB();
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
    cookie: {maxAge :10*24*60*60}
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/',(req,res)=>{ res.send('Server is ready'); });
app.use('/api/patient',patientRoutes);
app.use('/api/disease',diseaseRoutes);
app.use('/api/doctor',doctorRoutes);
app.use('/api/user',userRoutes);

app.use(dbMiddleware);

app.listen(PORT, () => console.log('Server Started at port : ',PORT));