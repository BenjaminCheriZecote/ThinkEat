import { MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { FaPerson } from "react-icons/fa6";

import './Proposition.scss'

const Proposition = ({proposition}) => {

    const handleClickDeleteProposition = (event) => (
        event.target.closest("li").style.backgroundColor = "grey",
        console.log("")
    );

    const handleClickValidateProposition = () => {
        event.target.closest("li").style.backgroundColor = "white"
    }

    return(
        <li className="section-ulContainerProposal__li">
            <p className="section-ulContainerProposal-li__p--name">{proposition.name}</p>
            <p className="section-ulContainerProposal-li__p--hungry">{proposition.hungry}</p>
            <p className="section-ulContainerProposal-li__p--cookingTime">{proposition.cooking_time}</p>

            <div className="section-ulContainerProposal-li__choiceBox">
                {/* <FaPerson /> */}
                <FaCheck onClick={handleClickValidateProposition} />
                <MdCancel onClick={handleClickDeleteProposition} />
            </div>
        </li>

    )
}

export default Proposition;