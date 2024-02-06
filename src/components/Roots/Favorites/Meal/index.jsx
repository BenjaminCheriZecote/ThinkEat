import { FaPlus } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import store from "../../../../store";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa6";
import { useState } from "react";

import { useRef } from "react";


const Meal = ({meal, hungryState}) => {

    const {favorites} = useSelector((state) => state.favorites);
    const [updateMode, setUpdateMode] = useState();
    const inputElement = useRef();
    
    const handleClickDelete = () => {
        const newFavorites = favorites.filter((element) => element !== meal);
        store.dispatch({type:"SET_FAVORITES", payload:newFavorites })
    }

    const handleClickUpdate = (event) => {
        inputElement.current.removeAttribute("disabled");
        setUpdateMode(true)
    }

    const handleChange = (event) => {
        const updatedValue = event.target.value;
        const foundIndexMeal = favorites.findIndex((elem) => elem.name === meal.name);
        const updatedFavorites = [...favorites];
        updatedFavorites[foundIndexMeal] = {name:updatedValue, hungry: hungryState};
        store.dispatch({type:"SET_FAVORITES", payload:updatedFavorites})
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

    return(
        <article  className="section__article"> 
            <input ref={inputElement} type="text" value={meal.name} disabled onChange={handleChange} onKeyDown={handleKeyPress}/>
            <div>
                {updateMode?
                    <FaCheck onClick={handleClickValidate}/>
                    :
                    <FaPlus onClick={handleClickUpdate}/> 
                }
                <MdCancel onClick={handleClickDelete}/>
            </div>
        </article>
    )
}

export default Meal;