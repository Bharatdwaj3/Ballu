require('dotenv').config();

const PORT = process.env.PORT || 5000;
const SESSION_SECRECT = process.env.SESSION_SECRECT || 'defaultSessionsecret';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/noblese';
const JWT_SECRECT = process.env.JWT_SECRECT || 'defaultjwtsecret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

const DISCORD_CLIENT_SECRET=process.env.DISCORD_CLIENT_SECRET || 'some secret';
const DISCORD_CLIENT_ID=process.env.DISCORD_CLIENT_ID || 'some id';
const DISCORD_CALLBACK_URI=process.env.DISCORD_CALLBACK_URI || 'some uri';

const GOOGLE_CLIENT_SECRET=process.env.Google_CLIENT_SECRET || 'some secret';
const GOOGLE_CLIENT_ID=process.env.Google_CLIENT_ID || 'some id';
const GOOGLE_CALLBACK_URI=process.env.Google_CALLBACK_URI || 'some uri';
 
module.exports = {
    PORT, MONGO_URI, SESSION_SECRECT, JWT_SECRECT, JWT_EXPIRES_IN, 
    GOOGLE_CALLBACK_URI, GOOGLE_CLIENT_ID,  GOOGLE_CLIENT_SECRET,
    DISCORD_CALLBACK_URI, DISCORD_CLIENT_ID,  DISCORD_CLIENT_SECRET
};