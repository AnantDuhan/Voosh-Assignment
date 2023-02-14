const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const userRoute = require('./Routes/user.route');
const orderRoute = require('./Routes/order.route');

app.use('/api/v1', userRoute);
app.use('/api/v1', orderRoute);

app.use(async (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', '*');
    return next();
});

app.get('/', (req, res) => {
    res.send('Server is working');
});

module.exports = app;