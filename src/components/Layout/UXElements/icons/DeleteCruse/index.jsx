import { CiCircleRemove } from "react-icons/ci";
import style from "./index.module.css"

const DeleteCruse = ({handleClick}) => {

    return(
        <CiCircleRemove className={`${style.color}`}  onClick={handleClick}/>
    )
}

export default DeleteCruse;