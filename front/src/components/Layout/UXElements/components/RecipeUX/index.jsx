import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Form, useActionData } from "react-router-dom";
import DownloadCloud from "../../icons/DownloadCloud/DownloadCloud";
import { FaPlus } from "react-icons/fa6";
import AddPlus from "../../icons/AddPlus";
import { MdCancel } from "react-icons/md";
import DropDownList from "../DropDownList";
import './style.css'
import style from './index.module.css'
import DeleteCruse from "../../icons/DeleteCruse";
import EditPen from "../../icons/EditPen";
import ValidateCheck from "../../icons/ValidateCheck";

const recipeInit = {
  steps:[],
  ingredients:[]
}

export default function RecipeUX({recipe = recipeInit, formMethod, cancelHandler, modal, favorite}) {
  
  const error = useActionData();
  const user = useSelector((state) => state.session);
  const {filters} = useSelector((state) => state.filters);
  const ingredientsList = useSelector((state) => state.ingredients.ingredients);
  const {units} = useSelector((state) => state.units);

  const [inChange, setInChange] = useState(modal);
  const [steps, setSteps] = useState(recipe.steps);
  const [ingredients, setIngredients] = useState(recipe.ingredients || []);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [imgAdded, setImgAdded] = useState(null);
  const [recipeImageCopy, setRecipeImageCopy] = useState(recipe.image)
  const selectElement = useRef();
  const inputFileElement = useRef();


  function  changeRecipe() {
    if (modal) {
      cancelHandler();
    }
    setInChange(!inChange);
  }

  function formatTime(time) {
    const [hours, minutes, seconds] = time.split(':');
    return `${hours}:${minutes}`;
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
            
              <div className={`${style.sectionRecipeField} `}>
                <h4>Preparation :</h4>
                <time dateTime={recipe.preparatingTime}>{formatTime(recipe.preparatingTime)}</time>
              </div>
              <div className={`${style.sectionRecipeField}`}>
                <h4>Cuisson :</h4>
                <time dateTime={recipe.cookingTime}>{formatTime(recipe.cookingTime)}</time>
              </div>
            
            <div className={`${style.sectionRecipeField}`}>
              <h4>Convive :</h4>
              <span>{recipe.person}</span>
            </div>
            <div className={`${style.sectionRecipeField}`}>
              <h4>Faim :</h4>
              <span>{recipe.hunger}</span>
            </div>
          </div>
          <figure>
            <img src={recipe.image === null ? "/default-img.webp" : recipe.image} alt={recipe.name} />
            <div>
              <figcaption>{recipe.name}</figcaption>
            </div>
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
                  <img src={ingredient.image === null ? "/default-img.webp" : ingredient.image} alt={ingredient.name} />
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
    const [itemName, idString] = event.target.closest('button') ? event.target.closest('button').dataset.itemId.split("-") : event.target.dataset.itemId.split("-");
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
      newSteps.splice(id,1);
      setSteps(() => newSteps);
    }
    if (itemName === "Image") {
      setImgAdded(null);
    }

    if (recipe.image)setRecipeImageCopy(null)
        
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

  function handleDownloadImg() {
    inputFileElement.current.click();
  }

  function handleFileChange() {

    const file = event.target.files[0];
   
      const reader = new FileReader();
      reader.onload = () => {
        setImgAdded({path:reader.result, name:file.name});
      };
      reader.readAsDataURL(file);
    
  }
  

  return(
    <><Form encType="multipart/form-data" className={modal ? `${modal} ${style.sectionRecipe} ${style.scrollY}` : `${style.sectionRecipe}`} method={formMethod}>
      <input type="hidden" name="id" value={recipe.id} />
      {favorite &&
        <input type="hidden" name="userId" value={user.id} />
      }
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
        
          <div className={`${style.sectionRecipeField} `}>
            <label>Convive :</label>
            <input name="person" type="number" min="1" defaultValue={recipe.person} className={`${style.personInput}`}/>
          </div>
          <div className={`${style.sectionRecipeField}`}>
            <label>Faim :</label>
            <select className={`${style.sectionRecipeFieldSelect}`} ref={selectElement} name="hunger" defaultValue={recipe.hunger}>
              {!!filters.hunger && filters.hunger.map(({ name }, index) => (
                <option key={index} value={name}>{name}</option>
              ))}
            </select>
          </div>
        </div>
        <figure>
          <input ref={inputFileElement} type="file" hidden accept=".jpg, .png, webp" onChange={handleFileChange} name="imageFile" multiple/>
            {formMethod === "POST" || formMethod === "PATCH"?
              imgAdded ?
                <>
                  <img src={imgAdded.path} alt="doawload image" />
                  <button data-item-id="Image" className={style.BtnDeleteImg} type="button"><DeleteCruse size={1} handleClick={toggleItem}/></button>
                </>
              :
                !recipeImageCopy? 
                  <>
                  <label 
                  className={style.downloadImg} 
                  onClick={handleDownloadImg} 
                  > 
                    <span>Choisir une image</span>
                    <DownloadCloud size={50} color={"var(--colorUser)"}/>
                  </label>
                  
                  </>
                :
                  <>
                    <img src={imgAdded?imgAdded.path : recipeImageCopy} alt={recipe.name} />
                    <button data-item-id="Image" className={style.BtnDeleteImg} type="button"><DeleteCruse size={1} handleClick={toggleItem}/></button>
                  </>
            :
              <img src={recipe.image === null ? "/default-img.webp" : `/${recipe.image}`} alt={recipe.name} />
            }
          
          <div>
            {!formMethod === "PATCH" || !formMethod === "POST" && <figcaption>{recipe.name}</figcaption>}
          </div>
        </figure>
      </fieldset>

      <fieldset >
        <div className={`${style.sectionRecipeField} ${style.divDropDonwList}`}>
          <legend>Ingredients</legend>
          <DropDownList itemName={"Ingredients"} items={ingredientsList} choosenItems={ingredients} isOpen={selectedMenu === "ingredients"} openHandler={openIngredientMenu} closeHandler={closeAllMenu} toggleItemHandler={toggleItem} />
        </div>
        <ul className={`${style.sectionRecipeFieldIngredientsContainer}`}>
        {modal && ingredients.length === 0 &&
        <li className={style.addIngredient} onClick={openIngredientMenu}>
          <AddPlus  size={40} color={"var(--colorUser)"}/>
        </li>
        }
        {ingredients && ingredients.map(ingredient => (
          <li key={ingredient.id}>
            <figure>
              <button className={style.BtnDeleteIngredient} type="button" data-item-id={`Ingredients-${ingredient.id}`} onClick={toggleItem} ><DeleteCruse size={1}/></button>
              <img src={ingredient.image === null ? "/default-img.jpg" : ingredient.image} alt={ingredient.name} />
              <figcaption className={style.figcaption}>
                <p>{ingredient.name}</p>
                <div className={style.figcaptionDiv}>
                  <input type="number" min="0" name={`quantity-${ingredient.id}`} defaultValue={ingredient.quantity} size="2" className={`${style.unitInput}`} required/>
                  <select name={`unit-${ingredient.id}`} defaultValue={ingredient.unit ? ingredient.unit: 0}>
                    {units && units.map((unit, index) => <option key={index} value={unit.id}>{unit.name}</option>
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
            {/* <AddPlus handleClick={addStepp} color={"var(--colorbg2)"}/> */}
          <button type="button" onClick={addStepp} className={`${style.addStep}`}>
            <FaPlus />
            
          </button>
        </div>
        <ul className={style.sectionRecipeFieldStepsContainer}>
          {steps &&
            <input type="hidden" name="steps" defaultValue={steps.map((element) => element).join('"')} />}
          {steps && steps.map((step, index) => (
            <li key={index} >
              <h4 className={`${style.sectionRecipeFieldH4}`}>Etape {index + 1}
                <button data-item-id={`steps-${index}`} className={style.BtnDeleteStep} type="button" onClick={toggleItem}>
                  <DeleteCruse size={1}/>
                </button>
              </h4>
              <textarea name={`steps${index}`} value={step} data-item-id={`steps-${index}`} onChange={stepUpdate}/>
            </li>
          ))}
        </ul>
      </fieldset><div className={`${style.sectionRecipeBottom}`}>
        <button type="submit"><ValidateCheck size={26} color={" var(--colorGreenCheck)"}/></button>
        <button type="button" onClick={cancelHandler || changeRecipe}><MdCancel size={30} style={{color:"#D70D0D", border:"none"}}/></button>
      </div>
    </Form>
    </>
  )
}
