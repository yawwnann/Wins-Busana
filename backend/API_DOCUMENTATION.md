# UMKM Backend API Documentation

## Base URL
```
http://localhost:5173
```

## Technology Stack
- **Framework**: Next.js 16.0.3 (API Routes)
- **Database**: MongoDB (via Prisma ORM)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **File Upload**: Cloudinary
- **CORS**: Enabled for frontend communication

---

## Database Schema

### User Model
```prisma
model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  email     String   @unique
  password  String   (hashed)
  role      Role     @default(USER)  // ADMIN or USER
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Category Model
```prisma
model Category {
  id        String    @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  slug      String    @unique
  products  Product[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

### Product Model
```prisma
model Product {
  id          String    @id @default(auto()) @map("_id") @db.ObjectId
  name        String
  description String?
  price       Float?
  imageUrl    String?
  url         String
  categoryId  String?   @db.ObjectId
  category    Category?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

---

## Authentication Endpoints

### 1. Register User
**POST** `/api/auth`

**Request Body:**
```json
{
  "type": "register",
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400`: User already exists
```json
{
  "message": "User exists"
}
```

---

### 2. Login User
**POST** `/api/auth`

**Request Body:**
```json
{
  "type": "login",
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `404`: User not found
```json
{
  "message": "Not found"
}
```
- `401`: Invalid credentials
```json
{
  "message": "Invalid credentials"
}
```

**Notes:**
- Token expires in 7 days
- Store token in localStorage/sessionStorage
- Include token in subsequent requests via `Authorization: Bearer <token>`

---

## Category Endpoints

### 3. Get All Categories
**GET** `/api/categories`

**Authentication:** Not required

**Success Response (200):**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "name": "Blangkon Jawa Tengah",
    "slug": "blangkon-jawa-tengah",
    "_count": {
      "products": 5
    },
    "createdAt": "2025-11-15T10:00:00.000Z",
    "updatedAt": "2025-11-15T10:00:00.000Z"
  }
]
```

---

### 4. Get Single Category
**GET** `/api/categories/{id}`

**Authentication:** Not required

**URL Parameters:**
- `id` (string): Category ObjectId

**Success Response (200):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Blangkon Jawa Tengah",
  "slug": "blangkon-jawa-tengah",
  "products": [
    {
      "id": "507f1f77bcf86cd799439012",
      "name": "Blangkon Tradisional",
      "description": "Blangkon asli Jawa Tengah...",
      "price": 150000,
      "imageUrl": "https://...",
      "url": "/products/1",
      "categoryId": "507f1f77bcf86cd799439011",
      "createdAt": "2025-11-15T10:00:00.000Z",
      "updatedAt": "2025-11-15T10:00:00.000Z"
    }
  ],
  "createdAt": "2025-11-15T10:00:00.000Z",
  "updatedAt": "2025-11-15T10:00:00.000Z"
}
```

**Error Response (404):**
```json
{
  "message": "Category not found"
}
```

---

### 5. Create Category
**POST** `/api/categories`

**Authentication:** Required (ADMIN only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Blangkon Premium"
}
```

**Success Response (201):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Blangkon Premium",
  "slug": "blangkon-premium",
  "createdAt": "2025-11-15T10:00:00.000Z",
  "updatedAt": "2025-11-15T10:00:00.000Z"
}
```

**Error Responses:**
- `400`: Missing name
```json
{
  "message": "Name is required"
}
```
- `401`: Unauthorized
```json
{
  "message": "Unauthorized"
}
```
- `403`: Not admin
```json
{
  "message": "Forbidden - Admin access required"
}
```

---

### 6. Update Category
**PUT** `/api/categories/{id}`

**Authentication:** Required (ADMIN only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Blangkon Premium Update"
}
```

**Success Response (200):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Blangkon Premium Update",
  "slug": "blangkon-premium-update",
  "createdAt": "2025-11-15T10:00:00.000Z",
  "updatedAt": "2025-11-15T10:30:00.000Z"
}
```

---

### 7. Delete Category
**DELETE** `/api/categories/{id}`

**Authentication:** Required (ADMIN only)

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "message": "Category deleted successfully"
}
```

---

## Product Endpoints

### 8. Get All Products
**GET** `/api/products`

**Authentication:** Not required

**Query Parameters:**
- `categoryId` (optional): Filter by category ID

**Examples:**
```
GET /api/products
GET /api/products?categoryId=507f1f77bcf86cd799439011
```

**Success Response (200):**
```json
[
  {
    "id": "507f1f77bcf86cd799439012",
    "name": "Blangkon Batik Parang",
    "description": "Blangkon batik dengan motif parang...",
    "price": 250000,
    "imageUrl": "https://...",
    "url": "/catalog/1",
    "categoryId": "507f1f77bcf86cd799439011",
    "category": {
      "id": "507f1f77bcf86cd799439011",
      "name": "Blangkon Batik",
      "slug": "blangkon-batik",
      "createdAt": "2025-11-15T10:00:00.000Z",
      "updatedAt": "2025-11-15T10:00:00.000Z"
    },
    "createdAt": "2025-11-15T10:00:00.000Z",
    "updatedAt": "2025-11-15T10:00:00.000Z"
  }
]
```

---

### 9. Get Single Product
**GET** `/api/products/{id}`

**Authentication:** Not required

**URL Parameters:**
- `id` (string): Product ObjectId

**Success Response (200):**
```json
{
  "id": "507f1f77bcf86cd799439012",
  "name": "Blangkon Batik Parang",
  "description": "Blangkon batik dengan motif parang...",
  "price": 250000,
  "imageUrl": "https://...",
  "url": "/catalog/1",
  "categoryId": "507f1f77bcf86cd799439011",
  "category": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Blangkon Batik",
    "slug": "blangkon-batik",
    "createdAt": "2025-11-15T10:00:00.000Z",
    "updatedAt": "2025-11-15T10:00:00.000Z"
  },
  "createdAt": "2025-11-15T10:00:00.000Z",
  "updatedAt": "2025-11-15T10:00:00.000Z"
}
```

**Error Response (404):**
```json
{
  "message": "Product not found"
}
```

---

### 10. Create Product
**POST** `/api/products`

**Authentication:** Required (ADMIN only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Blangkon Solo Klasik",
  "description": "Blangkon khas Solo dengan bentuk tradisional...",
  "price": 180000,
  "imageUrl": "https://...",
  "url": "/catalog/2",
  "categoryId": "507f1f77bcf86cd799439013"
}
```

**Success Response (201):**
```json
{
  "id": "507f1f77bcf86cd799439014",
  "name": "Blangkon Solo Klasik",
  "description": "Blangkon khas Solo dengan bentuk tradisional...",
  "price": 180000,
  "imageUrl": "https://...",
  "url": "/catalog/2",
  "categoryId": "507f1f77bcf86cd799439013",
  "createdAt": "2025-11-15T10:00:00.000Z",
  "updatedAt": "2025-11-15T10:00:00.000Z"
}
```

**Error Responses:**
- `400`: Missing required fields
```json
{
  "message": "Name and URL are required"
}
```

**Notes:**
- `price` can be null
- `description` can be null
- `imageUrl` can be null
- `categoryId` can be null

---

### 11. Update Product
**PUT** `/api/products/{id}`

**Authentication:** Required (ADMIN only)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Blangkon Solo Klasik Updated",
  "description": "Updated description...",
  "price": 200000,
  "imageUrl": "https://...",
  "url": "/catalog/2",
  "categoryId": "507f1f77bcf86cd799439013"
}
```

**Success Response (200):**
```json
{
  "id": "507f1f77bcf86cd799439014",
  "name": "Blangkon Solo Klasik Updated",
  "description": "Updated description...",
  "price": 200000,
  "imageUrl": "https://...",
  "url": "/catalog/2",
  "categoryId": "507f1f77bcf86cd799439013",
  "createdAt": "2025-11-15T10:00:00.000Z",
  "updatedAt": "2025-11-15T10:30:00.000Z"
}
```

---

### 12. Delete Product
**DELETE** `/api/products/{id}`

**Authentication:** Required (ADMIN only)

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "message": "Product deleted successfully"
}
```

---

## File Upload Endpoint

### 13. Upload Image
**POST** `/api/upload`

**Authentication:** Required (ADMIN only)

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (FormData):**
- `file`: Image file (JPEG, PNG, etc.)

**Success Response (200):**
```json
{
  "url": "https://res.cloudinary.com/.../.../image.jpg",
  "publicId": "umkm-products/abc123"
}
```

**Error Responses:**
- `400`: No file provided
```json
{
  "message": "No file provided"
}
```
- `500`: Upload failed
```json
{
  "message": "Error uploading file"
}
```

**Notes:**
- Images are stored in Cloudinary
- Folder: `umkm-products`
- Returns secure_url for direct access

---

## Authentication Flow

### For Admin Operations:

1. **Login/Register** to get JWT token
```bash
POST /api/auth
{
  "type": "login",
  "email": "admin@example.com",
  "password": "admin123"
}
```

2. **Store token** in frontend (localStorage/state)

3. **Include token** in protected requests:
```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. **Token validation** happens automatically on server
   - Middleware checks `Authorization` header
   - Verifies JWT signature
   - Checks user exists and role is ADMIN

### Token Information:
- **Algorithm**: HS256
- **Expiration**: 7 days
- **Secret**: Stored in `JWT_SECRET` environment variable
- **Payload**: `{ userId: string }`

---

## Error Handling

All endpoints return consistent error responses:

### 400 Bad Request
```json
{
  "message": "Specific error message"
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "message": "Forbidden - Admin access required"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Error message"
}
```

---

## CORS Configuration

- **Allowed Origin**: `http://localhost:5173`
- **Allowed Methods**: GET, POST, PUT, DELETE, OPTIONS
- **Allowed Headers**: Content-Type, Authorization
- **Credentials**: Enabled

---

## Environment Variables

Required in `.env` file:

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/dbname"

# JWT Secret
JWT_SECRET="your-secret-key-here"

# Cloudinary (for image upload)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

---

## Example Usage (JavaScript/TypeScript)

### Login Example
```typescript
const login = async (email: string, password: string) => {
  const response = await fetch('http://localhost:5173/api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'login',
      email,
      password,
    }),
  });

  const data = await response.json();
  
  if (response.ok) {
    localStorage.setItem('token', data.token);
    return data.token;
  }
  
  throw new Error(data.message);
};
```

### Authenticated Request Example
```typescript
const createProduct = async (productData: any) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch('http://localhost:5173/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });

  return response.json();
};
```

### File Upload Example
```typescript
const uploadImage = async (file: File) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://localhost:5173/api/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  return response.json();
};
```

---

## Testing the API

### Using cURL

**Login:**
```bash
curl -X POST http://localhost:5173/api/auth \
  -H "Content-Type: application/json" \
  -d '{
    "type": "login",
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

**Get Products:**
```bash
curl http://localhost:5173/api/products
```

**Create Product (with auth):**
```bash
curl -X POST http://localhost:5173/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "New Blangkon",
    "description": "Description here",
    "price": 150000,
    "url": "/catalog/new"
  }'
```

---

## Database Setup

1. **Install Prisma**:
```bash
npm install @prisma/client prisma
```

2. **Generate Prisma Client**:
```bash
npm run prisma:generate
```

3. **Push Schema to Database**:
```bash
npm run prisma:push
```

4. **Seed Initial Admin** (manually via MongoDB or Prisma Studio):
```javascript
// Email: admin@example.com
// Password: (hashed) admin123
// Role: ADMIN
```

---

## Notes

- All timestamps are in ISO 8601 format
- MongoDB ObjectIds are 24-character hex strings
- Price is stored as Float (Rupiah, without decimals typically)
- Slug is auto-generated from name (lowercase, spaces to dashes)
- CORS is configured for frontend at `http://localhost:5173`
- JWT tokens expire after 7 days
- Admin role is required for all write operations (POST, PUT, DELETE)
- File uploads go to Cloudinary in `umkm-products` folder

---

## Support

For issues or questions, please contact the development team.

**Last Updated**: November 15, 2025
