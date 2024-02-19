/* eslint-disable no-unused-vars */

import { Form } from "react-router-dom";
import { UserApi } from "../../../store/api";

export default function SignUp() {

  return(
    <>
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
  switch (request.method) {
    case "POST": {
      let formData = await request.formData()
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        passwordConfirm: formData.get("passwordConfirm")
      };
      await UserApi.create(data);
      return true;
    }
    default: {
      throw new Response("", { status: 405 });
    }
  }
}