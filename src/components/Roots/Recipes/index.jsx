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

    // const searchParams = new URLSearchParams(window.location.search);
    const urlClient = window.location.href;
    const recipeQuery = [];
    const familyQuery = [];
    const ingredientQuery = [];
    const urlServer = 'https://localhost:3000/api/recipe?';

    if (urlClient.includes('?')) {
        const queryString = urlClient.split('?')[1];
        console.log(queryString)
        const params = queryString.split('&');
        console.log(params)
        const mappingParams = params.map((param) => {
            const parts = param.split('=');
            const result = [parts[0], '=', parts[1]];
            if (result[0] === 'hunger') {
                if (result[2] === 'Copieux' || result[2] === 'Normal' || result[2] === 'Léger') {
                    recipeQuery.push(result)
                }
            }
            if (result[0] === 'preparatingTime' || result[0] === 'cookingTime') {
                const parseNumber = parseInt(result[2]);
                if (parseNumber !== undefined) {
                    if (result[2] !== '') {
                        recipeQuery.push(result)
                    }
                }
            }
            if (result[0] === 'ingredients' || result[0] === 'families') {
                const splitedingredientValue = result[2].split("-");
                
                const convertedArray = splitedingredientValue.map((data) => {
                    const parseNumber = parseInt(data);
                    return parseNumber
                })
                const foundErrorTypeData = convertedArray.find((data) => data == undefined)
                if (!foundErrorTypeData) {
                    console.log(splitedingredientValue)
                    splitedingredientValue.forEach((data) => {
                        if (result[0] === "ingredients") {
                            const resultParam = ['id', '=', data]
                            ingredientQuery.push(resultParam);
                        }
                        if (result[0] === "families") {
                            const resultParam = ["id", '=', data]
                            familyQuery.push(resultParam);
                        }  
                    })
                }
                // const parseNumber = parseInt(result[2]);
                
            }

            const formatQuery = (query) => {
                return query.map(item => {
                  return '[' + item.map(value => `'${value}'`).join(',') + ']';
                }).join(',');
              };

              let urlSended = urlServer;
              
                    if (recipeQuery.length > 0) {
                        const formattedRecipeQuery = formatQuery(recipeQuery);
                        urlSended = urlSended + `recipe=${formattedRecipeQuery}&`;
                    }
                    if (ingredientQuery.length > 0) {
                        const formattedIngredientQuery = formatQuery(ingredientQuery);
                        urlSended = urlSended + `ingredient=${formattedIngredientQuery}&`
                    }
                    if (familyQuery.length > 0) {
                        const formattedFamilyQuery = formatQuery(familyQuery);
                        urlSended = urlSended + `family=${formattedFamilyQuery}`
                    }

            console.log("console URL", urlSended)
            // console.log("recipe query :", recipeQuery)
            // console.log("family query :", familyQuery)
            
        })

        // console.log(mappingParams);


    }




    return null
}