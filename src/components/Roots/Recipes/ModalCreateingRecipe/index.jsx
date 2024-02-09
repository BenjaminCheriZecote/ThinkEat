import { useRef, useState } from "react";
import store from "../../../../store";
import { useSelector } from "react-redux";
import Select from 'react-select';
import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";



const ModalCreatingRecipe = ({setModeCreator}) => {

    
    const {recipes} = useSelector((state) => state.recipes);
    const hungerBigName = useSelector((state) => state.criterias.criterias[1].name);
    const hungerFewName = useSelector((state) => state.criterias.criterias[2].name);
    const [steps, setStep] = useState(['']);

    const options = [
        {value:hungerBigName, label:hungerBigName},
        {value:hungerFewName, label:hungerFewName},
    ]
    
    const handleSubmitCreation = (event) => {
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
        const length = recipes.length;
        const recipe = {...dataForm, id:length +1}
        store.dispatch({type:"SET_RECIPES", payload:[...recipes, recipe]})
    }

    const handleClickAddStepp = () => {
        setStep([...steps, '']);
    }

    const cancelCreationRecipe = () => {
        setModeCreator((current) => !current) 
    }
    

    return(
        <div className="backdrop">
            <form className="section__recipe modal" onSubmit={handleSubmitCreation}>
                        <img src="" alt="" />
                        <div className="section-recipe__field"> <label>Name :</label><input name="name" type="text" /></div>
                        <div className="section-recipe__field"> <label>Preparation :</label> <input name="preparating_time" type="number"/> </div>
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

                        <button><FaCheck/></button>
                        <MdCancel onClick={cancelCreationRecipe}/>
                    </form>
        </div>
    )
}

export default ModalCreatingRecipe;