import { Form, Link } from 'react-router-dom';

export default function SignIn() {

  return (
    <main className='outlet scrollBarNone'>
      <Form className='section__form' method="post">
        <h2 className='section-form__h2'>Se connecter</h2>
        <div className='section-form__div input-box'>
          <input type="email" name="email" id="email" placeholder='Email'/>
        </div>
        <div className='section-form__div'>
          <input type="password" name="password" id="password" placeholder='******'/>
        </div>

        <Link className='section-form__link' to="/reset-password"> Mot de passe oublié ? </Link>
        <Link className='section-form__link' to="/signup">Pas encore de compte ? Créer un compte</Link>

        <button className='section-form__btn'>Connection</button>

      </Form>
    </main>
  )
}