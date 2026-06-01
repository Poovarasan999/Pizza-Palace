require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Pizza = require('./models/Pizza');

const img = (n) => `/images/pizzas/pizza-${String(n).padStart(2, '0')}.jpg`;

const pizzas = [
  // ── Veg (10) ──
  {
    name: 'Margherita Classic',
    description: 'Fresh mozzarella, basil, and San Marzano tomato sauce on a hand-tossed crust.',
    price: 299,
    category: 'Veg',
    imageUrl: img(1),
    isAvailable: true,
  },
  {
    name: 'Veggie Delight',
    description: 'Bell peppers, mushrooms, olives, corn, and extra cheese.',
    price: 379,
    category: 'Veg',
    imageUrl: img(2),
    isAvailable: true,
  },
  {
    name: 'Farmhouse Fresh',
    description: 'Loaded with farm-fresh tomatoes, capsicum, onions, and mozzarella.',
    price: 349,
    category: 'Veg',
    imageUrl: img(3),
    isAvailable: true,
  },
  {
    name: 'Cheese Burst Supreme',
    description: 'Stuffed crust filled with molten cheese and topped with double mozzarella.',
    price: 399,
    category: 'Veg',
    imageUrl: img(4),
    isAvailable: true,
  },
  {
    name: 'Paneer Makhani',
    description: 'Cottage cheese cubes in rich makhani gravy with kasuri methi.',
    price: 409,
    category: 'Veg',
    imageUrl: img(5),
    isAvailable: true,
  },
  {
    name: 'Mushroom Magic',
    description: 'Button and shiitake mushrooms with garlic butter and herbs.',
    price: 369,
    category: 'Veg',
    imageUrl: img(6),
    isAvailable: true,
  },
  {
    name: 'Corn & Capsicum',
    description: 'Sweet corn kernels, green capsicum, and jalapeño on a crispy base.',
    price: 329,
    category: 'Veg',
    imageUrl: img(7),
    isAvailable: true,
  },
  {
    name: 'Four Cheese Veg',
    description: 'Mozzarella, cheddar, parmesan, and processed cheese blend.',
    price: 429,
    category: 'Veg',
    imageUrl: img(8),
    isAvailable: true,
  },
  {
    name: 'Garden Fresh',
    description: 'Broccoli, zucchini, cherry tomatoes, and basil pesto drizzle.',
    price: 399,
    category: 'Veg',
    imageUrl: img(9),
    isAvailable: true,
  },
  {
    name: 'Veg Loaded',
    description: 'Capsicum, onion, corn, mushroom, and olive on a loaded cheese base.',
    price: 449,
    category: 'Veg',
    imageUrl: img(10),
    isAvailable: true,
  },

  // ── Non-Veg (10) ──
  {
    name: 'Pepperoni Feast',
    description: 'Double pepperoni with mozzarella and our signature tomato sauce.',
    price: 449,
    category: 'Non-Veg',
    imageUrl: img(11),
    isAvailable: true,
  },
  {
    name: 'BBQ Chicken Supreme',
    description: 'Grilled chicken, red onions, and smoky BBQ sauce on a crispy base.',
    price: 499,
    category: 'Non-Veg',
    imageUrl: img(12),
    isAvailable: true,
  },
  {
    name: 'Chicken Tikka Pizza',
    description: 'Tandoori chicken tikka with onions, capsicum, and mint chutney.',
    price: 479,
    category: 'Non-Veg',
    imageUrl: img(13),
    isAvailable: true,
  },
  {
    name: 'Meat Lovers',
    description: 'Pepperoni, chicken sausage, ham, and bacon on a loaded cheese base.',
    price: 549,
    category: 'Non-Veg',
    imageUrl: img(14),
    isAvailable: true,
  },
  {
    name: 'Butter Chicken Pizza',
    description: 'Butter chicken gravy base with tender chicken and kasuri methi.',
    price: 529,
    category: 'Non-Veg',
    imageUrl: img(15),
    isAvailable: true,
  },
  {
    name: 'Peri Peri Chicken',
    description: 'Flame-grilled peri peri chicken with roasted peppers and cheese.',
    price: 489,
    category: 'Non-Veg',
    imageUrl: img(16),
    isAvailable: true,
  },
  {
    name: 'Chicken Supreme',
    description: 'Grilled chicken, mushrooms, capsicum, and black olives.',
    price: 469,
    category: 'Non-Veg',
    imageUrl: img(17),
    isAvailable: true,
  },
  {
    name: 'Keema Pizza',
    description: 'Spiced minced lamb keema with onions, green chillies, and coriander.',
    price: 519,
    category: 'Non-Veg',
    imageUrl: img(18),
    isAvailable: true,
  },
  {
    name: 'Smoked Chicken BBQ',
    description: 'Slow-smoked chicken with caramelised onions and BBQ glaze.',
    price: 479,
    category: 'Non-Veg',
    imageUrl: img(19),
    isAvailable: true,
  },
  {
    name: 'Non-Veg Loaded',
    description: 'Chicken, pepperoni, sausage, and ham — the ultimate meat feast.',
    price: 579,
    category: 'Non-Veg',
    imageUrl: img(20),
    isAvailable: true,
  },

  // ── Specialty (10) ──
  {
    name: 'Truffle Mushroom',
    description: 'Wild mushrooms, truffle oil drizzle, and aged parmesan.',
    price: 549,
    category: 'Specialty',
    imageUrl: img(21),
    isAvailable: true,
  },
  {
    name: 'Spicy Paneer Tikka',
    description: 'Tandoori paneer, jalapeños, onions, and mint chutney swirl.',
    price: 429,
    category: 'Specialty',
    imageUrl: img(22),
    isAvailable: true,
  },
  {
    name: 'Neapolitan Napoli',
    description: 'Authentic Neapolitan-style with buffalo mozzarella and fresh basil.',
    price: 499,
    category: 'Specialty',
    imageUrl: img(23),
    isAvailable: true,
  },
  {
    name: 'Chicago Deep Dish',
    description: 'Thick buttery crust, layered cheese, and chunky tomato sauce on top.',
    price: 599,
    category: 'Specialty',
    imageUrl: img(24),
    isAvailable: true,
  },
  {
    name: 'Detroit Style Pepperoni',
    description: 'Square pan pizza with crispy cheese edges and cup pepperoni.',
    price: 569,
    category: 'Specialty',
    imageUrl: img(25),
    isAvailable: true,
  },
  {
    name: 'White Sauce Alfredo',
    description: 'Creamy Alfredo base with grilled chicken and spinach.',
    price: 519,
    category: 'Specialty',
    imageUrl: img(26),
    isAvailable: true,
  },
  {
    name: 'Indian Masala Special',
    description: 'Desi masala base with paneer, corn, capsicum, and chaat masala.',
    price: 449,
    category: 'Specialty',
    imageUrl: img(27),
    isAvailable: true,
  },
  {
    name: 'Quattro Formaggi',
    description: 'Four-cheese masterpiece — gorgonzola, parmesan, mozzarella, and ricotta.',
    price: 529,
    category: 'Specialty',
    imageUrl: img(28),
    isAvailable: true,
  },
  {
    name: 'Buffalo Chicken Blaze',
    description: 'Buffalo sauce chicken with blue cheese crumbles and celery.',
    price: 489,
    category: 'Specialty',
    imageUrl: img(29),
    isAvailable: true,
  },
  {
    name: 'Palace Signature',
    description: 'Chef\'s secret blend — truffle, aged cheese, and premium toppings.',
    price: 699,
    category: 'Specialty',
    imageUrl: img(30),
    isAvailable: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Pizza.deleteMany({});
    await Pizza.insertMany(pizzas);
    console.log(`${pizzas.length} pizzas seeded`);

    const adminEmail = 'admin@pizzapalace.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: 'admin123',
        role: 'admin',
      });
      console.log('Admin user created: admin@pizzapalace.com / admin123');
    } else {
      console.log('Admin user already exists');
    }

    console.log('Seed completed');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
}

seed();
