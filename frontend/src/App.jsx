import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderTrackerProvider } from './context/OrderTrackerContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import Menu from './pages/Menu';
import PizzaDetail from './pages/PizzaDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';
import AdminPizzas from './pages/AdminPizzas';
import AdminOrders from './pages/AdminOrders';
import Faq from './pages/support/Faq';
import RefundPolicy from './pages/support/RefundPolicy';
import PrivacyPolicy from './pages/support/PrivacyPolicy';
import TermsOfService from './pages/support/TermsOfService';
import ContactSupport from './pages/support/ContactSupport';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <OrderTrackerProvider>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/pizza/:id" element={<PizzaDetail />} />
                <Route path="/auth" element={<Auth />} />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <OrderHistory />
                    </ProtectedRoute>
                  }
                />
                <Route path="/support/faq" element={<Faq />} />
                <Route path="/support/refund" element={<RefundPolicy />} />
                <Route path="/support/privacy" element={<PrivacyPolicy />} />
                <Route path="/support/terms" element={<TermsOfService />} />
                <Route path="/support/contact" element={<ContactSupport />} />
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/pizzas"
                  element={
                    <AdminRoute>
                      <AdminPizzas />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/orders"
                  element={
                    <AdminRoute>
                      <AdminOrders />
                    </AdminRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </CartProvider>
        </OrderTrackerProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
