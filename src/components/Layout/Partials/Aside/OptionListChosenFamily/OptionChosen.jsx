import { MdCancel } from "react-icons/md";
import store from "../../../../../store";
import { useSelector } from "react-redux";
// {family, ingredient}
const OptionChosen = ({family, test}) => {
    
    const ingredient = test
    
    console.log(test)
    console.log(family)
    
    const {familiesChoices} = useSelector((state) => state.families)
    const {ingredientsChoices} = useSelector((state) => state.ingredients)
    const handleClickOption = () => {
        console.log("test")
        if (family) {
            const newArray = familiesChoices.filter((element) => element !== family);
            store.dispatch({type:"SET_FAMILIES_CHOICES", payload:newArray})
        }
        if (ingredient) {
            const newArray = ingredientsChoices.filter((element) => element !== ingredient);
            store.dispatch({type:"SET_INGREDIENTS_CHOICES", payload:newArray})
        }
    }

    return(
        <li className="optionChosen">
            {family?
            <>
                <p>{family} </p><MdCancel size={10} onClick={handleClickOption}/>
            </>
            :
            ""}
            {ingredient?
            <>
                <p>{ingredient} </p><MdCancel size={10} onClick={handleClickOption}/>
            </>
            :
            ""}
        </li>
    )

}

export default OptionChosen;