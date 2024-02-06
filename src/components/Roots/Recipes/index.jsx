import { useSelector } from "react-redux";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import store from '../../../store';
import Meal from "../Favorites/Meal";
import { CiSearch } from "react-icons/ci";
import { FaSquarePlus } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";



const Recipes = () => {

    
    

    const {recipes} = useSelector((state) => state.recipes)
    const [recipesCopy, setCopy] = useState(recipes);
    const [hungryState, setHungry] = useState("Petite faim");
    const containerInputUser = useRef();

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

    const handleClickAddMeal = () => {
        containerInputUser.current.classList.remove("hidden");
    }

    const handleClickInputUser = () => {
        const inputUserElement = containerInputUser.current.querySelector("input");
        console.log("test", inputUserElement.value)
        store.dispatch({type:"SET_FAVORITES", payload:[...recipes, {name:inputUserElement.value, hungry:hungryState}]});
        
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
        <section className="section">
            <h2>Recipes</h2>
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

                {recipesCopy.length > 0?
                    recipesCopy.map((meal, index) => {
                        return(<Meal key={index} meal={meal} hungryState={hungryState} />)
                    })
                    :
                    ""
                }

            </section>
    )
}

export default Recipes;