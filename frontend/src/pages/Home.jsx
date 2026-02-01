import { useState, useEffect } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import FoodCard from '../components/FoodCard';
import { Search, SlidersHorizontal } from 'lucide-react';

const Home = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');

    useEffect(() => {
        fetchFoods();
    }, []);

    const fetchFoods = async () => {
        try {
            console.log("Fetching foods from:", API.defaults.baseURL + '/food');
            const { data } = await API.get('/food');
            console.log("Fetched data:", data);
            setFoods(data);
        } catch (error) {
            console.error("CRITICAL: Error fetching foods", error);
            if (error.response) {
                console.error("Backend responded with:", error.response.status, error.response.data);
            }
        } finally {
            setLoading(false);
        }
    };

    const filteredFoods = foods.filter(food => {
        const matchesSearch = (food.name || "").toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category === 'All' || food.category === category;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="pb-10 min-h-screen bg-[#0f0f0f]">
            <Navbar />

            {/* Mobile Hero & Search */}
            <div className="px-6 pt-8 pb-4">
                <div className="mb-6">
                    <h1 className="text-3xl font-black mb-1">
                        Crave It? <span className="text-primary tracking-widest uppercase italic">Royal</span> It!
                    </h1>
                    <p className="text-white/40 text-sm">Experience royal taste at your doorstep.</p>
                </div>

                {/* Search Bar */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search delicious food..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 focus:border-primary outline-none transition-all text-white text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Categories - Horizontal Scroll */}
                <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                    {['All', 'Veg', 'Non-Veg', 'Fast Food'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-5 py-2.5 rounded-2xl border transition-all whitespace-nowrap text-sm ${category === cat
                                ? 'bg-primary text-black border-primary font-bold shadow-lg shadow-primary/20'
                                : 'bg-white/5 border-white/10 hover:border-white/30 text-white/60'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Food Grid */}
            <div className="px-4 sm:px-6">
                <div className="flex items-center justify-between gap-2 mb-6 ml-2">
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal className="text-primary w-4 h-4" />
                        <h2 className="text-lg font-bold">Recommended for you</h2>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="aspect-[4/3] glass animate-pulse rounded-2xl bg-white/5"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        {filteredFoods.map(food => (
                            <FoodCard key={food._id} food={food} />
                        ))}
                    </div>
                )}

                {!loading && filteredFoods.length === 0 && (
                    <div className="text-center py-16 bg-white/5 rounded-3xl border border-dashed border-white/10 mt-4 px-4">
                        <p className="text-white/40 text-sm italic">No royal matches found for "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
