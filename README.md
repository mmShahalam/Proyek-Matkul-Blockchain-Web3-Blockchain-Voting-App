# 🌐 Sistem Voting Elektronik Berbasis Blockchain

## 📖 Overview
Proyek ini bertujuan untuk meningkatkan keamanan, transparansi, dan kepercayaan masyarakat terhadap pemilu melalui sistem voting elektronik berbasis teknologi blockchain. Sistem ini dirancang menggunakan React.js, smart contract berbasis Solidity, dan integrasi dengan Sepolia Testnet, sehingga setiap suara dicatat secara permanen.

## 📋 Fitur Utama
- **Keamanan Tinggi**: Setiap suara dicatat di blockchain, menjamin tidak ada manipulasi data.
- **Real-time Tracking**: Pemilih dan admin dapat memantau hasil voting secara langsung.
- **Desentralisasi**: Menggunakan jaringan blockchain untuk mengurangi ketergantungan pada otoritas pusat.

## ⚙️ Teknologi yang Digunakan
- React.js: Untuk antarmuka pengguna yang interaktif.
- Solidity: Untuk pengembangan smart contract.
- Sepolia Testnet: Sebagai jaringan blockchain pengujian.
- MetaMask: Dompet digital untuk autentikasi transaksi.
- Ether.js: Untuk komunikasi antara frontend dan blockchain.
- Alchemy: Sebagai node RPC untuk koneksi yang stabil ke blockchain.

## 🚀 Cara Kerja
- Admin:
  - Menambahkan kandidat baru dan memantau hasil voting.
    ![Admin add candidate](https://github.com/user-attachments/assets/93a7acdb-5c90-4357-b1e0-70ced9a0c55d)
  - Semua data kandidat dicatat secara permanen di blockchain.
- Pemilih:
  - Login menggunakan MetaMask.
    ![Login with MetaMask](https://github.com/user-attachments/assets/94d99833-d429-453e-b067-501101edcdbb)
- Memilih kandidat dan mengonfirmasi suara melalui transaksi blockchain.
  ![Vote candidate](https://github.com/user-attachments/assets/311f5ae1-927e-4503-9d8e-88a9c9185307)
- Status pemilih diperbarui secara otomatis setelah voting.

## 🛠️ Instalasi dan Penggunaan
- Clone repository ini:
    - git clone https://github.com/mmShahalam/Proyek-Matkul-Blockchain-Web3-Blockchain-Voting-App.git
- Instal dependensi:
  - npm install
- Buat file .env
- Deploy smart contract
  - npx hardhat run scripts/deploy.js --network sepolia
- Jalankan aplikasi:
  - npm start
- Hubungkan MetaMask Anda ke Sepolia Testnet dan ikuti langkah-langkah yang tersedia.

## 🗂️ Struktur Proyek
- /src : Kode sumber frontend.
- /contracts : Smart contract berbasis Solidity.
- /tests : Pengujian unit dan integrasi.

## 👨‍💻 Author
- **Muhammad Mirza Shah Alam**: [GitHub Profile](https://github.com/mmShahalam)
