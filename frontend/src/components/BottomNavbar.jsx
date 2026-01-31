import { Home, Search, ShoppingBag, ClipboardList } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const BottomNavbar = () => {
    const { totalItems } = useCart();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50">
            <div className="glass-morphism border-t border-white/10 flex justify-around items-center py-4 px-2 safe-bottom">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-primary scale-110' : 'text-white/40'}`
                    }
                >
                    <Home className="w-6 h-6" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
                </NavLink>

                <NavLink
                    to="/search"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-primary scale-110' : 'text-white/40'}`
                    }
                >
                    <Search className="w-6 h-6" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Explore</span>
                </NavLink>

                <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 relative transition-all duration-300 ${isActive ? 'text-primary scale-110' : 'text-white/40'}`
                    }
                >
                    <ShoppingBag className="w-6 h-6" />
                    {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full scale-110">
                            {totalItems}
                        </span>
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Cart</span>
                </NavLink>

                <NavLink
                    to="/orders"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-primary scale-110' : 'text-white/40'}`
                    }
                >
                    <ClipboardList className="w-6 h-6" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Orders</span>
                </NavLink>
            </div>
        </div>
    );
};

export default BottomNavbar;
