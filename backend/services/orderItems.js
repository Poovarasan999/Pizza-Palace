const Pizza = require('../models/Pizza');
const { calculateTotals } = require('../utils/pricing');

const buildOrderItems = async (items) => {
  const orderItems = [];
  let subtotal = 0;

  for (const item of items) {
    const pizza = await Pizza.findById(item.pizza);
    if (!pizza || !pizza.isAvailable) {
      const err = new Error(`Pizza unavailable: ${item.pizza}`);
      err.statusCode = 400;
      throw err;
    }

    orderItems.push({
      pizza: pizza._id,
      qty: item.qty,
      price: pizza.price,
    });
    subtotal += pizza.price * item.qty;
  }

  const pricing = calculateTotals(subtotal);
  return { orderItems, ...pricing };
};

module.exports = { buildOrderItems };
