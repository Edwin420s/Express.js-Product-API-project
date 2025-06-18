// server.js

const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// -----------------
// Custom Error Classes
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

// -----------------
// In-memory "database"
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// -----------------
// Middleware

// Logger middleware: logs method, URL, timestamp
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// JSON parser middleware
app.use(bodyParser.json());

// Authentication middleware: checks for x-api-key header
app.use('/api', (req, res, next) => {
  const apiKey = req.headers['x-api-key']; // look for 'x-api-key' header
  if (!apiKey || apiKey !== '12345') {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
  }
  next();
});

// Validation middleware for create/update product
function validateProduct(req, res, next) {
  const { name, description, price, category, inStock } = req.body;
  if (
    typeof name !== 'string' || !name.trim() ||
    typeof description !== 'string' || !description.trim() ||
    typeof price !== 'number' || price < 0 ||
    typeof category !== 'string' || !category.trim() ||
    typeof inStock !== 'boolean'
  ) {
    return next(new ValidationError('Invalid product data'));
  }
  next();
}

// -----------------
// Routes

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Use /api/products to work with products.');
});

// GET /api/products with filtering, pagination, and search
app.get('/api/products', (req, res, next) => {
  try {
    let { category, page = 1, limit = 10, search } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    let filteredProducts = [...products];

    // Filter by category if provided
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    // Search by name (case insensitive)
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchLower));
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    res.json({
      page,
      limit,
      total: filteredProducts.length,
      data: paginatedProducts
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id - get one product by ID
app.get('/api/products/:id', (req, res, next) => {
  try {
    const product = products.find(p => p.id === req.params.id);
    if (!product) throw new NotFoundError('Product not found');
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST /api/products - create new product
app.post('/api/products', validateProduct, (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    const newProduct = {
      id: uuidv4(),
      name,
      description,
      price,
      category,
      inStock
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id - update existing product
app.put('/api/products/:id', validateProduct, (req, res, next) => {
  try {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) throw new NotFoundError('Product not found');

    const { name, description, price, category, inStock } = req.body;

    products[index] = {
      id: req.params.id,
      name,
      description,
      price,
      category,
      inStock
    };
    res.json(products[index]);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:id - delete product
app.delete('/api/products/:id', (req, res, next) => {
  try {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) throw new NotFoundError('Product not found');

    products.splice(index, 1);
    res.status(204).send(); // No content
  } catch (err) {
    next(err);
  }
});

// GET /api/products/stats - product stats (count by category)
app.get('/api/products/stats', (req, res, next) => {
  try {
    const stats = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});

    res.json(stats);
  } catch (err) {
    next(err);
  }
});

// -----------------
// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err);

  if (err.statusCode) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// -----------------
// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
