import { useState, useEffect } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import {
    Plus,
    Trash2,
    Edit3,
    LayoutDashboard,
    ShoppingBag,
    Utensils,
    LogOut,
    ChevronRight,
    Clock,
    CheckCircle,
    Truck,
    User,
    MapPin,
    Phone
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [foods, setFoods] = useState([]);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('foods');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [foodsRes, ordersRes] = await Promise.all([
                API.get('/food'),
                API.get('/order')
            ]);
            setFoods(foodsRes.data);
            setOrders(ordersRes.data);
        } catch (error) {
            toast.error('Failed to fetch data');
            if (error.response?.status === 401) navigate('/admin/login');
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            await API.patch(`/order/${orderId}/status`, { status });
            toast.success(`Order ${status}`);
            fetchData();
        } catch (error) {
            toast.error('Update failed');
        }
    };

    const deleteFood = async (id) => {
        if (!window.confirm('Are you sure you want to remove this royal dish?')) return;
        try {
            await API.delete(`/food/${id}`);
            toast.success('Food removed');
            fetchData();
        } catch (error) {
            toast.error('Delete failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Pending': return <Clock className="w-4 h-4 text-yellow-500" />;
            case 'Accepted': return <CheckCircle className="w-4 h-4 text-blue-500" />;
            case 'Delivered': return <Truck className="w-4 h-4 text-green-500" />;
            default: return null;
        }
    };

    return (
        <div className="pb-20">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-black italic">KING'S <span className="text-primary">COMMAND CENTER</span></h1>
                        <p className="text-white/40">Manage your menu and track royal orders</p>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-4 py-2 border border-red-500/30 hover:bg-red-500/10 text-red-500 rounded-xl transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="glass p-6 rounded-3xl border-primary/10">
                        <div className="bg-primary/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                            <Utensils className="text-primary" />
                        </div>
                        <p className="text-white/40 text-sm">Total Menu Items</p>
                        <h3 className="text-3xl font-black">{foods.length}</h3>
                    </div>
                    <div className="glass p-6 rounded-3xl border-primary/10">
                        <div className="bg-blue-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                            <ShoppingBag className="text-blue-500" />
                        </div>
                        <p className="text-white/40 text-sm">Total Orders</p>
                        <h3 className="text-3xl font-black">{orders.length}</h3>
                    </div>
                    <div className="glass p-6 rounded-3xl border-primary/10">
                        <div className="bg-green-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                            <CheckCircle className="text-green-500" />
                        </div>
                        <p className="text-white/40 text-sm">Revenue</p>
                        <h3 className="text-3xl font-black text-green-500">₹{orders.filter(o => o.status === 'Delivered').reduce((acc, curr) => acc + curr.totalAmount, 0)}</h3>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('foods')}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'foods' ? 'bg-primary text-black' : 'bg-white/5 border border-white/10'}`}
                    >
                        Food Management
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === 'orders' ? 'bg-primary text-black' : 'bg-white/5 border border-white/10'}`}
                    >
                        Active Orders
                    </button>
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => <div key={i} className="h-20 glass animate-pulse rounded-2xl"></div>)}
                    </div>
                ) : activeTab === 'foods' ? (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Current Menu</h2>
                            <button
                                onClick={() => navigate('/admin/add-food')}
                                className="premium-gradient text-black font-bold px-4 py-2 rounded-xl flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" /> Add New
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {foods.map(food => (
                                <div key={food._id} className="glass p-4 rounded-2xl flex items-center gap-4 group">
                                    <img src={food.image} alt={food.name} className="w-16 h-16 object-cover rounded-xl" />
                                    <div className="flex-1">
                                        <h3 className="font-bold">{food.name}</h3>
                                        <p className="text-primary text-sm font-bold">₹{food.price} • {food.category}</p>
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 hover:bg-white/10 rounded-lg text-blue-400">
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => deleteFood(food._id)}
                                            className="p-2 hover:bg-white/10 rounded-lg text-red-400"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map(order => (
                            <div key={order._id} className="glass p-6 rounded-3xl border-primary/5">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-white/40 text-[10px] font-mono tracking-tighter">ORDER #{order._id.slice(-6)}</span>
                                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-[10px] font-black uppercase tracking-wider border border-white/5">
                                                {getStatusIcon(order.status)}
                                                {order.status}
                                            </div>
                                        </div>
                                        <h3 className="font-black text-xl text-primary flex items-center gap-2">
                                            <User className="w-5 h-5 text-white/40" />
                                            {order.customerDetails.name}
                                        </h3>
                                        <div className="flex items-start gap-2 mt-2 bg-white/[0.03] p-3 rounded-2xl border border-white/5">
                                            <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                            <p className="text-white/70 text-sm leading-relaxed">{order.customerDetails.address}</p>
                                        </div>
                                        <a
                                            href={`tel:${order.customerDetails.mobile}`}
                                            className="inline-flex items-center gap-2 text-primary font-black mt-3 hover:scale-105 transition-transform bg-primary/10 px-4 py-2 rounded-xl"
                                        >
                                            <Phone className="w-4 h-4" />
                                            {order.customerDetails.mobile}
                                        </a>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-black">₹{order.totalAmount}</p>
                                        <p className="text-white/40 text-xs">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="border-t border-white/5 pt-4 flex flex-wrap gap-4 items-center justify-between">
                                    <div className="flex flex-wrap gap-2">
                                        {order.items.map((item, idx) => (
                                            <span key={idx} className="bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-xs">
                                                {item.name} x{item.quantity}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-2">
                                        {order.status === 'Pending' && (
                                            <button
                                                onClick={() => updateOrderStatus(order._id, 'Accepted')}
                                                className="bg-blue-500 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-blue-600 transition-colors"
                                            >
                                                Accept Order
                                            </button>
                                        )}
                                        {order.status === 'Accepted' && (
                                            <button
                                                onClick={() => updateOrderStatus(order._id, 'Delivered')}
                                                className="bg-green-500 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-green-600 transition-colors"
                                            >
                                                Mark Delivered
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {orders.length === 0 && <div className="text-center py-20 text-white/20 italic">No orders yet...</div>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
