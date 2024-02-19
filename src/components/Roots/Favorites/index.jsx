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
    const [openModeCreator, setModeCreator] = useState(false);
    

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

    const handleClickAddRecipe = () => {
        setModeCreator((current) => !current) 
    }

    
    return(
        <>
            <section className="section">
                <div className="section__divForm">
                <h2>Favoris</h2>
                    <div>
                        <Form onSubmit={handleSubmitSearch} className="" action="">
                            <input type="search" placeholder='Rechercher' name="search" onChange={handleChangeSearch}/>
                            <button><CiSearch /></button>
                        </Form>
                        <OrderByComponent />
                    </div>
                </div>

                <div className="addRecipe">
                {!openModeCreator?
                    <FaSquarePlus onClick={handleClickAddRecipe}/>
                    :
                    <FaSquareMinus onClick={handleClickAddRecipe}/>
                    }
                </div>

                {openModeCreator&&
                    <ModalCreatingRecipe setModeCreator={setModeCreator}/>
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