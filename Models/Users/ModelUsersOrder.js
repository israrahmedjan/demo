const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const userOrderSchema = new Schema({
    username: { type: String, Required: true },
    email: { type: String, Required: true },
    password: { type: String, Required: true },
    Addresses: { type: Object, Required: true },
    OrderItems: [{
        type: Object
    }],
    totalAmount: { type: String },
    orderStatus: { type: String },
    orderStats: {
        type: String,
        enum: ["pending", "process", "failed", "success"]
    }

}, { timestamps: true })

const UsersOrders = mongoose.model('UsersOrders', userOrderSchema);
module.exports = UsersOrders;
