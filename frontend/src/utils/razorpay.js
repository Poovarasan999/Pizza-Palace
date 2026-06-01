const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export async function openRazorpayCheckout({ keyId, amountPaise, razorpayOrderId, user, onSuccess, onFailure }) {
  const loaded = await loadRazorpayScript();
  if (!loaded) {
    onFailure('Failed to load payment gateway');
    return;
  }

  const options = {
    key: keyId,
    amount: amountPaise,
    currency: 'INR',
    name: 'Pizza Palace',
    description: 'Pizza order payment',
    order_id: razorpayOrderId,
    prefill: {
      name: user?.name || '',
      email: user?.email || '',
    },
    theme: { color: '#E63946' },
    handler: (response) => {
      onSuccess({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      });
    },
    modal: {
      ondismiss: () => onFailure('Payment cancelled'),
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.on('payment.failed', (response) => {
    onFailure(response.error?.description || 'Payment failed');
  });
  rzp.open();
}
