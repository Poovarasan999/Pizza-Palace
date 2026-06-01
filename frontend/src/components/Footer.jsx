import { Link } from 'react-router-dom';
import Logo from './Logo';

const explore = [
  { label: 'Home', to: '/' },
  { label: 'Our Menu', to: '/menu' },
  { label: 'My Orders', to: '/orders' },
  { label: 'Cart', to: '/cart' },
  { label: 'Login / Register', to: '/auth' },
];

const menuLinks = [
  { label: 'Veg Pizzas', to: '/menu' },
  { label: 'Non-Veg Pizzas', to: '/menu' },
  { label: 'Specialty Pizzas', to: '/menu' },
  { label: 'Best Sellers', to: '/menu' },
  { label: 'New Arrivals', to: '/menu' },
];

const support = [
  { label: 'Track Your Order', to: '/orders' },
  { label: 'Help & FAQ', to: '/support/faq' },
  { label: 'Contact Support', to: '/support/contact' },
  { label: 'Refund Policy', to: '/support/refund' },
  { label: 'Privacy Policy', to: '/support/privacy' },
  { label: 'Terms of Service', to: '/support/terms' },
];

const highlights = [
  { label: 'Free Delivery', sub: 'On orders above ₹499', icon: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0' },
  { label: 'Wood-Fired Oven', sub: 'Authentic crispy crust', icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z' },
  { label: '30 Min Delivery', sub: 'Hot pizza guaranteed', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: '100% Fresh', sub: 'Daily sourced ingredients', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { label: 'Secure Ordering', sub: 'Safe & encrypted checkout', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
  { label: 'Easy Cancellation', sub: 'Cancel while pending', icon: 'M6 18L18 6M6 6l12 12' },
];

const stats = [
  { value: '30+', label: 'Pizza Varieties' },
  { value: '10K+', label: 'Happy Customers' },
  { value: '4.8★', label: 'Average Rating' },
  { value: '2020', label: 'Serving Since' },
];

const deliveryZones = [
  'T. Nagar', 'Anna Nagar', 'Adyar', 'Velachery', 'OMR', 'Porur', 'Tambaram', 'Mylapore',
];

const hours = [
  { day: 'Mon – Thu', time: '11:00 AM – 10:00 PM' },
  { day: 'Fri – Sun', time: '11:00 AM – 11:00 PM' },
  { day: 'Holidays', time: '12:00 PM – 10:00 PM' },
];

const payments = ['UPI', 'Debit Card', 'Credit Card', 'Cash on Delivery', 'Net Banking'];

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-400 ring-1 ring-white/10 transition-all hover:bg-primary hover:text-white hover:ring-primary/50"
    >
      {children}
    </a>
  );
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-secondary-light">{title}</h3>
      {children}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-neutral-dark text-white">
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
      <div className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Offer banner */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-secondary/20 bg-gradient-to-r from-primary/20 to-secondary/20 p-5 sm:flex-row sm:items-center sm:p-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-secondary-light">Limited Offer</p>
            <p className="mt-1 text-lg font-bold sm:text-xl">Get 15% OFF on your first order!</p>
            <p className="mt-1 text-sm text-gray-400">Use code <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-secondary-light">FIRST15</span> at checkout</p>
          </div>
          <Link to="/menu" className="btn-primary shrink-0 text-sm">
            Order Now →
          </Link>
        </div>

        {/* Highlights — 6 cards */}
        <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary/30 to-secondary/30">
                <svg className="h-5 w-5 text-secondary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="text-xs text-gray-500">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mb-10 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:grid-cols-4 sm:p-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-extrabold text-secondary-light sm:text-3xl">{s.value}</p>
              <p className="mt-0.5 text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Main links grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {/* Brand */}
          <div className="sm:col-span-2 xl:col-span-2">
            <Link to="/" className="group mb-4 inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 p-1.5 ring-1 ring-white/10 transition-all group-hover:ring-secondary/40">
                <Logo size={34} />
              </div>
              <div>
                <span className="block text-lg font-bold tracking-tight">Pizza Palace</span>
                <span className="text-[11px] font-medium uppercase tracking-widest text-secondary/80">
                  Chennai · Est. 2020
                </span>
              </div>
            </Link>
            <p className="mb-4 max-w-xs text-sm leading-relaxed text-gray-400">
              Chennai&apos;s favourite online pizza kitchen. Handcrafted recipes, premium ingredients,
              and delivery that never keeps you waiting.
            </p>
            <div className="mb-4 flex flex-wrap gap-2">
              {['FSSAI Certified', '100% Veg Option', 'Hygienic Kitchen'].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium text-gray-400 ring-1 ring-white/10"
                >
                  ✓ {badge}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <SocialIcon href="https://instagram.com" label="Instagram">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://facebook.com" label="Facebook">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://twitter.com" label="Twitter">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://youtube.com" label="YouTube">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          <FooterColumn title="Explore">
            <ul className="space-y-2.5">
              {explore.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="footer-link text-sm">{link.label}</Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Our Menu">
            <ul className="space-y-2.5">
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="footer-link text-sm">{link.label}</Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Support">
            <ul className="space-y-2.5">
              {support.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="footer-link text-sm">{link.label}</Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Contact">
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="leading-relaxed">
                42, Anna Salai, T. Nagar
                <br />
                Chennai, TN 600017
              </li>
              <li>
                <a href="tel:+918754332963" className="hover:text-secondary-light">+91 87543 32963</a>
              </li>
              <li>
                <a href="mailto:hello@pizzapalace.com" className="hover:text-secondary-light">
                  hello@pizzapalace.com
                </a>
              </li>
              <li>
                <a href="mailto:support@pizzapalace.com" className="hover:text-secondary-light">
                  support@pizzapalace.com
                </a>
              </li>
            </ul>
          </FooterColumn>
        </div>

        {/* Hours + Delivery zones + Payments */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* Opening hours */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-secondary-light">
              Opening Hours
            </h3>
            <ul className="space-y-2">
              {hours.map((h) => (
                <li key={h.day} className="flex justify-between text-sm">
                  <span className="text-gray-500">{h.day}</span>
                  <span className="font-medium text-gray-300">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery zones */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-secondary-light">
              Delivery Areas
            </h3>
            <div className="flex flex-wrap gap-2">
              {deliveryZones.map((zone) => (
                <span
                  key={zone}
                  className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-gray-400 ring-1 ring-white/10"
                >
                  {zone}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-gray-600">More areas coming soon across Chennai.</p>
          </div>

          {/* Payment + App */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-secondary-light">
              Payment Methods
            </h3>
            <div className="flex flex-wrap gap-2">
              {payments.map((p) => (
                <span
                  key={p}
                  className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-gray-400 ring-1 ring-white/10"
                >
                  {p}
                </span>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-dashed border-white/20 p-3 text-center">
              <p className="text-xs font-semibold text-gray-300">Mobile App Coming Soon</p>
              <p className="mt-0.5 text-[10px] text-gray-600">iOS & Android · 2026</p>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-bold text-white">Stay in the loop</h3>
              <p className="mt-1 text-sm text-gray-400">
                New pizzas, exclusive deals & festival offers — straight to your inbox.
              </p>
            </div>
            <form
              className="flex w-full max-w-md gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-secondary/50"
                aria-label="Newsletter email"
              />
              <button type="submit" className="btn-primary shrink-0 px-5 py-2.5 text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10 bg-black/20">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Pizza Palace · Crafted with{' '}
              <span className="text-primary">♥</span> in Chennai · All rights reserved
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
              <Link to="/support/privacy" className="hover:text-gray-400">Privacy</Link>
              <Link to="/support/terms" className="hover:text-gray-400">Terms</Link>
              <Link to="/support/refund" className="hover:text-gray-400">Refund Policy</Link>
              <Link to="/support/faq" className="hover:text-gray-400">FAQ</Link>
            </div>
            <p className="rounded-full bg-white/5 px-3 py-1 text-[11px] text-gray-500 ring-1 ring-white/10">
              MERN Stack · Student Project
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
