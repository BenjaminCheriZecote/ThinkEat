import CancelCruse from "../../../icons/CancelCruse";
import { useDispatch, useSelector } from "react-redux";


const OptionChosen = ({choosen, itemName}) => {

  const dispatch = useDispatch()
  const stateBranch = useSelector((state) => state[itemName]);
  const choices = stateBranch[`${itemName}Choices`];
  const handleClickOption = () => {
    const newArray = choices.filter((element) => element !== choosen);
    dispatch({type:`SET_${itemName.toUpperCase()}_CHOICES`, payload:newArray})
  }

    return(
        <li className="optionChosen">
          <p>{choosen[1]}</p>
          <CancelCruse className="optionChosen__cancel" size={10} onClick={handleClickOption} color={"white"}/>
        </li>
    )

}

export default OptionChosen;