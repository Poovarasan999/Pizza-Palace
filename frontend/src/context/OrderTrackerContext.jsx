import { createContext, useContext, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import api from '../api/client';
import { useAuth } from './AuthContext';
import { getStatusAlert, requestNotificationPermission, sendBrowserNotification } from '../utils/orderAlerts';

const OrderTrackerContext = createContext(null);

const TERMINAL = new Set(['Delivered', 'Cancelled']);

export function OrderTrackerProvider({ children }) {
  const { user, isAdmin } = useAuth();
  const statusMapRef = useRef(new Map());
  const seededRef = useRef(false);

  useEffect(() => {
    if (!user || isAdmin) {
      statusMapRef.current.clear();
      seededRef.current = false;
      return undefined;
    }

    const poll = async (isInitial = false) => {
      try {
        const res = await api.get('/orders/my');
        const orders = res.data.data || [];

        orders.forEach((order) => {
          const prev = statusMapRef.current.get(order._id);

          if (prev === undefined) {
            statusMapRef.current.set(order._id, order.status);
            return;
          }

          if (prev !== order.status && !isInitial) {
            const alert = getStatusAlert(order.status);
            const orderLabel = `#${order._id.slice(-8).toUpperCase()}`;

            if (alert) {
              if (order.status === 'Delivered') {
                toast.success(`${alert.toast} (${orderLabel})`, { duration: 6000 });
                sendBrowserNotification('Pizza Palace — Order Delivered! 🍕', `${orderLabel}: ${alert.notification}`);
              } else {
                toast(alert.toast, { icon: order.status === 'Cancelled' ? '❌' : '📦' });
                sendBrowserNotification(`Pizza Palace — ${order.status}`, `${orderLabel}: ${alert.notification}`);
              }
            }
          }

          statusMapRef.current.set(order._id, order.status);
        });

        if (isInitial) seededRef.current = true;
      } catch {
        // silent — user may have logged out mid-poll
      }
    };

    poll(true);
    requestNotificationPermission();

    const hasActive = () =>
      [...statusMapRef.current.values()].some((s) => !TERMINAL.has(s));

    const interval = setInterval(() => {
      if (seededRef.current && hasActive()) poll(false);
    }, 6000);

    return () => clearInterval(interval);
  }, [user, isAdmin]);

  return (
    <OrderTrackerContext.Provider value={{ requestAlerts: requestNotificationPermission }}>
      {children}
    </OrderTrackerContext.Provider>
  );
}

export const useOrderTracker = () => useContext(OrderTrackerContext);
