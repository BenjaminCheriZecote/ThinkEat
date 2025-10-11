/* eslint-disable no-unused-vars */

import { Form, redirect } from "react-router-dom";


export default function ValidatePassword() {

  return(
    <main className='outlet'>
      <Form className='section__form' method='POST'>
        
        <div className='section-form__div'>
          <label htmlFor="password">Nouveau mot de passe :</label>
          <input type="password" id="password" name="password" placeholder="******"/>
        </div>
        <div className='section-form__div'>
          <label htmlFor="passwordConfirm">Confirmé le mot de passe :</label>
          <input type="password" id="passwordConfirm" name="passwordConfirm" placeholder="******"/>
        </div>

        <button className='section-form__btn' type="submit">Valider votre nouveau mot de passe</button>

      </Form>
    </main>
  )
}