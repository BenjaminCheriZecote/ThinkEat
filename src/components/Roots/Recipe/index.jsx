import RecipeUX from "../../Layout/UXElements/components/RecipeUX";
import { useNavigate, useParams } from "react-router-dom";
import store from "../../../store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaPen } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import ModalUpdatingRecipe from "../Recipes/ModalUpdatingRecipe";
import { NavLink } from "react-router-dom";


const Recipe = () => {

    const params = useParams();
    const {recipes} = useSelector((state) => state.recipes);
    const [updateMode, setUpdateMode] = useState();
    const [classList, setClassList] = useState(true);
    const [isAdmin, setAdmin] = useState(true);
    
    const handleClickUpdate = () => {
        setUpdateMode(true);
    }

    const handleClickDelete = () => {
        const newRecipes = recipes.filter((element) => element.id !== parseInt(params.id));
        store.dispatch({type:"SET_RECIPES", payload:newRecipes })
    }
    

    return(
        <section className="section">
            <RecipeUX recipe={recipes[parseInt(params.id) - 1]} update={updateMode} classList={classList}/>
            {updateMode?
                
                <ModalUpdatingRecipe meal={recipes[parseInt(params.id) - 1]} setUpdateMode={setUpdateMode}/>
                :
                ""
                }
            {isAdmin?
                <>
                    <FaPen onClick={handleClickUpdate}/>
                    <NavLink to="/"><MdCancel onClick={handleClickDelete}/></NavLink>
                </>
                    :
                    ""}
        </section>
    )
}
export default Recipe;