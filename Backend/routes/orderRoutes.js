const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const jwt = require('jsonwebtoken');

// Simple auth middleware
function auth(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
}

router.post('/', auth, orderController.createOrder);
router.get('/my', auth, orderController.getOrdersByUser);

module.exports = router; 