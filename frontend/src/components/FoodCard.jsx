import { Plus, Flame, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();

  return (
    <div className="group glass rounded-2xl md:rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-300 flex flex-col h-full bg-white/[0.03] border border-white/5">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-2 left-2 flex gap-1.5">
          {food.category === 'Veg' ? (
            <span className="bg-green-500/90 backdrop-blur-md px-1.5 py-1 rounded-lg">
              <Leaf className="w-2.5 h-2.5 text-white" />
            </span>
          ) : (
            <span className="bg-red-500/90 backdrop-blur-md px-1.5 py-1 rounded-lg">
              <Flame className="w-2.5 h-2.5 text-white" />
            </span>
          )}
        </div>
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-1 gap-2">
        <div>
          <h3 className="text-[13px] sm:text-[15px] font-bold text-white/90 group-hover:text-primary transition-colors line-clamp-1 leading-tight">{food.name}</h3>
          <span className="text-[15px] sm:text-lg font-black text-primary tracking-tight">₹{food.price}</span>
        </div>

        <p className="text-white/30 text-[10px] sm:text-xs line-clamp-2 leading-relaxed">
          Royal {food.category} experience with premium herbs.
        </p>

        <button
          onClick={() => addToCart(food)}
          className="mt-auto w-full premium-gradient text-black text-[11px] sm:text-sm font-black py-2.5 rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all hover:shadow-lg hover:shadow-primary/20"
        >
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
          Add
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
