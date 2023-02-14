const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Your Name'],
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Please Enter Your Phone Number'],
        unique: [true, 'Phone Number already used, try different phone number'],
        minLength: [10, 'Phone Number must be of 10 digits'],
        maxLength: [10, 'Phone Number must be of 10 digits'],
    },
    password: {
        type: String,
        required: [true, 'Please Enter Your Password'],
        minLength: [6, 'Password must be atleast of 6 characters long'],
        select: false,
    },
    orders: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Order',
            required: true,
        },
    ],
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// // jwt token
// userSchema.methods.getJWTToken = function () {
//     return jwt.sign(
//         {
//             id: this._id,
//         },
//         process.env.JWT_SECRET_KEY,
//         {
//             expiresIn: process.env.JWT_EXPIRES_IN,
//         }
//     );
// };

module.exports = mongoose.model('User', userSchema);