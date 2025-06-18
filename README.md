# Express.js-Product-API-project

🛍️ **Product API with Express.js**  
A simple and secure RESTful API for managing product listings using Node.js, Express.js, and UUID.

---

## 🚀 Features

- Add, update, delete, and view products  
- Pagination, filtering, and search  
- API key authentication (`x-api-key`)  
- Custom error handling  
- In-memory storage (great for testing or demos)

---

## 📦 Requirements

- Node.js (v14+)
- npm

---

## 📁 Setup

```bash
# Clone the repository
git clone https://github.com/your-username/product-api.git
cd product-api

# Install dependencies
npm install

# Create .env file from the example template
cp .env.example .env

# Start the server
npm start

# Or use nodemon for development
npm run dev

🔐 Authentication
All /api routes require a valid API key passed in the headers:
x-api-key: 12345

📡 API Endpoints
Method	Endpoint	Description
GET	/api/products	List all products
GET	/api/products/:id	Get a single product by ID
POST	/api/products	Create a new product
PUT	/api/products/:id	Update an existing product
DELETE	/api/products/:id	Delete a product
GET	/api/products/stats	Get product count by category

🧪 Sample Request
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: 12345" \
  -d '{"name":"Tablet","description":"A new tablet","price":300,"category":"electronics","inStock":true}'

👨‍💻 Author
Edwin Mwenda Mwiti
📧 eduedwyn5@gmail.com
🔗 LinkedIn
📄 License
This project is licensed under the MIT License.

---

### ✅ What's Next?

Let me generate the two additional files you need:

#### `.env.example`:
```env
PORT=3000
API_KEY=12345

LICENSE (MIT):
MIT License

Copyright (c) 2025 Edwin Mwenda Mwiti

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction...

[Full MIT License continues...]
