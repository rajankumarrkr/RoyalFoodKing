import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import Navbar from '../components/Navbar';
import { Lock, User, LogIn } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminLogin = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await API.post('/admin/login', { userId, password });
            localStorage.setItem('token', data.token);
            toast.success('Welcome back, King!');
            navigate('/admin/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="flex flex-col items-center justify-center py-24 px-6">
                <div className="glass p-10 rounded-3xl w-full max-w-md border-primary/20">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
                            <Lock className="w-10 h-10 text-primary" />
                        </div>
                        <h1 className="text-3xl font-black">ADMIN <span className="text-primary">PORTAL</span></h1>
                        <p className="text-white/40 mt-2">Enter your royal credentials to proceed</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-1">
                            <label className="text-white/40 text-sm ml-1 flex items-center gap-1">
                                <User className="w-3 h-3" /> User ID
                            </label>
                            <input
                                required
                                type="text"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 focus:border-primary outline-none transition-all"
                                placeholder="Manager ID"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-white/40 text-sm ml-1 flex items-center gap-1">
                                <Lock className="w-3 h-3" /> Password
                            </label>
                            <input
                                required
                                type="password"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 focus:border-primary outline-none transition-all"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            disabled={loading}
                            className="w-full premium-gradient text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                        >
                            <LogIn className="w-5 h-5" />
                            {loading ? "Authenticating..." : "Login to Dashboard"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
