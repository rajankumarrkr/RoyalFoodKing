import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import BottomNavbar from './components/BottomNavbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import OrderHistory from './pages/OrderHistory';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AddFood from './pages/AddFood';
import Search from './pages/Search';

// Wrapper component to handle conditional layout
const AppLayout = () => {
    const location = useLocation();
    const isAdminPage = location.pathname.startsWith('/admin');

    return (
        <div className={`min-h-screen bg-[#0f0f0f] text-white ${!isAdminPage ? 'pb-24 md:pb-0' : ''}`}>
            <Toaster position="top-center" reverseOrder={false} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/search" element={<Search />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/orders" element={<OrderHistory />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/add-food" element={<AddFood />} />
            </Routes>
            {!isAdminPage && <BottomNavbar />}
        </div>
    );
};

function App() {
    return (
        <CartProvider>
            <Router>
                <AppLayout />
            </Router>
        </CartProvider>
    );
}

export default App;
