import './Favorites.scss';
import { useRef } from 'react';
import { useEffect } from 'react';
import store from '../../../store';
import Meal from './Meal';
import { CiSearch } from "react-icons/ci";
import { FaPlus } from 'react-icons/fa6';
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
import { Form } from 'react-router-dom';
import { RecipeApi } from '../../../store/api';
import types from '../../../store/reducers/types';
import {mappingUrlFunction} from '../../httpQueries/index'




// {
//     id:1,
//     name:"Hamburger",
//     image:"",
//     steps:["Cuire les steak à la poèle.", "Chauffer le pain au four, avec steak et fromage", "Rajouter tomate et salade"],
//     hunger:"big",
//     preparating_time:10,
//     ingredients:["pain", "salade", "tomate", "steak", "fromage"]
// },



const Favorites = () => {

    const {favorites} = useSelector((state) => state.favorites);
    
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
        <>
            <section className="section">
                <div className="section__divForm">
                <h2>Favoris</h2>
                    <div>
                        <Form className="" action="">
                            <input type="search" placeholder='Rechercher' name="search" onChange={handleChangeSearch}/>
                            <button><CiSearch /></button>
                        </Form>
                        <OrderByComponent />
                    </div>
                </div>

                <div className="section__addRecipe">
                {!openModeCreator?
                    <FaSquarePlus onClick={handleClickAddRecipe}/>
                    :
                    <FaSquareMinus onClick={handleClickAddRecipe}/>
                    }
                </div>

                {openModeCreator&&
                    // <ModalCreatingRecipe setCreatorMode={setCreatorMode}/>
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
        </>
    )
}

export default Favorites;

export async function favoritesLoader(){

    // const urlClient = window.location.href;
    // const query = mappingUrlFunction(urlClient);
    // console.log(query);

    // test

    // const favorites = await await RecipeApi.getAll();
    // store.dispatch({type:types.SET_FAVORITES, payload: favorites})

    // const recipesQuerry = await RecipeApi.getAll(query);
    // store.dispatch({type:types.SET_RECIPES_QUERRY, payload: recipesQuerry})
    
    // console.log("retour back fetch", recipesQuerry);
    // console.log(query);

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
    
    return null;
}