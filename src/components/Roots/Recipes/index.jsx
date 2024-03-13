import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import Meal from "./Meal2";
import { FaSquareMinus } from "react-icons/fa6";
import { mappingUrlFunction } from "../../../helpers/httpQueries";
import AddPlus from '../../Layout/UXElements/icons/AddPlus';


// import '../../../styles/App.scss'
import './Recipe.css';

import { RecipeApi, UserApi } from "../../../api"
import store from "../../../store";
import types from "../../../store/reducers/types";
import RecipeUX from "../../Layout/UXElements/components/RecipeUX";
import OrderByComponent from "../../Layout/UXElements/components/OrderByComponent";
import SearchForm from "../../Layout/UXElements/components/SearchForm";

const Recipes = () => {

    const {recipes} = useSelector((state) => state.recipes);
    const [recipesCopy, setCopy] = useState(recipes);
    const [openModeCreator, setCreatorMode] = useState(false);
    const [isAdmin, setAdmin] = useState(true);

    useEffect(() => {
        setCopy(recipes)
    }, [recipes])

    const handleChangeSearch = (event) => {
        if (event.target.value.length === 0) setCopy(recipes)
        const searchedRecipes = recipes.filter((recipe) => recipe.name.toLowerCase().startsWith(event.target.value));
        setCopy(searchedRecipes);
    }

    const handleClickAddRecipe = () => {
        setCreatorMode((current) => !current) 
    }       
    

    return(
        <main className="main outlet" style={{ gridColumn: '2 / -1', overflowY:"scroll", overflowX:"hidden"}}>
        
        <section className="section">
            <div className="section__divForm">
                <h2>Recettes</h2>

                <div>
                    <SearchForm handleChangeSearch={handleChangeSearch}/>
                    <OrderByComponent />
                </div>

            </div>

            {openModeCreator&&
            <div className="backdrop">
                <RecipeUX modal={"modal"} formMethod={"POST"} cancelHandler={() => setCreatorMode(false)}/>
            </div>
            }
            
            <div className="section__addRecipe"> 
            {isAdmin?
                    !openModeCreator?
                        <AddPlus handleClick={handleClickAddRecipe} />
                        :
                        <FaSquareMinus onClick={handleClickAddRecipe}/>
                    :
                    ""}</div>
            <ul className="section__ulContainerRecipes">

                    {recipesCopy.length > 0&&
                        recipesCopy.map((meal, index) => {
                            return(<Meal key={index} meal={meal} isAdmin={isAdmin} setAdmin={setAdmin}/>)
                        })
                    }

            </ul>
            </section>
        </main>
    )
}

export default Recipes;

export async function recipesLoader({request}){

  store.dispatch({type:types.SET_IS_ASIDE_TRUE});

  const url = new URL(request.url);

  // const urlClient = window.location.href;
  const urlClient = url;
  const query = mappingUrlFunction(urlClient,{recipe : [["userId","is","null"]]});

  async function fetchDataRecipesApi() {
    const recipes = await RecipeApi.getAll(query);
    store.dispatch({type:types.SET_RECIPES, payload: recipes})
    return recipes
  }
  return fetchDataRecipesApi();
}