/* eslint-disable no-unused-vars */

import { Form } from "react-router-dom";
import { UserApi } from "../../../store/api";

export default function SignUp() {

  return(
    <>
      <section className='section'>
        <Form className='section__form' method='POST'>
          <h2 className='section-form__h2'>Compte</h2>
          <div className='section-form__divLastName'>
            <label htmlFor="name">Nom :</label>
            <input type="text" id="name" name="name"/>
          </div>
          <div className='section-form__divEmail'>
            <label htmlFor="email">Email :</label>
            <input type="email" id="email" name="email"/>
          </div>

          <div className='section-form__divPassword'>
            <label htmlFor="password">Mot de passe :</label>
            <input type="text" id="password" name="password"/>
          </div>
          <div className='section-form__divPassword'>
            <label htmlFor="passwordConfirm">Mot de passe :</label>
            <input type="text" id="passwordConfirm" name="passwordConfirm"/>
          </div>

          <button className='section_form--btn' type="submit">Créer un compte</button>

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
      UserApi.create(data);
      return true;
    }
    default: {
      throw new Response("", { status: 405 });
    }
  }
}