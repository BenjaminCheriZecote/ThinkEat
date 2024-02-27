import { Form, Link, redirect} from 'react-router-dom';
import toast from "../../../helpers/toast.js"

import store from '../../../store';
import { UserApi } from "../../../api.js"
import UserValidator from '../../../helpers/validators/user.validator';
import types from '../../../store/reducers/types/index.jsx';

export default function SignIn() {

  return (
    <main className='section outlet'>
      <Form className='section__form' method="post">
        <h2 className='section-form__h2'>Se connecter</h2>
        <div className='section-form__div input-box'>
          <input type="email" name="email" id="email" placeholder='Email'/>
        </div>
        <div className='section-form__div'>
          <input type="password" name="password" id="password" placeholder='******'/>
        </div>

        <Link to="/reset-password"> Mot de passe oublié ? </Link>
        <Link to="/signup">Pas encore de compte ? Créer un compte</Link>

        <button className='section-form__btn'>Connection</button>

      </Form>
    </main>
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
      UserValidator.checkBodyForSignIn(idConnection)
      
      const user = await UserApi.signin(idConnection)
      store.dispatch({type:"SIGNIN", payload:user});

      toast.success("Connexion réussie.\nVous allez être redirigé.")
      await new Promise(r => setTimeout(r, 3200));
      return redirect("/");
    }
    default: {
      throw new Response("Invalide methode", { status: 405 });
    }
  }
}

export function signinLoader(){

  store.dispatch({type:types.SET_IS_ASIDE_FALSE});
  
return null
}