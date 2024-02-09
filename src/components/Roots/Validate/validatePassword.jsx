/* eslint-disable no-unused-vars */

import { Form } from "react-router-dom";
import { UserApi } from "../../../store/api";

export default function ValidatePassword() {

  return(
    <>
      <section className='section'>
        <Form className='section__form' method='POST'>
          
          <div className='section-form__divPassword'>
            <label htmlFor="password">Nouveau mot de passe :</label>
            <input type="text" id="password" name="password"/>
          </div>
          <div className='section-form__divPassword'>
            <label htmlFor="passwordConfirm">Confirmé le mot de passe :</label>
            <input type="text" id="passwordConfirm" name="passwordConfirm"/>
          </div>

          <button className='section_form--btn' type="submit">Valider votre nouveau mot de passe</button>

        </Form>
      </section>
    </>
  )
}

export async function validatePasswordAction({ request, params }) {
  switch (request.method) {
    case "POST": {
      let formData = await request.formData()
      const data = {
        password: formData.get("password"),
        passwordConfirm: formData.get("passwordConfirm")
      };
      await UserApi.validatePassword(params.uuid ,data);
      return true;
    }
    default: {
      throw new Response("", { status: 405 });
    }
  }
}