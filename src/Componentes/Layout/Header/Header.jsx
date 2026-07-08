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
            <h1>Todo electro</h1>
            <nav>
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/productos">Productos</Link></li>
                    {/* <li><Link to="/destacados">Productos D</Link></li> */}
                    <li><Link to="/Nuevo Producto">Nuevo Producto</Link></li>
                    <li><Link to="/carrito">Carrito 🛒 {totalItems > 0 && <span>{totalItems}</span>}</Link></li>                    
                    {user ? (
                        <>{/* Mostrar Gestion SOLO si el usuario es admin */}
                            {user.rol === 'admin' && (
                                <li><Link to="/alta" style={{ color: 'black' }}>Gestion</Link></li>)}
                            <span>¡Hola, {user.email}!</span>
                            <button onClick={logout}>Cerrar Sesión</button>
                        </>
                    ) : (
                        <li><Link to="/Login">Login</Link></li>
                        
                    )}
                    {/* <li><Link to="/Registro">Registrate</Link></li>   No se si llego a hacer una ruta bonita*/}
                </ul>
            </nav>
        </header>
    );
}
export default Header;