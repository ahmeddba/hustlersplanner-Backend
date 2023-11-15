const {check, validationResult} = require('express-validator');

exports.registerValidation = () => [
     check('first_name',"this field shouldn't be empty").notEmpty(),
     check('last_name',"this field shouldn't be empty").notEmpty(),
     check('email',"this field shouldn't be empty").notEmpty(),
     check('email',"this field should be a valid email").isEmail(),
     check('age',"this field shouldn't be empty").notEmpty(),
     check('fonction',"this field shouldn't be empty").notEmpty(),
    //  check('image',"this field shouldn't be empty").notEmpty(),
     check('description',"this field shouldn't be empty").notEmpty(),
     check('description',"description should contain at least 10 caracters").isLength({min:10}),
     check('password',"password should contain at least 6 caracters").isLength({min:6})
    ]

exports.validator= (req , res , next) => {
    const errors = validationResult(req);
    errors.isEmpty() ? next() : res.status(400).send(errors);
}

