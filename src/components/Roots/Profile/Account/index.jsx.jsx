import { useState } from "react"
import ModalResetPassword from "./ModalResetPassword";

import { CiTrash } from "react-icons/ci";

import { useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";


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
        <section className="sectionProfile sectionProfile--Main">
            <h2>Compte</h2>
            {isConnected &&
                <Form action="" className="section__mainProfile ">
                    <fieldset>
                        <div>
                            <label htmlFor="name">
                                Nom :
                            </label>
                            <input type="text" id="name" value={profil.name} disabled/>

                        </div>
                        <button >Changer</button>

                    </fieldset>

                    <fieldset>
                        <div>
                            <label htmlFor="email">
                                Email :
                            </label>
                            <input type="email" id="email" value={profil.email} disabled/>
                        </div>
                        <button >Changer</button>
                    </fieldset>

                    <fieldset>
                        <div>
                            <label htmlFor="password">
                                Mot de passe :
                            </label>
                            <input type="password" id="password" value="*******" disabled/>
                        </div>
                        <button onClick={handleClickResetPassword}>Changer</button>
                    </fieldset>

                    <footer >

                        <div className="footerDelete">
                            <p>Supprimer mon compte</p> <button className="btnDelete" onClick={handleClickResetPassword}><CiTrash /></button>
                        </div>
                        
      
                    </footer>

                </Form>}

            {openCloseModal?
                <ModalResetPassword setOpenCloseModal={setOpenCloseModal}/>
                :
                ""
            }

        
        </section>
    )
}

export default Account;