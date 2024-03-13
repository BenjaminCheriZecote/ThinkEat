import store from "../../../store";
import types from "../../../store/reducers/types";
import Nav from "./Nav/Index";
import { Outlet } from "react-router-dom";
import './Profile.css'

export default function Profil() {
  return(
    <main className="section app-wrapper">
        <Nav />
        <Outlet />
    </main>
  )
}

export async function profilLoader(){

  store.dispatch({type:types.SET_IS_ASIDE_FALSE});
  
  return null
}