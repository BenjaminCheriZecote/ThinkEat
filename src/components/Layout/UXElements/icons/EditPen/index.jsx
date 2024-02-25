import { CiEdit } from "react-icons/ci";
import style from './index.module.css'

const EditPen = ({handleClick}) => {


    return(
        <CiEdit onClick={handleClick} className={`${style.color}`}/>
    )
}

export default EditPen;