import 'animate.css';
import { useDispatch, useSelector } from 'react-redux';

import { NavLink, useLocation, useSubmit } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import style from './Aside.module.css'
import { Form } from 'react-router-dom';
import types from '../../../../store/reducers/types';
import DoubleInputRange from '../../UXElements/components/DoubleRange';
import BurgerMenu from '../../UXElements/components/BurgerMenu';
import AsideCheckbox from '../../UXElements/components/AsideCheckbox/AsideCheckbox';
import SelectSearch from '../../UXElements/components/SelectSearch';

const Aside = () => {
    
    const dispatch = useDispatch();
    const filterButton = useRef();
    const submit = useSubmit();

    const [activeSelectorFilter, setActiveSelectorFilter] = useState(null)
    const location = useLocation();
    const currentPath = location.pathname;

    const {preparatingTime, cookingTime, dietPreferences} = useSelector((state) => state.filters.filters);
    const {dietsChoices} = useSelector((state) => state.diets)
    
    const [menuOpen, setMenuOpen] = useState(false);
    const {isConnected} = useSelector((state) => state.session);

    const {hunger, favorites} = useSelector((state) => state.filters.filters)

    const {ingredients, ingredientsChoices} = useSelector((state) => state.ingredients);
    
    const {families, familiesChoices} = useSelector((state) => state.families);
    
    const {generatedProposal, proposal} = useSelector((state) => state.proposal);
    const btnFooter = currentPath !== "/proposal" ? "Nouvelle proposition" :"C'est parti !";

    const [isRotatedFamilyIngredientSelect, setIsRotatedFamilyIngredient] = useState(false)
    const [isRotatedIngredientSelect, setIsRotatedIngredient] = useState(false)
    const [isRotatedDietSelect, setIsRotatedDiet] = useState(false);

    const {favoritesPage, recipesPage} = useSelector((state) => state.pagination);

    const {mode} = useSelector((state) => state.darkMode);

    let page;
    
    useEffect(() => {
        if (generatedProposal === true) {
            submit(filterButton.current);
        }
    }, [generatedProposal])

    useEffect(() => {
        if (currentPath === '/recipes') page = recipesPage;
        if (currentPath === '/favorites') page = favoritesPage;
    }, [currentPath])


    const handleChangeFavoritesFilter = () => {
        dispatch({type:types.SET_FAVORITES_RECIPES})
    }

    const handleClickStarterButton = (event) => {
        if (currentPath === "/proposal") {
            event.preventDefault();
            dispatch({type:types.GENERATE_PROPOSAL});
        }
    }

    const handleClickBurgerMenu = () => {
        setMenuOpen(!menuOpen)
    }

    const onChange= () => {

    }

    const setOfFilters = () => {
        dispatch({type:types.SET_OFF_FILTERS});
        dispatch({type:types.SET_INGREDIENTS_CHOICES, payload:[]});
        dispatch({type:types.SET_FAMILIES_CHOICES, payload:[]});
        dispatch({type:types.SET_DIETS_CHOICES, payload:[]});
        // window.history.replaceState({}, document.title, window.location.pathname);
    }

    return(
    <>
    <aside id="aside" className={`${style.aside}`}>
            <BurgerMenu handleClick={handleClickBurgerMenu} color={{background:"var(--colorUi4)"}} label={"burgerAside"}/>

        <div className={menuOpen?'':`${style.hideAside}`}>
            {/* mettre le mot "Filter" dans la classe du Form */}
            <Form  className={style.aside__formFilter} method="get" action={currentPath}>
                <fieldset>
                    <legend>Appétit</legend>
                        <div className={style.asideFormFilter__hungerContainer}>
                            <AsideCheckbox item={"Big"} label={hunger[0].name} state={hunger[0].state?true:false} mode={mode}/>
                            <AsideCheckbox item={"Normal"} label={hunger[1].name} state={hunger[1].state?true:false} mode={mode}/>
                            <AsideCheckbox item={"Few"} label={hunger[2].name} state={hunger[2].state?true:false} mode={mode}/>
                        </div>
                </fieldset>

                <fieldset>
                    <legend>Temps</legend>
                    <div className={style.asideformFilter__inputTimeContainer}>
                    
                        <div className={style.boxContainer}>
                            <DoubleInputRange label={"Préparation"} name={"preparatingTime"} item={preparatingTime} />
                        </div>

                        <div className={style.boxContainer}>
                            <DoubleInputRange label={"Cuisson"} name={"cookingTime"} item={cookingTime} />
                        </div>
                    </div>
                </fieldset>
                
                <div className={style.asideFormFilter__foodContainer}>
                    <fieldset>
                        <legend>Ingredients</legend>
                            <SelectSearch 
                            store={ingredients} 
                            item="ingredients" 
                            label="Ingredients" 
                            isRotated={isRotatedIngredientSelect} 
                            setIsRotatedFamilyIngredient={setIsRotatedFamilyIngredient}
                            setIsRotatedIngredient={setIsRotatedIngredient}
                            setIsRotatedDiet={setIsRotatedDiet} 
                            activeSelectorFilter={activeSelectorFilter}
                            setActiveSelectorFilter={setActiveSelectorFilter}
                            itemChoices={ingredientsChoices}
                            />

                            <SelectSearch 
                            store={families} 
                            item="families" 
                            label="Categories" 
                            isRotated={isRotatedFamilyIngredientSelect} 
                            setIsRotatedFamilyIngredient={setIsRotatedFamilyIngredient}
                            setIsRotatedIngredient={setIsRotatedIngredient}
                            setIsRotatedDiet={setIsRotatedDiet}  
                            activeSelectorFilter={activeSelectorFilter}
                            setActiveSelectorFilter={setActiveSelectorFilter}
                            itemChoices={familiesChoices}  
                            />

                            <SelectSearch 
                            store={dietPreferences} 
                            item="diets" 
                            label="Régimes" 
                            isRotated={isRotatedDietSelect} 
                            setIsRotatedFamilyIngredient={setIsRotatedFamilyIngredient}
                            setIsRotatedIngredient={setIsRotatedIngredient}
                            setIsRotatedDiet={setIsRotatedDiet} 
                            activeSelectorFilter={activeSelectorFilter}
                            setActiveSelectorFilter={setActiveSelectorFilter}
                            itemChoices={dietsChoices}
                            />
                    </fieldset> 
                </div>

                <footer>
                    <div>
                        {isConnected && currentPath === '/proposal' &&
                                <label htmlFor="favorites" >
                                    <input 
                                    className={style.checkboxAside} 
                                    id="favorites" 
                                    name="favorites" 
                                    value={favorites.state} 
                                    type="checkbox" 
                                    onChange={handleChangeFavoritesFilter} 
                                    checked={favorites.state} 
                                    style={mode?{border:"1px #282a2c solid", cursor:"pointer"}:{border:"1px #ada28f solid", cursor:"pointer"}}
                                    />
                                    {favorites.name}

                                </label>
                        }
                        {currentPath !== "/proposal" && <input type="hidden" name='page' value='1'/>}
                        <button  ref={filterButton} className={currentPath === '/proposal'?style.invisible:style.buttonElement}>Filtrer</button>
                    </div>
                    <NavLink onClick={setOfFilters} to={currentPath}>Désélectionner les filtres</NavLink>
                </footer>        

            </Form>
        </div>   
                
        
        <NavLink className={`${style.asideA} ${style.hideAside} asideA`} to={"/proposal"} onClick={handleClickStarterButton}>
            <p>{btnFooter}</p>
            <label className={style.container} htmlFor="goingProposal">
                <input checked={proposal.array.length > 0} type="checkbox" id="goingProposal" aria-label="going to proposal" onChange={onChange}/>
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
    </>
    )
};

export default Aside;