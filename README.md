# Ercon App

## Made by Ercon Team (Batch 3)
| Anggota Tim | Posisi |
| ------ | ------ |
| Heaven Happyna Putra Febriyono | Project Manager & Front-End Dev |
| Tazki Hanifan Amri | Back-End Dev |
| Anas Ardiansyah | UI/UX Designer |
| Mohammad Ibadul Haqqi | Database Administrator |

## Daftar Isi
- [Daftar Isi](#daftar-isi)
- [Live Preview](#live-preview)
- [Directory List](#directory-list)
- [Arsitektur Informasi](#arsitektur-informasi)
- [Back-End Setup Step](#back-end-setup-step)
- [Browser Support](#browser-support)

## Live Preview
Demo dari web app ini dapat diakses pada link berikut:<br />
....

## Directory List
Direktori list dari antarmuka web ini adalah sebagai berikut:
```
vue-argon-dashboard
    ├── config
    │   └── app.config.json
    ├── controllers
    ├── helpers
    │   ├── database.js
    │   ├── middleware.js
    │   ├── notification.js
    │   ├── response.js
    │   └── upload.js
    ├── modules
    ├── prisma
    │   ├── migrations
    │   └── schema.prisma
    ├── public
    │   ├── DN
    │   ├── PO
    ├── .gitignore
    ├── app.js
    ├── Ercon.postman_collection.json
    ├── Ercon.postman_environment.json
    ├── ercon.sql
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── route.js
```

## Arsitektur Informasi
Berikut merupakan arsitektur informasi dari proyek Ercon ini:

[![arsitektur-informasi](https://i.postimg.cc/3wHzW3P2/Screenshot-2022-11-24-133743.png)](https://postimg.cc/68YMmx6Q)

## Back-End Setup Step
1. `npm i`
2. Buat file `.env` lalu buka
3. Isi file `.env` dengan `PORT=<angka bebas>`
4. Isi file `.env` dengan `DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"`
5. Jalankan `npx prisma db push`
6. Jalankan perintah SQL berikut pada Database:
```
CREATE DEFINER=`root`@`localhost` EVENT `e_po_deadline` ON SCHEDULE EVERY 1 DAY STARTS '2022-10-18 00:00:00' ENDS '2023-12-31 00:00:00' ON COMPLETION NOT PRESERVE ENABLE COMMENT 'Runs event' DO UPDATE d_po
SET d_po.status = (
    CASE WHEN (d_po.deadline<CURDATE()) THEN -1
    ELSE d_po.status
    END
)
WHERE d_po.status = 0
```

## Browser Support
Untuk saat ini, Web Ercon ini support untuk dibuka pada dua versi terakhir dari browser berikut:

<img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/chrome.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/firefox.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/edge.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/safari.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/opera.png" width="64" height="64">
