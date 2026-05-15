const Order = require('./order.model');

exports.addOrderItems = async (req, res) => {
    const { 
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        totalPrice 
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: "Cart Empty" });
    } else {
        const order = new Order({
            user: req.user._id, 
            orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Orders are not fetch " });
    }
};

exports.getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: "Order not found" });
    }
};