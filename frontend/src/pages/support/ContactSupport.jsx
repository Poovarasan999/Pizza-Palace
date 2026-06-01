import { useState } from 'react';
import toast from 'react-hot-toast';
import SupportLayout from '../../components/SupportLayout';

export default function ContactSupport() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We will reply within 24 hours.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <SupportLayout
      title="Contact Support"
      subtitle="We're here to help — reach out anytime"
    >
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <a
          href="tel:+918754332963"
          className="flex items-center gap-3 rounded-xl bg-cream p-4 ring-1 ring-gray-100 hover:ring-primary/30"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">📞</span>
          <div>
            <p className="text-xs text-gray-500">Phone</p>
            <p className="font-semibold">+91 87543 32963</p>
          </div>
        </a>
        <a
          href="mailto:support@pizzapalace.com"
          className="flex items-center gap-3 rounded-xl bg-cream p-4 ring-1 ring-gray-100 hover:ring-primary/30"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">📧</span>
          <div>
            <p className="text-xs text-gray-500">Email</p>
            <p className="font-semibold">support@pizzapalace.com</p>
          </div>
        </a>
      </div>

      <p className="mb-4 text-sm font-medium text-neutral-dark">Or send us a message:</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            required
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <input
            required
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <select
          required
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">Select a topic</option>
          <option value="order">Order Issue</option>
          <option value="delivery">Delivery Problem</option>
          <option value="refund">Refund Request</option>
          <option value="feedback">Feedback</option>
          <option value="other">Other</option>
        </select>
        <textarea
          required
          rows={4}
          placeholder="Describe your issue..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button type="submit" className="btn-primary w-full sm:w-auto">
          Send Message
        </button>
      </form>

      <p className="mt-6 text-xs text-gray-500">
        Support hours: Mon–Sun, 11 AM – 11 PM · Average response time: under 24 hours
      </p>
    </SupportLayout>
  );
}
