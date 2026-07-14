import styles from './Header.module.css'
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext/CartContext';
import { useAuth } from '../../../context/AuthContext';


function Header() {
    const { getCartQuantity } = useCart();
    const { user, logout } = useAuth();

    const totalItems = getCartQuantity();

    return (
        <header className={styles.header}>
            <h1>Unique Beauty </h1>
            <nav>
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/productos">Productos</Link></li>
                    
                    <li><Link to="/carrito">Carrito 🛒 {totalItems > 0 && <span>{totalItems}</span>}</Link></li>


                    {user ? (
                        <>{user.rol === 'admin' && (
                            <ul>
                                <li className="nav-item"><Link className="nav-link" to="/Gestion">Gestión Productos</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/GestionCupones"> Gestion cupones</Link></li>
                            </ul>
                        )
                        }


                            <span>¡Hola, {user.email}!</span>
                            <button onClick={logout}>Cerrar Sesión</button>
                        </>
                    ) : (
                        <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
}
export default Header;

/*
                    {user ? (
                        <>{}
                            {user.rol === 'admin' && (
                                <li><Link to="/Gestion" style={{ color: 'black' }}>Gestion</Link></li>)}
                            <span>¡Hola, {user.email}!</span>
                            <button onClick={logout}>Cerrar Sesión</button>
                        </>
                    ) : (
                        
                        
                    )}
*/