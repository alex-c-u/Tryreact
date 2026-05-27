import styles from './Footer.module.css'
import Directorio from '../../Equipo/Directorio';

function Footer(){
    return(
        <footer>
            <h5>Todo electro</h5>
            <p>En todo electro somos los principales provedores de equipos electronicos para el uso diario</p>
            <p>Tambien contamos con desarrolladores web</p>
            <Directorio/>
        </footer>
    )
}


export default Footer;