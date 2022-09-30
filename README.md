# Setup step
1. `npm i`
2. Buat file `.env` lalu buka
3. Isi file `.env` dengan `PORT=<angka bebas>`
4. Isi file `.env` dengan `DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"`
5. Jalankan `npx prisma db pull`
6. Jalankan `npx prisma generate`