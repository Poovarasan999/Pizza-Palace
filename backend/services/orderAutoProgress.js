const Order = require('../models/Order');

const STEPS = [
  { from: 'Pending', to: 'Confirmed', delayMs: 5000 },
  { from: 'Confirmed', to: 'Preparing', delayMs: 15000 },
  { from: 'Preparing', to: 'Out for Delivery', delayMs: 30000 },
  { from: 'Out for Delivery', to: 'Delivered', delayMs: 45000 },
];

const timers = new Map();

const clearAutoProgress = (orderId) => {
  const key = orderId.toString();
  const ids = timers.get(key);
  if (ids) {
    ids.forEach(clearTimeout);
    timers.delete(key);
  }
};

const scheduleAutoProgress = (orderId) => {
  clearAutoProgress(orderId);
  const timeoutIds = [];

  STEPS.forEach(({ from, to, delayMs }) => {
    const id = setTimeout(async () => {
      try {
        const order = await Order.findById(orderId);
        if (!order || order.status !== from) return;

        order.status = to;
        await order.save();

        if (to === 'Delivered') clearAutoProgress(orderId);
      } catch (err) {
        console.error(`Order auto-progress failed (${orderId}):`, err.message);
      }
    }, delayMs);

    timeoutIds.push(id);
  });

  timers.set(orderId.toString(), timeoutIds);
};

module.exports = { scheduleAutoProgress, clearAutoProgress };
