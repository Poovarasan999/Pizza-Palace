const badges = [
  { label: 'Secure Checkout', icon: '🔒' },
  { label: 'Fresh Ingredients', icon: '🥬' },
  { label: 'Fast Delivery', icon: '⚡' },
];

export default function TrustBadges({ className = '' }) {
  return (
    <div className={`flex flex-wrap justify-center gap-4 ${className}`}>
      {badges.map((b) => (
        <span
          key={b.label}
          className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm ring-1 ring-gray-100"
        >
          <span>{b.icon}</span>
          {b.label}
        </span>
      ))}
    </div>
  );
}
