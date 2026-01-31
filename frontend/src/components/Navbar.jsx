import { UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 glass px-6 py-4 flex justify-between items-center md:px-12">
            <Link to="/" className="flex items-center gap-2">
                <UtensilsCrossed className="text-primary w-8 h-8" />
                <span className="text-xl md:text-2xl font-bold tracking-tight">
                    ROYAL FOOD <span className="text-primary">KING</span>
                </span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
                <Link
                    to="/admin/login"
                    className="flex items-center gap-2 px-4 py-2 border border-primary/30 hover:border-primary rounded-lg transition-all"
                >
                    <span>Admin Panel</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
