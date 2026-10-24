require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.DB_NAME || 'witchingWonder';

const items = [
  { name: 'Moonlit Candle', category: 'Rituals', price: 16.5 },
  { name: 'Black Velvet Cloak', category: 'Apparel', price: 64.0 },
  { name: 'Witchwood Herb Bundle', category: 'Curios', price: 22.75 },
  { name: 'Moonstone Charm', category: 'Jewelry', price: 28.0 },
  { name: 'Night Bloom Journal', category: 'Spellbook', price: 18.99 },
  { name: 'Crescent Wax Melt', category: 'Rituals', price: 14.25 },
  { name: 'Midnight Lace Gloves', category: 'Apparel', price: 31.5 },
  { name: 'Hollow Oak Incense', category: 'Curios', price: 19.75 },
  { name: 'Obsidian Ring', category: 'Jewelry', price: 36.0 },
  { name: 'Spellbound Tarot Deck', category: 'Spellbook', price: 29.99 },
  { name: 'Lantern of Lost Paths', category: 'Rituals', price: 42.5 },
  { name: 'Raven Feather Shawl', category: 'Apparel', price: 54.0 },
  { name: 'Rosemary Smoke Powder', category: 'Curios', price: 17.5 },
  { name: 'Silver Pentacle Pendant', category: 'Jewelry', price: 33.25 },
  { name: 'Hush of the Hollow Grimoire', category: 'Spellbook', price: 24.75 },
  { name: 'Smoked Amber Taper', category: 'Rituals', price: 13.0 },
  { name: 'Dark Moss Corset', category: 'Apparel', price: 58.5 },
  { name: 'Foxglove Potion Kit', category: 'Curios', price: 27.0 },
  { name: 'Moon Phase Necklace', category: 'Jewelry', price: 39.99 },
  { name: 'The Witching Almanac', category: 'Spellbook', price: 21.5 },
];

const seedItems = async () => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('items');

    await collection.deleteMany({});
    await collection.insertMany(items);
    console.log(`Seeded ${items.length} items into ${dbName}.items`);
  } catch (error) {
    console.error('Seeding failed:', error.message);
  } finally {
    await client.close();
  }
};

seedItems();
