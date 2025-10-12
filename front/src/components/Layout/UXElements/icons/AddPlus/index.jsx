import { BsPlusSquareFill } from "react-icons/bs";


const AddPlus = ({handleClick, size, color}) => {

    return(
        <BsPlusSquareFill  size={size} onClick={handleClick} style={{color:color, cursor: "pointer"}}/>
        
    )
}

export default AddPlus;