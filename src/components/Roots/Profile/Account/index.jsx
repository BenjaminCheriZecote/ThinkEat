import { useSelector } from "react-redux";
import { Form } from "react-router-dom";

import { CiTrash } from "react-icons/ci";
import style from "./index.module.css"

export default function Account() {
  const session = useSelector((state) => state.session);

  return(
    <main className={style.main}>
      <h2>Compte</h2>
      <Form className={style.form} method="update">
        <fieldset>
          <label htmlFor="name">Nom :</label>
          <input type="text" id="name" value={session.name} disabled/>
          <button >Changer</button>
        </fieldset>

        <fieldset>
          <label htmlFor="email">Email :</label>
          <input type="email" id="email" value={session.email} disabled/>
          <button>Changer</button>
        </fieldset>

        <fieldset>
          <label htmlFor="password">Mot de passe :</label>
          <input type="password" id="password" value="*******" disabled/>
          <button>Changer</button>
        </fieldset>

        <fieldset className={style.fieldDelete}>
          <h3>Supprimer mon compte</h3>
          <button className={style.btnDelete}><CiTrash size={28} /></button>
        </fieldset>
      </Form>
    </main>
  )
}