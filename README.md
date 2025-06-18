# Express.js-Product-API-project
# 🛍️ Product API with Express.js

A simple and secure RESTful API for managing product listings using **Node.js**, **Express.js**, and **UUID**.

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

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/product-api.git
   cd product-api
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start the server
npm start

# Or for development with auto-restart:
npm run dev
### 🔐 Authentication

All `/api` routes require a valid API key passed in the headers:

### 📡 API Endpoints

| Method | Endpoint                | Description                      |
|--------|-------------------------|----------------------------------|
| GET    | `/api/products`         | List all products                |
| GET    | `/api/products/:id`     | Get a single product by ID       |
| POST   | `/api/products`         | Create a new product             |
| PUT    | `/api/products/:id`     | Update existing product          |
| DELETE | `/api/products/:id`     | Delete a product                 |
| GET    | `/api/products/stats`   | Get product count by category    |
### 🧪 Sample Request

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "x-api-key: 12345" \
  -d '{"name":"Tablet","description":"A new tablet","price":300,"category":"electronics","inStock":true}'

---

#### 5. **Author & Contact Info**

```markdown
### 👨‍💻 Author

**Edwin Mwenda Mwiti**  
📧 eduedwyn5@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/edwinmwiti234)
### 📄 License

This project is licensed under the MIT License.
