
import { UserApi } from "../../../../../api"
import { Form} from 'react-router-dom';

import CancelCruse from "../../../../Layout/UXElements/icons/CancelCruse";
import { useSelector } from "react-redux";
import UserValidator from "../../../../../helpers/validators/user.validator";
import toast from "../../../../../helpers/toast";
import eh from '../../../../../helpers/errorHandler';

const ModalResetPassword = ({setOpenModal}) => {
    
    const {email} = useSelector((state) => state.session);
    

    const handleSubmitResetPassword = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const dataForm = Object.fromEntries(formData);
        const {actualPassword, password, passwordConfirm} = dataForm;

        UserValidator.checkBodyForSignIn({email:email, password:actualPassword});

        UserValidator.checkBodyForUpdatePassword({password, passwordConfirm});

        dataForm.email = email;
        await UserApi.updatePassword(dataForm);
        toast.success("Mot de passe modifié avec succès.");
        setTimeout(() => {
            setOpenModal(false);
          }, 1700);
    }

    return(
        <div className="backdrop">
                <Form className="modalProfil modal formResetPassword section__form" onSubmit={eh(handleSubmitResetPassword)} >
                    <div className="">
                        <label htmlFor="actualPassword">
                            Mot de passe :
                        </label>
                        <input id="actualPassword" type="password" name="actualPassword" placeholder="******"/>
                    </div>

                    <div className="">
                        <label htmlFor="password">
                            Nouveau :
                        </label>
                        <input id="password" type="password" name="password" placeholder="******"/>
                    </div>

                    <div className="">
                        <label htmlFor="passwordConfirm">
                            Confirmation :
                        </label>
                        <input id="passwordConfirm" type="password" name="passwordConfirm" placeholder="******"/>
                    </div>

                    <button className="section-form__btn">Valider</button>
                    <CancelCruse className="cancelModal" handleClick={() => setOpenModal(false)} size={20} color={"#D70D0D"}/>
                </Form>
            
        </div>
    )
}

export default ModalResetPassword;