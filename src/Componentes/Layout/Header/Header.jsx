import styles from './Header.module.css'

function Header() {
    return (
        <header className={styles.header}>
            <h1>Bienvenidos a mi App React</h1>
            <li>
                <a href="#">inicio</a>
                <a href="#">Productos</a>
                <a href="#">iniciar sesion</a>
            </li>
        </header>
    );
}
export default Header;