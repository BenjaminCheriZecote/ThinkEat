import { CiSquarePlus } from "react-icons/ci";
import style from './index.module.css'

const AddPlus = ({handleClick}) => {

    return(
        <CiSquarePlus className={`${style.color}`} size={30} onClick={handleClick}/>
    )
}

export default AddPlus;