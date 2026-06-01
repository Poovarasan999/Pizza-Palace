const { body } = require('express-validator');
const pizzaController = require('../controllers/pizzaController');
const { verifyToken, isAdmin } = require('../middleware/auth');

const router = require('express').Router();

const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return verifyToken(req, res, next);
  }
  next();
};

const createPizzaValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('imageUrl').trim().notEmpty().withMessage('Image URL is required'),
  body('isAvailable').optional().isBoolean(),
];

const updatePizzaValidation = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').optional().trim().notEmpty().withMessage('Category cannot be empty'),
  body('imageUrl').optional().trim().notEmpty().withMessage('Image URL cannot be empty'),
  body('isAvailable').optional().isBoolean(),
];

router.get('/', optionalAuth, pizzaController.getPizzas);
router.get('/:id', optionalAuth, pizzaController.getPizzaById);
router.post('/', verifyToken, isAdmin, createPizzaValidation, pizzaController.createPizza);
router.put('/:id', verifyToken, isAdmin, updatePizzaValidation, pizzaController.updatePizza);
router.delete('/:id', verifyToken, isAdmin, pizzaController.deletePizza);

module.exports = router;
