const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'items.json');

const loadItems = () => {
  const rawData = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(rawData);
};

let items = loadItems();

const getAllItems = (req, res) => {
  const { category, minPrice, maxPrice, sort, order, name } = req.query;

  let filteredItems = [...items];

  if (category) {
    filteredItems = filteredItems.filter(
      (item) => item.category.toLowerCase() === String(category).toLowerCase()
    );
  }

  if (name) {
    const term = String(name).toLowerCase();
    filteredItems = filteredItems.filter((item) =>
      item.name.toLowerCase().includes(term)
    );
  }

  if (minPrice !== undefined) {
    const min = Number(minPrice);
    if (!Number.isNaN(min)) {
      filteredItems = filteredItems.filter((item) => Number(item.price) >= min);
    }
  }

  if (maxPrice !== undefined) {
    const max = Number(maxPrice);
    if (!Number.isNaN(max)) {
      filteredItems = filteredItems.filter((item) => Number(item.price) <= max);
    }
  }

  const validSortFields = ['id', 'name', 'category', 'price'];
  const requestedSort = sort ? String(sort).toLowerCase() : 'id';
  const requestedOrder = order ? String(order).toLowerCase() : 'asc';

  if (validSortFields.includes(requestedSort)) {
    filteredItems.sort((a, b) => {
      const aValue = requestedSort === 'price' ? Number(a.price) : a[requestedSort];
      const bValue = requestedSort === 'price' ? Number(b.price) : b[requestedSort];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue);
      }

      return aValue - bValue;
    });

    if (requestedOrder === 'desc') {
      filteredItems.reverse();
    }
  }

  res.status(200).json({
    success: true,
    count: filteredItems.length,
    data: filteredItems,
  });
};

const getOneItem = (req, res) => {
  const itemId = Number(req.params.id);
  const item = items.find((entry) => entry.id === itemId);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Item not found',
    });
  }

  return res.status(200).json({
    success: true,
    data: item,
  });
};

const createItem = (req, res, next) => {
  const { name, category, price } = req.body;

  if (!name || !category || price === undefined) {
    return next({
      statusCode: 400,
      message: 'Name, category, and price are required',
    });
  }

  const newId = items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1;
  const newItem = {
    id: newId,
    name,
    category,
    price,
  };

  items.push(newItem);

  return res.status(201).json({
    success: true,
    data: newItem,
  });
};

const updateItem = (req, res) => {
  const itemId = Number(req.params.id);
  const itemIndex = items.findIndex((item) => item.id === itemId);

  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Item not found',
    });
  }

  const updatedItem = {
    ...items[itemIndex],
    ...req.body,
  };

  items[itemIndex] = updatedItem;

  return res.status(200).json({
    success: true,
    data: updatedItem,
  });
};

const deleteItem = (req, res) => {
  const itemId = Number(req.params.id);
  const initialLength = items.length;
  items = items.filter((item) => item.id !== itemId);

  if (items.length === initialLength) {
    return res.status(404).json({
      success: false,
      message: 'Item not found',
    });
  }

  return res.status(204).send();
};

module.exports = {
  getAllItems,
  getOneItem,
  createItem,
  updateItem,
  deleteItem,
};
