import { useSelector } from "react-redux"
import store from "../../../../../store"

const Options = ({family, ingredient}) => {

    const {familiesChoices} = useSelector((state) => state.families);
    const {ingredientsChoices} = useSelector((state) => state.ingredients);

    const handleClickOption = (event) => {
        if (family) {
            if (familiesChoices.length <= 0) {
                const array = [family.id, family.name]
                store.dispatch({type:"ADD_ONE_FAMILY_CHOICES", payload:array})
            } else {
                const foundFamilyIngredient = familiesChoices.find((element) => element[1] === family.name);
                if (!foundFamilyIngredient) {
                    const array = [family.id, family.name];
                    store.dispatch({type:"ADD_ONE_FAMILY_CHOICES", payload:array})
                }
            }
        }
        if (ingredient) {
            if (ingredientsChoices.length <= 0) {
                const array = [ingredient.id, ingredient.name]
                store.dispatch({type:"ADD_ONE_INGREDIENT_CHOICES", payload:array})
            } else {
                const foundIngredient = ingredientsChoices.find((element) => element[1] === ingredient.name);
                if (!foundIngredient) {
                    const array = [ingredient.id, ingredient.name]
                    store.dispatch({type:"ADD_ONE_INGREDIENT_CHOICES", payload:array})
                }
            }
        }
     
    }

    return(
        <>
            {family&&
                <li className="liOptions" onClick={(handleClickOption)}>
                    <p>{family.name}</p>
                </li>
            }
            {ingredient&&
                <li className="liOptions" onClick={(handleClickOption)}>
                    <p>{ingredient.name}</p>
                </li>
            }
        </>
    )

}

export default Options;