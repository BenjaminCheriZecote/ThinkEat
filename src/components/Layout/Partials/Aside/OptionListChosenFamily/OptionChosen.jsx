import { MdCancel } from "react-icons/md";
import store from "../../../../../store";
import { useSelector } from "react-redux";

// import style '../Aside.module.css';


const OptionChosen = ({choosen,stateName}) => {
  const stateBranch = useSelector((state) => state[stateName]);
  const choices = stateBranch[`${stateName}Choices`];
  const handleClickOption = () => {
    const newArray = choices.filter((element) => element !== choosen);
    store.dispatch({type:`SET_${stateName.toUpperCase()}_CHOICES`, payload:newArray})
  }

    return(
        <li className="optionChosen">
          {/* <input id={stateName} name={stateName} type="hidden"  defaultValue={choosen[0]} /> */}
          <p>{choosen[1]} </p>
          <MdCancel size={10} onClick={handleClickOption}/>
        </li>
    )

}

export default OptionChosen;