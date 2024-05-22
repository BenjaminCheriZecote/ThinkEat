import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import './RecipesPage.css';
import Meal from "../MealUX";
import AddPlus from "../../icons/AddPlus";
import RecipeUX from "../RecipeUX";
import OrderByComponent from "../OrderByComponent";
import SearchForm from "../SearchForm";
import types from "../../../../../store/reducers/types";
import PaginatedItems from "../ReactPagination";

const RecipesPage = ({title, recipes, favoritePage, itemsTotal}) => {

    const dispatch = useDispatch();
    const {isAdmin, isConnected, id} = useSelector((state) => state.session);
    const [recipesCopy, setCopy] = useState(recipes);
    const [openModeCreator, setCreatorMode] = useState(false);
    const itemsPerPage = 25;
    

    useEffect(() => {
        dispatch({type:types.SET_IS_ASIDE_TRUE});
    }, [])

    useEffect(() => {
        setCopy(recipes)
    }, [recipes])

    const handleChangeSearch = (event) => {
        if (event.target.value.length === 0) setCopy(recipes)
        const searchedRecipes = recipes.filter((recipe) => recipe.name.toLowerCase().startsWith(event.target.value.toLowerCase()));
        setCopy(searchedRecipes);
    }

    const handleClickAddRecipe = () => {
        setCreatorMode((current) => !current) 
    }

    return(
        <main className="main outlet recipesPage" style={{ gridColumn: '2 / -1', overflowY:"scroll", overflowX:"hidden"}}>
        
            <section className="section">
                <div className="section__divForm">
                    <h2>{title}</h2>

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
                    {favoritePage ?
                        isConnected && <AddPlus handleClick={handleClickAddRecipe} size={23} color={"var(--colorOrange)"}/>
                        :
                        isAdmin &&  <AddPlus handleClick={handleClickAddRecipe} size={23} color={"var(--colorOrange)"}/>
                        }
                </div>

                <ul className="section__ulContainerRecipes">

                        {recipesCopy.length > 0 &&
                            recipesCopy.map((meal, index) => {
                                return(<Meal 
                                        key={index} 
                                        meal={meal}
                                        id={id} 
                                        favoritePage={favoritePage}
                                        />)
                            })
                        }

                </ul>
            
            </section>
            <footer>
                {itemsPerPage < itemsTotal && 
                    <PaginatedItems 
                        items={recipesCopy} 
                        itemsPerPage={itemsPerPage} 
                        favoritePage={favoritePage} 
                        itemsTotal={itemsTotal}
                    /> 
                }

            </footer>
        </main>
    )
}

export default RecipesPage;