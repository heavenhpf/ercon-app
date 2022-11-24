# Ercon App

## Made by Ercon Team (Batch 3)
| Nama | Posisi |
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
- [Front-End Setup Step](#front-end-setup-step)
- [Browser Support](#browser-support)

## Live Preview
Demo dari web app ini dapat diakses pada link berikut:<br />
....

## Directory List
Direktori list dari antarmuka web ini adalah sebagai berikut:
```
vue-argon-dashboard
    ├── public
    │   └── ercon-icon.png
    ├── src
    │   ├── assets
    │   │   ├── css
    │   │   ├── fonts
    │   │   ├── img
    │   │   ├── js
    │   │   └── scss
    │   ├── components
    │   │   ├── tables
    │   │   │   ├── CompanyTable.vue
    │   │   │   ├── GudangSayaTable.vue
    │   │   │   ├── ItemTable.vue
    │   │   │   ├── MonitoringTable.vue
    │   │   │   ├── PesananMasukDetailTable.vue
    │   │   │   ├── PesananMasukTable.vue
    │   │   │   ├── POTable.vue
    │   │   │   ├── TrackingPOSelesaiTerbaruTable.vue
    │   │   │   ├── TrackingPOTerdekatTable.vue
    │   │   │   ├── TrackingSayaTable.vue
    │   │   │   └── TrackingTierBawahTable.vue
    │   │   ├── ArgonAlert.vue
    │   │   ├── ArgonAvatar.vue
    │   │   ├── ArgonBadge.vue
    │   │   ├── ArgonButton.vue
    │   │   ├── ArgonCheckbox.vue
    │   │   ├── ArgonInput.vue
    │   │   ├── ArgonPagination.vue
    │   │   ├── ArgonPaginationItem.vue
    │   │   ├── ArgonProgress.vue
    │   │   ├── ArgonRadio.vue
    │   │   ├── ArgonSnackbar.vue
    │   │   ├── ArgonSocialButton.vue
    │   │   ├── ArgonSwitch.vue
    │   │   ├── ArgonTextarea.vue
    │   │   ├── DataTable.vue
    │   │   └── ModalComp.vue
    │   ├── dist
    │   ├── examples
    │   │   ├── Cards
    │   │   ├── Charts
    │   │   ├── Navbars
    │   │   ├── PageLayout
    │   │   ├── Sidenav
    │   │   ├── Breadcrumbs.vue
    │   │   ├── Configurator.vue
    │   │   └── Footer.vue
    │   │   └── Globe.vue
    │   ├── layout
    │   ├── plugins
    │   ├── router
    │   ├── services
    │   ├── stores
    │   ├── views
    │   │   ├── Akun
    │   │   │   ├── Company.vue
    │   │   │   ├── CompanySaya.vue
    │   │   │   └── TambahCompany.vue
    │   │   ├── Auth
    │   │   │   ├── Login.vue
    │   │   │   └── Signup.vue
    │   │   ├── Dashboard
    │   │   │   ├── DataTable.vue
    │   │   │   └── Default.vue
    │   │   ├── Monitoring
    │   │   │   ├── DetailItem.vue
    │   │   │   ├── GudangSaya.vue
    │   │   │   ├── MonitoringItem.vue
    │   │   │   ├── TambahItem.vue
    │   │   │   └── UpdateProduksi.vue
    │   │   ├── PO
    │   │   │   ├── AjukanPO1.vue
    │   │   │   └── AjukanPO2.vue
    │   │   ├── Tracking
    │   │   │   ├── EditInformasiPO.vue
    │   │   │   ├── PesananMasuk.vue
    │   │   │   ├── PesananMasuKDetail.vue
    │   │   │   ├── TrackingDetail.vue
    │   │   │   ├── TrackingSaya.vue
    │   │   │   └── TrackingTierBawah.vue
    │   │   └── NotFound.vue
    │   ├── App.vue
    │   ├── argon-dashboard.js
    │   └── main.js
    ├── .browserslistrc
    ├── .env
    ├── .eslintrc.js
    ├── .gitignore
    ├── babel.config.js
    ├── CHANGELOG.md
    ├── index.html
    ├── ISSUE_TEMPLATE.md
    ├── LICENSE
    ├── package.json
    ├── README.md
    └── vite.config.js
```

## Arsitektur Informasi
Berikut merupakan arsitektur informasi dari proyek Ercon ini:

[![arsitektur-informasi](https://i.postimg.cc/3wHzW3P2/Screenshot-2022-11-24-133743.png)](https://postimg.cc/68YMmx6Q)

## Front-End Setup Step
1. Jalankan `npm i` pada terminal.
2. Buat file `.env` lalu buka file `.env.example`.
3. Copy isi file pada `.env.example` ke `.env` dengan menggunakan port yang sama dengan back-end.
4. Jalankan command `npm run dev`.

## Browser Support
Untuk saat ini, Web Ercon ini support untuk dibuka pada dua versi terakhir dari browser berikut:

<img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/chrome.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/firefox.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/edge.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/safari.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/opera.png" width="64" height="64">
