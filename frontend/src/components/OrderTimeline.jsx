const STEPS = ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'];

const stepIndex = (status) => {
  if (status === 'Cancelled') return -1;
  return STEPS.indexOf(status);
};

export default function OrderTimeline({ status }) {
  const current = stepIndex(status);

  if (status === 'Cancelled') {
    return (
      <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
        This order was cancelled.
      </p>
    );
  }

  return (
    <div className="flex items-center justify-between gap-1 overflow-x-auto py-2">
      {STEPS.map((step, i) => {
        const done = i <= current;
        const active = i === current;
        return (
          <div key={step} className="flex min-w-0 flex-1 flex-col items-center">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                done ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
              } ${active ? 'ring-2 ring-primary/30 ring-offset-1' : ''}`}
            >
              {done ? '✓' : i + 1}
            </div>
            <p
              className={`mt-1 hidden text-center text-[10px] leading-tight sm:block ${
                active ? 'font-semibold text-primary' : 'text-gray-500'
              }`}
            >
              {step}
            </p>
          </div>
        );
      })}
    </div>
  );
}
