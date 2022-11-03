const { invalidMessageError, existMessageError, lengthMessageError } = require("../helpers/errormessage");
const {validateEmail, validateLength, validateUsername} = require("../helpers/validation")
const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.register = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            password,
            username,
            bYear,
            bMonth,
            bDay,
            gender
        } = req.body;

        if(!validateEmail(email)) {
            res.status(400).json(invalidMessageError('Email Address'))
        }

        const check = await User.findOne({email})
        if(check) {
            res.status(400).json(existMessageError('Email'))
        }

        if(!validateLength(email, 3, 30)) {
            res.status(400).json(lengthMessageError('Email Address'))
        }

        if(!validateLength(first_name, 3, 30)) {
            res.status(400).json(lengthMessageError('First Name', 3, 30))
        }

        if(!validateLength(last_name, 3, 30)) {
            res.status(400).json(lengthMessageError('Last Name', 3, 30))
        }

        if(!validateLength(password, 3, 30)) {
            res.status(400).json(lengthMessageError('Password', 3, 30))
        }

        const bcryptPassword = await bcrypt.hash(password, 12)
        const tempUsername = first_name + last_name
        const newUsername = await validateUsername(tempUsername.toLowerCase())

        const user = await new User({
            first_name,
            last_name,
            email,
            password: bcryptPassword,
            username: newUsername,
            bYear,
            bMonth,
            bDay,
            gender
        }).save()
        res.json(user)
    } catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
}