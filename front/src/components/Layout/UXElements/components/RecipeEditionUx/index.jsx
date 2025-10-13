import { Form, useNavigate } from "react-router-dom";
import LogoHat from "../../icons/LogoHat";
import { useRef, useState } from "react";
import DeleteCruse from "../../icons/DeleteCruse";
import DownloadCloud from "../../icons/DownloadCloud/DownloadCloud";
import { useSelector } from "react-redux";
import DropDownList from "../DropDownList";
import AddPlus from "../../icons/AddPlus";
import { FaPlus } from "react-icons/fa6";
import ValidateCheck from "../../icons/ValidateCheck";
import CancelCruse from "../../icons/CancelCruse";

const RecipeEditionUx = ({recipe, formMethod, style, isEdition, setEditionMode, cancelHandler}) => {
    const selectElement = useRef();
    const inputFileElement = useRef();
    const ingredientsList = useSelector((state) => state.ingredients.ingredients);
    const { filters } = useSelector((state) => state.filters);
    const {units} = useSelector((state) => state.units);
    const [imgAdded, setImgAdded] = useState(null);
    const [steps, setSteps] = useState(recipe.steps);
    const [ingredients, setIngredients] = useState(recipe.ingredients || []);
    const [recipeImageCopy, setRecipeImageCopy] = useState(recipe.image);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const navigate = useNavigate();

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
    function handleFileChange() {

        const file = event.target.files[0];
       
        const reader = new FileReader();
        reader.onload = () => {
        setImgAdded({path:reader.result, name:file.name});
        };
        reader.readAsDataURL(file);
    }
    function handleDownloadImg() {
        inputFileElement.current.click();
    }
    function closeAllMenu() {
        if (selectedMenu !== "ingredients") return;
        setSelectedMenu(null);
    }
    function openIngredientMenu() {
        if (selectedMenu === "ingredients") return;
        setSelectedMenu("ingredients");
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
    const validateEdition = () => {
        setTimeout(() => {
            navigate('/recipes')
        }, 2000)
    }

    return(
        <Form encType="multipart/form-data" className={`${style.sectionRecipe}`} method={formMethod}>
            <input type="hidden" name="id" value={recipe.id} />

            <div>
                <LogoHat size={4} className={style.logoHat}/>
                <input className={`${style.sectionRecipeName} ${style.sectionRecipeInput} ${style.sectionRecipeInputName} ${style.titleRecipe}`} name="name" type="text" defaultValue={recipe.name} required/>
            </div>

            <fieldset className={`${style.sectionRecipeTop} fieldsetRecipeTop`}>
                <div className={`${style.leftSide}`}>
                    <div className={`${style.sectionRecipeField} ${style.sectionRecipeFieldEdition}`}>
                        <label>Preparation :</label>
                        <input name="preparatingTime" type="time" className={style.sectionRecipeInput} defaultValue={recipe.preparatingTime} required />
                    </div>
                    <div className={`${style.sectionRecipeField} ${style.sectionRecipeFieldEdition}`}>
                        <label>Cuisson :</label>
                        <input name="cookingTime" type="time" className={style.sectionRecipeInput} defaultValue={recipe.cookingTime} required />
                    </div>
                
                    <div className={`${style.sectionRecipeField} ${style.sectionRecipeFieldEdition}`}>
                        <label>Convive :</label>
                        <input name="person" type="number" min="1" defaultValue={recipe.person} className={`${style.personInput} ${style.sectionRecipeInput}`}/>
                    </div>
                    <div className={`${style.sectionRecipeField} ${style.sectionRecipeFieldEdition}`}>
                        <label>Faim :</label>
                        <select className={`${style.sectionRecipeFieldSelect}`} ref={selectElement} name="hunger" defaultValue={recipe.hunger}>
                            {!!filters.hunger && filters.hunger.map(({ name }, index) => (
                            <option key={index} value={name}>{name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div className={`${style.rightSide}`}>
                    <figure>
                    <input ref={inputFileElement} type="file" hidden accept=".jpg, .png, webp" onChange={handleFileChange} name="imageFile" multiple/>
                        {isEdition?
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
                                    <img src={imgAdded?`/img${imgAdded.path}` : `/img/${recipeImageCopy}`} alt={recipe.name} />
                                    <button data-item-id="Image" className={style.BtnDeleteImg} type="button"><DeleteCruse size={1} handleClick={toggleItem}/></button>
                                </>
                            :
                            <img src={recipe.image === null ? "/default-img.webp" : `/${recipe.image}`} alt={recipe.name} />
                        }
                    
                    <div>
                        {!isEdition && <figcaption>{recipe.name}</figcaption>}
                    </div>
                    </figure>
                </div>
            </fieldset>
    
            <fieldset>
                <div className={`${style.sectionRecipeField} ${style.divDropDonwList} ${style.titleRecipe}`}>
                    <legend>Ingredients</legend>
                    <DropDownList itemName={"Ingredients"} items={ingredientsList} choosenItems={ingredients} isOpen={selectedMenu === "ingredients"} openHandler={openIngredientMenu} closeHandler={closeAllMenu} toggleItemHandler={toggleItem} />
                </div>
                <ul className={`${style.sectionRecipeFieldIngredientsContainer}`}>
                    {isEdition && ingredients.length === 0 &&
                        <li className={style.addIngredient} onClick={openIngredientMenu}>
                            <AddPlus  size={40} color={"var(--colorUser)"}/>
                        </li>
                    }
                    {ingredients && ingredients.map(ingredient => (
                        <li key={ingredient.id} className={style.ingredientAdded}>
                        <figure>
                            <button className={style.BtnDeleteIngredient} type="button" data-item-id={`Ingredients-${ingredient.id}`} onClick={toggleItem}>
                                <DeleteCruse size={1}/>
                            </button>
                            <img src={ingredient.image === null ? "/default-img.webp" : `/img/ingredients/${ingredient.image}`} alt={ingredient.name} />
                            <figcaption className={style.figcaption}>
                                <span>{ingredient.name}</span>
                                <div className={style.figcaptionDiv}>
                                    <input type="number" min="0" name={`quantity-${ingredient.id}`} defaultValue={ingredient.quantity} size="2" className={`${style.unitInput} ${style.sectionRecipeInput}`} required/>
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
                <div className={`${style.sectionRecipeField} ${style.titleRecipe}`}>
                    <legend>Etapes</legend>
                    <button type="button" onClick={addStepp} className={`${style.addStep}`}>
                        <FaPlus/>
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
            </fieldset>

            <div className={`${style.sectionRecipeBottom}`}>
                <button type="submit">
                    <ValidateCheck size={26} color={" var(--colorGreenCheck)"} handleClick={validateEdition}/>
                </button>
                <button type="button" onClick={cancelHandler || setEditionMode}>
                    <CancelCruse size={30} color={"#D70D0D"}/>
                </button>
            </div>
      </Form>
    )
}

export default RecipeEditionUx;