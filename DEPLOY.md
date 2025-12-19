# Panduan Deploy ke Netlify

## Setup Project UMKM

Project ini terdiri dari 2 bagian:

- **Frontend**: wins-busana-jogja.netlify.app
- **Backend**: winsbusana-be.netlify.app

## Deploy Backend

1. **Siapkan Database PostgreSQL**

   - Gunakan service seperti [Neon](https://neon.tech/), [Supabase](https://supabase.com/), atau [Railway](https://railway.app/)
   - Copy connection string DATABASE_URL

2. **Deploy ke Netlify**

   - Login ke [Netlify](https://netlify.com)
   - New Site → Import from Git → Pilih repository backend
   - Build settings sudah otomatis dari `netlify.toml`
   - Klik "Deploy site"

3. **Set Environment Variables di Netlify**

   - Go to: Site settings → Environment variables
   - Tambahkan:
     ```
     DATABASE_URL=postgresql://your_database_url
     JWT_SECRET=your_secret_key_min_32_characters
     CLOUDINARY_CLOUD_NAME=your_cloudinary_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     FRONTEND_URL=https://wins-busana-jogja.netlify.app
     ```

4. **Trigger Rebuild**
   - Setelah set environment variables, rebuild site

## Deploy Frontend

1. **Deploy ke Netlify**

   - New Site → Import from Git → Pilih repository frontend
   - Build settings sudah otomatis dari `netlify.toml`
   - Klik "Deploy site"

2. **Set Custom Domain (Optional)**

   - Site settings → Domain management
   - Ubah ke: wins-busana-jogja.netlify.app

3. **Environment Variables (sudah di netlify.toml)**
   - `NEXT_PUBLIC_BACKEND_URL` sudah di set ke https://winsbusana-be.netlify.app

## Testing

1. Akses frontend: https://wins-busana-jogja.netlify.app
2. Test login dan fitur-fitur lainnya
3. Cek browser console untuk error jika ada

## Troubleshooting

### Error: Page Not Found

- Pastikan `netlify.toml` ada di root folder
- Check build logs di Netlify dashboard

### Error: CORS

- Pastikan FRONTEND_URL di backend environment variables sudah benar
- Check Network tab di browser untuk lihat error detail

### Error: Database Connection

- Pastikan DATABASE_URL valid
- Test koneksi database dari local dulu
- Run `npx prisma db push` setelah setup database

### Error: API Not Found

- Pastikan NEXT_PUBLIC_BACKEND_URL di frontend benar
- Check di browser DevTools → Network

## Scripts

### Backend

```bash
npm run build        # Build production
npm run start        # Start production
npm run seed         # Seed database (run after db setup)
```

### Frontend

```bash
npm run build        # Build production
npm run start        # Start production
```

## Notes

- Next.js 16 butuh Node.js 20+
- Database harus PostgreSQL
- Cloudinary untuk upload gambar
- JWT untuk authentication
