const Order = require('../Model/order.model');
const User = require('../Model/user.model');

exports.addOrder = async (req, res, next) => {
    try {
        const { sub_total, phoneNumber } = req.body;

        const order = await Order.create({
            sub_total,
            phoneNumber,
            users: req.user.id,
        });

        const user = await User.findById(req.user.id);

        user.orders.push(order);

        await user.save();

        res.status(200).json({
            success: true,
            order,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

exports.myOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({
            users: req.user._id,
        });

        res.status(200).json({
            success: true,
            orders,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
