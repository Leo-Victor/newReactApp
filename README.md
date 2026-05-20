# 🚀 My Portfolio & Calculator App

Portfolio cá nhân kết hợp máy tính cầm tay, xây dựng bằng React + TypeScript.

## 🔗 Demo
https://leo-victor.github.io

## 🛠 Công nghệ sử dụng
- React 18
- TypeScript
- Vite
- React Router v6
- GitHub Pages

## ✨ Chức năng
- **Trang chủ:** Hero section, kỹ năng, dự án GitHub, footer
- **Máy tính:** Tính cộng, trừ, nhân, chia — có backspace và clear

## 📁 Cấu trúc thư mục
src/
├── components/       # UI components dùng chung
├── context/          # ThemeContext
├── features/         # Calculator components & logic
├── hooks/            # Custom hooks
└── pages/            # Các trang

## ⚙️ Cách chạy

```bash
# Cài dependencies
npm install

# Chạy dev
npm run dev

# Build production
npm run build

## 📝 Biến môi trường
Tạo file `.env` ở thư mục gốc: VITE_GITHUB_USERNAME=your_github_username
