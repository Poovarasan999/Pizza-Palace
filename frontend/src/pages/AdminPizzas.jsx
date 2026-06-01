import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/client';
import PizzaImage from '../components/PizzaImage';
import PageHeader from '../components/PageHeader';

const CATEGORIES = ['Veg', 'Non-Veg', 'Specialty'];
const emptyForm = {
  name: '',
  description: '',
  price: '',
  category: 'Veg',
  imageUrl: '',
  isAvailable: true,
};

export default function AdminPizzas() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchPizzas = () => {
    api
      .get('/pizzas?all=true')
      .then((res) => setPizzas(res.data.data))
      .catch(() => setPizzas([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (pizza) => {
    setForm({
      name: pizza.name,
      description: pizza.description,
      price: pizza.price,
      category: pizza.category,
      imageUrl: pizza.imageUrl,
      isAvailable: pizza.isAvailable,
    });
    setEditingId(pizza._id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price) };
    try {
      if (editingId) {
        await api.put(`/pizzas/${editingId}`, payload);
        toast.success('Pizza updated');
      } else {
        await api.post('/pizzas', payload);
        toast.success('Pizza created');
      }
      setShowForm(false);
      fetchPizzas();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Operation failed');
    }
  };

  const toggleAvailability = async (pizza) => {
    try {
      await api.put(`/pizzas/${pizza._id}`, { isAvailable: !pizza.isAvailable });
      toast.success('Availability updated');
      fetchPizzas();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  const deletePizza = async (id) => {
    if (!confirm('Delete this pizza permanently?')) return;
    try {
      await api.delete(`/pizzas/${id}`);
      toast.success('Pizza deleted');
      fetchPizzas();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <>
      <PageHeader title="Manage Pizzas" subtitle="Add, edit, or remove pizzas from the menu" badge="Admin" />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Pizzas</h1>
        <button
          onClick={openCreate}
          className="rounded-xl bg-primary px-6 py-3 font-medium text-white hover:bg-primary/90"
        >
          + Add Pizza
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-bold">{editingId ? 'Edit Pizza' : 'New Pizza'}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              placeholder="Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-lg border px-4 py-2"
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="rounded-lg border px-4 py-2"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Price (INR)"
              required
              min="0"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="rounded-lg border px-4 py-2"
            />
            <input
              placeholder="Image URL"
              required
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="rounded-lg border px-4 py-2"
            />
            <textarea
              placeholder="Description"
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="rounded-lg border px-4 py-2 sm:col-span-2"
              rows={3}
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.isAvailable}
                onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
              />
              Available on menu
            </label>
          </div>
          <div className="mt-4 flex gap-3">
            <button type="submit" className="rounded-lg bg-primary px-6 py-2 text-white">
              Save
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-lg border px-6 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl bg-white shadow-md">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-neutral-light">
              <tr>
                <th className="p-4">Pizza</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Available</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pizzas.map((pizza) => (
                <tr key={pizza._id} className="border-b last:border-0">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <PizzaImage
                        src={pizza.imageUrl}
                        alt={pizza.name}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                      {pizza.name}
                    </div>
                  </td>
                  <td className="p-4">{pizza.category}</td>
                  <td className="p-4">₹{pizza.price}</td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleAvailability(pizza)}
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        pizza.isAvailable
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {pizza.isAvailable ? 'Yes' : 'No'}
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => openEdit(pizza)}
                      className="mr-3 text-primary hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deletePizza(pizza._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>
    </>
  );
}
