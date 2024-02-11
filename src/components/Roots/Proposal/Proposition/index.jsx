import { MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { FaPerson } from "react-icons/fa6";

import './Proposition.scss'

const Proposition = ({proposition}) => {

    const handleClickDeleteProposition = (event) => (
        proposition.validate = false,
        // event.target.closest("li").style.backgroundColor = "grey",
        event.target.closest("li").style.filter= "grayscale(70%)"
    );

    const handleClickValidateProposition = () => {
        proposition.validate = true,
        // event.target.closest("li").style.backgroundColor = "white",
        event.target.closest("li").style.filter= "grayscale(0%)"
    }

    return(
        <li className={proposition.validate? "liProposotion validate":"liProposotion unvalidate"}>
            <div className="liProposotion__imgContainer">
                <img src={proposition.image} alt="" />
            </div>
            <p className="liProposotion__p--name">{proposition.name}</p>

            <div className="liProposotion__choiceBox">
                {/* <FaPerson /> */}
                <FaCheck onClick={handleClickValidateProposition} />
                <MdCancel onClick={handleClickDeleteProposition} />
                
            </div>
        </li>

    )
}

export default Proposition;