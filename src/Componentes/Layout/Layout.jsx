import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";


function Layout ({ children }) {
    return (
        <div>
            <Header />
            <main className="container my-4">
                {children}
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
const styles= {

}
export default Layout;

//se puede sacar el children ya que se asociaria a cada pagina, depenede de como quiera hacerlo