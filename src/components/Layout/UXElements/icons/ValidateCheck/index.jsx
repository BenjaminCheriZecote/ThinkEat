import { CiCircleCheck } from "react-icons/ci";
import { IoCheckmarkCircle } from "react-icons/io5";


import style from "./index.module.css"

const ValidateCheck = ({handleClick}) => {

    return(
        <CiCircleCheck className={`${style.color} ${style.size}`} onClick={handleClick}/>
    )
}

export default ValidateCheck;