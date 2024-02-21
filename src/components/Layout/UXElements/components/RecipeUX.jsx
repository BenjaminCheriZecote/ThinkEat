import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Form } from "react-router-dom";

import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import DropDownList from "./DropDownList";
import { IngredientApi, RecipeApi } from "../../../../store/api";
import store from "../../../../store";

export default function RecipeUX({recipe, formMethod, cancelHandler}) {
  const user = useSelector((state) => state.session);
  const criterias = useSelector((state) => state.criterias);
  const ingredientsList = useSelector((state) => state.ingredients.ingredients);
  const units = useSelector((state) => state.units);

  const [inChange, setInChange] = useState(false);
  const [steps, setSteps] = useState(recipe.steps);
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const selectElement = useRef();

  function  changeRecipe() {
    setInChange(!inChange);
  }

  const handleSubmit = (event) => {
    const formData = new FormData(event.target);
    const dataForm = Object.fromEntries(formData);
    console.log("log data form :", dataForm)
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
            <img src={recipe.image} alt={recipe.name} />
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
                <figcaption>{ingredient.quantity && ingredient.quantity + " "}{ingredient.unit && ingredient.unit + " "}{ingredient.name}</figcaption>
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
    <Form className="section__recipe" method={formMethod} onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={recipe.id} />
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
            <select className="section-recipe-field__select" ref={selectElement} name="hunger" defaultValue={recipe.hunger}>
              {!!criterias.hunger && criterias.hunger.map(({name},index) => (
                <option key={index} value={name}>{name}</option>
              ))}
            </select>
          </div>
        </div>
        <figure>
          <img src={recipe.image} alt="" />
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
              <figcaption>
                {ingredient.name}
                <input type="number" min="0" name={`quantity-${ingredient.id}`} defaultValue={ingredient.quantity} />
                <select name={`unit-${ingredient.id}`} defaultValue={ingredient.unit || 0} >
                  {units.map(unit => 
                    <option key={unit.id} value={unit.id}>{unit.name}</option>
                  )}
                </select>
              </figcaption>
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
        {steps &&
          <input type="hidden" name="steps" defaultValue={steps.map((element) => element).join('"') }/>
        }
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

export async function recipeAction({ request }) {
  console.log("test")
  switch (request.method) {
    case "PATCH": {
      let formData = await request.formData();
      const {recipes} = store.getState();

      const id = parseInt(formData.get("id"));
      const steps = formData.get("steps");
      const mappingSteps = steps.split('"');
      const allIngredients = formData.get("ingredients");
      const mappingIngredientsId = allIngredients.split('-');
      

      const foundRecipe = recipes.recipes.find((recipe) => recipe.id === id);
      const foundIngredientsOfRecipe = foundRecipe.ingredients;
      console.log("log found :", foundIngredientsOfRecipe)

      const removeIngredientsRecipe = foundIngredientsOfRecipe.filter((ingredient) => !mappingIngredientsId.some((id) => {
        return ingredient.id === parseInt(id);
      }));
      console.log("log remove ", removeIngredientsRecipe)
      if (removeIngredientsRecipe.lenght) {
        await Promise.all(removeIngredientsRecipe.map(async (element) => {
            const ingredientRecipe = await IngredientApi.removeIngredientToRecipe( id, element.id )
            console.log(ingredientRecipe)
        }));
      }

      const addIngredientsRecipe = mappingIngredientsId.filter((idIngredient) => !foundIngredientsOfRecipe.some((element) => element.id === parseInt(idIngredient)));
      console.log("log add :", addIngredientsRecipe)
      if (addIngredientsRecipe.length) {
        await Promise.all(addIngredientsRecipe.map(async (element) => {
          const ingredientRecipe = await IngredientApi.addIngredientToRecipe( id, element )
          console.log(ingredientRecipe)
        }));
      }

      const data = {
        name:formData.get("name"),
        hunger:formData.get("hunger"),
        preparationTime:formData.get("preparationTime"),
        time:formData.get("cookingTime"),
        person:formData.get("person"),
        steps:mappingSteps,
      }
      console.log("data time : ", data.time, data.preparationTime)
      console.log("data time type: ", typeof data.time, typeof data.preparationTime)
      console.log("log object data :", data)
      const updatedRecipe = await RecipeApi.update(id, data)
      console.log("retour fetch ", updatedRecipe)
      
      return updatedRecipe
    }
    default: {
      throw new Response("", { status: 405 });
    }
  }
}
