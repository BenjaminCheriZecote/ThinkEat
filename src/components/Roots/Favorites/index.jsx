import './Favorites.scss';
import { useRef } from 'react';
import { useEffect } from 'react';
import store from '../../../store';
import Meal from './Meal';
import { CiSearch } from "react-icons/ci";

import { useSelector } from 'react-redux';
import { FaSquarePlus } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { useState } from 'react';



const Favorites = () => {

    const {favorites} = useSelector((state) => state.favorites);
    const [favoritesCopy, setCopy] = useState(favorites);
    const [hungryState, setHungry] = useState("Petite faim");
    const containerInputUser = useRef();

    useEffect(() => {
        setCopy(favorites)
    }, [favorites])

    const handleSubmitSearch = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const dataForm = Object.fromEntries(formData);
        const filteredResearch = favorites.filter((element) => element.name.toLowerCase().includes(dataForm.search.toLocaleLowerCase()) );
        console.log(filteredResearch);
        setCopy(filteredResearch);
    }

    const handleChangeSearch = (event) => {
        if (event.target.value.length === 0) setCopy(favorites)
    }

    const handleClickAddMeal = () => {
        containerInputUser.current.classList.remove("hidden");
        setUpdateMode(true)
    }

    const handleClickInputUser = () => {
        const inputUserElement = containerInputUser.current.querySelector("input");
        console.log("test", inputUserElement.value)
        store.dispatch({type:"SET_FAVORITES", payload:[...favorites, {name:inputUserElement.value, hungry:hungryState}]});
        console.log(favorites);
    }

    const handleClickCloseAddMeal = () => {
        containerInputUser.current.classList.add("hidden");
    }

    const handleChangeHungryFilter = (event) => {
        if (event.target.checked) {
            setHungry("Grande faim")
        } else {
            setHungry("Petite faim")
        }
    }
    
    return(
        <>
            <section className="section">
                <div className="section__divForm">
                    <form onSubmit={handleSubmitSearch} className="" action="">
                        <input type="search" placeholder='Rechercher' name="search" onChange={handleChangeSearch}/>
                        <button><CiSearch /></button>
                    </form>
                    <FaSquarePlus onClick={handleClickAddMeal}/>
                </div>

                <div ref={containerInputUser} className="section__divInput hidden">
                    <input type="text" />
                    <div>
                        <input id="hungryFilter" type="checkbox" onChange={handleChangeHungryFilter}/>
                        <label htmlFor="hungryFilter">{hungryState}</label>
                    </div>
                    <div><FaCheck onClick={handleClickInputUser}/> <MdCancel onClick={handleClickCloseAddMeal}/></div>
                </div>

                {favoritesCopy.length > 0?
                    favoritesCopy.map((meal, index) => {
                        return(<Meal key={index} meal={meal} hungryState={hungryState} />)
                    })
                    :
                    ""
                }

            </section>
        </>
    )
}

export default Favorites;