import RecipeUX from "../../Layout/UXElements/components/RecipeUX";
import { useParams } from "react-router-dom";
import store from "../../../store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";


const Recipe = () => {

    const params = useParams();
    const {recipes} = useSelector((state) => state.recipes);
    const [update, setUpdate] = useState();
    const [classList, setClassList] = useState(true)

    const handleClickUpdate = () => {
        setUpdate(true);
    }
    

    return(
        <section className="section">
            <RecipeUX recipe={recipes[parseInt(params.id) - 1]} update={update} classList={classList}/>

            <FaPlus onClick={handleClickUpdate}/> 
        </section>
    )
}
export default Recipe;