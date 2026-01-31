import { useState, useEffect } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import { Package, Clock, CheckCircle, PackageSearch, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mobile, setMobile] = useState(localStorage.getItem('userMobile') || '');

    useEffect(() => {
        if (mobile) {
            fetchOrders();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await API.get(`/order/my-orders?mobile=${mobile}`);
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            case 'Accepted': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'Delivered': return 'bg-green-500/10 text-green-500 border-green-500/20';
            default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f0f] pb-32">
            <Navbar />
            <div className="px-6 py-8">
                <h1 className="text-3xl font-black mb-8 flex items-center gap-3">
                    YOUR <span className="text-primary italic uppercase tracking-wider">ORDERS</span>
                </h1>

                {!mobile && !loading && (
                    <div className="text-center py-20 glass rounded-3xl border border-dashed border-white/10 px-8">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <PackageSearch className="text-primary w-10 h-10" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">No history found</h2>
                        <p className="text-white/40 text-sm mb-8">Place your first order to track its status here!</p>
                        <Link to="/" className="premium-gradient text-black font-bold px-8 py-3.5 rounded-2xl inline-flex items-center gap-2">
                            Explore Menu <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                )}

                {mobile && orders.length === 0 && !loading && (
                    <div className="text-center py-20 glass rounded-3xl border border-dashed border-white/10 px-8">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Clock className="text-primary w-10 h-10" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">Fetching your royal meals...</h2>
                        <p className="text-white/40 text-sm">We couldn't find any orders for {mobile}.</p>
                    </div>
                )}

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-32 glass animate-pulse rounded-3xl"></div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order._id} className="glass rounded-3xl overflow-hidden border border-white/5">
                                <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                                    <div>
                                        <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Order ID</p>
                                        <p className="text-sm font-mono text-white/60">#{order._id.slice(-8).toUpperCase()}</p>
                                    </div>
                                    <div className={`px-4 py-1.5 rounded-full border text-[11px] font-black tracking-widest uppercase ${getStatusStyle(order.status)}`}>
                                        {order.status}
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {order.items.map((item, idx) => (
                                            <span key={idx} className="bg-white/5 px-2 py-1 rounded-lg text-[10px] text-white/60">
                                                {item.quantity}x {item.name}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Total Paid</p>
                                            <p className="text-2xl font-black text-primary">₹{order.totalAmount}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Ordered On</p>
                                            <p className="text-[11px] text-white/60">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;
