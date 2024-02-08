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
import Select from "react-select"



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
    const hungerBigName = useSelector((state) => state.criterias.criterias[1].name);
    const hungerFewName = useSelector((state) => state.criterias.criterias[2].name);
    
    const [favoritesCopy, setCopy] = useState(favorites);
    const [hungryState, setHungry] = useState("Petite faim");
    const [steps, setStep] = useState([''])
    const [openModeCreator, setModeCreator] = useState(false)
    const containerInputUser = useRef();
    const formCreation = useRef();

    useEffect(() => {
        setCopy(favorites)
    }, [favorites])

    const options = [
        {value:hungerBigName, label:hungerBigName},
        {value:hungerFewName, label:hungerFewName},
    ]

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

    const handleClickAddRecipe = (event) => {
        formCreation.current.classList.toggle("hidden")
        setModeCreator((current) => !current) 
    }

    const handleClickAddStepp = () => {
        setStep([...steps, '']);
    }

    const handleSubmitCreation = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const dataForm = {};
        for (const [name, value] of formData.entries()) {
            if (name.startsWith('step')) {
                if (!dataForm.step) {
                    dataForm.step = [value];
                } else {
                    dataForm.step.push(value);
                }
            } else {
                dataForm[name] = value;
            }
        }
        const favorite = {...dataForm, id:6}
        // console.log(dataForm)
        // console.log(favorite)
        store.dispatch({type:"SET_FAVORITES", payload:[...favorites, favorite]})
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
                    {!openModeCreator?
                    <FaSquarePlus onClick={handleClickAddRecipe}/>
                    :
                    <FaSquareMinus onClick={handleClickAddRecipe}/>
                    }
                </div>

                <form ref={formCreation} className="section__recipe hidden" onSubmit={handleSubmitCreation}>
                    <img src="" alt="" />
                    <div className="section-recipe__field"> <label>Name :</label><input name="name" type="text" /></div>
                    <div className="section-recipe__field"> <label>Preparation :</label> <input name="preparating_time" type="text"/> </div>
                    <div className="section-recipe__field">
                        <label>Faim</label> 
                        <Select options={options} name="hunger"/>
                    </div>
                    <ul className="section-recipe__field"> Etapes: <FaPlus onClick={handleClickAddStepp}/>
                    {steps.map((element, index) => {
                        return(
                            <li key={index}>
                                <input name={`step${index}`} type="text"/>
                            </li>
                        )
                    })}      
                    </ul>

                    <button>Créer</button>
                </form>

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