const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    userName: {
        type:String,
        required:[true, 'User Name is required'],
        trim:true,
        minLength:2,
        maxLength:50,
    },
    fullName: {
        type:String,
        required:[true, 'Full Name is required'],
        trim:true,
        minLength:2,
        maxLength:50,
    },
    email:{
        type:String,
        required:[true, 'User email is required'],
        unique:true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
    },
    accountType:{
        type:String,
        required: [true, 'Account type is required'],
        enum:['student', 'faculty', 'admin'],
    },
    password:{
        type:String,
        required:[true, 'User Password is required'],
        minLength:6,
    },
},{
    timestamps:true
});

module.exports=userSchema;