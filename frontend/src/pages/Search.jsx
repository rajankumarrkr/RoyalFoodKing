import { useState, useEffect } from 'react';
import API from '../api';
import Navbar from '../components/Navbar';
import FoodCard from '../components/FoodCard';
import { Search as SearchIcon, TrendingUp, Clock, X } from 'lucide-react';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recentSearches, setRecentSearches] = useState(['Pizza', 'Burger', 'Paneer']);
    const [popularCategories] = useState(['Veg', 'Non-Veg', 'Fast Food']);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm) {
                handleSearch();
            } else {
                setResults([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const { data } = await API.get('/food');
            const filtered = data.filter(food =>
                food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                food.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setResults(filtered);
        } catch (error) {
            console.error("Search error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f0f] pb-24">
            <Navbar />

            <div className="px-6 pt-8">
                <h1 className="text-3xl font-black mb-6">EXPLORE <span className="text-primary italic">ROYAL</span></h1>

                {/* Search Input */}
                <div className="relative mb-8">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search for dishes, categories..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 focus:border-primary outline-none transition-all text-white text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-all"
                        >
                            <X className="w-4 h-4 text-white/40" />
                        </button>
                    )}
                </div>

                {!searchTerm && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Recent Searches */}
                        <section>
                            <div className="flex items-center gap-2 mb-4 text-white/60">
                                <Clock className="w-4 h-4" />
                                <h3 className="text-sm font-bold uppercase tracking-wider">Recent Searches</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {recentSearches.map(term => (
                                    <button
                                        key={term}
                                        onClick={() => setSearchTerm(term)}
                                        className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs hover:border-primary/50 transition-all"
                                    >
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Popular Categories */}
                        <section>
                            <div className="flex items-center gap-2 mb-4 text-white/60">
                                <TrendingUp className="w-4 h-4 text-primary" />
                                <h3 className="text-sm font-bold uppercase tracking-wider">Popular Categories</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {popularCategories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSearchTerm(cat)}
                                        className="glass p-4 rounded-2xl text-left hover:border-primary/50 transition-all group"
                                    >
                                        <span className="text-sm font-bold block group-hover:text-primary transition-colors">{cat}</span>
                                        <span className="text-[10px] text-white/40 uppercase">Explore Collection</span>
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {/* Results Grid */}
                {searchTerm && (
                    <div className="animate-in fade-in duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold">
                                {loading ? 'Searching...' : `Results for "${searchTerm}"`}
                            </h2>
                            {!loading && <span className="text-primary text-sm font-black">{results.length} Found</span>}
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="aspect-square glass animate-pulse rounded-2xl bg-white/5"></div>
                                ))}
                            </div>
                        ) : results.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {results.map(food => (
                                    <FoodCard key={food._id} food={food} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                                <p className="text-white/40 italic">No royal dishes found matching your search.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
