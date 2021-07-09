const router = require('express').Router();
let User = require('../models/users.model');
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');

 require('dotenv').config();


//add user
router.route('/add').post(async (req,res) => {

    try {
        //Check Current Users
        let user = await User.findOne({ user_Email: req.body.user_Email});
        if(user) return res.status(400).send('Already Registered')
    
        //Create New User
        const user_Fname = req.body.user_Fname;
        const user_Lname = req.body.user_Lname;
        const user_Contact = req.body.user_Contact; 
        const user_Email = req.body.user_Email;
        const user_Password = req.body.user_Password;

        const newUser = new User({

            user_Fname, 
            user_Lname,
            user_Contact, 
            user_Email, 
            user_Password 
        });

         const salt = await bcrypt.genSalt(10)
         newUser.user_Password = await bcrypt.hash(newUser.user_Password, salt)
    
        await newUser.save();
        res.status(200).json('User Added!')

    } catch (error) {
        res.status(400).json('Error: '+ error)
    }

});

// //User Login
// router.route('/login').post(async (req,res) => {

//     //Check Current Users
//     let user = await User.findOne({ user_Email: req.body.user_Email});
//     if(!user) return res.status(400).send('Invalid email')

//     //check password
//     const validPassword = await bcrypt.compare(req.body.user_Password, user.user_Password)
//     if(!validPassword) res.status(400).send('Invalid Password')

//     //Set Token
//     const token = jwt.sign({_id : user._id, user_Email: user.user_Email},  process.env.jwtKey)

//     //Response
//     res.status(200)
//     .header('x-auth-token', token)
//     .json({
//         jwt: token,
//         msg: 'Logged In Successfully'
//     })

// });

//get all users
router.route('/').get((req,res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+ err));
});

//get users by ID
router.route('/:id').get((req,res) => {
    User.findById(req.params.id)
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+ err));
});



module.exports = router;