import { FaPlus } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import store from "../../../../store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import EditPen from "../../../Layout/UXElements/icons/EditPen";
import DeleteCruse from "../../../Layout/UXElements/icons/DeleteCruse";
import { NavLink } from "react-router-dom";


import RecipeUX, { recipeAction } from "../../../Layout/UXElements/components/RecipeUX";
import { RecipeApi } from "../../../../api";

const Meal = ({meal}) => {

    const {favorites} = useSelector((state) => state.favorites);
    const [recipeDetails, setRecipeDetails] = useState()
    const [updateMode, setUpdateMode] = useState();
    
    const handleClickDelete = () => {
        const newFavorites = favorites.filter((element) => element !== meal);
        store.dispatch({type:"SET_FAVORITES", payload:newFavorites })
    }

    const handleClickUpdate = async () => {
        const recipe = await RecipeApi.get(meal.id);
        setRecipeDetails(recipe);
        setUpdateMode(true)
    }
    

    return(
        <li  className="section__li">
                <div className="section-li__container--boxLegend">
                    <NavLink to={`/recipes/${meal.id}`}>{meal.name}</NavLink>
                </div>

                <div className="section-li__container--options">
                    {updateMode&&
                        <div className="backdrop">
                            <RecipeUX modal={"modal"} formMethod={"PATCH"} cancelHandler={() => setUpdateMode(false)} recipe={recipeDetails}/>
                        </div>
                        }
                        
                    <button onClick={handleClickUpdate}>
                    <EditPen />
                    </button>

                    <button onClick={handleClickDelete}>
                    <DeleteCruse/>
                    </button>
                </div>
        </li>
    )
}

export default Meal;