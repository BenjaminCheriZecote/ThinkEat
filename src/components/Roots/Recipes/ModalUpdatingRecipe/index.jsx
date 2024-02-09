import { useRef, useState } from "react";
import store from "../../../../store";
import { useSelector } from "react-redux";
import Select from 'react-select';
import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";


const ModalUpdatingRecipe = ({meal, setUpdateMode}) => {

    const {recipes} = useSelector((state) => state.recipes);
    const hungerBigName = useSelector((state) => state.criterias.criterias[1].name);
    const hungerFewName = useSelector((state) => state.criterias.criterias[2].name);
    const [mealValue, setMealValue] = useState(meal);
    const [steps, setStep] = useState(mealValue.steps);
    const selectElement = useRef() 

    const options = [
        {value:hungerBigName, label:hungerBigName},
        {value:hungerFewName, label:hungerFewName},
    ]
    
    const handleSubmitUpdate = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const dataForm = {};
        for (const [name, value] of formData.entries()) {
            if (name.startsWith('step')) {
                if (!dataForm.steps) {
                    dataForm.steps = [value];
                } else {
                    dataForm.steps.push(value);
                }
            } else {
                dataForm[name] = value;
            }
        }
        const recipe = {...dataForm, id:mealValue.id};
        const updatedRecipes = [...recipes];
        const foundRecipe = updatedRecipes.findIndex((element) => element.id === recipe.id)
        updatedRecipes[foundRecipe] = recipe
        store.dispatch({type:"SET_RECIPES", payload:updatedRecipes})
    }

    const handleClickAddStepp = () => {
        setStep([...steps, '']);
    }

    const cancelCreationRecipe = () => {
        setUpdateMode((current) => !current)
    }

    const handleChangeValue = (event) => {


        const { name, value } = event.target;
        if (!event.target.name.includes("step")) {
            setMealValue(currentMeal => ({...currentMeal, [name]: value }));
        } else {
            const index = parseInt(name.slice(-1));
            setStep(prevSteps => {
                    const updatedSteps = [...prevSteps];
                    updatedSteps[index] = value;
                    return updatedSteps;
                })
        }
    }

    const handleChangeValueSelect = (selectedOption) => {
        const value = selectedOption.value;
        setMealValue(currentMeal => ({...currentMeal, hunger: value }));
    }
    

    return(
        <div className="backdrop">
            <form className="section__recipe modal" onSubmit={handleSubmitUpdate}>
                        <img src="" alt="" />
                        <div className="section-recipe__field"> <label>Name :</label><input name="name" type="text" value={mealValue.name} onChange={handleChangeValue}/></div>
                        <div className="section-recipe__field"> <label>Preparation :</label> <input name="preparating_time" type="number" value={mealValue.preparating_time} onChange={handleChangeValue}/> </div>
                        <div className="section-recipe__field">
                            <label>Faim</label> 
                            <Select ref={selectElement} options={options} name="hunger" defaultValue={{ label:mealValue.hunger, value: mealValue.hunger}} onChange={handleChangeValueSelect}/>
                        </div>
                        <ul className="section-recipe__field"> Etapes: <FaPlus onClick={handleClickAddStepp}/>
                        {steps.map((element, index) => {
                            return(
                                <li key={index}>
                                    <input name={`steps${index}`} type="text" value={steps[index]} onChange={handleChangeValue}/>
                                </li>
                            )
                        })}      
                        </ul>

                        <button><FaCheck/></button>
                        <MdCancel onClick={cancelCreationRecipe}/>
                    </form>
        </div>
    )
}

export default ModalUpdatingRecipe;