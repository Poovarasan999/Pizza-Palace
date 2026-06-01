const { body } = require('express-validator');
const paymentController = require('../controllers/paymentController');
const { verifyToken } = require('../middleware/auth');

const router = require('express').Router();

const itemsValidation = [
  body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
  body('items.*.pizza').notEmpty().withMessage('Pizza ID is required'),
  body('items.*.qty').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

const verifyValidation = [
  ...itemsValidation,
  body('deliveryAddress').trim().notEmpty().withMessage('Delivery address is required'),
];

router.get('/config', verifyToken, paymentController.getPaymentConfig);
router.post('/create-order', verifyToken, itemsValidation, paymentController.createPaymentOrder);
router.post('/verify', verifyToken, verifyValidation, paymentController.verifyAndPlaceOrder);

module.exports = router;
