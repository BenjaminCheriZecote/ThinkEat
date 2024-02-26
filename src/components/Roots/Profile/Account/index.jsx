import { useSelector } from "react-redux";
import { Form, redirect, useSubmit } from "react-router-dom";

import { CiTrash } from "react-icons/ci";
import style from "./index.module.css"


import store from "../../../../store/index.jsx"
import { UserApi } from "../../../../api.js"
import UserValidator from "../../../../helpers/validators/user.validator.js"
import toast from "../../../../helpers/toast.js";
import { useRef, useState } from "react";

export default function Account() {
  const submit = useSubmit();
  const submitRef = useRef(null);
  const session = useSelector((state) => state.session);
  const [inChange, setInChange] = useState(null);
  const [value, setValue] = useState("");

  function clickHandler(event) {
    setValue("");
    setInChange(event.target.dataset.inputId);
  }
  function changeValue(event) {
    setValue(event.target.value);
  }
  function submitHandler() {
    if (inChange !== "delete") {
      submit({inChange:value},{method: "patch"})
    } else {
      submit({email:value},{method: "delete"})
    }
    setValue("");
    setInChange(null);
  }

  return(
    <main className={`${style.main} sectionProfile sectionProfile--Main`}>
      <h2>Compte</h2>
      <Form ref={submitRef} className={style.form} method="patch" onSubmit={submitHandler}>
        <fieldset>
          
            <label htmlFor="name">Nom :</label>
            <input type="text" id="name" value={inChange !== "name" ? session.name : value} onChange={changeValue} disabled={inChange !== "name" ? true : false}/>
         
          
          {inChange !== "name" ?
          <>
            <button type="button" data-input-id="name" onClick={clickHandler} >Changer</button>
          </>
          :
          <>
            <button type="button" data-input-id={null} onClick={clickHandler} >Annuler</button>
            <button data-input-id="name" >Valider</button>
          </>
          }
        </fieldset>

        <fieldset>
          <label htmlFor="email">Email :</label>
          <input type="email" id="email" value={inChange !== "email" ? session.email : value} onChange={changeValue} disabled={inChange !== "email" ? true : false}/>
          {inChange !== "email" ?
          <>
            <button type="button" data-input-id="email" onClick={clickHandler} >Changer</button>
          </>
          :
          <>
            <button type="button" data-input-id={null} onClick={clickHandler} >Annuler</button>
            <button data-input-id="email" >Valider</button>
          </>
          }
        </fieldset>

        <fieldset>
          <label htmlFor="password">Mot de passe :</label>
          <input type="password" id="password" value={inChange !== "password" ? "*******" : value} onChange={changeValue} disabled={inChange !== "password" ? true : false}/>
          {inChange !== "password" ?
          <>
            <button type="button" data-input-id="password" onClick={clickHandler} >Changer</button>
          </>
          :
          <>
            <button type="button" data-input-id={null} onClick={clickHandler} >Annuler</button>
            <button data-input-id="password" >Valider</button>
          </>
          }
        </fieldset>

        <fieldset className={style.fieldDelete}>
          
          {inChange !== "delete" ?
          <>
            <h3>Supprimer mon compte</h3>
            <button type="button" className={style.btnDelete} data-input-id="delete" onClick={clickHandler} ><CiTrash size={28} /></button>
          </>
          :
          <>
            <input type="email" placeholder="Entrez votre email." value={value} onChange={changeValue} />
            <button type="button" data-input-id={null} onClick={clickHandler} >Annuler</button>
            <button data-input-id="password" >Valider</button>
          </>
          }
        </fieldset>
      </Form>
    </main>
  )
}

export async function accountAction({request}) {
  try {
    const {session} = store.getState();
    switch (request.method) {
      case "patch": {
        const formData = await request.formData();
        let data = {
          name: formData.get("name"),
          email: formData.get("email")
        };

        data = UserValidator.checkBodyForUpdate(data)

        await UserApi.update(data);

        toast.success("Mise à jour du compte effectué avec succès.")
        return null
      }
      case "DELETE": {
        const formData = await request.formData();
        if (session.email !== formData.get("email")) {
          throw new Error("Vous avez rentrer une mauvaise adresse mail.");
        }
        await UserApi.delete(session.id)
        store.dispatch({type:"SIGNOUT"});

        toast.success("Suppression du compte effectué avec succès.\nVous allez être redirigé.")
        await new Promise(r => setTimeout(r, 3200));
        return redirect("/");
      }
      default: {
        throw new Response("Invalide methode", { status: 405 });
      }
    }
  } catch (error) {
    toast.error(error);
    return {error};
  }
}