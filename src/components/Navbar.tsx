import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useState } from 'react';
import './Navbar.css';
//import React from 'react';
// 1. Nhập ảnh trực tiếp
import myImage from '../assets/Leo-Victor(new).png';

function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-logo" onClick={() => navigate('/')}>
                <img src="/logo.png" alt="logo" className="navbar-logo-img"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <span className="navbar-brand"><img src={myImage} alt="Mô tả ảnh" /></span>
            </div>
            <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
                <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}
                    onClick={() => setMenuOpen(false)}>Trang chủ</NavLink></li>
                <li><NavLink to="/calculator" className={({ isActive }) => isActive ? 'active' : ''}
                    onClick={() => setMenuOpen(false)}>Tính toán</NavLink></li>
                <li><NavLink to="/game" className={({ isActive }) => isActive ? 'active' : ''}
                    onClick={() => setMenuOpen(false)}>🎮 Game</NavLink></li>
                <li><NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}
                    onClick={() => setMenuOpen(false)}>Liên hệ</NavLink></li>
            </ul>

            {/* Right side */}
            <div className="navbar-right">
                <button className="theme-toggle" onClick={toggleTheme}>
                    {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                </button>
                {/* Hamburger mobile */}
                <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    <span></span><span></span><span></span>
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
