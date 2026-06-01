import SupportLayout from '../../components/SupportLayout';

const sections = [
  {
    title: 'Acceptance of Terms',
    content:
      'By accessing or using Pizza Palace, you agree to these Terms of Service. If you do not agree, please do not use our platform.',
  },
  {
    title: 'Account Responsibility',
    content:
      'You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account. Notify us immediately of any unauthorized use.',
  },
  {
    title: 'Orders & Pricing',
    content:
      'All prices are listed in INR and include applicable taxes unless stated otherwise. We reserve the right to modify menu prices. Orders are subject to availability.',
  },
  {
    title: 'Delivery',
    content:
      'Delivery times are estimates (25–35 minutes). Pizza Palace is not liable for delays caused by traffic, weather, or incorrect addresses provided by the customer.',
  },
  {
    title: 'Prohibited Use',
    content:
      'You may not misuse the platform, attempt unauthorized access to admin functions, submit false orders, or interfere with the normal operation of the service.',
  },
  {
    title: 'Limitation of Liability',
    content:
      'Pizza Palace is provided as a student MERN stack project. The service is offered "as is" without warranties beyond those required by applicable law.',
  },
  {
    title: 'Governing Law',
    content:
      'These terms are governed by the laws of India. Disputes shall be subject to the jurisdiction of courts in Chennai, Tamil Nadu.',
  },
];

export default function TermsOfService() {
  return (
    <SupportLayout title="Terms of Service" subtitle="Last updated: May 2026">
      <p className="mb-6 text-sm text-gray-600">
        Please read these terms carefully before using Pizza Palace online ordering platform.
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
