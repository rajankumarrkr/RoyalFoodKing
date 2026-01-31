import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import Navbar from '../components/Navbar';
import { CheckCircle2, MapPin, Phone, User, Send } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Checkout = () => {
    const { cart, totalAmount, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        address: ''
    });

    if (cart.length === 0) {
        navigate('/cart');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderData = {
                items: cart.map(item => ({
                    foodId: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                totalAmount,
                customerDetails: formData
            };

            await API.post('/order', orderData);
            localStorage.setItem('userMobile', formData.mobile); // Save for history
            toast.success('Royal Order placed successfully!');
            clearCart();
            navigate('/order-success');
        } catch (error) {
            toast.error('Failed to place order. Try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pb-20">
            <Navbar />
            <div className="max-w-xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-black mb-10">DELIVERY <span className="text-primary">DETAILS</span></h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-white/40 text-sm ml-1 flex items-center gap-1">
                            <User className="w-3 h-3" /> Full Name
                        </label>
                        <input
                            required
                            type="text"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 focus:border-primary outline-none transition-all placeholder:text-white/10"
                            placeholder="e.g. Rajan Verma"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-white/40 text-sm ml-1 flex items-center gap-1">
                            <Phone className="w-3 h-3" /> Mobile Number
                        </label>
                        <input
                            required
                            type="tel"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 focus:border-primary outline-none transition-all placeholder:text-white/10"
                            placeholder="e.g. 9876543210"
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-white/40 text-sm ml-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> Complete Address
                        </label>
                        <textarea
                            required
                            rows="4"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 focus:border-primary outline-none transition-all placeholder:text-white/10 resize-none"
                            placeholder="House No, Street, Landmark, City..."
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="pt-6">
                        <button
                            disabled={loading}
                            className="w-full premium-gradient text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                        >
                            {loading ? "Processing..." : (
                                <>
                                    Confirm Royal Order
                                    <Send className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
