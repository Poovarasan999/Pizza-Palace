const crypto = require('crypto');
const Razorpay = require('razorpay');
const Order = require('../models/Order');
const { buildOrderItems } = require('../services/orderItems');
const { scheduleAutoProgress } = require('../services/orderAutoProgress');

const isDemoMode = () =>
  !process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET;

const getRazorpay = () => {
  if (isDemoMode()) return null;
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

const createOrderRecord = async (req, payload) => {
  const { orderItems, subtotal, deliveryFee, totalAmount } = await buildOrderItems(payload.items);

  const order = await Order.create({
    customerId: req.user._id,
    items: orderItems,
    totalAmount,
    deliveryFee,
    deliveryAddress: payload.deliveryAddress,
    paymentMethod: payload.paymentMethod,
    paymentStatus: payload.paymentStatus,
    razorpayOrderId: payload.razorpayOrderId || undefined,
    razorpayPaymentId: payload.razorpayPaymentId || undefined,
  });

  scheduleAutoProgress(order._id);

  return Order.findById(order._id)
    .populate('customerId', 'name email')
    .populate('items.pizza');
};

exports.getPaymentConfig = (req, res) => {
  res.json({
    success: true,
    data: {
      keyId: process.env.RAZORPAY_KEY_ID || '',
      demoMode: isDemoMode(),
      currency: 'INR',
    },
  });
};

exports.createPaymentOrder = async (req, res, next) => {
  try {
    const { items } = req.body;
    const { totalAmount } = await buildOrderItems(items);
    const amountPaise = Math.round(totalAmount * 100);

    if (isDemoMode()) {
      return res.json({
        success: true,
        data: {
          demoMode: true,
          demoOrderId: `demo_${Date.now()}`,
          amount: totalAmount,
          amountPaise,
          currency: 'INR',
        },
      });
    }

    const razorpay = getRazorpay();
    const razorpayOrder = await razorpay.orders.create({
      amount: amountPaise,
      currency: 'INR',
      receipt: `pp_${Date.now()}`,
    });

    res.json({
      success: true,
      data: {
        demoMode: false,
        razorpayOrderId: razorpayOrder.id,
        amount: totalAmount,
        amountPaise,
        currency: 'INR',
        keyId: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyAndPlaceOrder = async (req, res, next) => {
  try {
    const {
      items,
      deliveryAddress,
      demoMode,
      demoOrderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (demoMode) {
      if (!demoOrderId) {
        return res.status(400).json({
          success: false,
          message: 'Demo payment failed — missing order reference',
          statusCode: 400,
        });
      }

      const populated = await createOrderRecord(req, {
        items,
        deliveryAddress,
        paymentMethod: 'online',
        paymentStatus: 'paid',
        razorpayOrderId: demoOrderId,
        razorpayPaymentId: `demo_pay_${Date.now()}`,
      });

      return res.status(201).json({
        success: true,
        message: 'Payment successful! Order placed.',
        data: populated,
      });
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed — missing payment details',
        statusCode: 400,
      });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expected !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed — invalid signature',
        statusCode: 400,
      });
    }

    const populated = await createOrderRecord(req, {
      items,
      deliveryAddress,
      paymentMethod: 'online',
      paymentStatus: 'paid',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });

    res.status(201).json({
      success: true,
      message: 'Payment successful! Order placed.',
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
