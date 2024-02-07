import RecipeUX from "../../Layout/UXElements/components/RecipeUX";
import { useParams } from "react-router-dom";
import store from "../../../store";
import { useSelector } from "react-redux";


const Recipe = () => {

    const params = useParams();
    const {recipes} = useSelector((state) => state.recipes);

    return(
        <section className="section">
            <RecipeUX recipe={recipes[parseInt(params.id) - 1]}/>
        </section>
    )
}
export default Recipe;