const { validationResult } = require('express-validator');
const Order = require('../models/Order');
const { buildOrderItems } = require('../services/orderItems');
const { scheduleAutoProgress, clearAutoProgress } = require('../services/orderAutoProgress');

exports.createOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        statusCode: 400,
        errors: errors.array(),
      });
    }

    const { items, deliveryAddress, paymentMethod = 'cod' } = req.body;

    if (paymentMethod === 'online') {
      return res.status(400).json({
        success: false,
        message: 'Use online payment flow for card/UPI payments',
        statusCode: 400,
      });
    }

    const { orderItems, deliveryFee, totalAmount } = await buildOrderItems(items);

    const order = await Order.create({
      customerId: req.user._id,
      items: orderItems,
      totalAmount,
      deliveryFee,
      deliveryAddress,
      paymentMethod: 'cod',
      paymentStatus: 'pending',
    });

    const populated = await Order.findById(order._id)
      .populate('customerId', 'name email')
      .populate('items.pizza');

    scheduleAutoProgress(order._id);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully! Pay on delivery.',
      data: populated,
    });
  } catch (error) {
    if (error.statusCode === 400) {
      return res.status(400).json({
        success: false,
        message: error.message,
        statusCode: 400,
      });
    }
    next(error);
  }
};

exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ customerId: req.user._id })
      .populate('items.pizza')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate('customerId', 'name email')
      .populate('items.pizza')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        statusCode: 400,
        errors: errors.array(),
      });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
        statusCode: 404,
      });
    }

    order.status = req.body.status;
    await order.save();

    clearAutoProgress(order._id);

    const populated = await Order.findById(order._id)
      .populate('customerId', 'name email')
      .populate('items.pizza');

    res.json({
      success: true,
      message: 'Order status updated',
      data: populated,
    });
  } catch (error) {
    next(error);
  }
};

exports.cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
        statusCode: 404,
      });
    }

    const isOwner = order.customerId.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this order',
        statusCode: 403,
      });
    }

    if (order.status !== 'Pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending orders can be cancelled',
        statusCode: 400,
      });
    }

    order.status = 'Cancelled';
    await order.save();

    clearAutoProgress(order._id);

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
