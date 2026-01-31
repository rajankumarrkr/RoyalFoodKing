import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const OrderSuccess = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
                <div className="bg-green-500/20 p-10 rounded-full mb-8 animate-bounce">
                    <CheckCircle2 className="w-20 h-20 text-green-500" />
                </div>
                <h1 className="text-4xl font-black mb-4">ROYAL ORDER <span className="text-primary">PLACED!</span></h1>
                <p className="text-white/60 max-w-md mx-auto mb-10 text-lg">
                    Your delicious meal is being prepared with royal care. Our delivery partner will reach you shortly.
                </p>
                <Link
                    to="/"
                    className="premium-gradient text-black font-bold px-10 py-4 rounded-xl flex items-center gap-2 hover:scale-105 transition-transform"
                >
                    Back to Feast
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccess;
