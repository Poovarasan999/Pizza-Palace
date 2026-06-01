import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/client';
import PizzaCard from '../components/PizzaCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

const features = [
  { icon: '🔥', title: 'Wood-Fired Oven', desc: 'Authentic crispy crust every time' },
  { icon: '🥬', title: 'Fresh Ingredients', desc: 'Sourced daily from local farms' },
  { icon: '🚀', title: 'Fast Delivery', desc: 'Hot pizza at your door in 30 mins' },
  { icon: '⭐', title: '4.8 Rating', desc: 'Loved by 10,000+ customers' },
];

const stats = [
  { value: '30+', label: 'Pizza Varieties' },
  { value: '10K+', label: 'Happy Customers' },
  { value: '30min', label: 'Avg. Delivery' },
  { value: '4.8★', label: 'User Rating' },
];

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/pizzas')
      .then((res) => setPizzas(res.data.data.slice(0, 3)))
      .catch(() => setPizzas([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary text-white">
        <div className="pizza-pattern absolute inset-0 opacity-30" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-secondary/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28 lg:px-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              🍕 Chennai&apos;s Favourite Pizza Since 2020
            </span>
            <h1 className="mb-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Slice Into
              <br />
              <span className="text-secondary-light">Happiness</span>
            </h1>
            <p className="mb-8 max-w-lg text-lg text-white/85">
              Handcrafted pizzas, bold flavours, and lightning-fast delivery. Order now and taste
              the difference.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/menu" className="btn-primary bg-white text-primary shadow-white/20 hover:bg-cream hover:text-primary-dark">
                Order Now →
              </Link>
              <Link to="/menu" className="btn-secondary">
                View Menu
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto h-80 w-80">
              <div className="absolute inset-0 animate-pulse rounded-full bg-white/10" />
              <img
                src="/images/pizzas/pizza-01.jpg"
                alt="Featured pizza"
                className="relative h-full w-full rounded-full object-cover shadow-2xl ring-8 ring-white/20"
              />
              <div className="absolute -right-4 top-8 rounded-2xl bg-white px-4 py-3 shadow-xl">
                <p className="text-xs text-gray-500">Starting from</p>
                <p className="text-2xl font-bold text-primary">₹299</p>
              </div>
              <div className="absolute -left-4 bottom-8 rounded-2xl bg-secondary px-4 py-3 shadow-xl text-white">
                <p className="text-sm font-bold">🔥 Best Seller</p>
                <p className="text-xs opacity-90">Margherita Classic</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-gray-100 bg-white shadow-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4 sm:px-6 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-extrabold gradient-text sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="section-heading">Why Choose Pizza Palace?</h2>
          <p className="section-subheading">We don&apos;t just make pizza — we craft experiences.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm card-hover"
            >
              <span className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-3xl">
                {f.icon}
              </span>
              <h3 className="mb-1 font-bold text-neutral-dark">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="mb-2 inline-block rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary">
                Popular picks
              </span>
              <h2 className="section-heading">Featured Pizzas</h2>
              <p className="section-subheading">Customer favourites you&apos;ll love.</p>
            </div>
            <Link
              to="/menu"
              className="rounded-xl border-2 border-primary px-6 py-2.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white"
            >
              View Full Menu →
            </Link>
          </div>
          {loading ? (
            <LoadingSkeleton count={3} />
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {pizzas.map((pizza, i) => (
                <PizzaCard key={pizza._id} pizza={pizza} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="section-heading">How It Works</h2>
          <p className="section-subheading">Order your favourite pizza in 4 easy steps.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { step: '01', title: 'Browse Menu', desc: 'Pick from 30+ delicious pizzas' },
            { step: '02', title: 'Add to Cart', desc: 'Customise quantity and checkout' },
            { step: '03', title: 'Place Order', desc: 'Enter address and confirm' },
            { step: '04', title: 'Enjoy!', desc: 'Track status until delivered' },
          ].map((s) => (
            <div
              key={s.step}
              className="relative rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm"
            >
              <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {s.step}
              </span>
              <h3 className="mb-1 font-bold">{s.title}</h3>
              <p className="text-sm text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="section-heading">What Customers Say</h2>
            <p className="section-subheading">Real reviews from pizza lovers across Chennai.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: 'Priya S.', text: 'Best Margherita in T. Nagar! Always hot and fresh.', rating: 5 },
              { name: 'Arjun M.', text: 'Butter Chicken Pizza is insane. Delivery in 25 mins!', rating: 5 },
              { name: 'Divya R.', text: 'Love the veg options. Palace Signature is a must-try.', rating: 5 },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl border border-gray-100 bg-cream p-6 shadow-sm">
                <p className="mb-1 text-secondary">{'★'.repeat(t.rating)}</p>
                <p className="mb-4 text-sm leading-relaxed text-gray-600">&ldquo;{t.text}&rdquo;</p>
                <p className="text-sm font-semibold">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-4 mb-16 sm:mx-6 lg:mx-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-dark to-primary p-8 text-white sm:p-12">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Craving pizza right now?</h2>
              <p className="mt-2 text-white/70">
                Order in seconds. Track live. Enjoy hot & fresh delivery.
              </p>
            </div>
            <Link to="/menu" className="btn-primary shrink-0 bg-secondary shadow-secondary/30 hover:bg-secondary-light">
              Start Ordering 🍕
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
