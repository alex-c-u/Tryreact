import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import TarjetaProducto from "../TarjetaProducto/TarjetaProducto";

function Layout ({ children }) {
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
            <footer />
        </div>
    );
}
const styles= {

}
export default Layout;