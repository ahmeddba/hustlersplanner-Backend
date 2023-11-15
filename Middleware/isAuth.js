const User = require('../Models/UserSchema');
const jwt = require('jsonwebtoken');

exports.isAuth = async (req, res, next) => {

    try {
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(401).send({ msg: "Unauthorized: Token not found!" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const foundUser = await User.findOne({_id: decoded.id});

        if(!foundUser)
         res.status(400).send({errors:[{msg: "Unauthorized: User not found!"}]});

        req.user = foundUser;
        next();
    } catch (error) {
        return res.status(401).send({errors:[{msg: "Unauthorized: Invalid token!"}]});
    }

}
