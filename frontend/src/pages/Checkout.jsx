import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/client';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import PageHeader from '../components/PageHeader';
import TrustBadges from '../components/TrustBadges';
import DemoPaymentModal from '../components/DemoPaymentModal';
import { openRazorpayCheckout } from '../utils/razorpay';
import { requestNotificationPermission } from '../utils/orderAlerts';

export default function Checkout() {
  const { items, total, clearCart, count } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [showDemoPay, setShowDemoPay] = useState(false);
  const [pendingPayment, setPendingPayment] = useState(null);

  const deliveryFee = total >= 499 ? 0 : 40;
  const grandTotal = total + deliveryFee;
  const orderItems = items.map((i) => ({ pizza: i._id, qty: i.qty }));

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const getFullAddress = () =>
    phone.trim() ? `${address.trim()} | Phone: ${phone.trim()}` : address.trim();

  const finishOrder = (message) => {
    clearCart();
    toast.success(message);
    navigate('/orders');
  };

  const placeCodOrder = async () => {
    await api.post('/orders', {
      items: orderItems,
      deliveryAddress: getFullAddress(),
      paymentMethod: 'cod',
    });
    finishOrder('Order placed! Pay ₹' + grandTotal + ' on delivery. Alerts enabled for status updates.');
  };

  const verifyOnlinePayment = async (paymentPayload) => {
    await api.post('/payments/verify', {
      items: orderItems,
      deliveryAddress: getFullAddress(),
      ...paymentPayload,
    });
    finishOrder('Payment successful! Order placed — you will get alerts when status changes.');
  };

  const startOnlinePayment = async () => {
    const res = await api.post('/payments/create-order', { items: orderItems });
    const data = res.data.data;

    if (data.demoMode) {
      setPendingPayment({ demoMode: true, demoOrderId: data.demoOrderId });
      setShowDemoPay(true);
      return;
    }

    await openRazorpayCheckout({
      keyId: data.keyId,
      amountPaise: data.amountPaise,
      razorpayOrderId: data.razorpayOrderId,
      user,
      onSuccess: async (payment) => {
        setLoading(true);
        try {
          await verifyOnlinePayment({
            demoMode: false,
            ...payment,
          });
        } catch (err) {
          toast.error(err.response?.data?.message || 'Payment verification failed');
        } finally {
          setLoading(false);
        }
      },
      onFailure: (msg) => toast.error(msg),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address.trim()) {
      toast.error('Please enter a delivery address');
      return;
    }

    setLoading(true);
    try {
      if (paymentMethod === 'cod') {
        await placeCodOrder();
      } else {
        await startOnlinePayment();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoPaymentSuccess = async () => {
    setShowDemoPay(false);
    setLoading(true);
    try {
      await verifyOnlinePayment({
        demoMode: true,
        demoOrderId: pendingPayment.demoOrderId,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Demo payment failed');
    } finally {
      setLoading(false);
      setPendingPayment(null);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <>
      <PageHeader
        title="Checkout"
        subtitle="Almost there — confirm your delivery details"
        badge="Checkout"
        breadcrumb={[
          { label: 'Home', to: '/' },
          { label: 'Cart', to: '/cart' },
          { label: 'Checkout' },
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-center gap-2 text-sm">
          {['Cart', 'Details', 'Done'].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  i <= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {i + 1}
              </span>
              <span className={i <= 1 ? 'font-medium' : 'text-gray-400'}>{step}</span>
              {i < 2 && <span className="mx-1 text-gray-300">→</span>}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100">
            <h2 className="mb-1 text-xl font-bold">Delivery Details</h2>
            <p className="mb-4 text-sm text-gray-500">Where should we deliver your pizza?</p>
            <div className="space-y-4">
              <div>
                <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                  Phone Number <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 87543 32963"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label htmlFor="address" className="mb-1 block text-sm font-medium">
                  Delivery Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House no, street, area, city, pincode..."
                  rows={4}
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100">
            <h2 className="mb-4 text-xl font-bold">Payment Method</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <label
                className={`cursor-pointer rounded-xl border-2 p-4 transition ${
                  paymentMethod === 'cod'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="sr-only"
                />
                <p className="font-semibold">💵 Cash on Delivery</p>
                <p className="mt-1 text-xs text-gray-500">Pay when pizza arrives</p>
              </label>
              <label
                className={`cursor-pointer rounded-xl border-2 p-4 transition ${
                  paymentMethod === 'online'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={() => setPaymentMethod('online')}
                  className="sr-only"
                />
                <p className="font-semibold">💳 Pay Online</p>
                <p className="mt-1 text-xs text-gray-500">UPI · Card · Net Banking</p>
              </label>
            </div>
            {paymentMethod === 'online' && (
              <p className="mt-3 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700">
                Secure payment via Razorpay. Demo mode works without API keys.
              </p>
            )}
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100">
            <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
            <ul className="mb-4 space-y-2">
              {items.map((item) => (
                <li key={item._id} className="flex justify-between text-sm">
                  <span>{item.name} × {item.qty}</span>
                  <span>₹{item.price * item.qty}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-2 border-t pt-4 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal ({count} items)</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery</span>
                <span className={deliveryFee === 0 ? 'text-green-600' : ''}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">₹{grandTotal}</span>
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-4">
            {loading
              ? 'Processing...'
              : paymentMethod === 'online'
                ? `Pay ₹${grandTotal} & Place Order`
                : `Place Order · ₹${grandTotal}`}
          </button>
          <Link to="/cart" className="block text-center text-sm text-gray-500 hover:text-primary">
            ← Back to Cart
          </Link>
        </form>
        <TrustBadges className="mt-8" />
      </div>

      {showDemoPay && (
        <DemoPaymentModal
          amount={grandTotal}
          onSuccess={handleDemoPaymentSuccess}
          onClose={() => {
            setShowDemoPay(false);
            setPendingPayment(null);
          }}
        />
      )}
    </>
  );
}
