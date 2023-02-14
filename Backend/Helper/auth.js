const jwt = require('jsonwebtoken');
const User = require('../Model/user.model');

exports.isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Please Login First',
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = await User.findById(decoded.id);

        next();
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
