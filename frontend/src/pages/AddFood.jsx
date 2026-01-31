import { useState } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import { Camera, Plus, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

const AddFood = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'Veg',
        image: null
    });
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('image', formData.image);

        try {
            await API.post('/food', data);
            toast.success('New royal dish added!');
            navigate('/admin/dashboard');
        } catch (error) {
            toast.error('Failed to add food');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pb-20">
            <Navbar />
            <div className="max-w-2xl mx-auto px-6 py-12">
                <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-white/40 hover:text-primary mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>

                <h1 className="text-3xl font-black mb-10">ADD NEW <span className="text-primary">DISH</span></h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="flex justify-center">
                        <div className="relative w-full h-64 md:h-80 rounded-3xl overflow-hidden glass group cursor-pointer border-2 border-dashed border-white/10 hover:border-primary/50 transition-all">
                            {preview ? (
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                                    <Camera className="w-12 h-12 text-white/20" />
                                    <p className="text-white/20 font-bold">Capture Royal Taste</p>
                                </div>
                            )}
                            <input
                                required
                                type="file"
                                onChange={handleImageChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-white/40 text-sm ml-1">Dish Name</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 focus:border-primary outline-none transition-all"
                                placeholder="Royal Paneer Tikka"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-white/40 text-sm ml-1">Price (₹)</label>
                            <input
                                required
                                type="number"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 focus:border-primary outline-none transition-all"
                                placeholder="299"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-white/40 text-sm ml-1">Category</label>
                        <div className="flex flex-wrap gap-4">
                            {['Veg', 'Non-Veg', 'Fast Food'].map(cat => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, category: cat })}
                                    className={`px-6 py-3 rounded-xl border font-bold transition-all ${formData.category === cat ? 'bg-primary text-black border-primary' : 'bg-white/5 border-white/10'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className="w-full premium-gradient text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                    >
                        <Plus className="w-5 h-5" />
                        {loading ? "Adding to Menu..." : "Publish to Menu"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddFood;
