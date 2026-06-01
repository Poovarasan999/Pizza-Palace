import { useState } from 'react';
import { Link } from 'react-router-dom';
import SupportLayout from '../../components/SupportLayout';

const faqs = [
  {
    q: 'How do I place an order?',
    a: 'Browse our menu, add pizzas to your cart, login or register, enter your delivery address at checkout, and click Place Order. You can pay via Cash on Delivery (COD).',
  },
  {
    q: 'How can I track my order?',
    a: 'After placing an order, go to My Orders. Status updates automatically — Pending → Confirmed (5s) → Preparing (15s) → Out for Delivery (30s) → Delivered (45s). You can also cancel while status is Pending.',
  },
  {
    q: 'Can I cancel my order?',
    a: 'Yes, but only while the order status is Pending. Go to My Orders and click Cancel Order. Once confirmed by our kitchen, cancellation is not possible.',
  },
  {
    q: 'What are the delivery charges?',
    a: 'Delivery is FREE on orders above ₹499. For orders below ₹499, a ₹40 delivery fee applies. Estimated delivery time is 25–35 minutes.',
  },
  {
    q: 'Which areas do you deliver to?',
    a: 'We currently deliver across T. Nagar, Anna Nagar, Adyar, Velachery, OMR, Porur, Tambaram, and Mylapore. More Chennai areas coming soon.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'Cash on Delivery (COD) and online payment via UPI, debit/credit card, and net banking (Razorpay). Online payments are verified before the order is placed. Without Razorpay API keys, demo payment mode works for testing.',
  },
  {
    q: 'Will I get alerts when my order is ready or delivered?',
    a: 'Yes! Enable browser notifications on My Orders. You will get toast alerts for each status change and a special notification when your order is delivered — even if you are on another page.',
  },
  {
    q: 'Do I need an account to order?',
    a: 'Yes, you must register or login to add items to cart, checkout, and track orders. Browsing the menu is available without an account.',
  },
  {
    q: 'What if my order is wrong or late?',
    a: 'Contact us immediately at +91 87543 32963 or support@pizzapalace.com. We will investigate and offer a refund or replacement as per our Refund Policy.',
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <SupportLayout
      title="Help & FAQ"
      subtitle="Find answers to common questions about ordering from Pizza Palace"
    >
      <p className="mb-6 text-sm text-gray-600">
        Quick links:{' '}
        <Link to="/orders" className="font-medium text-primary hover:underline">Track Order</Link>
        {' · '}
        <Link to="/support/refund" className="font-medium text-primary hover:underline">Refund Policy</Link>
        {' · '}
        <Link to="/support/contact" className="font-medium text-primary hover:underline">Contact Us</Link>
      </p>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-gray-100">
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              className="flex w-full items-center justify-between bg-gray-50 px-4 py-3.5 text-left text-sm font-semibold text-neutral-dark hover:bg-gray-100"
            >
              {faq.q}
              <span className="ml-2 shrink-0 text-primary">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && (
              <div className="border-t border-gray-100 px-4 py-3 text-sm leading-relaxed text-gray-600">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </SupportLayout>
  );
}
