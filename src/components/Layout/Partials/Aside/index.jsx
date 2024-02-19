import store from '../../../../store'
import { useSelector } from 'react-redux';
import Options from './OptionListFamily/Option';
import OptionChosen from './OptionListChosenFamily/OptionChosen';
import { MdKeyboardArrowDown } from "react-icons/md";


// import './Aside.scss'
import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FamilyApi, IngredientApi } from '../../../../store/api';
import style from './Aside.module.css'
import { Form } from 'react-router-dom';
import { useEffect } from 'react';
import types from '../../../../store/reducers/types';



const Aside = () => {

    const [activeSelectorCriteria, setActiveSelectorCriteria] = useState(null)
    const [activeSelectorFilter, setActiveSelectorFilter] = useState(null)
    const [btnFooter, setBtnFooter] = useState()
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate()

    const {filter} = useSelector((state) => state.filters)
    const {families} = useSelector((state) => state.families);
    const [familiesCopy, setFamiliesCopy] = useState(families);
    const {familiesChoices} = useSelector((state) => state.families);
    
    const {ingredients} = useSelector((state) => state.ingredients);
    const [ingredientsCopy, setIngredientsCopy] = useState(ingredients);
    const {ingredientsChoices} = useSelector((state) => state.ingredients);
    
    const allFamilies = {families,familiesChoices,familiesCopy}
    const allIngredients = {ingredients, ingredientsChoices, ingredientsCopy}
    
    // const {ingredientsbis} = useSelector((state) => state.ingredients)
    const [isRotatedFamilyIngredientSelect, setIsRotatedFamilyIngredient] = useState(false)
    const [isRotatedIngredientSelect, setIsRotatedIngredient] = useState(false)
    
    const {hunger} = useSelector((state) => state.filters.filters)
    const {preparatingTime} = useSelector((state) => state.filters.filters);
    const {cookingTime} = useSelector((state) => state.filters.filters);
    const {favoritesRecipes} = useSelector((state) => state.filters.filters);

    useEffect(() => {
        console.log(currentPath)
        if (currentPath !== "/proposal") {
            setBtnFooter("Nouvelle proposition")
        } else {
            setBtnFooter("Générer la proposition")
        }
    }, [])
    


    const handleChangeHungerBigFilter = () => {
        store.dispatch({type:types.SET_HUNGER_BIG});
    }

    const handleChangeHungerNormalFilter = () => {
        store.dispatch({type:types.SET_HUNGER_NORMAL});
    }

    const handleChangeHungerFewFilter = () => {
        store.dispatch({type:types.SET_HUNGER_FEW});
    }

    const handleChangePreparatingTimeFilter = (event) => {
        store.dispatch({type:types.SET_PREPARATING_TIME, payload:event.target.value})
    }

    const handleChangeCookingTimeFilter = (event) => {
        store.dispatch({type:types.SET_COOKING_TIME, payload:event.target.value})
    }

    const handleChangeFavoritesRecipes = () => {
        store.dispatch({type:types.SET_FAVORITES_RECIPES})
    }

    const handleClickSelectFamily = (event) => {
        const parentElement = event.target.closest("form");
        
        if (parentElement.className.includes("Criteria")) {
            if (activeSelectorCriteria !== "families") {
                setActiveSelectorCriteria("families");
            } else {
                setActiveSelectorCriteria(null)
            }
            setIsRotatedFamilyIngredient(!isRotatedFamilyIngredientSelect);
            if (isRotatedIngredientSelect) {
                setIsRotatedIngredient(!isRotatedIngredientSelect);
            }  
        } else if (parentElement.className.includes("Filter")) {
            if (activeSelectorFilter !== "families") {
                setActiveSelectorFilter("families");
            } else {
                setActiveSelectorFilter(null)
            }
            setIsRotatedFamilyIngredient(!isRotatedFamilyIngredientSelect);
            if (isRotatedIngredientSelect) {
                setIsRotatedIngredient(!isRotatedIngredientSelect);
            }
        }
        
    }

    const handleClickSelectIngredient = (event) => {
        const parentElement = event.target.closest("form");

        if (parentElement.className.includes("Criteria")) {
            if (activeSelectorCriteria !== "ingredients") {
                setActiveSelectorCriteria("ingredients");
                
            } else {
                setActiveSelectorCriteria(null)
                setIsRotatedIngredient(false)
            }
            setIsRotatedIngredient(!isRotatedIngredientSelect);
        } else if (parentElement.className.includes("Filter")) {
            if (activeSelectorFilter !== "ingredients") {
                setActiveSelectorFilter("ingredients");
                
            } else {
                setActiveSelectorFilter(null)
                setIsRotatedIngredient(false)
            }
            setIsRotatedIngredient(!isRotatedIngredientSelect);
        }
    }

    
    const handleChangeSearchFamily = (event) => {
        const filteredResearch = families.filter((element) => element.name.toLowerCase().startsWith(event.target.value.toLocaleLowerCase()));
        setFamiliesCopy(filteredResearch)
    }

    const handleChangeSearchIngredient = (event) => {
        const filteredResearch = ingredients.filter((element) => element.name.toLowerCase().startsWith(event.target.value.toLocaleLowerCase()));
        setIngredientsCopy(filteredResearch)
    }


    const handleSubmitFilter = (event) => {
    
        store.dispatch({type:"TURN_FILTER"})
    }

    return(
    <aside className={style.aside}>
        <div>
            {/* mettre le mot "Filter" dans la classe du Form */}
            <Form className={style.aside__formFilter} method="get" action={currentPath === "/proposal"?"/proposal":currentPath === "/recipes"?"/recipes":currentPath === "/favorites"?"/favorites":""} onSubmit={handleSubmitFilter}>
                <h3>Filtres</h3>
                <fieldset>
                    <legend>Faim</legend>
                        <div>
                            <li>
                                <input id="hungerBigFilter" name="hunger" value="Copieux" type="checkbox" onChange={handleChangeHungerBigFilter} checked={hunger[0].state?true:false}/>
                                <label htmlFor="hungryBigFilter" >{hunger[0].name}</label>
                            </li>

                            <li>
                                <input id="hungerNormalFilter" name="hunger" value="Normal" type="checkbox" onChange={handleChangeHungerNormalFilter} checked={hunger[1].state?true:false}/>
                                <label htmlFor="hungerNormalFilter" >{hunger[1].name}</label>
                            </li>
                            <li>
                                <input id="hungerFewFilter" name="hunger" value="Léger" type="checkbox" onChange={handleChangeHungerFewFilter} checked={hunger[2].state?true:false}/>
                                <label htmlFor="hungerFewFilter" >{hunger[2].name}</label>
                            </li>


                        </div>
                </fieldset>

                <fieldset>
                    <legend>Temps</legend>
                    <div>
                        <li className={style.asideformFilter__inputTimeContainer}>
                            <label htmlFor="preparatingTimeFilter" >Préparation</label>
                            {/* <div>
                                <span></span>
                                <input type="number" name="preparatingTime" defaultValue={preparatingTime} id="preparatingTimeFilter" className={style.asideFormFilter__inputTime} onChange={handleChangePreparatingTimeFilter}/>
                            </div> */}
                            <input type="range" min={preparatingTime.min} max={preparatingTime.max} name="preparatingTime" defaultValue={preparatingTime} id="preparatingTimeFilter" className={style.asideFormFilter__inputTime} onChange={handleChangePreparatingTimeFilter}/>
                            <span></span>
                        </li>

                        <li className={style.asideformFilter__inputTimeContainer}>
                            <label htmlFor="cookingTimeFilter" >Cuisson</label>
                            {/* <div>
                                <span></span>
                                <input type="number" name="cookingTime" defaultValue={cookingTime} id="cookingTimeFilter" className={style.asideFormFilter__inputTime} onChange={handleChangeCookingTimeFilter}/>
                            </div> */}
                            <input type="range" min={cookingTime.min} max={cookingTime.max} name="cookingTime" defaultValue={cookingTime} id="cookingTimeFilter" className={style.asideFormFilter__inputTime} onChange={handleChangeCookingTimeFilter}/>

                        </li>
                        {/* <li className={style.asideformFilter__inputTimeContainer}>
                            <label htmlFor="timeFilter" >Total</label>
                            <div>
                                <span></span>
                                <input type="number" name="timeFilter" id="timeFilter" className={style.asideFormFilter__inputTime}/>
                            </div>
                        </li> */}
                    </div>
                </fieldset>
                
                    <div className={style.asideFormFilter__foodContainer}>
                        <fieldset>
                            <legend>Ingredients</legend>


                                <li className={style.selectBox}>
                                    <div className={style.selectOption} onClick={handleClickSelectIngredient}>
                                        <button type="button">Ingrédients  </button><MdKeyboardArrowDown className={style.arrowSoValue} style={{transform: isRotatedIngredientSelect ? "rotate(180deg)" : "rotate(0)"}}/> 
                                    </div>
                                    
                                    <input id="ingredients" name="ingredients" type="hidden"  defaultValue={ingredientsChoices.map((ingredient) => ingredient[0]).join("-") } />
                                    {activeSelectorFilter === "ingredients" &&

                                    <div className={style.content}>

                                        <div className={style.search}>
                                            <input type="search" id="optionSearchIngredient" placeholder="Rechercher" name="" onChange={handleChangeSearchIngredient}/>
                                        </div>
                                        <ul className={style.options} >
                                        {ingredientsChoices.map((ingredient, index) => {
                                            return (<OptionChosen key={index} choosen={ingredient} stateName="ingredients" />)
                                        })}
                                        {allIngredients[ingredientsCopy.length > 0 ? "ingredientsCopy" : "ingredients"].map((ingredient, index) => (
                                        <Options key={index} ingredient={ingredient} >{ingredient.name}</Options>
                                        ))}
                                        </ul>
                                    </div>}
                                    
                                </li> 

                                <li className={style.selectBox}>
                                    <div className={style.selectOption} onClick={handleClickSelectFamily}>
                                        <button type="button">Catégories</button><MdKeyboardArrowDown className={style.arrowSoValue} style={{transform: isRotatedFamilyIngredientSelect ? "rotate(180deg)" : "rotate(0)"}}/> 
                                    </div>
                                    <input id="families" name="families" type="hidden"  defaultValue={familiesChoices.map((family) => family[0]).join("-") } />
                                    {activeSelectorFilter === "families" && 
                                        <div className={style.content}>

                                            <div className={style.search}>
                                                <input type="search" id="optionSearchFamilyIngredient" placeholder="Rechercher" name="" onChange={handleChangeSearchFamily}/>
                                            </div>
                                            <ul className={style.options} >
                                            {familiesChoices.map((family, index) => (
                                                <OptionChosen key={index} choosen={family} stateName="families" />
                                            ))}
                                            {allFamilies[familiesCopy.length > 0 ? "familiesCopy" : "families"].map((family, index) => (
                                                <Options key={index} family={family} >{family.name}</Options>
                                            ))}


                                            </ul>
                                        </div>}
                                    
                                </li>

                        </fieldset> 
                    </div>

                <li>
                    <input id="favoritesRecipes" type="checkbox" onChange={handleChangeFavoritesRecipes} checked={favoritesRecipes.state?true:false}/>
                    <label htmlFor="favoritesRecipes" >{favoritesRecipes.name}</label>
                </li>

                <footer>
                    <small>0 résultats possibles</small>
                    <button>Filtrer</button>
                </footer>        

            </Form>
        </div>

        
            
                
        
        <NavLink className={style.asideA} to={currentPath === "/proposal"?"./":"/proposal"} >
            <p>{btnFooter}</p>
            <label className={style.container}>
                <input checked="checked" type="checkbox"/>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="50px" width="50px" className={style.like}>
                    <path d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"></path>
                </svg>
                <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" className={style.celebrate}>
                    <polygon points="0,0 10,10"></polygon>
                    <polygon points="0,25 10,25"></polygon>
                    <polygon points="0,50 10,40"></polygon>
                    <polygon points="50,0 40,10"></polygon>
                    <polygon points="50,25 40,25"></polygon>
                    <polygon points="50,50 40,40"></polygon>
                </svg>
            </label> 
        </NavLink>
    </aside>
    )
};

export default Aside;

export async function asideLoader() {
    async function fetchDataFamilyApi() {
        try {
            const families = await FamilyApi.getAll();
            store.dispatch({type:types.SET_FAMILIES, payload: families})
            return families
        } catch (error) {
            console.log(error)
        }
    }
    fetchDataFamilyApi()

    async function fetchDataIngredientApi() {
        try {
            const ingredients = await IngredientApi.getAll();
            console.log(ingredients)
            store.dispatch({type:types.SET_INGREDIENTS, payload: ingredients})
            return ingredients
        } catch (error) {
            console.log(error)
        }
    }
    fetchDataIngredientApi()

    // route back à corrigé

    // autre fetch ici
    return null;
  }