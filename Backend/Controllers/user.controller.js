const User = require('../Model/user.model');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res, next) => {
    try {
        const { name, phoneNumber, password } = req.body;
        
        let user = await User.findOne({ phoneNumber });
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User already registered'
            });
        }

        user = await User.create({
            name,
            phoneNumber,
            password
        });

        let token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                phoneNumber: user.phoneNumber
            },
            process.env.JWT_SECRET_KEY
        );

        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.status(201).cookie('token', token, options).json({
            success: true,
            user,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const { phoneNumber, password } = req.body;
        const user = await User.findOne({ phoneNumber })
            .select('+password')

        if (!user) {
            return res.status(400).json({
                success: false,
                message: `User does not exist`,
            });
        }
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect password',
            });
        }

        let token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                phoneNumber: user.phoneNumber,
            },
            process.env.JWT_SECRET_KEY
        );

        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.status(201).cookie('token', token, options).json({
            success: true,
            user,
            token,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

exports.logout = async (req, res) => {
    try {
        res.status(200)
            .cookie('token', null, {
                expires: new Date(Date.now()),
                httpOnly: true,
            })
            .json({
                success: true,
                message: 'Logged out successfully',
            });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).populate('orders');

        res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}