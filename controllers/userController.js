const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

//@desc Register
//@route POST /api/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }
    // Hash Password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password: " + hashPassword);
    const user = await User.create({ username, email, password: hashPassword });
    console.log(`User created ${user}`);
    if (user) {
        res.status(201).json({ _id: user._id, email: user.email});
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.status(200).json({message: "Register the user"});
});

//@desc Login
//@route POST /api/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: "Login the user"});
});

//@desc Current User Info
//@route GET /api/current
//@access private

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: "Current User Info"});
});
module.exports = { registerUser, loginUser, currentUser };