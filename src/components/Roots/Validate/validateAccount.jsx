/* eslint-disable no-unused-vars */

import { useLoaderData } from "react-router-dom";
import { UserApi } from "../../../store/api";

export default function ValidateAccount() {
  const isValidate = useLoaderData();

  return(
    <>
      <section className='section'>
        <h1>{isValidate ? "Le mail a été validé" : "Une erreur est survenue"}</h1>
      </section>
    </>
  )
}

export async function validateAccountLoader({ request, params }) {
  return UserApi.validateAccount(params.uuid);
}