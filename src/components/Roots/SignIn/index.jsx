import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Link, useActionData, useNavigate } from 'react-router-dom';

import { UserApi } from '../../../store/api';
import store from '../../../store';

export default function SignIn() {
  const [error, setError] = useState("");
  const user = useActionData();
  // const navigate = useNavigate();
  const user2 = useSelector((state) => state.session);

  if (user) {
    console.log(user);
    console.log(user2);
    // navigate("/");
  }

  return(
    <>
      <section className='section'>
        <Form className='section__form' method="post">
          <h2 className='section-form__h2'>Connection</h2>
          <div className='section-form__divEmail'>
            <label htmlFor="email">Email :</label>
            <input type="email" name="email" id="email"/>
          </div>

          <div className='section-form__divPassword'>
            <label htmlFor="password">Mot de passe :</label>
            <input type="password" name="password" id="password"/>
            {error?
              <p>{error}</p>
              :
              ""
            }
          </div>

          <Link to="/reset-password"> Mot de passe oublié ? </Link>
          <Link to="/signup">Pas encore de compte ? Créer un compte</Link>

          <button className='section-form__btn' type="submit">Connection</button>

        </Form>
      </section>
    </>
  )
}


export async function signInAction({ request, params }) {
  switch (request.method) {
    case "POST": {
      let formData = await request.formData()
      const payload = {
        email: formData.get("email"),
        password: formData.get("password")
      };
      store.dispatch({type:"SIGNIN", payload})

      return null;
    }
    default: {
      throw new Response("", { status: 405 });
    }
  }
}