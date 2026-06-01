import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import api from '../api/client';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import LoadingSkeleton from '../components/LoadingSkeleton';
import PageHeader from '../components/PageHeader';
import OrderTimeline from '../components/OrderTimeline';
import { requestNotificationPermission } from '../utils/orderAlerts';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [notificationsOn, setNotificationsOn] = useState(
    () => typeof Notification !== 'undefined' && Notification.permission === 'granted'
  );

  const fetchOrders = (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);

    api
      .get('/orders/my')
      .then((res) => setOrders(res.data.data))
      .catch(() => setOrders([]))
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const hasActiveOrders = orders.some(
    (o) => o.status !== 'Delivered' && o.status !== 'Cancelled'
  );

  useEffect(() => {
    if (!hasActiveOrders) return undefined;

    const interval = setInterval(() => fetchOrders(true), 8000);
    return () => clearInterval(interval);
  }, [hasActiveOrders, orders.length]);

  const enableNotifications = async () => {
    const granted = await requestNotificationPermission();
    setNotificationsOn(granted);
    if (granted) toast.success('Alerts enabled — you will be notified when order is delivered!');
    else toast.error('Notifications blocked. Enable them in browser settings.');
  };

  const paymentLabel = (order) => {
    if (order.paymentMethod === 'online') {
      return order.paymentStatus === 'paid' ? 'Paid online ✓' : 'Online · Pending';
    }
    return 'Cash on Delivery';
  };

  const cancelOrder = async (id) => {
    try {
      await api.delete(`/orders/${id}`);
      toast.success('Order cancelled');
      fetchOrders(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel order');
    }
  };

  if (loading) {
    return (
      <>
        <PageHeader title="My Orders" subtitle="Loading your orders..." badge="Orders" />
        <div className="mx-auto max-w-7xl px-4 py-10">
          <LoadingSkeleton count={3} />
        </div>
      </>
    );
  }

  if (orders.length === 0) {
    return (
      <>
        <PageHeader title="My Orders" subtitle="Track and manage your pizza orders" badge="Orders" />
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <EmptyState
            icon="📦"
            title="No orders yet"
            description="Place your first order and track it here."
            actionLabel="Browse Menu"
            actionTo="/menu"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="My Orders"
        subtitle={`${orders.length} order${orders.length > 1 ? 's' : ''} placed`}
        badge="Orders"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Orders' }]}
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-2">
            {hasActiveOrders ? (
              <p className="flex items-center gap-2 text-sm text-green-600">
                <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" />
                Live tracking — status updates automatically every 8 seconds
              </p>
            ) : (
              <p className="text-sm text-gray-500">All orders completed</p>
            )}
            {!notificationsOn && (
              <button
                type="button"
                onClick={enableNotifications}
                className="text-sm font-medium text-primary hover:underline"
              >
                🔔 Enable delivery alerts (browser notification)
              </button>
            )}
            {notificationsOn && (
              <p className="text-xs text-gray-500">🔔 Alerts on — you will be notified when order is delivered</p>
            )}
          </div>
          <button
            onClick={() => fetchOrders(true)}
            disabled={refreshing}
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary disabled:opacity-50"
          >
            {refreshing ? 'Refreshing...' : '↻ Refresh'}
          </button>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-100">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 bg-gray-50 px-6 py-4">
                <div>
                  <p className="font-semibold">Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </p>
                </div>
                <StatusBadge status={order.status} />
              </div>

              <div className="px-6 py-4">
                <OrderTimeline status={order.status} />
              </div>

              <div className="border-t border-gray-100 px-6 py-4">
                <ul className="mb-4 space-y-2">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between text-sm">
                      <span>{item.pizza?.name || 'Pizza'} × {item.qty}</span>
                      <span className="font-medium">₹{item.price * item.qty}</span>
                    </li>
                  ))}
                </ul>
                <p className="mb-3 text-sm text-gray-500">
                  <span className="font-medium text-gray-700">Deliver to:</span> {order.deliveryAddress}
                </p>
                <p className="mb-3 text-sm text-gray-500">
                  <span className="font-medium text-gray-700">Payment:</span> {paymentLabel(order)}
                  {order.deliveryFee > 0 && (
                    <span className="text-gray-400"> · incl. ₹{order.deliveryFee} delivery</span>
                  )}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xl font-bold text-primary">₹{order.totalAmount}</p>
                  <div className="flex gap-3">
                    {order.status === 'Pending' && (
                      <button
                        onClick={() => cancelOrder(order._id)}
                        className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                      >
                        Cancel Order
                      </button>
                    )}
                    <Link
                      to="/menu"
                      className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20"
                    >
                      Order Again
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
