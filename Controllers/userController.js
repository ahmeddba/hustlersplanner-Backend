const User = require('../Models/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('../Middleware/Cloudinary');

exports.register = async (req, res) => {
    try {
        const { email} = req.body;
        // check if the email is unique
        const foundUser = await User.findOne({ email });
        foundUser && res.status(400).send({errors : [{msg:"This email already used"}]});
        const {first_name , last_name , password  ,age ,fonction, description } = req.body;
        const photo = await cloudinary.uploader.upload(req.file.path);

        const newUser = new User({ first_name , last_name , password ,
            profile_image: photo.secure_url,
            cloudinary_id: photo.public_id

        ,age ,fonction, description, email  });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();

        const token = jwt.sign({
            id: newUser._id
         },
            process.env.SECRET_KEY
         );
        res.status(201).send({success : {msg:"User created successfuly" , newUser , token}});
    } catch (error) {
        res.status(400).send({errors : [{msg:error.message}]});
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send({success :{msg:"All users", users}});
    } catch (error) {
        res.status(400).send({errors:[{msg:error.message}]});
    }
}
exports.editPoints = async (req , res) => {
    try {
        const user = await User.findByIdAndUpdate({_id: req.body._id}, {$set: {...req.body}})
        res.status(200).send({success:{msg:"user updated successfuly" , user}});
    } catch (error) {
        res.status(400).send({errors : [{msg:error.message}]});
    }

}

exports.login = async (req, res) => {
    try {
            const { email, password } = req.body;

            const foundUser = await User.findOne({email});

            if(!foundUser){
              return res.status(400).send({errors : [{ msg:"This user does not exist" }]});
                }

            const match = await bcrypt.compare(password, foundUser.password);

            if(!match)
            res.status(400).send({errors : [{msg:"Wrong password"}]})

                const token = jwt.sign({
                    id: foundUser._id
                 },
                    process.env.SECRET_KEY
                 );

                 res.status(200).send({success : {msg:"Login successfuly" , foundUser ,token}});

    }catch (error) {
            res.status(400).send({errors : [{msg:error.message}]});
    }
}

