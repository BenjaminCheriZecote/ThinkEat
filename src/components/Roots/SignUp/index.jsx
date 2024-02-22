/* eslint-disable no-unused-vars */

import { Form, redirect, useActionData } from "react-router-dom";
import { UserApi } from "../../../store/api";
import UserValidator from "../../../helpers/validators/user.validator";

export default function SignUp() {
  const error = useActionData();
  return(
    <>
      {error && <h1>{error}</h1>}
      <section className='section'>
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
      </section>
    </>
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

        return redirect("/");
      }
      default: {
        throw new Response("Invalide methode", { status: 405 });
      }
    }
  } catch (error) {
    return error.message;
  }
}