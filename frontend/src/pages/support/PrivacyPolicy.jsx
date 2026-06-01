import SupportLayout from '../../components/SupportLayout';

const sections = [
  {
    title: 'Information We Collect',
    content:
      'We collect your name, email, password (hashed), delivery address, order history, and phone number (if provided at checkout) when you use Pizza Palace.',
  },
  {
    title: 'How We Use Your Data',
    content:
      'Your data is used to process orders, deliver pizzas, manage your account, improve our service, and communicate order updates. We do not sell your personal information to third parties.',
  },
  {
    title: 'Data Storage & Security',
    content:
      'Data is stored securely in MongoDB with bcrypt password hashing and JWT authentication. Sensitive credentials are kept in environment variables and never exposed to the client.',
  },
  {
    title: 'Cookies & Local Storage',
    content:
      'We use localStorage to persist your login token, user session, and shopping cart between page visits. Clearing browser data will log you out and empty your cart.',
  },
  {
    title: 'Your Rights',
    content:
      'You may request access to or deletion of your account data by contacting hello@pizzapalace.com. We will respond within 7 business days.',
  },
  {
    title: 'Contact',
    content:
      'For privacy-related queries, email hello@pizzapalace.com or write to Pizza Palace, 42 Anna Salai, T. Nagar, Chennai 600017.',
  },
];

export default function PrivacyPolicy() {
  return (
    <SupportLayout title="Privacy Policy" subtitle="Last updated: May 2026">
      <p className="mb-6 text-sm text-gray-600">
        Pizza Palace respects your privacy. This policy explains how we handle your personal information.
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
