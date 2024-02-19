import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Form } from "react-router-dom";

import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";


const RecipeUX = ({recipe}) => {
  const criterias = useSelector((state) => state.criterias);
  const [steps, setStep] = useState(recipe.steps);
  const [ingredients, setIngredient] = useState(recipe.ingredients);
  const selectElement = useRef()

  const handleClickAddStepp = () => {
    setStep([...steps, '']);
  }

  const handleClickDeleteStepp = (event) => {
    const textContentStep = event.target.closest("li").outerText;
    const index = parseInt(textContentStep.slice(-1)) - 1;
    const arrayStep = [...steps];
    arrayStep.splice(index, 1);
    setStep(arrayStep);
  }

  const handleClickAddIngredient = () => {
    setIngredient([...ingredients, '']);
  }

  const handleClickDeleteIngredients = (event) => {
    const liParentElement = event.target.closest("li");
    const inputIngredientElement = liParentElement.querySelector("input")
    const index = parseInt(inputIngredientElement.name.slice(-1));
    const arrayIngredients = [...ingredients]
    arrayIngredients.splice(index, 1)
    setIngredient(arrayIngredients)
  }
  
  return(
    <Form className="section__recipe">
      <input className="section-recipe__name" name="name" type="text" defaultValue={recipe.name}/>
      <fieldset className="section-recipe__top">
        <div>
          <div className="section-recipe__field">
            <label>Preparation :</label>
            <input name="preparatingTime" type="time" defaultValue={recipe.preparatingTime} />
          </div>
          <div className="section-recipe__field">
            <label>Cuisson :</label>
            <input name="cookingTime" type="time" defaultValue={recipe.preparatingTime} />
          </div>
          <div className="section-recipe__field">
            <label>Nombre de convive :</label>
            <input name="person" type="number" min="1" defaultValue={recipe.preparatingTime} />
          </div>
          <div className="section-recipe__field">
            <label>Faim :</label> 
            <select className="section-recipe-field__select" ref={selectElement} name="hunger">
              {!!criterias.hunger && criterias.hunger.map(({name},index) => (
                <option key={index} value={name}>{name}</option>
              ))}
            </select>
          </div>
        </div>
        <figure>
          <img src="/tartiflete.jpg" alt="" />
          <figcaption>{recipe.name}</figcaption>
        </figure>
      </fieldset>

      <fieldset>
        <div className="section-recipe__field">
          <legend>Ingredients :</legend>
          <button type="button" onClick={handleClickAddIngredient}><FaPlus/></button>
        </div>
        <ul className="section-recipe__field--ingredientsContainer">
        {ingredients.map((element, index) => (
          <li key={index}>
            <button type="button"><MdCancel onClick={handleClickDeleteIngredients} size={12}/></button>
            <input name={`ingredients${index}`} type="text" defaultValue={ingredients[index].name} />
            <img src={ingredients[index].image} alt="" />
          </li>
        ))}
        </ul>
      </fieldset>

      <fieldset>
        <div className="section-recipe__field">
          <legend>Etapes :</legend>
          <button type="button" onClick={handleClickAddStepp}><FaPlus /></button>
        </div>
        <ul>
          {steps.map((element, index) => (
            <li key={index}>
              <div>
                <p>Etape {index+1}</p>
                <button type="button"><MdCancel onClick={handleClickDeleteStepp} size={12}/></button>
              </div>
              <div>
                <textarea name={`steps${index}`} defaultValue={steps[index]} />
              </div>
            </li>
          ))}      
        </ul>
      </fieldset>
      
      <div className="section-recipe__bottom">
        <button type="submit"><FaCheck/></button>
        <button type="button"><MdCancel/></button>
      </div>
    </Form>
  )
}

export default RecipeUX;





