import { useSelector } from "react-redux";
import { useState } from "react";

import { useEffect } from "react";
import Meal from "./Meal2";
import { CiSearch } from "react-icons/ci";
import { FaSquarePlus } from "react-icons/fa6";
import { FaSquareMinus } from "react-icons/fa6";



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

    // on veut les valeurs de la query dans un tableau
    // on veut mapper un nouveau tableau selon le typage du back, in incluant les valeurs de la query

    const searchParams = new URLSearchParams(window.location.search);
    

    
    const inputsName = ['hungerBigFilter',
    'hungerFewFilter',
    'hungerNormalFilter',
    'preparatingTimeFilter',
    'cookingTimeFilter',
    'timeFilter',
    'familyIngredientFilter',
    'ingredientFilter',
    'favoriteFilter'
    ]

    const valuesQueryFilter = inputsName.map((input) => {
        const value = searchParams.get(input);
        return [input, value]
    })

    const mappingQuery = [

    ]

    // const test = searchParams.get('hungerFewFilter');
    // https://localhost:3000/api/recipe?recipe=[[‘cookingTime’,‘=’,’0’]]
    // https://localhost:3000/api/recipe?recipe=[[‘hunger’,‘=’,’Léger’]]

    const test = valuesQueryFilter.forEach((element) => {
        if (element[0] === 'hungerBigFilter' && element [1] === 'on') {
            mappingQuery.push(['hunger', '=', 'Copieux'])
        }
        if (element[0] === 'hungerNormalFilter' && element [1] === 'on') {
            mappingQuery.push(['hunger', '=', 'Normal'])
        }
        if (element[0] === 'hungerNormalFilter' && element [1] === 'on') {
            mappingQuery.push(['hunger', '=', 'Léger'])
        }
        // if (element[0] === 'preparatingTimeFilter' && element [1] !== null) {
        //     mappingQuery.push(['preparation_time', '=', element[1]])
        // }

        if (element[0] === 'familyIngredientFilter' && element [1] !== null) {
            mappingQuery.push(['name', '=', element[1]])
        }
        if (element[0] === 'ingredientFilter' && element [1] !== null) {
            mappingQuery.push(['name', '=', element[1]])
        }

    })
    

    console.log("valuesQuery", valuesQueryFilter)
    // console.log("valuesQuery element", valuesQuery[6])
    // console.log("mappingQuery", mappingQuery)

    




    return null
}