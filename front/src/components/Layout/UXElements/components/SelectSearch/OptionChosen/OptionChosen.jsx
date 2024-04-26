import { MdCancel } from "react-icons/md";
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
          <MdCancel className="optionChosen__cancel" size={10} onClick={handleClickOption}/>
        </li>
    )

}

export default OptionChosen;