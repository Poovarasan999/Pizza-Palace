import { useEffect, useState } from 'react';
import api from '../api/client';
import PizzaCard from '../components/PizzaCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import PageHeader from '../components/PageHeader';

const CATEGORIES = ['All', 'Veg', 'Non-Veg', 'Specialty'];

const categoryIcons = {
  All: '🍕',
  Veg: '🥬',
  'Non-Veg': '🍗',
  Specialty: '⭐',
};

export default function Menu() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (category !== 'All') params.category = category;
    if (search.trim()) params.search = search.trim();

    const timer = setTimeout(() => {
      api
        .get('/pizzas', { params })
        .then((res) => setPizzas(res.data.data))
        .catch(() => setPizzas([]))
        .finally(() => setLoading(false));
    }, search ? 300 : 0);

    return () => clearTimeout(timer);
  }, [category, search]);

  return (
    <div>
      <PageHeader
        title="Our Menu"
        subtitle="30 handcrafted pizzas — Veg, Non-Veg & Specialty"
        badge="30+ Varieties"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Menu' }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                    category === cat
                      ? 'bg-primary text-white shadow-md shadow-primary/30'
                      : 'bg-gray-50 text-neutral-dark hover:bg-primary/10'
                  }`}
                >
                  <span>{categoryIcons[cat]}</span>
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="search"
                placeholder="Search pizzas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 lg:w-72"
                aria-label="Search pizzas"
              />
            </div>
          </div>
          {!loading && (
            <p className="mt-4 text-sm text-gray-500">
              Showing <strong className="text-primary">{pizzas.length}</strong> pizzas
              {category !== 'All' && (
                <>
                  {' '}
                  in <strong>{category}</strong>
                </>
              )}
            </p>
          )}
        </div>

        {loading ? (
          <LoadingSkeleton />
        ) : pizzas.length === 0 ? (
          <EmptyState
            icon="🔍"
            title="No pizzas found"
            description="Try a different category or search term."
            actionLabel="View all pizzas"
            actionTo="/menu"
          />
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pizzas.map((pizza, i) => (
              <PizzaCard key={pizza._id} pizza={pizza} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
