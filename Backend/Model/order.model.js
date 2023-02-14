const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    sub_total: {
        type: Number,
        default: 0,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        minLength: [10, 'Phone Number must be of 10 digits'],
        maxLength: [10, 'Phone Number must be of 10 digits'],
    },
    users: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Order', orderSchema);