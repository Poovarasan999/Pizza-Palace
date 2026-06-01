import SupportLayout from '../../components/SupportLayout';

const sections = [
  {
    title: 'Eligible Refunds',
    content:
      'Refunds may be issued if your order was not delivered, arrived significantly late (beyond 60 minutes without notice), contained incorrect items, or was damaged during delivery.',
  },
  {
    title: 'Non-Refundable Cases',
    content:
      'Refunds are not provided for orders cancelled after kitchen confirmation, change of mind after delivery, or incorrect address provided by the customer.',
  },
  {
    title: 'Cancellation Policy',
    content:
      'Customers may cancel orders only while status is Pending. Admin-confirmed orders cannot be cancelled through the app — contact support for assistance.',
  },
  {
    title: 'Refund Process',
    content:
      'For COD orders, refunds are processed as wallet credit or bank transfer within 5–7 business days after approval. Contact support@pizzapalace.com with your Order ID.',
  },
  {
    title: 'How to Request',
    content:
      'Email support@pizzapalace.com or call +91 87543 32963 within 24 hours of delivery with your order number, photos (if applicable), and reason for refund.',
  },
];

export default function RefundPolicy() {
  return (
    <SupportLayout title="Refund Policy" subtitle="Last updated: May 2026">
      <p className="mb-6 text-sm text-gray-600">
        At Pizza Palace, customer satisfaction is our priority. Please read our refund guidelines below.
      </p>
      {sections.map((s) => (
        <div key={s.title} className="mb-6 last:mb-0">
          <h2 className="mb-2 text-lg font-bold text-neutral-dark">{s.title}</h2>
          <p className="text-sm leading-relaxed text-gray-600">{s.content}</p>
        </div>
      ))}
    </SupportLayout>
  );
}
