import { MdCancel } from "react-icons/md";


const CancelCruse = ({handleClick, size, className, color}) => {

    return(
        <MdCancel className={className} style={{color:color}} onClick={handleClick} size={size}/>
    )
}

export default CancelCruse;