import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../api/client';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import PizzaImage from '../components/PizzaImage';
import TrustBadges from '../components/TrustBadges';

const categoryMeta = {
  Veg: { spice: 'Mild', serves: '2–3', time: '20–25 min' },
  'Non-Veg': { spice: 'Medium', serves: '2–3', time: '25–30 min' },
  Specialty: { spice: 'Medium-Hot', serves: '2–4', time: '25–35 min' },
};

export default function PizzaDetail() {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    api
      .get(`/pizzas/${id}`)
      .then((res) => setPizza(res.data.data))
      .catch(() => setPizza(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    addItem(pizza, qty);
    toast.success(`${pizza.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl animate-pulse px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="h-96 rounded-2xl bg-gray-200" />
          <div className="space-y-4">
            <div className="h-8 w-2/3 rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  if (!pizza) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Pizza not found</h1>
        <Link to="/menu" className="mt-4 inline-block text-primary hover:underline">
          Back to menu
        </Link>
      </div>
    );
  }

  const meta = categoryMeta[pizza.category] || categoryMeta.Veg;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link to="/menu" className="hover:text-primary">Menu</Link>
        <span>/</span>
        <span className="text-neutral-dark">{pizza.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative">
          <PizzaImage
            src={pizza.imageUrl}
            alt={pizza.name}
            className="h-96 w-full rounded-3xl object-cover shadow-xl ring-1 ring-gray-100"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-sm font-bold text-primary shadow-md">
            ₹{pizza.price}
          </span>
        </div>

        <div>
          <span className="mb-2 inline-block rounded-full bg-secondary/10 px-3 py-1 text-sm font-semibold text-secondary">
            {pizza.category}
          </span>
          <h1 className="mb-3 text-3xl font-extrabold sm:text-4xl">{pizza.name}</h1>
          <p className="mb-6 leading-relaxed text-gray-600">{pizza.description}</p>

          <div className="mb-6 grid grid-cols-3 gap-3">
            {[
              { label: 'Prep Time', value: meta.time },
              { label: 'Serves', value: meta.serves },
              { label: 'Spice', value: meta.spice },
            ].map((info) => (
              <div key={info.label} className="rounded-xl bg-white p-3 text-center shadow-sm ring-1 ring-gray-100">
                <p className="text-xs text-gray-500">{info.label}</p>
                <p className="text-sm font-semibold">{info.value}</p>
              </div>
            ))}
          </div>

          <div className="mb-6 rounded-xl bg-cream p-4 ring-1 ring-gray-100">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">Highlights</p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>✓ Hand-tossed fresh dough</li>
              <li>✓ 100% real mozzarella cheese</li>
              <li>✓ Baked in wood-fired oven</li>
            </ul>
          </div>

          <div className="mb-6 flex items-center gap-4">
            <span className="text-sm font-medium">Quantity</span>
            <div className="flex items-center rounded-xl border border-gray-200 bg-white">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-4 py-2.5 hover:bg-gray-50"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="min-w-[3rem] text-center font-bold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-4 py-2.5 hover:bg-gray-50"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <span className="text-lg font-bold text-primary">₹{pizza.price * qty}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <button onClick={handleAddToCart} className="btn-primary flex-1 sm:flex-none">
              Add to Cart — ₹{pizza.price * qty}
            </button>
            <Link
              to="/cart"
              className="rounded-xl border-2 border-primary px-6 py-3 text-center font-semibold text-primary hover:bg-primary hover:text-white"
            >
              View Cart
            </Link>
          </div>
          <TrustBadges className="mt-6 !justify-start" />
        </div>
      </div>
    </motion.div>
  );
}
