import { useSelector } from "react-redux"
import store from "../../../../../store"

const Options = ({family, ingredient}) => {

    const {familiesChoices} = useSelector((state) => state.families);
    const {ingredientsChoices} = useSelector((state) => state.ingredients);

    const handleClickOption = (event) => {
        if (family) {
            console.log("test option search", family)
            if (familiesChoices.length <= 0) {
                store.dispatch({type:"ADD_ONE_FAMILY_CHOICES", payload:family.name})
            } else {
                const foundFamilyIngredient = familiesChoices.find((element) => element === family.name);
                if (!foundFamilyIngredient) {
                    store.dispatch({type:"ADD_ONE_FAMILY_CHOICES", payload:family.name})
                }
            }
        }
        if (ingredient) {
            // console.log(ingredient)
            // console.log(ingredientsChoices)
            if (ingredientsChoices.length <= 0) {
                store.dispatch({type:"ADD_ONE_INGREDIENT_CHOICES", payload:ingredient.name})
            } else {
                const foundIngredient = ingredientsChoices.find((element) => element === ingredient.name);
                if (!foundIngredient) {
                    store.dispatch({type:"ADD_ONE_INGREDIENT_CHOICES", payload:ingredient.name})
                }
            }
        }
     
    }

    return(
        <>
            {family?
                <li className="liOptions" onClick={(handleClickOption)}>{family.name}</li>
                :
                ""
            }
            {ingredient?
                <li className="liOptions" onClick={(handleClickOption)}>{ingredient.name}</li>
                :
                ""
            }
        </>
    )

}

export default Options;