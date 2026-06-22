import styles from './Header.module.css'
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext/CartContext';

function Header() {
    const { getCartQuantity } = useCart();
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
                    {/* <li><Link to="/Iniciar sesion">Iniciar sesion</Link></li> */}
                    <li><Link to="/carrito">Carrito 🛒 {totalItems > 0 && <span>{totalItems}</span>}</Link></li>
                </ul>
            </nav>
        </header>
    );
}
export default Header;