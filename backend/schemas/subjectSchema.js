const mongoose=require('mongoose');
const subjectSchema=new mongoose.Schema({
    name: {type:String, required: true, trim: true},
    code: {type:Number, required: true, trim: true},
    dept: {type:String, required: true, trim: true},
    
});

module.exports-subjectSchema;

