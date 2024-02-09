
import { MdCancel } from "react-icons/md";
import store from "../../../../store";
import { useSelector } from "react-redux";
import { FaPen } from "react-icons/fa6";
import { IoStarSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import ModalUpdatingRecipe from "../../Recipe/ModalUpdatingRecipe";

import { useRef } from "react";


const Meal = ({meal, isAdmin, updateMode, setUpdateMode}) => {

    const {favorites} = useSelector((state) => state.favorites);
    const {recipes} = useSelector((state) => state.recipes);
    
    const handleClickDelete = () => {
        const newRecipes = recipes.filter((element) => element !== meal);
        store.dispatch({type:"SET_RECIPES", payload:newRecipes })
    }

    const handleClickUpdate = (event) => {
        setUpdateMode(true)
    }

    const handleClickAddFavorites = () => {
        console.log(meal)
        store.dispatch({type:"SET_FAVORITES", payload:[...favorites, meal] })
    }

    return(
        <article  className="section__article"> 
            <input type="text" value={meal.name} disabled/>
            <div>
                {!isAdmin?
                    <IoStarSharp onClick={handleClickAddFavorites}/>
                    :
                    ""
                }

                {updateMode?
                <ModalUpdatingRecipe meal={meal} setUpdateMode={setUpdateMode}/>
                :
                ""
                }
                
                {isAdmin?
                <>
                    <FaPen onClick={handleClickUpdate}/>
                    <MdCancel onClick={handleClickDelete}/>
                </>
                    :
                    ""}
            </div>
            <NavLink to={`/recipes/${meal.id}`}>Voir le détail</NavLink>
        </article>
    )
}

export default Meal;