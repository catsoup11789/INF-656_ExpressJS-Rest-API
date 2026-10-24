const { ObjectId } = require('mongodb');
const { getDb } = require('../config/db');

const getCollection = () => getDb().collection('items');

const getAllItems = async (req, res, next) => {
  try {
    const { category, minPrice, maxPrice, sort, order, name } = req.query;
    const collection = getCollection();
    let query = {};

    if (category) {
      query.category = { $regex: new RegExp(String(category), 'i') };
    }

    if (name) {
      query.name = { $regex: new RegExp(String(name), 'i') };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};

      if (minPrice !== undefined) {
        const min = Number(minPrice);
        if (!Number.isNaN(min)) {
          query.price.$gte = min;
        }
      }

      if (maxPrice !== undefined) {
        const max = Number(maxPrice);
        if (!Number.isNaN(max)) {
          query.price.$lte = max;
        }
      }
    }

    let cursor = collection.find(query);

    const validSortFields = ['name', 'category', 'price'];
    const requestedSort = sort ? String(sort).toLowerCase() : 'name';
    const requestedOrder = order ? String(order).toLowerCase() : 'asc';

    if (validSortFields.includes(requestedSort)) {
      cursor = cursor.sort({ [requestedSort]: requestedOrder === 'desc' ? -1 : 1 });
    }

    const items = await cursor.toArray();

    return res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    return next(error);
  }
};

const getOneItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return next({
        statusCode: 400,
        message: 'Invalid MongoDB ID format',
      });
    }

    const item = await getCollection().findOne({ _id: new ObjectId(id) });

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
  } catch (error) {
    return next(error);
  }
};

const createItem = async (req, res, next) => {
  try {
    const { name, category, price } = req.body;

    if (!name || !category || price === undefined || Number.isNaN(Number(price))) {
      return next({
        statusCode: 400,
        message: 'Name, category, and a valid numeric price are required',
      });
    }

    const newItem = {
      name: String(name).trim(),
      category: String(category).trim(),
      price: Number(price),
    };

    const result = await getCollection().insertOne(newItem);

    return res.status(201).json({
      success: true,
      data: { _id: result.insertedId, ...newItem },
    });
  } catch (error) {
    return next(error);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return next({
        statusCode: 400,
        message: 'Invalid MongoDB ID format',
      });
    }

    if (req.body._id) {
      return next({
        statusCode: 400,
        message: 'MongoDB _id cannot be changed',
      });
    }

    const updateFields = { ...req.body };

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No update fields provided',
      });
    }

    if (updateFields.price !== undefined && Number.isNaN(Number(updateFields.price))) {
      return next({
        statusCode: 400,
        message: 'Price must be numeric',
      });
    }

    if (updateFields.price !== undefined) {
      updateFields.price = Number(updateFields.price);
    }

    const updatedItem = await getCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      { returnDocument: 'after' }
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: updatedItem,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return next({
        statusCode: 400,
        message: 'Invalid MongoDB ID format',
      });
    }

    const result = await getCollection().deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllItems,
  getOneItem,
  createItem,
  updateItem,
  deleteItem,
};
