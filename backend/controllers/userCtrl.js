const Users = require("../models/userModel")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../tokens/generateToken")

const userCtrl = {
    signUp: async (req, res) => {
        try {
            const { username, name, email, password } = req.body;
            const user = await Users.findOne({ $or: [{ email }, { username }] });

            if (user) return res.status(400).json({ error: "This username or email already exists" });

            const passHash = await bcrypt.hash(password, 10);
            const newUser = new Users({
                username, name, email, password: passHash
            });

            await newUser.save();

            generateToken(newUser._id, res);
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                email: newUser.email,
            });

        } catch (error) {
            console.log("SignUp Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email });

            if (!user) return res.status(400).json({ error: "Wrong Email Or Password" });

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) return res.status(400).json({ error: "Wrong Email Or Password" });

            generateToken(user._id, res);
            res.status(200).json({
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
            });

        } catch (error) {
            console.log("Login Error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    logoutUser: (req, res) => {
        try {
            res.cookie("jwt", "", { maxAge: 1 });
            res.status(200).json({ message: "User Logged Out Successfully" });
        } catch (error) {
            console.log("Log Out Error:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
};

module.exports = userCtrl;
