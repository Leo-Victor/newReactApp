# 🚀 Leo Victor Portfolio & Calculator App

Một ứng dụng Single Page Application (SPA) chuyên nghiệp kết hợp giữa **Portfolio cá nhân (CV Online)** và **Máy tính cầm tay**. Dự án được xây dựng dựa trên tiêu chuẩn mã nguồn sạch (Clean Code), tối ưu hóa cấu trúc thư mục, tách biệt hoàn toàn tầng xử lý logic và tầng giao diện.

> 🔗 **Xem Bản Live Demo Tại Đây:** [leo-victor.github.io](https://leo-victor.github.io)

---

## 🛠 Công Nghệ & Công Cụ Sử Dụng

* **Core:** React 18 & TypeScript (Static Typing an toàn).
* **Build Tool:** Vite (Tối ưu tốc độ khởi động hMR và Build nhanh chóng).
* **Routing:** React Router v6 (`HashRouter` để ngăn chặn lỗi 404 khi tải lại trang trên GitHub Pages).
* **Styles & Theme:** CSS Variables kết hợp Context API quản lý trạng thái giao diện.
* **Code Quality:** Tích hợp bộ quy chuẩn định dạng code tự động **Prettier**.
* **Deployment:** Đóng gói và đẩy tự động lên **GitHub Pages** thông qua thư viện `gh-pages`.

---

## ✨ Các Tính Năng Nổi Bật

### 1. Portfolio Cá Nhân (CV Online)
* **Giao diện chuẩn Doanh nghiệp:** Chia nhỏ thành các phân vùng độc lập: *Hero Banner, About Me, Skills, Experience, Education, và Footer*.
* **Tích hợp GitHub API:** Tự động đồng bộ hóa và hiển thị danh sách các Repository công khai trực tiếp từ tài khoản GitHub cá nhân.
* **Xử lý trạng thái thông minh:** Phân tách rõ ràng các trạng thái trải nghiệm người dùng bao gồm: Đang tải dữ liệu (`LoadingState`), Báo lỗi hệ thống (`ErrorState`), và Tự động bắt lỗi giới hạn lượt gọi API (Rate Limit 403, 404).
* **Cuộn trang mượt mà:** Điều hướng nhanh bằng cơ chế `scrollIntoView` mượt mà, không xung đột hệ thống định tuyến Hash.

### 2. Máy Tính Cầm Tay (Modular Calculator)
* Xử lý trọn vẹn các phép tính cơ bản ($+$, $-$, $\times$, $\div$), hỗ trợ số thập phân.
* Tích hợp tính năng xóa từng ký tự cuối (`Backspace ⌫`) và xóa toàn bộ bộ nhớ (`Clear AC`).
* **UI/UX mượt mà:** Chống re-render thừa, tự động co giãn kích thước font chữ trên màn hình hiển thị tránh vỡ giao diện khi chuỗi số quá dài.

### 3. Đồng Bộ Hóa Toàn Cục Giao Diện (Dark/Light Mode)(tính nằng mới thêm)
* Chuyển đổi màu nền hệ thống mượt mà thông qua việc can thiệp trực tiếp vào thẻ `body` của cây DOM.
* Đồng bộ màu sắc theo tone ấm hiện đại cho cả trang chủ Portfolio, hệ thống menu điều hướng Navbar, cho đến các phím bấm của Máy tính cầm tay.

---

## 💡 Khái Niệm ReactJS Cốt Lõi Đã Áp Dụng (Core Concepts)

Dự án này cấu trúc lại hoàn toàn dựa trên các kỹ thuật lập trình nâng cao trong React:

* **State & Props Management:** Quản lý chặt chẽ luồng dữ liệu truyền từ Component cha xuống Component con tái sử dụng thông qua TypeScript Interface nghiêm ngặt.
* **React Hooks cơ bản:** * `useState`: Quản lý linh hoạt bộ nhớ máy tính, trạng thái tải trang và giao diện.
  * `useEffect`: Lắng nghe thay đổi theme toàn cục và kích hoạt hàm gọi dữ liệu bất đồng bộ API từ tầng Custom Hook.
* **Context API (`useContext`):** Khởi tạo `ThemeContext` bọc toàn bộ ứng dụng để xử lý tính năng chuyển đổi giao diện **Dark/Light Mode** đồng bộ, tránh hiện tượng prop drilling lãng phí.
* **Custom Hooks (Cô lập Logic & UI):**
  * `useCalculator`: Gom và bao bọc toàn bộ thuật toán xử lý nút bấm máy tính độc lập.
  * `useFetchProjects`: Đóng gói logic gọi API từ xa, quản lý loading và error state, giúp UI component sạch sẽ, dễ bảo trì.
* **Tối Ưu Hiệu Năng (`useMemo`):** Ứng dụng `useMemo` bên trong `FeaturesSection` nhằm ghi nhớ (cache) mảng danh sách kỹ năng, tránh việc tính toán hoặc re-render lại lãng phí khi thay đổi Dark/Light mode.

---

## 📁 Cấu Trúc Thư Mục Chuẩn Production

```text
src/
├── components/          # Các UI Component độc lập tái sử dụng (Hero, About, Features, Projects...)
│   ├── LoadingState.tsx # Trạng thái chờ dữ liệu từ API
│   └── ErrorState.tsx   # Trạng thái hiển thị khi API lỗi kèm nút "Thử lại"
├── context/             # Quản lý State toàn cục (ThemeContext xử lý Dark/Light mode)
│   └── ThemeContext.tsx
├── data/                # Lưu trữ tập trung toàn bộ dữ liệu tĩnh của Profile (Dễ cập nhật)
│   └── profileData.ts
├── features/            # Các Module chức năng lớn trong ứng dụng
│   └── calculator/      # Tách nhỏ giao diện Máy tính thành các phần độc lập
│       ├── CalculatorButton.tsx  # Component nút bấm (chứa kiểu Type nghiêm ngặt)
│       ├── CalculatorDisplay.tsx # Component màn hình hiển thị số
│       └── calculator.logic.ts   # Tách biệt file thuần xử lý logic thuật toán tính toán
├── hooks/               # Các Custom Hooks xử lý nghiệp vụ, tách rời khỏi tầng UI
│   ├── useCalculator.ts
│   └── useFetchProjects.ts
├── pages/               # Tầng quản lý các trang hiển thị chính (Home Page, Calculator Page)
│   ├── Calculator.tsx
│   ├── Calculator.css
│   └── Home.tsx
├── App.tsx              # Component tổng thiết lập định tuyến hệ thống (Router)
├── index.css            # Quản lý các cấu hình CSS toàn cục và biến màu Dark Mode
└── main.tsx             # Điểm khởi tạo ứng dụng gốc (Entry Point) bọc bởi ThemeProvider

## ⚙️ Cách chạy

```bash
# Cài dependencies
npm install

# Chạy dev
npm run dev

# Build production
npm run build

# Deploy lên GitHub Pages
npm run deploy
```


## 📝 Biến môi trường
Tạo file `.env` ở thư mục gốc: VITE_GITHUB_USERNAME=your_github_username
