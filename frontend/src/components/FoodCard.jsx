import { Plus, Flame, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();

  return (
    <div className="group glass rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {food.category === 'Veg' ? (
            <span className="bg-green-500/80 backdrop-blur-md p-1.5 rounded-xl">
              <Leaf className="w-3.5 h-3.5 text-white" />
            </span>
          ) : (
            <span className="bg-red-500/80 backdrop-blur-md p-1.5 rounded-xl">
              <Flame className="w-3.5 h-3.5 text-white" />
            </span>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="mb-1">
          <h3 className="text-base font-bold group-hover:text-primary transition-colors line-clamp-1">{food.name}</h3>
          <span className="text-lg font-black text-primary block">₹{food.price}</span>
        </div>

        <p className="text-white/40 text-[11px] mb-4 line-clamp-2 md:text-sm">
          Premium {food.category} dish served with royal flavors.
        </p>

        <button
          onClick={() => addToCart(food)}
          className="mt-auto w-full premium-gradient text-black text-sm font-bold py-2.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>
    </div>
  );
};

export default FoodCard;
