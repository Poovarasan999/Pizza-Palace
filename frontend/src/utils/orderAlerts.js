const STATUS_MESSAGES = {
  Confirmed: {
    toast: 'Order confirmed! Kitchen accepted your order.',
    notification: 'Order confirmed — we are getting started!',
  },
  Preparing: {
    toast: 'Your pizza is being prepared 🍕',
    notification: 'Your pizza is in the oven!',
  },
  'Out for Delivery': {
    toast: 'Rider is on the way! 🛵',
    notification: 'Your order is out for delivery!',
  },
  Delivered: {
    toast: 'Order delivered! Enjoy your pizza 🎉',
    notification: 'Order delivered — bon appétit!',
  },
  Cancelled: {
    toast: 'Order was cancelled.',
    notification: 'Your order was cancelled.',
  },
};

export async function requestNotificationPermission() {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;

  const result = await Notification.requestPermission();
  return result === 'granted';
}

export function sendBrowserNotification(title, body) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;

  try {
    new Notification(title, {
      body,
      icon: '/favicon.svg',
      tag: `pizza-palace-${Date.now()}`,
    });
  } catch {
    // ignore — some browsers block without user gesture
  }
}

export function getStatusAlert(status) {
  return STATUS_MESSAGES[status] || null;
}
