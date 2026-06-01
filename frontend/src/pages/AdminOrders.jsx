import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/client';
import StatusBadge from '../components/StatusBadge';
import PageHeader from '../components/PageHeader';

const STATUSES = [
  'Pending',
  'Confirmed',
  'Preparing',
  'Out for Delivery',
  'Delivered',
  'Cancelled',
];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    api
      .get('/orders')
      .then((res) => setOrders(res.data.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { status });
      toast.success('Status updated');
      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  if (loading) {
    return (
      <>
        <PageHeader title="Manage Orders" subtitle="Loading..." badge="Admin" />
        <div className="mx-auto max-w-7xl px-4 py-10 text-gray-500">Loading orders...</div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Manage Orders"
        subtitle={`${orders.length} total orders — update status below`}
        badge="Admin"
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl bg-white shadow-md">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-neutral-light">
              <tr>
                <th className="p-4">Order</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Total</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4">Update</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b last:border-0">
                  <td className="p-4">
                    <p className="font-mono text-xs text-gray-400">#{order._id.slice(-8)}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                    <p className="mt-1 max-w-xs truncate text-xs">{order.deliveryAddress}</p>
                  </td>
                  <td className="p-4">
                    <p>{order.customerId?.name}</p>
                    <p className="text-xs text-gray-500">{order.customerId?.email}</p>
                  </td>
                  <td className="p-4 font-bold">₹{order.totalAmount}</td>
                  <td className="p-4 text-xs">
                    <p>{order.paymentMethod === 'online' ? 'Online' : 'COD'}</p>
                    <p className={order.paymentStatus === 'paid' ? 'text-green-600' : 'text-gray-500'}>
                      {order.paymentStatus === 'paid' ? 'Paid' : order.paymentStatus}
                    </p>
                  </td>
                  <td className="p-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className="rounded-lg border px-3 py-1.5 text-sm"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </>
  );
}
