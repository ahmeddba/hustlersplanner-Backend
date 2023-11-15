const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
         },
    register_time:String,
    deadline:String,
    value: Number,
    isDone: Boolean,
    description:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true
    },
    // category :String
},
{timestamps: true});

module.exports = Task = mongoose.model('task', TaskSchema);
