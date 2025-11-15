# Admin Panel & Authentication

## 📋 Overview

Frontend aplikasi Wins Busana Jawa dengan fitur:
- **Public Pages**: Home, Catalog, Product Detail
- **Admin Panel**: Dashboard, Products Management, Categories Management
- **Authentication**: JWT-based login system

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```

App will run on: **http://localhost:5173**

---

## 🔐 Authentication Flow

### Login Page
**URL**: `http://localhost:5173/login`

**Features**:
- Email/password login form
- Error handling with user-friendly messages
- Loading states
- Responsive design
- Dark mode support

**Test Credentials** (after creating admin in backend):
```
Email: admin@example.com
Password: admin123
```

### Authentication Process:
1. User enters credentials
2. Frontend sends POST to `/api/auth`
3. Backend validates and returns JWT token
4. Token stored in localStorage
5. Token included in all protected API calls
6. User redirected to `/admin`

### Protected Routes:
- `/admin/*` - All admin routes require authentication
- Unauthenticated users → Redirected to `/login`
- Non-admin users → Redirected to `/`

---

## 🎨 Components

### AuthContext
**Location**: `app/contexts/AuthContext.tsx`

**Features**:
- Global authentication state
- Login/Register/Logout functions
- User information management
- Token management
- Admin role checking

**Usage**:
```typescript
import { useAuth } from "@/app/contexts/AuthContext";

function MyComponent() {
  const { user, login, logout, isAdmin } = useAuth();
  
  if (!user) return <LoginPrompt />;
  if (!isAdmin) return <Forbidden />;
  
  return <AdminContent />;
}
```

### ProtectedRoute
**Location**: `app/components/ProtectedRoute.tsx`

**Purpose**: Wrapper for admin pages to ensure authentication

**Usage**:
```typescript
export default function AdminPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <YourContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}
```

### AdminLayout
**Location**: `app/components/AdminLayout.tsx`

**Features**:
- Collapsible sidebar navigation
- Top bar with user info
- Dark mode toggle
- Logout button
- Responsive design
- Active route highlighting

**Navigation Items**:
- Dashboard (`/admin`)
- Produk (`/admin/products`)
- Kategori (`/admin/categories`)

---

## 📁 File Structure

```
frontend/
├── app/
│   ├── admin/
│   │   ├── page.tsx                 # Dashboard
│   │   ├── products/
│   │   │   └── page.tsx             # Products management
│   │   └── categories/
│   │       └── page.tsx             # Categories management
│   ├── login/
│   │   └── page.tsx                 # Login page
│   ├── contexts/
│   │   ├── AuthContext.tsx          # Auth state management
│   │   └── ThemeContext.tsx         # Dark mode
│   └── components/
│       ├── AdminLayout.tsx          # Admin layout wrapper
│       ├── ProtectedRoute.tsx       # Auth guard
│       ├── Navbar.tsx               # Public navbar
│       └── ClientLayout.tsx         # Root layout
├── lib/
│   ├── api-client.ts                # API helper functions
│   ├── api.ts                       # Public API functions
│   └── types.ts                     # TypeScript types
└── .env.local                       # Environment variables
```

---

## 🔧 API Client

**Location**: `lib/api-client.ts`

**Features**:
- Automatic token injection
- Error handling
- Type-safe requests
- File upload support

**Methods**:
```typescript
// GET request
await apiClient.get('/api/products');

// POST request
await apiClient.post('/api/products', { name: 'New Product' });

// PUT request
await apiClient.put('/api/products/123', { name: 'Updated' });

// DELETE request
await apiClient.delete('/api/products/123');

// Upload file
await apiClient.upload('/api/upload', fileObject);
```

---

## 🎯 Admin Dashboard

**URL**: `http://localhost:5173/admin`

**Features**:
- Statistics cards (Total Products, Total Categories, System Status)
- Quick action buttons
- Welcome card with info
- Responsive grid layout
- Real-time data fetching

**Data Displayed**:
- Total products count
- Total categories count
- System online status
- Quick links to products and categories

---

## 🛠️ Admin Features (To Implement)

### Products Management (`/admin/products`)
- [ ] List all products with pagination
- [ ] Create new product with form
- [ ] Edit existing product
- [ ] Delete product with confirmation
- [ ] Upload product images
- [ ] Filter by category
- [ ] Search products

### Categories Management (`/admin/categories`)
- [ ] List all categories
- [ ] Create new category
- [ ] Edit category name
- [ ] Delete category (with warning if has products)
- [ ] View products count per category

---

## 🎨 Styling

**Theme**: Tailwind CSS with custom colors
**Primary Color**: `#5BC0DE` (Cyan Blue)
**Hover Color**: `#46b0ce`

**Dark Mode**:
- Automatic detection
- Manual toggle
- Persisted in localStorage
- Smooth transitions

**Responsive Breakpoints**:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## 🔒 Security

### Token Management:
- JWT stored in localStorage
- Auto-included in API requests
- Expires in 7 days
- Cleared on logout

### Route Protection:
- Client-side guards (ProtectedRoute)
- Server-side validation (API)
- Role-based access (ADMIN only)

### Best Practices:
- ✅ HTTPS in production
- ✅ Secure token storage
- ✅ CORS properly configured
- ✅ Input validation
- ✅ Error handling
- ⚠️ Add CSRF protection (future)
- ⚠️ Add rate limiting (future)

---

## 🐛 Troubleshooting

### "useAuth must be used within AuthProvider"
**Solution**: Make sure component is wrapped with AuthProvider in ClientLayout.tsx

### Token not included in requests
**Solution**: 
1. Check token exists in localStorage
2. Verify apiClient.ts is getting token correctly
3. Check Authorization header in Network tab

### Redirect loop on /admin
**Solution**:
1. Check user has ADMIN role
2. Verify token is valid
3. Clear localStorage and login again

### CORS errors
**Solution**:
1. Verify backend CORS allows http://localhost:5173
2. Check backend is running
3. Verify API_URL in .env.local

---

## 📝 Next Steps

1. **Implement Products Management Page**:
   - Product list with table/grid view
   - Create/Edit product modal/form
   - Image upload integration
   - Delete confirmation dialog

2. **Implement Categories Management Page**:
   - Category list
   - Create/Edit category modal
   - Delete with warning if has products

3. **Add Notifications**:
   - Toast notifications for success/error
   - Loading indicators
   - Confirmation dialogs

4. **Enhance UX**:
   - Form validation
   - Better error messages
   - Loading skeletons
   - Empty states
   - Pagination
   - Search/Filter

5. **Add Tests**:
   - Unit tests for components
   - Integration tests for auth flow
   - E2E tests for admin actions

---

## 🌟 Features Implemented

✅ JWT Authentication
✅ Login page with validation
✅ Protected admin routes  
✅ Admin layout with sidebar
✅ Dashboard with statistics
✅ User info display
✅ Logout functionality
✅ Dark mode support
✅ Responsive design
✅ API client with auth
✅ Error handling
✅ Loading states

---

## 📞 Support

For issues or questions:
1. Check backend is running on port 3000
2. Verify environment variables
3. Check browser console for errors
4. Review backend logs
5. Test API endpoints directly

---

**Last Updated**: November 15, 2025
