import './Favorites.css';
import { useRef } from 'react';
import { useEffect } from 'react';
import store from '../../../store';
import Meal from './Meal';
import { CiSearch } from "react-icons/ci";
import { FaPlus } from 'react-icons/fa6';
import AddPlus from '../../Layout/UXElements/icons/AddPlus';
import { useSelector } from 'react-redux';
import { FaSquarePlus } from "react-icons/fa6";
import { FaSquareMinus } from 'react-icons/fa6';
import { MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { useState } from 'react';
import RecipeUX from '../../Layout/UXElements/components/RecipeUX';
import Select from "react-select";
import ModalCreatingRecipe from './ModalCreateingRecipe';
import OrderByComponent from '../../Layout/UXElements/components/OrderByComponent';
import { Form, useLoaderData } from 'react-router-dom';
import { RecipeApi } from '../../../api'
import types from '../../../store/reducers/types';
import {mappingUrlFunction} from '../../../helpers/httpQueries'
import SearchForm from '../../Layout/UXElements/components/SearchForm';



const Favorites = () => {

    const {isAside} = useSelector((state) => state.isAside);
    const favorites = useLoaderData();

    // const {favorites} = useSelector((state) => state.favorites);
    
    const [favoritesCopy, setCopy] = useState(favorites);
    const [openModeCreator, setCreatorMode] = useState(false);
    

    useEffect(() => {
        setCopy(favorites)
    }, [favorites])

    const handleChangeSearch = (event) => {
        if (event.target.value.length === 0) setCopy(favorites)
        const searchedRecipes = favorites.filter((recipe) => recipe.name.startsWith(event.target.value));
        setCopy(searchedRecipes);
    }


    const handleClickAddRecipe = () => {
        setCreatorMode((current) => !current) 
    }

    
    return(
        <main style={{ gridColumn: '2 / -1'}}>
            <section className="section">
                <div className="section__divForm">
                <h2>Favoris</h2>
                    <div>
                        <SearchForm handleChangeSearch={handleChangeSearch}/>
                        <OrderByComponent />
                    </div>
                </div>

                <div className="section__addRecipe">
                {!openModeCreator?
                    <AddPlus handleClick={handleClickAddRecipe}/>
                    :
                    <FaSquareMinus onClick={handleClickAddRecipe}/>
                    }
                </div>

                {openModeCreator&&
                    <div className="backdrop">
                        <RecipeUX modal={"modal"} formMethod={"POST"} cancelHandler={() => setCreatorMode(false)}/>
                    </div>
                    }

                {favoritesCopy.length > 0 &&
                    favoritesCopy.map((meal, index) => {
                        return(<Meal key={index} meal={meal}/>)
                    }) 
                }

            </section>
        </main>
    )
}

export default Favorites;

export async function favoritesLoader(){

    store.dispatch({type:types.SET_IS_ASIDE_TRUE});

    const urlClient = window.location.href;
    const query = mappingUrlFunction(urlClient);
    console.log(query);

    // test

    // const favorites = await await RecipeApi.getAll();
    // store.dispatch({type:types.SET_FAVORITES, payload: favorites})

    const recipesQuerry = await RecipeApi.getAll(query);
    // if (recipesQuerry.error) {

    //     // toast
    // }
    store.dispatch({type:types.SET_RECIPES_QUERRY, payload: recipesQuerry})
    
    console.log("retour back fetch", recipesQuerry);

    // 

    // async function fetchDataRecipesApi(query) {
    //     try {
    //         const favorites = await RecipeApi.getAll(query);
    //         store.dispatch({type:types.SET_FAVORITES, payload: favorites})
                
    //         return favorites
    //     } catch (error) {
    //         console.log(error)
    //         return error
    //     }
    // }
    // return fetchDataRecipesApi();
    
    
    
    return recipesQuerry;
}