# OCEAN Aquarium Store — starter project

Project structure:
- `server/`: Express REST API + Mongoose + MongoDB
- `client-customer/`: React customer website (home, categories, product listing, product detail)
- `client-admin/`: React admin starter dashboard (read-only product/category lists)

## Requirements
- Node.js 18+ (recommended Node 20 LTS)
- MongoDB local service or MongoDB Atlas connection string
- Postman (for API testing)

## 1. Start MongoDB
Start the MongoDB service locally, or create a database on MongoDB Atlas and use its connection string.

## 2. Start the API
Open terminal in `server`:

```bash
npm install
```
Copy `.env.example` to `.env` and update `MONGODB_URI` if necessary. Then:

```bash
npm run seed
npm run dev
```

API default: `http://localhost:5000`

## 3. Start customer website
Open another terminal in `client-customer`:

```bash
npm install
npm run dev
```
Open the Vite URL printed in terminal, normally `http://localhost:5173`.

## 4. Start admin dashboard
Open another terminal in `client-admin`:

```bash
npm install
npm run dev -- --port 5174
```
Open `http://localhost:5174`.

## Postman API tests
1. `GET http://localhost:5000/api/health`
2. `GET http://localhost:5000/api/categories`
3. `GET http://localhost:5000/api/categories/ca-betta`
4. `GET http://localhost:5000/api/products`
5. `GET http://localhost:5000/api/products?featured=true&limit=4`
6. `GET http://localhost:5000/api/products?category=ca-betta`
7. `GET http://localhost:5000/api/products?search=betta`
8. `GET http://localhost:5000/api/products/betta-halfmoon-blue`

Example success response:

```json
{
  "success": true,
  "data": [],
  "pagination": { "page": 1, "limit": 12, "total": 0, "pages": 0 }
}
```

## Notes / current scope
- The seed script inserts sample categories and sample products. It clears existing `categories` and `products` collections before seeding; do not run it against production data.
- Public API currently supports reading categories and products. Create/update/delete endpoints, admin authentication, cart, checkout, orders and payment are not implemented yet.
- Product detail CTA is a UI placeholder, not a real checkout.
- Image URLs are demo references and require an internet connection. Replace them with approved store images before deployment.
- CORS origins are configured for the default customer/admin development ports in `server/.env.example`.
