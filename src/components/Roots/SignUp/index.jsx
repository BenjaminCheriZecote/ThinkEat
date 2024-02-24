/* eslint-disable no-unused-vars */

import { Form, redirect } from "react-router-dom";
import { UserApi } from "../../../api"
import UserValidator from "../../../helpers/validators/user.validator";
import toast from "../../../helpers/toast";
import store from "../../../store";
import types from "../../../store/reducers/types";

export default function SignUp() {
  return(
    <main className='section outlet'>
      <Form className='section__form' method='POST'>
        <h2 className='section-form__h2'>Créer un compte</h2>
        <div className='section-form__div'>
          <input type="text" id="name" name="name" placeholder='Nom'/>
        </div>
        <div className='section-form__div'>
          <input type="email" id="email" name="email" placeholder='email'/>
        </div>

        <div className='section-form__div'>
          <label htmlFor="password">Mot de passe :</label>
          <input type="text" id="password" name="password" placeholder='******'/>
        </div>
        <div className='section-form__div'>
          <label htmlFor="passwordConfirm">Confirmer le mot de passe :</label>
          <input type="text" id="passwordConfirm" name="passwordConfirm" placeholder='******'/>
        </div>

        <button className='section-form__btn' type="submit">Créer un compte</button>

      </Form>
    </main>
  )
}

export async function signUpAction({ request, params }) {
  try {
    switch (request.method) {
      case "POST": {
        let formData = await request.formData()
        const data = {
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
          passwordConfirm: formData.get("passwordConfirm")
        };

        UserValidator.checkBodyForCreate(data)

        await UserApi.create(data);

        toast.success("Inscription effectué avec succès.\nVous allez être redirigé.")
        await new Promise(r => setTimeout(r, 3200));
        return redirect("/");
      }
      default: {
        throw new Response("Invalide methode", { status: 405 });
      }
    }
  } catch (error) {
    toast.error(error);
    return {error};
  }
}

export function signupLoader(){

  store.dispatch({type:types.SET_IS_ASIDE_FALSE});
  // const headerElement = document.querySelector("#header");
  //   console.log(headerElement)
  //   headerElement.style.gridColumn = "1 /-1";

  //   const footerElement = document.querySelector("#footer");
  //   footerElement.style.gridColumn = "1 /-1";

  //   const outletsElements = document.querySelectorAll(".outlet");
  //   outletsElements.forEach((element) => {
  //       element.style.gridColumn = "1 /-1";
  //   })
  
return null
}