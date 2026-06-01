const FREE_DELIVERY_MIN = 499;

export default function DeliveryBar({ total }) {
  const remaining = FREE_DELIVERY_MIN - total;
  const qualified = total >= FREE_DELIVERY_MIN;

  return (
    <div
      className={`mb-6 rounded-xl px-4 py-3 text-sm ${
        qualified
          ? 'bg-green-50 text-green-700 ring-1 ring-green-200'
          : 'bg-secondary/10 text-secondary ring-1 ring-secondary/20'
      }`}
    >
      {qualified ? (
        <span className="font-medium">🎉 You qualify for FREE delivery!</span>
      ) : (
        <span>
          Add <strong>₹{remaining}</strong> more for <strong>free delivery</strong>
        </span>
      )}
      {!qualified && (
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/60">
          <div
            className="h-full rounded-full bg-secondary transition-all"
            style={{ width: `${Math.min(100, (total / FREE_DELIVERY_MIN) * 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}
