import { CiTrash } from "react-icons/ci";
import style from "./index.module.css"

const DeleteTrash = ({handleClick, size, dataInputId}) => {

    return(
        <CiTrash className={`${style.color}`}  onClick={handleClick} size={size} data-input-id={dataInputId}/>
    )
}

export default DeleteTrash;