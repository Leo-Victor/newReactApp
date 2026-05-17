import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar.tsx'
import Home from './pages/Home.tsx'
import Calculator from './pages/Calculator.tsx';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
      </Routes>
      {/* Các trang khác */}
    </BrowserRouter>
  );
}

export default App;