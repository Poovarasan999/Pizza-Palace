const { body } = require('express-validator');
const orderController = require('../controllers/orderController');
const Order = require('../models/Order');
const { verifyToken, isAdmin } = require('../middleware/auth');

const router = require('express').Router();

const createOrderValidation = [
  body('deliveryAddress').trim().notEmpty().withMessage('Delivery address is required'),
  body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
  body('items.*.pizza').notEmpty().withMessage('Pizza ID is required'),
  body('items.*.qty').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

const statusValidation = [
  body('status')
    .isIn(Order.schema.path('status').enumValues)
    .withMessage('Invalid order status'),
];

router.post('/', verifyToken, createOrderValidation, orderController.createOrder);
router.get('/my', verifyToken, orderController.getMyOrders);
router.get('/', verifyToken, isAdmin, orderController.getAllOrders);
router.put('/:id/status', verifyToken, isAdmin, statusValidation, orderController.updateOrderStatus);
router.delete('/:id', verifyToken, orderController.cancelOrder);

module.exports = router;
