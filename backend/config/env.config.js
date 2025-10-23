require('dotenv').config();


const PORT = process.env.PORT || 5000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'defaultSessionsecret';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/noblese';
const JWT_SECRET = process.env.JWT_SECRET || 'defaultjwtsecret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

module.exports = {  PORT, MONGO_URI, SESSION_SECRET, JWT_SECRET, JWT_EXPIRES_IN };