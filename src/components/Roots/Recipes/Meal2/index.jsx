import { FaPlus } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import store from "../../../../store";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa6";
import { useState } from "react";

import { useRef } from "react";


const Meal = ({meal, hungryState}) => {

    const {favorites} = useSelector((state) => state.favorites);
    const {recipes} = useSelector((state) => state.recipes);
    const [updateMode, setUpdateMode] = useState();
    const inputElement = useRef();
    
    const handleClickDelete = () => {
        const newRecipes = recipes.filter((element) => element !== meal);
        store.dispatch({type:"SET_RECIPES", payload:newRecipes })
    }

    const handleClickUpdate = (event) => {
        inputElement.current.removeAttribute("disabled");
        setUpdateMode(true)
    }

    const handleChange = (event) => {
        const updatedValue = event.target.value;
        const foundIndexMeal = recipes.findIndex((elem) => elem.name === meal.name);
        const updatedRecipes = [...recipes];
        updatedRecipes[foundIndexMeal] = {name:updatedValue, hungry: hungryState};
        store.dispatch({type:"SET_RECIPES", payload:updatedRecipes})
    }

    const handleClickValidate = () => {
        inputElement.current.setAttribute("disabled", "");
        setUpdateMode(false)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            inputElement.current.setAttribute("disabled", "");
            setUpdateMode(false)
          }
    }

    const handleClickAddFavorites = () => {
        console.log(meal)
        store.dispatch({type:"SET_FAVORITES", payload:[...favorites, meal] })
    }

    return(
        <article  className="section__article"> 
            <input ref={inputElement} type="text" value={meal.name} disabled onChange={handleChange} onKeyDown={handleKeyPress}/>
            <FaPlus onClick={handleClickAddFavorites}/> 

            {/* <div>
                {updateMode?
                    <FaCheck onClick={handleClickValidate}/>
                    :
                    <FaPlus onClick={handleClickUpdate}/> 
                }
                <MdCancel onClick={handleClickDelete}/>
            </div> admin */}
            <a href={`/recipes/${meal.id}`}>Voir le détail</a>
        </article>
    )
}

export default Meal;