import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Form } from "react-router-dom";

import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import DropDownList from "./DropDownList";

export default function RecipeUX({recipe, formMethod, cancelHandler}) {
  const user = useSelector((state) => state.session);
  const criterias = useSelector((state) => state.criterias);
  const ingredientsList = useSelector((state) => state.ingredients.ingredients);

  const [inChange, setInChange] = useState(false);
  const [steps, setSteps] = useState(recipe.steps);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const selectElement = useRef();

  function  changeRecipe() {
    setInChange(!inChange);
  }

  if (!inChange) {
    return (
      <div className="section__recipe" method={formMethod}>
        <h2 className="section-recipe__name">{recipe.name}</h2>
        <section className="section-recipe__top">
          <div>
            <div className="section-recipe__field">
              <h4>Preparation :</h4>
              <time dateTime={recipe.preparationTime}>{recipe.preparationTime}</time>
            </div>
            <div className="section-recipe__field">
              <h4>Cuisson :</h4>
              <time dateTime={recipe.cookingTime}>{recipe.cookingTime}</time>
            </div>
            <div className="section-recipe__field">
              <h4>Nombre de convive :</h4>
              <span>{recipe.person}</span>
            </div>
            <div className="section-recipe__field">
              <h4>Faim :</h4> 
              <span>{recipe.hunger}</span>
            </div>
          </div>
          <figure>
            <img src="/tartiflete.jpg" alt={recipe.name} />
            <figcaption>{recipe.name}</figcaption>
          </figure>
        </section>

        <section>
          <div className="section-recipe__field">
            <h3>Ingredients</h3>
          </div>
          <ul className="section-recipe__field--ingredientsContainer">
          {recipe.ingredients.map(ingredient => (
            <li key={ingredient.id}>
              <figure>
                <img src={ingredient.image} alt={ingredient.name} />
                <figcaption>{ingredient.name}</figcaption>
              </figure>
            </li>
          ))}
          </ul>
        </section>

        <section>
          <div className="section-recipe__field">
            <h3>Etapes</h3>
          </div>
          <ul>
            {recipe.steps.map((step, index) => (
              <li key={index}>
                <h4>Etape {index+1}</h4>
                <p>{step}</p>
              </li>
            ))}      
          </ul>
        </section>
        { (user.isAdmin || user.id === recipe.userId) &&
          <div className="section-recipe__bottom">
            <button type="button" onClick={changeRecipe}><FaEdit/></button>
          </div>
        }
      </div>
    );
  }

  function closeAllMenu() {
    if (selectedMenu !== "ingredients") return;
    setSelectedMenu(null);
  }
  function openIngredientMenu() {
    if (selectedMenu === "ingredients") return;
    setSelectedMenu("ingredients");
  }
  function toggleItem(event) {
    const [itemName, idString] = event.target.dataset.itemId.split("-");
    const id = parseInt(idString);
    if (itemName === "Ingredients") {
      const isInRecipe = ingredients.some(ingredient => ingredient.id === id)
      if (isInRecipe) {
        setIngredients(ingredients.filter(ingredient => ingredient.id !== id));
      } else {
        const newIngredient = ingredientsList.find(ingredient => ingredient.id === id)
        setIngredients([...ingredients, newIngredient]);
      }
    }
    if (itemName === "steps") {
      const newSteps = [...steps];
      newSteps.splice(id,1)
      console.log(newSteps)
      setSteps(() => newSteps);
    }
  }

  function addStepp() {
    setSteps([...steps, '']);
  }

  function stepUpdate(event) {
    const id = parseInt(event.target.dataset.itemId.split("-")[1]);
    const newSteps = [...steps];
    newSteps[id] = event.target.value;
    setSteps(newSteps);
  }

  return(
    <Form className="section__recipe" method={formMethod}>
      <input className="section-recipe__name" name="name" type="text" defaultValue={recipe.name}/>
      <fieldset className="section-recipe__top">
        <div>
          <div className="section-recipe__field">
            <label>Preparation :</label>
            <input name="preparationTime" type="time" defaultValue={recipe.preparationTime} />
          </div>
          <div className="section-recipe__field">
            <label>Cuisson :</label>
            <input name="cookingTime" type="time" defaultValue={recipe.cookingTime} />
          </div>
          <div className="section-recipe__field">
            <label>Nombre de convive :</label>
            <input name="person" type="number" min="1" defaultValue={recipe.person} />
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
          <DropDownList itemName={"Ingredients"} items={ingredientsList} choosenItems={ingredients} isOpen={selectedMenu === "ingredients"} openHandler={openIngredientMenu} closeHandler={closeAllMenu} toggleItemHandler={toggleItem} />
        </div>
        <ul className="section-recipe__field--ingredientsContainer">
        {ingredients.map(ingredient => (
          <li key={ingredient.id}>
            <figure>
              <button type="button" data-item-id={`Ingredients-${ingredient.id}`} onClick={toggleItem} ><MdCancel size={12}/></button>
              <img src={ingredient.image} alt={ingredient.name} />
              <figcaption>{ingredient.name}</figcaption>
            </figure>
          </li>
        ))}
        </ul>
      </fieldset>

      <fieldset>
        <div className="section-recipe__field">
          <legend>Etapes</legend>
          <button type="button" onClick={addStepp}><FaPlus /></button>
        </div>
        <ul>
          {steps.map((step, index) => (
            <li key={index}>
              <p>Etape {index+1}</p>
              <button type="button" data-item-id={`steps-${index}`} onClick={toggleItem}>
                <MdCancel size={12}/>
              </button>
              <textarea name={`steps${index}`} value={step} data-item-id={`steps-${index}`} onChange={stepUpdate}/>
            </li>
          ))}      
        </ul>
      </fieldset>
      
      <div className="section-recipe__bottom">
        <button type="submit"><FaCheck/></button>
        <button type="button" onClick={cancelHandler || changeRecipe}><MdCancel/></button>
      </div>
    </Form>
  )
}





