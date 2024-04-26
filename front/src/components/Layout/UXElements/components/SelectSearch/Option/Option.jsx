import { useDispatch } from "react-redux"
import types from "../../../../../../store/reducers/types/index";

const Options = ({itemName, itemOption, itemChoices}) => {

    const dispatch = useDispatch();

    const handleClickOption = () => {
            // si i n'y a pas encore d'options ingrédients de choisie, on ajoute l'option au tableau
            if (itemChoices.length <= 0) {
                const array = [itemOption.id, itemOption.name];
                if (itemName === "ingredients") dispatch({type:types.ADD_ONE_INGREDIENT_CHOICES, payload:array})
                if (itemName === "families") dispatch({type:types.ADD_ONE_FAMILY_CHOICES, payload:array})
                
            } else {
                // sinon on vérifie que l'option n'y soit pas avant de l'ajouter
                const foundItem = itemChoices.find((element) => element[1] === itemOption.name);
                if (!foundItem) {
                    const array = [itemOption.id, itemOption.name]
                    if (itemName === "ingredients") dispatch({type:types.ADD_ONE_INGREDIENT_CHOICES, payload:array})
                    if (itemName === "families") dispatch({type:types.ADD_ONE_FAMILY_CHOICES, payload:array})
                }
            }    
    }

    return(
        <>
            {itemOption &&
                <li className="liOptions" onClick={(handleClickOption)}>
                    <p>{itemOption.name}</p>
                </li>
            }
        </>
    )

}

export default Options;