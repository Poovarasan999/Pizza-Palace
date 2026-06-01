import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PizzaImage from './PizzaImage';

const categoryColors = {
  Veg: 'bg-green-500',
  'Non-Veg': 'bg-red-500',
  Specialty: 'bg-purple-500',
};

export default function PizzaCard({ pizza, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group card-hover overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-gray-100"
    >
      <Link to={`/pizza/${pizza._id}`} className="block">
        <div className="relative overflow-hidden">
          <PizzaImage
            src={pizza.imageUrl}
            alt={pizza.name}
            className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white shadow-md ${
              categoryColors[pizza.category] || 'bg-primary'
            }`}
          >
            {pizza.category}
          </span>
          <span className="absolute bottom-3 right-3 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-primary shadow-lg">
            ₹{pizza.price}
          </span>
          <span className="absolute bottom-3 left-3 translate-y-4 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            View Details →
          </span>
        </div>
        <div className="p-5">
          <h3 className="mb-2 text-lg font-bold text-neutral-dark group-hover:text-primary transition-colors">
            {pizza.name}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-gray-500">{pizza.description}</p>
          <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
            <span className="text-xs text-gray-400">🕐 25–35 min delivery</span>
            <span className="text-sm font-semibold text-secondary">Order now</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
