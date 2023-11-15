const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name:{
        type : String,
        required : true
         },
    last_name:{
        type : String,
        required : true
        },
    email:{
        type : String,
        // required : true,
        unique : true
         },
    age:{
        type:Number
         },
    password:{
        type : String,
        required : true
         },
         fonction:String,
    description:{
        type:String,
         },
    points:{
        type:Number,
        default:0
    },
    profile_image:{
        type:String,
        // required: true
    },
    cloudinary_id:{
        type:String,
        // required: true
    }



    // tasks:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'task'
    // }],


},
{
    timestamps:true
}
);

module.exports = User = mongoose.model('user', UserSchema);
