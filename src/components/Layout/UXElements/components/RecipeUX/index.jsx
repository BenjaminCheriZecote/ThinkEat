import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Form, redirect, useActionData } from "react-router-dom";
import toast from "../../../../../helpers/toast";
import { CiTrash } from "react-icons/ci";
import DeleteTrash from "../../icons/DeleteTrash";


import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import DropDownList from "../DropDownList";
import { IngredientApi, RecipeApi } from "../../../../../api"
import store from "../../../../../store";
import secondesConverterFunction from "../../../../../helpers/secondesConverterFunction";
import formatterSecondesTime from "../../../../../helpers/formatterSecondesTime";
import './style.css'
import style from './index.module.css'
import DeleteCruse from "../../icons/DeleteCruse";
import EditPen from "../../icons/EditPen";
import ValidateCheck from "../../icons/ValidateCheck";

const recipeInit = {
  steps:[],
  ingredients:[]
}

export default function RecipeUX({recipe = recipeInit, formMethod, cancelHandler, modal }) {

  const error = useActionData();

  const user = useSelector((state) => state.session);
  const criterias = useSelector((state) => state.criterias);
  const ingredientsList = useSelector((state) => state.ingredients.ingredients);
  const units = useSelector((state) => state.units);

  const [inChange, setInChange] = useState(modal);
  // const [inChange, setInChange] = useState(modal);
  const [steps, setSteps] = useState(recipe.steps);
  // const [steps, setSteps] = useState();
  const [ingredients, setIngredients] = useState(recipe.ingredients || []);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const selectElement = useRef();


  function  changeRecipe() {
    if (modal) {
      cancelHandler();
    }
    setInChange(!inChange);
  }

  if (!inChange) {
    return (
      <><div className={modal ? `${modal} ${style.sectionRecipe}` : `${style.sectionRecipe}`} method={formMethod}>
        <div>
          <img src="/logo1.png" alt="Logo de Koikonmange" />
          <h2 className={`${style.sectionRecipeName}`}>{recipe.name}</h2>
        </div>
        <section className={`${style.sectionRecipeTop}`}>
          <div>
            <div className={`${style.timeContainer}`}>
              <div className={`${style.sectionRecipeField} ${style.preparatingTimeContainer}`}>
                <h4>Preparation :</h4>
                <time dateTime={recipe.preparatingTime}>{recipe.preparatingTime}</time>
              </div>
              <div className={`${style.sectionRecipeField} ${style.cookingTimeContainer}`}>
                <h4>Cuisson :</h4>
                <time dateTime={recipe.cookingTime}>{recipe.cookingTime}</time>
              </div>
            </div>
            <div className={`${style.sectionRecipeField}`}>
              <h4>Nombre de convive :</h4>
              <span>{recipe.person}</span>
            </div>
            <div className={`${style.sectionRecipeField}`}>
              <h4>Faim :</h4>
              <span>{recipe.hunger}</span>
            </div>
          </div>
          <figure>
            <img src={recipe.image === null ? "/default-img.jpg" : recipe.image} alt={recipe.name} />
            <figcaption>{recipe.name}</figcaption>
          </figure>
        </section>

        <section>
          <div className={`${style.sectionRecipeField}`}>
            <h3>Ingredients</h3>
          </div>
          <ul className={`${style.sectionRecipeFieldIngredientsContainer}`}>
          {recipe.ingredients && recipe.ingredients.map(ingredient => (
            <li key={ingredient.id}>
              <figure>
                <div>
                  <img src={ingredient.image === null ? "/default-img.jpg" : ingredient.image} alt={ingredient.name} />
                </div>
                
                <figcaption>{ingredient.quantity && ingredient.quantity + " "}{ingredient.unit && ingredient.unit + " "}{ingredient.name}</figcaption>
                
              </figure>
            </li>
          ))}
        </ul>
      </section>
      <section>
          <div className={`${style.sectionRecipeField}`}>
            <h3>Etapes</h3>
          </div>
          <ul className={style.sectionRecipeFieldStepsContainer}>
            {recipe.steps && recipe.steps.map((step, index) => (
              <li key={index} className={`${style.liSteps}`}>
                <h4 className={`${style.sectionRecipeFieldH4}`}>Etape {index + 1}</h4>
                <p>{step}</p>
              </li>
            ))}
          </ul>
        </section>
        { (user.isAdmin || user.id === recipe.userId) &&
          <div className={`${style.sectionRecipeBottom}`}>
            <button type="button"><EditPen handleClick={changeRecipe} size={30}/></button>
          </div>
        }
      </div>
      </>
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
    <><Form className={modal ? `${modal} ${style.sectionRecipe} ${style.scrollY}` : `${style.sectionRecipe}`} method={formMethod}>
      <input type="hidden" name="id" value={recipe.id} />
      <div>
        <img src="/logo1.png" alt="Logo de Koikonmange" /> 
        <input className={`${style.sectionRecipeName}`} name="name" type="text" defaultValue={recipe.name} style={{ width: '20rem' }} required/>
      </div>
      <fieldset className={`${style.sectionRecipeTop}`}>
        <div>
          <div className={`${style.sectionRecipeField}`}>
            <label>Preparation :</label>
            <input name="preparatingTime" type="time" defaultValue={recipe.preparatingTime} required />
          </div>
          <div className={`${style.sectionRecipeField}`}>
            <label>Cuisson :</label>
            <input name="cookingTime" type="time" defaultValue={recipe.cookingTime} required />
          </div>
        
          <div className={`${style.sectionRecipeField}`}>
            <label>Nombre de convive :</label>
            <input name="person" type="number" min="1" defaultValue={recipe.person} />
          </div>
          <div className={`${style.sectionRecipeField}`}>
            <label>Faim :</label>
            <select className={`${style.sectionRecipeFieldSelect}`} ref={selectElement} name="hunger" defaultValue={recipe.hunger}>
              {!!criterias.hunger && criterias.hunger.map(({ name }, index) => (
                <option key={index} value={name}>{name}</option>
              ))}
            </select>
          </div>
        </div>
        <figure>
          <img src={recipe.image === null ? "/default-img.jpg" : recipe.image} alt={recipe.name} />
          <figcaption>{recipe.name}</figcaption>
        </figure>
      </fieldset>

      <fieldset >
        <div className={`${style.sectionRecipeField} ${style.divDropDonwList}`}>
          <legend>Ingredients</legend>
          <DropDownList itemName={"Ingredients"} items={ingredientsList} choosenItems={ingredients} isOpen={selectedMenu === "ingredients"} openHandler={openIngredientMenu} closeHandler={closeAllMenu} toggleItemHandler={toggleItem} />
        </div>
        <ul className={`${style.sectionRecipeFieldIngredientsContainer}`}>
        {ingredients && ingredients.map(ingredient => (
          <li key={ingredient.id}>
            <figure>
              <button className={style.BtnDeleteIngredient} type="button" data-item-id={`Ingredients-${ingredient.id}`} onClick={toggleItem} ><DeleteTrash /></button>
              <img src={ingredient.image === null ? "/default-img.jpg" : ingredient.image} alt={ingredient.name} />
              <figcaption className={style.figcaption}>
                <p>{ingredient.name}</p>
                <div className={style.figcaptionDiv}>
                  <input type="number" min="0" name={`quantity-${ingredient.id}`} defaultValue={ingredient.quantity} size="2"/>
                  <select name={`unit-${ingredient.id}`} defaultValue={ingredient.unit || 0}>
                    {units && units.map(unit => <option key={unit.id} value={unit.id}>{unit.name}</option>
                    )}
                  </select>
                </div>
                
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </fieldset>
    <fieldset>
        <div className={`${style.sectionRecipeField}`}>
          <legend>Etapes</legend>
          <button type="button" onClick={addStepp}><FaPlus /></button>
        </div>
        <ul className={style.sectionRecipeFieldStepsContainer}>
          {steps &&
            <input type="hidden" name="steps" defaultValue={steps.map((element) => element).join('"')} />}
          {steps && steps.map((step, index) => (
            <li key={index} >
              <h4 className={`${style.sectionRecipeFieldH4}`}>Etape {index + 1}
              <button className={style.BtnDeleteStep} type="button" data-item-id={`steps-${index}`} onClick={toggleItem}>
                <DeleteCruse />
                </button></h4>
              <textarea name={`steps${index}`} value={step} data-item-id={`steps-${index}`} onChange={stepUpdate}/>
            </li>
          ))}
        </ul>
      </fieldset><div className={`${style.sectionRecipeBottom}`}>
        <button type="submit"><ValidateCheck size={30} /></button>
        <button type="button" onClick={cancelHandler || changeRecipe}><MdCancel size={30} style={{color:"red", border:"none"}}/></button>
      </div>
    </Form>
    </>
  )
}


export async function recipeAction({ request, params }) {
  const {session} = store.getState();

  switch (request.method) {
    case "PATCH": {
      try {
        let formData = await request.formData();
      let formFields = {};
      const unitProperty = [];
      const quantityProperty = [];

      for (let entry of formData.entries()) {
          let fieldName = entry[0];
          let fieldValue = entry[1]; 
          if (fieldName.startsWith('unit')) {
            const idIngredientUnit = fieldName.slice(5);
            const value = [idIngredientUnit, fieldValue];
            unitProperty.push(value)
          }
          if (fieldName.startsWith('quantity')) {
            const idIngredientQuantity = fieldName.slice(9);
            const value = [idIngredientQuantity, fieldValue];
            quantityProperty.push(value)
          }
          formFields[fieldName] = fieldValue;
      }
      if (formFields.name === "" || formFields.name.charAt(0) !== formFields.name.charAt(0).toUpperCase() || formFields.name.length <= 3) {
        toast.error({message:"Merci de renseigner le nom correctement. \nUne majuscule, 4 caractères minimum."})
        return null
      }

      if (!formFields.ingredients || formFields.steps === "") {
        toast.error({message:"Veuillez ajouter au moins un ingrédient et une étape à la recette."})
        return null
      }
      const {recipes} = store.getState();

      const id = parseInt(formData.get("id"));
      const steps = formData.get("steps");
      const mappingSteps = steps.split('"');
      const allIngredients = formData.get("ingredients");
      const mappingIngredientsId = allIngredients.split('-');
      // format des temps (préparation / cuisson) peuvent varier si ils sont modifié ou non
      // le format est soit "" si le temps est vide, soit "00:00" si le temps est modifié, soit "00:00:00" si le temps est présent mais non modifé
      
      let preparatingTimeFromForm = formFields.preparatingTime; 
      let cookingTimeFromForm = formFields.cookingTime;

      // fonction pour convertir le format du temps 00:00 au format 00:00:00
      const checkTimeFunction = (time) => {
        if (time !== "") {
          if (time.length === 5) {
            const newTime = time + ':00';
            return newTime
          }
        }
        return time
      }
      preparatingTimeFromForm = checkTimeFunction(preparatingTimeFromForm); 
      cookingTimeFromForm = checkTimeFunction(cookingTimeFromForm); 

      // ------ gestion temps total. Le temps de cuisson n'existe pas en bdd, on le créer ici.
      // conversion des temps en secondes pour additionner les deux temps: 

      if (preparatingTimeFromForm !== "") {
        preparatingTimeFromForm = secondesConverterFunction(preparatingTimeFromForm);
      } else preparatingTimeFromForm = 0;

      if (cookingTimeFromForm !== "") {
        cookingTimeFromForm = secondesConverterFunction(cookingTimeFromForm);
      } else cookingTimeFromForm = 0

      const totalTimeInSecondes = preparatingTimeFromForm + cookingTimeFromForm;
      const timeFormatted = formatterSecondesTime(totalTimeInSecondes);
      const preparatingTimeFormatted = formatterSecondesTime(preparatingTimeFromForm);

      // reconversion du temps total et temps de préparation au format 00:00:00
      let match = timeFormatted.match(/^(\d+):(\d+):(\d+)$/);
      let match2 = preparatingTimeFormatted.match(/^(\d+):(\d+):(\d+)$/);

      const functionParser = (match) => {
        if (match) {
          let hours = match[1].padStart(2, '0');
          let minutes = match[2].padStart(2, '0');
          let seconds = match[3].padStart(2, '0');
      
          let formattedString = `${hours}:${minutes}:${seconds}`;
          return formattedString;
        } else {
          const error = "Format de chaine invalide."
          return error
        }
      }
      const time = functionParser(match);
      const preparatingTime = functionParser(match2); 

      const foundRecipe = recipes.recipes.find((recipe) => recipe.id === id);
      const foundIngredientsOfRecipe = foundRecipe.ingredients || [];


      const removeIngredientsRecipe = foundIngredientsOfRecipe.filter((ingredient) => !mappingIngredientsId.some((id) => {
        return ingredient.id === parseInt(id);
      }));

      if (removeIngredientsRecipe.lenght) {
        await Promise.all(removeIngredientsRecipe.map(async (element) => {
            const ingredientRecipe = await IngredientApi.removeIngredientToRecipe( id, element.id )
        }));
      }

      const addIngredientsRecipe = mappingIngredientsId.filter((idIngredient) => !foundIngredientsOfRecipe.some((element) => element.id === parseInt(idIngredient)));
      if (addIngredientsRecipe.length) {
        await Promise.all(addIngredientsRecipe.map(async (ingredientId) => {
          const foundQuantityToAddInRecipe = quantityProperty.find((quantityElement) => quantityElement[0] === ingredientId);
          const foundUnityToAddInRecipe = unitProperty.find((unitElement) => unitElement[0] === ingredientId);
          const data = {};
          data.quantity = foundQuantityToAddInRecipe[1];
          if (foundUnityToAddInRecipe[1] !== '0') data.unitId = foundUnityToAddInRecipe[1];
          const ingredientRecipe = await IngredientApi.addIngredientToRecipe( id, ingredientId, data )
        }));
      }

      const data = {
        name:formData.get("name"),
        hunger:formData.get("hunger"),
        preparatingTime:preparatingTime,
        time:time,
        person:formData.get("person"),
        steps:mappingSteps,
      }
      const updatedRecipe = await RecipeApi.update(id, data)
      toast.success("La recette a été modifié avec succès.")
      
      return updatedRecipe
      } catch (error) {
        toast.error({message:error})
        return null
      }
      
    }


    case "POST": {
      try {
        let formData = await request.formData();

      let formFields = {};
      const unitProperty = [];
      const quantityProperty = [];


      for (let entry of formData.entries()) {
          let fieldName = entry[0];
          let fieldValue = entry[1]; 
          if (fieldName.startsWith('unit')) {
            const idIngredientUnit = fieldName.slice(5);
            const value = [idIngredientUnit, fieldValue];
            unitProperty.push(value)
          }
          if (fieldName.startsWith('quantity')) {
            const idIngredientQuantity = fieldName.slice(9);
            const value = [idIngredientQuantity, fieldValue];
            quantityProperty.push(value)
          }
          formFields[fieldName] = fieldValue;
      }

      if (formFields.name === "" || formFields.name.charAt(0) !== formFields.name.charAt(0).toUpperCase() || formFields.name.length <= 3) {
        toast.error({message:"Merci de renseigner le nom correctement. \nUne majuscule, 4 caractères minimum."})
        return null
      }

      if (!formFields.ingredients || formFields.steps === "") {
        toast.error({message:"Veuillez ajouter au moins un ingrédient et une étape à la recette."})
        return null
      }

 
     
      const steps = formData.get("steps");
      const mappingSteps = steps.split('"');
      const allIngredients = formData.get("ingredients");
      const mappingIngredientsId = allIngredients.split('-');
      

      const preparatingTimeConvertedFormat = `${formData.get("preparatingTime")}:00`;
      const preparatingTimeConvertedInSecondes = secondesConverterFunction(preparatingTimeConvertedFormat);
     
      const cookingTimeConvertedFormat = `${formData.get("cookingTime")}:00`;
      const cookingTimeConvertedInSecondes = secondesConverterFunction(cookingTimeConvertedFormat);

      const totalTimeInSecondes = preparatingTimeConvertedInSecondes + cookingTimeConvertedInSecondes;
      const timeFormatted = formatterSecondesTime(totalTimeInSecondes);
      let match = timeFormatted.match(/^(\d+):(\d+):(\d+)$/);
      const functionParser = (match) => {
        if (match) {
          let hours = match[1].padStart(2, '0');
          let minutes = match[2].padStart(2, '0');
          let seconds = match[3].padStart(2, '0');
      
          let formattedString = `${hours}:${minutes}:${seconds}`;
          return formattedString;
        } else {
          const error = "Format de chaine invalide."
          return error
        }
      }
      const time = functionParser(match);

      const data = {
        name:formData.get("name"),
        hunger:formData.get("hunger"),
        preparatingTime:preparatingTimeConvertedFormat,
        time:time,
        person:formData.get("person"),
        steps:mappingSteps,
      }
      
      const createdRecipe = await RecipeApi.create(data);
      if (createdRecipe.error) {
        toast.error({message:createdRecipe.error})
        return null
      }
      const newIdFromCreatedRecipe = (createdRecipe.id).toString()
      // && mappingIngredientsId[0] == ''
      if (mappingIngredientsId.length === 1 && mappingIngredientsId[0] === '') {
        toast.error({message:"Veuillez ajouter au moins un ingrédient à la recette."});
        return null
      }

      if (mappingIngredientsId.length > 1) {
        await Promise.all(mappingIngredientsId.map(async (ingredientId) => {
          
          const foundQuantityToAddInRecipe = quantityProperty.find((quantityElement) => quantityElement[0] === ingredientId);
          const foundUnityToAddInRecipe = unitProperty.find((unitElement) => unitElement[0] === ingredientId);
          const data = {};
          data.quantity = foundQuantityToAddInRecipe[1];
          if (foundUnityToAddInRecipe[1] !== '0') data.unitId = foundUnityToAddInRecipe[1];
          
          // const data = {
          //   quantity:foundQuantityToAddInRecipe[1],
          //   unitId:foundUnityToAddInRecipe[1],
          // }
          await IngredientApi.addIngredientToRecipe(newIdFromCreatedRecipe, ingredientId, data )
        }));
      }
      if (mappingIngredientsId.length === 1 && mappingIngredientsId[0] !== '') {
        const foundQuantityToAddInRecipe = quantityProperty.find((quantityElement) => quantityElement[0] === mappingIngredientsId[0]);
        const foundUnityToAddInRecipe = unitProperty.find((unitElement) => unitElement[0] === mappingIngredientsId[0]);
        const data = {};
          data.quantity = foundQuantityToAddInRecipe[1];
          if (foundUnityToAddInRecipe[1] !== '0') data.unitId = foundUnityToAddInRecipe[1];
        // const data = {
        //   quantity:foundQuantityToAddInRecipe[1],
        //   unitId:foundUnityToAddInRecipe[1],
        // }
        await IngredientApi.addIngredientToRecipe( newIdFromCreatedRecipe, mappingIngredientsId[0], data );
      }
      toast.error("Test.")
      toast.success("La recette a été créée avec succès.")
      
      return null;
      } catch (error) {
        toast.error({message:error})
        return null
      }
      
    }
    case "DELETE": {
      await RecipeApi.delete(params.id)

      toast.success("Suppression de la recette effectué avec succès.");
      break;
    }
    default: {
      throw new Response("Invalide methode", { status: 405 });
    }

  }
}
