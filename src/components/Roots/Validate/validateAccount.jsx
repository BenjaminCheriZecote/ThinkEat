import { useLoaderData, useNavigate } from "react-router-dom";
import { UserApi } from "../../../store/api";
import UserValidator from "../../../helpers/validators/user.validator";

export default function ValidateAccount() {
  const error = useLoaderData();
  const navigate = useNavigate();

  setTimeout(() => navigate("/"), 4000)

  return(
    <>
      <section className='section'>
        <h1>{!error ? "Le mail a été validé" : error}</h1>
      </section>
    </>
  )
}

export async function validateAccountLoader({ request, params }) {
  try {
    UserValidator.checkUuid(params);

    await UserApi.validateAccount(params.uuid);
    return;
  } catch (error) {
    return error.message;
  }
}