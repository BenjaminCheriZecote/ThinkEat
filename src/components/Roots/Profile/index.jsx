
import Header from "../../Layout/Partials/Header";
import Nav from "./Nav/Index";
import { Outlet } from "react-router-dom";



const Profil = () => {

    return(
        <>
            <Header />
            <div className="section app">
                <Nav />
                <Outlet className=""/>
            </div>
        </>

    )
}

export default Profil;