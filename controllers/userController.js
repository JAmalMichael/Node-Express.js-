const expressAsyncHandler = require("express-async-handler");
const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require ("jsonwebtoken");

//desc Register new user
//@route POST /api/users/register
//@access public
const registerUser = expressAsyncHandler(async (req, res)=> {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(404);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = User.findOne({email});
    if(!userAvailable) {
        res.status(400);
        throw new Error("User already registered!")
    }

    //hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password: ", hashedPassword);
    res.json({message: ("Register new user")});

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });
    if(user) {
        res.status(201).json({
            _id: user.id,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error("User already registerd");
    }
});

//desc Login user
//@route POST /api/users/login
//@access public
const loginUser = expressAsyncHandler(async (req, res)=> {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({email});
    if(user && await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({
            user: {
                //username: username,
                email: user.email,
                id: user.id
            }
            
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401)
        throw new Error("email or password not valid");
    }
});

//desc Current user
//@route GET /api/users/current
//@access private
const currentUser = expressAsyncHandler(async (req, res)=> {
    res.json(req.user);
});

module.exports = {registerUser, loginUser, currentUser};