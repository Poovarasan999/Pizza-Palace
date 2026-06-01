const { validationResult } = require('express-validator');
const Pizza = require('../models/Pizza');

exports.getPizzas = async (req, res, next) => {
  try {
    const filter = { isAvailable: true };
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.search) {
      filter.name = { $regex: req.query.search, $options: 'i' };
    }

    const isAdmin = req.user?.role === 'admin';
    const query = isAdmin && req.query.all === 'true' ? {} : filter;

    const pizzas = await Pizza.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: pizzas });
  } catch (error) {
    next(error);
  }
};

exports.getPizzaById = async (req, res, next) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza || (!pizza.isAvailable && req.user?.role !== 'admin')) {
      return res.status(404).json({
        success: false,
        message: 'Pizza not found',
        statusCode: 404,
      });
    }
    res.json({ success: true, data: pizza });
  } catch (error) {
    next(error);
  }
};

exports.createPizza = async (req, res, next) => {
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

    const pizza = await Pizza.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Pizza created successfully',
      data: pizza,
    });
  } catch (error) {
    next(error);
  }
};

exports.updatePizza = async (req, res, next) => {
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

    const pizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!pizza) {
      return res.status(404).json({
        success: false,
        message: 'Pizza not found',
        statusCode: 404,
      });
    }

    res.json({
      success: true,
      message: 'Pizza updated successfully',
      data: pizza,
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePizza = async (req, res, next) => {
  try {
    const pizza = await Pizza.findByIdAndDelete(req.params.id);
    if (!pizza) {
      return res.status(404).json({
        success: false,
        message: 'Pizza not found',
        statusCode: 404,
      });
    }

    res.json({
      success: true,
      message: 'Pizza deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
