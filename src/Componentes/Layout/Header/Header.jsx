import styles from './Header.module.css'
import { Link } from 'react-router-dom';


function Header() {
    return (
        <header className={styles.header}>
            <h1>Bienvenidos a mi App React</h1>
            <nav>
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/productos">Productos</Link></li>
                    <li><Link to="/destacados">Productos D</Link></li>
                    <li><Link to="/Nuevo Producto">Nuevo Producto</Link></li>
                    {/* <li><Link to="/Iniciar sesion">Iniciar sesion</Link></li> */}
                    <li><Link to="/Carrito">Carrito</Link></li>
                </ul>
            </nav>
        </header>
    );
}
export default Header;