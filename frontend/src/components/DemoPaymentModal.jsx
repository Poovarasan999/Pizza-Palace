import { useEffect, useState } from 'react';

export default function DemoPaymentModal({ amount, onSuccess, onClose }) {
  const [step, setStep] = useState('choose');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const pay = (method) => {
    setStep('processing');
    setProcessing(true);
    setTimeout(() => {
      onSuccess({ method, demoPaymentId: `demo_pay_${Date.now()}` });
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">Pizza Palace Pay</h3>
          <button
            type="button"
            onClick={onClose}
            disabled={processing}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <p className="mb-1 text-sm text-gray-500">Amount to pay</p>
        <p className="mb-4 text-3xl font-bold text-primary">₹{amount}</p>

        {step === 'choose' && (
          <>
            <p className="mb-3 text-xs text-amber-600">
              Demo mode — no real money charged. Add Razorpay keys in backend .env for live payments.
            </p>
            <div className="space-y-2">
              {['UPI', 'Debit / Credit Card', 'Net Banking'].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => pay(method)}
                  className="flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-left hover:border-primary hover:bg-primary/5"
                >
                  <span className="font-medium">{method}</span>
                  <span className="text-gray-400">→</span>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 'processing' && (
          <div className="py-8 text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="font-medium">Processing payment...</p>
            <p className="text-sm text-gray-500">Please wait</p>
          </div>
        )}
      </div>
    </div>
  );
}
