import { Form, Link, redirect, useActionData} from 'react-router-dom';

import store from '../../../store';
import { UserApi } from '../../../store/api';

export default function SignIn() {

  const error = useActionData();

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
            {!!error && <p>{error}</p>}
          </div>

          <Link to="/reset-password"> Mot de passe oublié ? </Link>
          <Link to="/signup">Pas encore de compte ? Créer un compte</Link>

          <button className='section-form__btn' type="submit">Connection</button>

        </Form>
      </section>
    </>
  )
}


export async function signInAction({ request }) {
  switch (request.method) {
    case "POST": {
      let formData = await request.formData()
      const idConnection = {
        email: formData.get("email"),
        password: formData.get("password")
      };
      const user = await UserApi.signin(idConnection)
      if (!user) {
        return "Erreur de connexion"
      }
      store.dispatch({type:"SIGNIN", payload:user});
      return redirect("/");
    }
    default: {
      throw new Response("", { status: 405 });
    }
  }
}