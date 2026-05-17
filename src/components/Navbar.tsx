import { NavLink } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">My App</div>
            <ul className="navbar-menu">
                <li>
                    <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
                        Trang chủ</NavLink>
                </li>
                <li>
                    <NavLink to="/calculator" className={({ isActive }) => isActive ? 'active' : ''}>
                        Tính toán</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;