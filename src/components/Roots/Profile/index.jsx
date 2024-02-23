import Nav from "./Nav/Index";
import { Outlet } from "react-router-dom";

export default function Profil() {
  return(
    <>
      <Nav />
      <Outlet />
    </>
  )
}