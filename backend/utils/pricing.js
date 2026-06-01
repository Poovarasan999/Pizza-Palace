const DELIVERY_FEE = 40;
const FREE_DELIVERY_MIN = 499;

const getDeliveryFee = (subtotal) => (subtotal >= FREE_DELIVERY_MIN ? 0 : DELIVERY_FEE);

const calculateTotals = (subtotal) => {
  const deliveryFee = getDeliveryFee(subtotal);
  return {
    subtotal,
    deliveryFee,
    totalAmount: subtotal + deliveryFee,
  };
};

module.exports = { DELIVERY_FEE, FREE_DELIVERY_MIN, getDeliveryFee, calculateTotals };
