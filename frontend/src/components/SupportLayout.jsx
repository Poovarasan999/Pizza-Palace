import { Link } from 'react-router-dom';
import PageHeader from './PageHeader';

export default function SupportLayout({ title, subtitle, badge, children }) {
  return (
    <>
      <PageHeader
        title={title}
        subtitle={subtitle}
        badge={badge || 'Support'}
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Support', to: '/support/faq' },
          { label: title },
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="prose-support rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100 sm:p-8">
          {children}
        </div>
        <div className="mt-8 rounded-xl bg-cream p-5 text-center ring-1 ring-gray-100">
          <p className="text-sm text-gray-600">Still need help?</p>
          <p className="mt-1 font-semibold text-neutral-dark">
            Call{' '}
            <a href="tel:+918754332963" className="text-primary hover:underline">
              +91 87543 32963
            </a>{' '}
            or email{' '}
            <a href="mailto:support@pizzapalace.com" className="text-primary hover:underline">
              support@pizzapalace.com
            </a>
          </p>
          <Link to="/menu" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
            Back to Menu →
          </Link>
        </div>
      </div>
    </>
  );
}
