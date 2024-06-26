import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Form, useSubmit } from "react-router-dom";
import ModalResetPassword from "./ModalResetPassword";

import DeleteTrash from "../../../Layout/UXElements/icons/DeleteTrash";
import style from "./index.module.css"


export default function Account() {
  const submit = useSubmit();
  const submitRef = useRef(null);
  const session = useSelector((state) => state.session);
  const [inChange, setInChange] = useState(null);
  const [value, setValue] = useState("");
  const [openModal, setOpenModal] = useState(false);

  function clickHandler(event) {
    setValue("");
    setInChange(event.target.dataset.inputId);
  }
  const styleOptionBorder = {
    borderBottom:"1px black solid"
  }
  function changeValue(event) {
    setValue(event.target.value);
  }
  function submitHandler(event) {
    event.preventDefault();
    if (inChange !== "delete") {
      const data = {};
      data[inChange] = value;
      submit(data,{method: "patch"})
    } else {
      submit({email:value},{method: "delete"});
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
            <input type="text" id="name" value={inChange !== "name" ? session.name : value} onChange={changeValue} disabled={inChange !== "name" ? true : false} style={inChange === "name" ?styleOptionBorder:{}}/>
         
          
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
          <input type="email" id="email" value={inChange !== "email" ? session.email : value} onChange={changeValue} disabled={inChange !== "email" ? true : false} style={inChange === "email" ?styleOptionBorder:{}}/>
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
          <input type="password" id="password" defaultValue={"*******"}  disabled/>
          <button type="button" data-input-id="password" onClick={() => setOpenModal(true)} >Changer</button>
        </fieldset>

        <fieldset className={style.fieldDelete}>
          
          {inChange !== "delete" ?
          <>
            <h3>Supprimer mon compte</h3>
            <button type="button" className={style.btnDelete} data-input-id="delete" onClick={clickHandler} aria-label="Bouton pour supprimer son compte."><DeleteTrash size={28} dataInputId={"delete"}/></button>
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

      {openModal && 
        <ModalResetPassword setOpenModal={setOpenModal}/>
      }
    </main>
  )
}