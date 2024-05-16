import { CiCircleCheck } from "react-icons/ci";
import { IoCheckmarkCircle } from "react-icons/io5";
import { BsCheckCircleFill } from "react-icons/bs";


import style from "./index.module.css"

const ValidateCheck = ({handleClick, size, color}) => {

    return(
        <BsCheckCircleFill onClick={handleClick} size={size} color={color}/>
    )
}

export default ValidateCheck;