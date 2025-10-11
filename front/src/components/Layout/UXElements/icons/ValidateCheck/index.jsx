import { BsCheckCircleFill } from "react-icons/bs";


import style from "./index.module.css"

const ValidateCheck = ({handleClick, size, color}) => {

    return(
        <BsCheckCircleFill onClick={handleClick} size={size} color={color} className=""/>
    )
}

export default ValidateCheck;