# Setup step
1. `npm i`
2. Buat file `.env` lalu buka
3. Isi file `.env` dengan `PORT=<angka bebas>`
4. Isi file `.env` dengan `DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"`
5. Jalankan `npx prisma db push`
6. Jalankan perintah SQL berikut pada Database:
```
CREATE DEFINER=`root`@`localhost` EVENT `e_po_deadline` ON SCHEDULE EVERY 1 DAY STARTS '2022-10-18 00:00:00' ENDS '2023-12-31 00:00:00' ON COMPLETION NOT PRESERVE ENABLE COMMENT 'Runs event' DO UPDATE d_po
SET d_po.status = (
    CASE WHEN (d_po.deadline<CURDATE()) THEN 2
    ELSE d_po.status
    END
)
WHERE d_po.status = 0
```