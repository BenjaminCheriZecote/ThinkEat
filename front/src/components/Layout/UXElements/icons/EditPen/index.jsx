import { CiEdit } from "react-icons/ci";
import style from './index.module.css'

const EditPen = ({handleClick, size}) => {


    return(
        <CiEdit onClick={handleClick} className={`${style.color}`} size={size} style={{color:"var(--colorFont1)"}}/>
    )
}

export default EditPen;