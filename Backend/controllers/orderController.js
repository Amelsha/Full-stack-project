const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    const { products, total } = req.body;
    const userId = req.userId;
    const newOrder = new Order({ user: userId, products, total });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ user: userId }).populate('products.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 