import { useState } from "react"
import ModalResetPassword from "./ModalResetPassword";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Account = () => {

    const [profil] = useState(JSON.parse(localStorage.getItem("user")))
    const [openCloseModal, setOpenCloseModal] = useState(false);
    const {isConnected} = useSelector((state) => state.session);
    const navigate = useNavigate();

    const handleClickResetPassword = (event) => {
        event.preventDefault();
        setOpenCloseModal(true);
    }

    // if (!isConnected) {
    //     navigate("/");
    // }

    return(
        <section className="sectionProfile">
            <h2>Account</h2>
            {isConnected?
                <form action="" className="section__mainProfile ">
                    <label htmlFor="name">
                        Name
                        <input type="text" id="name" value={profil.name}/>
                    </label>

                    <label htmlFor="email">
                        Email
                        <input type="email" id="email" value={profil.email}/>
                    </label>
                    <label htmlFor="password">
                        Mot de passe
                        <input type="password" id="password" defaultValue="password"/>
                        <button onClick={handleClickResetPassword}>Changer le mot de passe</button>
                    </label>

                </form>
                :
                ""
            }

            {openCloseModal?
                <ModalResetPassword setOpenCloseModal={setOpenCloseModal}/>
                :
                ""
            }

        
        </section>
    )
}

export default Account;