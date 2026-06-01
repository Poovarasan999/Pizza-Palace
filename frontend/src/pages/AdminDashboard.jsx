import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import StatusBadge from '../components/StatusBadge';
import PageHeader from '../components/PageHeader';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get('/orders'), api.get('/pizzas?all=true')])
      .then(([ordersRes, pizzasRes]) => {
        setOrders(ordersRes.data.data);
        setPizzas(pizzasRes.data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const revenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pending = orders.filter((o) => o.status === 'Pending').length;
  const delivered = orders.filter((o) => o.status === 'Delivered').length;
  const available = pizzas.filter((p) => p.isAvailable).length;

  if (loading) {
    return (
      <>
        <PageHeader title="Admin Dashboard" subtitle="Loading..." badge="Admin" />
        <div className="mx-auto max-w-7xl animate-pulse px-4 py-10">
          <div className="grid gap-4 sm:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 rounded-2xl bg-gray-200" />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Admin Dashboard"
        subtitle="Manage orders, menu, and monitor performance"
        badge="Admin Panel"
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Total Revenue', value: `₹${revenue}`, color: 'text-primary' },
            { label: 'Total Orders', value: orders.length, color: 'text-neutral-dark' },
            { label: 'Pending', value: pending, color: 'text-secondary' },
            { label: 'Delivered', value: delivered, color: 'text-green-600' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-gray-100">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          <Link to="/admin/pizzas" className="btn-primary">Manage Pizzas ({pizzas.length})</Link>
          <Link to="/admin/orders" className="rounded-xl bg-secondary px-6 py-3 font-semibold text-white shadow-lg hover:bg-secondary/90">
            Manage Orders ({orders.length})
          </Link>
          <Link to="/menu" className="rounded-xl border-2 border-gray-200 px-6 py-3 font-semibold hover:border-primary hover:text-primary">
            View Storefront
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100">
            <h2 className="mb-4 text-lg font-bold">Recent Orders</h2>
            {orders.length === 0 ? (
              <p className="text-gray-500">No orders yet.</p>
            ) : (
              orders.slice(0, 6).map((order) => (
                <div key={order._id} className="flex items-center justify-between border-b border-gray-50 py-3 last:border-0">
                  <div>
                    <p className="font-medium">{order.customerId?.name || 'Customer'}</p>
                    <p className="text-xs text-gray-500">
                      #{order._id.slice(-6)} · ₹{order.totalAmount}
                    </p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
              ))
            )}
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100">
            <h2 className="mb-4 text-lg font-bold">Menu Overview</h2>
            <div className="space-y-3">
              <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-3">
                <span className="text-gray-600">Total Pizzas</span>
                <span className="font-bold">{pizzas.length}</span>
              </div>
              <div className="flex justify-between rounded-lg bg-green-50 px-4 py-3">
                <span className="text-gray-600">Available</span>
                <span className="font-bold text-green-700">{available}</span>
              </div>
              <div className="flex justify-between rounded-lg bg-red-50 px-4 py-3">
                <span className="text-gray-600">Hidden</span>
                <span className="font-bold text-red-600">{pizzas.length - available}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
