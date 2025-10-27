const mongoose=require('mongoose');
const patientSchema=new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    name: {type:String, required: true, trim: true},
    age: {type:Number, required: true, trim: true},
    gender: {type:String, required: true, trim: true, enum:['male','female','other']},
    
    email: {type:String, required: true, trim: true},
    phone: {type:Number, required: true, trim: true},
    
    disease: {
        contagious:{type:Boolean,required: true, trim: true},
        neurological:{type:String,required: true, trim: true},
        genetic:{type: Boolean,required : true, trim: true},
        physical:{type:String,required: true, trim: true} 
    },

    disorders: {
        genetic:{type: Boolean,requied : true, trim: true},
        devlopmental: {type: Boolean,required: true, trim: true}
    },
    
    pastHistory: {type:Boolean, required: true, trim: true},
    contagious: {type:Boolean, required: true, trim: true},
    emergency: {type:Boolean, required: true, trim: true},



    imageUrl:{type:String},
    cloudinaryId:{type:String}
}, 
    { timestamps: true }
);

module.exports=patientSchema;

