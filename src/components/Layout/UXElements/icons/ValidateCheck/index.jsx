import { CiCircleCheck } from "react-icons/ci";


import style from "./index.module.css"

const ValidateCheck = () => {

    return(
        <CiCircleCheck className={`${style.color} ${style.size}`}/>
    )
}

export default ValidateCheck;