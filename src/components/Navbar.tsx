import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

function Navbar() {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="navbar">
            <div className="navbar-brand">My App</div>
            <ul className="navbar-menu">
                <li>
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Trang chủ
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/calculator"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Tính toán
                    </NavLink>
                </li>
                <li>
                    <button className="theme-toggle" onClick={toggleTheme}>
                        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
