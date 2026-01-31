import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, totalAmount } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-[#0f0f0f]">
                <Navbar />
                <div className="flex flex-col items-center justify-center p-8 mt-20 text-center">
                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                        <Trash2 className="w-10 h-10 text-white/20" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                    <p className="text-white/40 mb-8 max-w-xs">Add something delicious from our royal menu to get started!</p>
                    <Link
                        to="/"
                        className="premium-gradient text-black font-bold px-8 py-3.5 rounded-2xl flex items-center gap-2 active:scale-95 transition-transform"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back to Menu
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f0f0f] pb-32">
            <Navbar />

            <div className="px-6 py-8">
                <h1 className="text-3xl font-black mb-8">Your Cart</h1>

                <div className="space-y-4 mb-10">
                    {cart.map((item) => (
                        <div key={item._id} className="glass p-4 rounded-3xl flex items-center gap-4 group">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-sm truncate group-hover:text-primary transition-colors">{item.name}</h3>
                                <p className="text-primary font-black text-base">₹{item.price}</p>

                                <div className="flex items-center gap-3 mt-2">
                                    <div className="flex items-center bg-white/5 rounded-xl border border-white/10">
                                        <button
                                            onClick={() => updateQuantity(item._id, -1)}
                                            className="p-1 px-2 hover:text-primary transition-colors"
                                        >
                                            <Minus className="w-3.5 h-3.5" />
                                        </button>
                                        <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, 1)}
                                            className="p-1 px-2 hover:text-primary transition-colors"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => removeFromCart(item._id)}
                                className="p-2.5 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="glass p-6 rounded-3xl border border-primary/20 shadow-2xl shadow-primary/5">
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-white/60">
                            <span className="text-sm">Subtotal</span>
                            <span className="font-medium text-white">₹{totalAmount}</span>
                        </div>
                        <div className="flex justify-between text-white/60">
                            <span className="text-sm">Delivery Fee</span>
                            <span className="text-green-500 font-bold uppercase text-[10px] tracking-wider bg-green-500/10 px-2 py-1 rounded-lg">Free</span>
                        </div>
                        <div className="border-t border-white/5 pt-3 flex justify-between items-center">
                            <span className="text-lg font-bold">Total Pay</span>
                            <span className="text-2xl font-black text-primary">₹{totalAmount}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/checkout')}
                        className="w-full premium-gradient text-black font-black py-4 rounded-2xl shadow-xl active:scale-95 transition-all text-lg"
                    >
                        Checkout Securely
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
