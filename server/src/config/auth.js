const User = require('../models/user.model');
const brycpt = require("bcryptjs");
const cookie = require('cookie');


const register = async (req, res) => {
    try {
        console.log("checking")
        const email = await User.findOne({ email: req.body.email });
        if (email) return res.status(402).json("email already exist");
        const user = await User.create(req.body);
        user.save();
        res.status(200).json(req.body)
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
};

const login = async (req, res) => {
    try {
        console.log("here in login")
        const email = await User.findOne({ email: req.body.email });
        if (!email) return res.status(500).json({ message: "invalid user", status: "Failed" });

        const passMatch = await brycpt.compare(req.body.password, email.password);
        if (!passMatch) return res.status(500).json({ message: "invalid user", status: "Failed" });

        const token = await email.newToken();

        res.setHeader('Set-Cookie', cookie.serialize('jsttoken', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7 
        }));

        res.status(200).json({
            status:200,
            token:token,
            list:email.list,
            email:email.email
        });
    } catch (e) {
        return res.status(500).json({ message: e.message, status: "Failed" });
    }
}

module.exports = { register, login };