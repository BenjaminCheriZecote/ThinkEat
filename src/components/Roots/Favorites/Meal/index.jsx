import { FaPlus } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import store from "../../../../store";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa6";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import ModalUpdatingRecipe from "../ModalUpdatingRecipe";
import { NavLink } from "react-router-dom";

import { useRef } from "react";




const Meal = ({meal}) => {

    const {favorites} = useSelector((state) => state.favorites);
    const [updateMode, setUpdateMode] = useState();
    
    const handleClickDelete = () => {
        const newFavorites = favorites.filter((element) => element !== meal);
        store.dispatch({type:"SET_FAVORITES", payload:newFavorites })
    }

    const handleClickUpdate = (event) => {
        setUpdateMode(true)
    }

    return(
        <li  className="section__li">
                <div className="section-li__container--boxLegend">
                    <p>{meal.name}</p>
                    <NavLink to={`/recipes/${meal.id}`}>Voir la recette</NavLink>
                </div>

                <div className="section-li__container--options">
                    {updateMode?
                    
                        <ModalUpdatingRecipe meal={meal} setUpdateMode={setUpdateMode}/>
                        :
                        ""
                        }
                    <FaPen onClick={handleClickUpdate}/>
                    <MdCancel onClick={handleClickDelete}/>
                </div>
        </li>
    )
}

export default Meal;