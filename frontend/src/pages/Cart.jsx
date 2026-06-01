import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import EmptyState from '../components/EmptyState';
import PizzaImage from '../components/PizzaImage';
import PageHeader from '../components/PageHeader';
import DeliveryBar from '../components/DeliveryBar';
import TrustBadges from '../components/TrustBadges';

export default function Cart() {
  const { items, updateQty, removeItem, total, count } = useCart();
  const deliveryFee = total >= 499 ? 0 : 40;
  const grandTotal = total + deliveryFee;

  if (items.length === 0) {
    return (
      <>
        <PageHeader title="Your Cart" subtitle="Your cart is waiting for delicious pizzas." badge="Cart" />
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <EmptyState
            icon="🛒"
            title="Your cart is empty"
            description="Browse our menu and add some delicious pizzas!"
            actionLabel="Browse Menu"
            actionTo="/menu"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Your Cart"
        subtitle={`${count} item${count > 1 ? 's' : ''} ready to order`}
        badge="Cart"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Cart' }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <DeliveryBar total={total} />

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <motion.div
                key={item._id}
                layout
                className="flex gap-4 rounded-2xl bg-white p-4 shadow-md ring-1 ring-gray-100"
              >
                <PizzaImage
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-24 w-24 rounded-xl object-cover"
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link to={`/pizza/${item._id}`} className="font-semibold hover:text-primary">
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className="font-medium text-primary">₹{item.price} each</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-lg border">
                      <button onClick={() => updateQty(item._id, item.qty - 1)} className="px-3 py-1 hover:bg-gray-50">−</button>
                      <span className="min-w-[2rem] text-center text-sm font-semibold">{item.qty}</span>
                      <button onClick={() => updateQty(item._id, item.qty + 1)} className="px-3 py-1 hover:bg-gray-50">+</button>
                    </div>
                    <button onClick={() => removeItem(item._id)} className="text-sm text-red-500 hover:underline">
                      Remove
                    </button>
                  </div>
                </div>
                <p className="font-bold text-neutral-dark">₹{item.price * item.qty}</p>
              </motion.div>
            ))}
            <Link to="/menu" className="inline-block text-sm font-medium text-primary hover:underline">
              ← Continue Shopping
            </Link>
          </div>

          <div className="h-fit space-y-4">
            <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100">
              <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal ({count} items)</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className={deliveryFee === 0 ? 'font-medium text-green-600' : ''}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
              </div>
              <div className="my-4 border-t border-dashed" />
              <div className="mb-6 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">₹{grandTotal}</span>
              </div>
              <Link to="/checkout" className="btn-primary w-full text-center">
                Proceed to Checkout →
              </Link>
              <p className="mt-3 text-center text-xs text-gray-400">Est. delivery · 25–35 mins</p>
            </div>
            <TrustBadges />
          </div>
        </div>
      </div>
    </>
  );
}
