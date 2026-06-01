import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import TrustBadges from '../components/TrustBadges';

const perks = [
  'Track orders in real-time',
  'Save delivery addresses',
  'Exclusive member offers',
  'Order history anytime',
];

export default function Auth() {
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login, register, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  if (user) {
    navigate(from, { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (tab === 'login') {
        await login(form.email, form.password);
        toast.success('Welcome back!');
      } else {
        await register(form.name, form.email, form.password);
        toast.success('Account created successfully!');
      }
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-cream">
      <div className="mx-auto grid max-w-6xl lg:min-h-[80vh] lg:grid-cols-2">
        {/* Left panel */}
        <div className="hidden flex-col justify-center bg-gradient-to-br from-primary to-secondary p-10 text-white lg:flex">
          <Logo size={56} className="mb-6" />
          <h2 className="mb-3 text-3xl font-extrabold">Welcome to Pizza Palace</h2>
          <p className="mb-8 max-w-sm text-white/80">
            Sign in to order, track deliveries, and enjoy exclusive deals on your favourite pizzas.
          </p>
          <ul className="space-y-3">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs">✓</span>
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-white/60">
            Admin demo: admin@pizzapalace.com / admin123
          </p>
        </div>

        {/* Form */}
        <div className="flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <div className="mb-6 text-center lg:hidden">
              <Logo size={48} className="mx-auto mb-3" />
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-100">
              <h1 className="mb-2 text-center text-2xl font-bold">
                {tab === 'login' ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="mb-6 text-center text-sm text-gray-500">
                {tab === 'login' ? 'Login to continue ordering' : 'Join Pizza Palace today'}
              </p>

              <div className="mb-6 flex rounded-xl bg-neutral-light p-1">
                {['login', 'register'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 rounded-lg py-2.5 text-sm font-semibold capitalize transition-all ${
                      tab === t ? 'bg-white text-primary shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {tab === 'register' && (
                  <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Your name"
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="mb-1 block text-sm font-medium">Password</label>
                  <input
                    id="password"
                    type="password"
                    required
                    minLength={6}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Min. 6 characters"
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? 'Please wait...' : tab === 'login' ? 'Login' : 'Create Account'}
                </button>
              </form>

              <p className="mt-4 text-center text-sm text-gray-500">
                <Link to="/menu" className="text-primary hover:underline">Continue browsing as guest →</Link>
              </p>
            </div>
            <TrustBadges className="mt-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
