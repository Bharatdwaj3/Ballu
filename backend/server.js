const express=require("express");
const cors=require('cors');
const cookieParser=require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const errorMiddleware =require('./middleware/dbMiddleware');

const facultyRoutes=require('./routes/facultyRoutes');
const subjectRoutes=require('./routes/subjectRoutes');
const userRoutes=require('./routes/userRoutes');
const studentRoutes=require('./routes/studentRoutes');

const { PORT, SESSION_SECRET, MONGO_URI } = require('./config/env.config');
const connnectDB=require('./db');

const app=express();

connnectDB();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin:'http://localhost:5173' ,
    credentials:true,
}));
app.use(cookieParser());
app.use(session({
    secret:SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        mongoUrl: MONGO_URI,

    }),
    cookie: {maxAge :1000*60*60*24}
}));
app.use(passport.initialize());


app.get('/',(req,res)=>{ res.send('Server is ready'); });
app.use('/api/student',studentRoutes);
app.use('/api/subject',subjectRoutes);
app.use('/api/faculty',facultyRoutes);
app.use('/api/user',userRoutes);
app.use(errorMiddleware);

app.listen(PORT, () => console.log('Server Started at port : ',PORT));