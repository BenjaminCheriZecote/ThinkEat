import { useSelector } from "react-redux";
import { useState } from "react";

import { useEffect } from "react";
import Meal from "./Meal2";
import { CiSearch } from "react-icons/ci";
import { FaSquarePlus } from "react-icons/fa6";
import { FaSquareMinus } from "react-icons/fa6";
import { mappingUrlFunction } from "../../httpQueries";

import ModalCreatingRecipe from "./ModalCreateingRecipe";
import './Recipe.scss';


const Recipes = () => {

    const {recipes} = useSelector((state) => state.recipes)
    const [recipesCopy, setCopy] = useState(recipes);
    const [openModeCreator, setModeCreator] = useState(false);
    const {isAdmin} =useSelector((state) => state.session);

    useEffect(() => {
        setCopy(recipes)
    }, [recipes])

    const handleSubmitSearch = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const dataForm = Object.fromEntries(formData);
        const filteredResearch = recipes.filter((element) => element.name.toLowerCase().includes(dataForm.search.toLocaleLowerCase()) );
        console.log(filteredResearch);
        setCopy(filteredResearch);
    }

    const handleChangeSearch = (event) => {
        if (event.target.value.length === 0) setCopy(recipes)
    }

    const handleClickAddRecipe = () => {
        setModeCreator((current) => !current) 
    }


    return(
        <section className="section">
            <h2>Recipes</h2>
            <div className="section__divForm">
                <form onSubmit={handleSubmitSearch} className="" action="">
                    <input type="search" placeholder='Rechercher' name="search" onChange={handleChangeSearch}/>
                    <button><CiSearch /></button>
                </form>

                {isAdmin?
                    !openModeCreator?
                        <FaSquarePlus onClick={handleClickAddRecipe}/>
                        :
                        <FaSquareMinus onClick={handleClickAddRecipe}/>
                    :
                    ""}
            </div>

            {openModeCreator?
                <ModalCreatingRecipe setModeCreator={setModeCreator}/>
                :
                ""
            }
            

            <ul className="section__ulContainerRecipes">
                {recipesCopy.length > 0?
                    recipesCopy.map((meal, index) => {
                        return(<Meal key={index} meal={meal} isAdmin={isAdmin}/>)
                    })
                    :
                    ""
                }
            </ul>
            </section>
    )
}

export default Recipes;

export function recipesLoader(){

    const urlClient = window.location.href;
    const endpointApi = 'https://localhost:3000/api/recipe?';
    

    mappingUrlFunction(urlClient, endpointApi);



    return null
}