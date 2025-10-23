const mongoose=require('mongoose');
const subjectSchema=new mongoose.Schema({
    name: {type:String, required: true, trim: true},
    age: {type:Number, required: true, trim: true},
    gender: {type:String, required: true, trim: true},
    
    
    email: {type:String, required: true, trim: true},
    phone: {type:Number, required: true, trim: true},

    dept: {type:String, required: true, trim: true},
    major: {type:String, required: true, trim: true},
    course: {type:String, required: true, trim: true},

    imageUrl:{type:String},
    cloudinaryId:{type:String}
});

module.exports=subjectSchema;

