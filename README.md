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
    ![Admin add candidate](https://github.com/user-attachments/assets/274eeec7-7ef0-4232-a665-fffd15e612c8)
  - Semua data kandidat dicatat secara permanen di blockchain.
- Pemilih:
  - Login menggunakan MetaMask.
    ![Login with MetaMask](https://github.com/user-attachments/assets/6c19ae7c-3133-403a-a93b-c9dcb5b77861)
  - Memilih kandidat dan mengonfirmasi suara melalui transaksi blockchain.
    ![Vote candidate](https://github.com/user-attachments/assets/233bcb1b-ec09-4b08-852a-ec60306fd8ec)
  - Status pemilih diperbarui secara otomatis setelah voting.
    ![Vote success](https://github.com/user-attachments/assets/153d0b3e-7166-4965-b744-f19d4de395e6)


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
