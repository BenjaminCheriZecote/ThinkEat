import { useState } from 'react';
import { Form, redirect} from 'react-router-dom';

import { UserApi } from '../../../store/api';


export default function ResetPassword() {

  const [error, setError] = useState("");


  return(
    <>
      <section className='section'>
        <Form className='section__form' method="post">
          <h2 className='section-form__h2'>Connection</h2>
          <div className='section-form__divEmail'>
            <label htmlFor="email">Email :</label>
            <input type="email" name="email" id="email"/>
            {error?
              <p>{error}</p>
              :
              ""
            }
          </div>

          <button className='section-form__btn' type="submit">Envoyer</button>

        </Form>
      </section>
    </>
  )
}

export async function ResetPasswordAction({ request }) {
  switch (request.method) {
    case "POST": {
      let formData = await request.formData();
      const email = formData.get("email");
      await UserApi.RequestResetPasword({email});

      return redirect("/signin");
    }
    default: {
      throw new Response("", { status: 405 });
    }
  }
}