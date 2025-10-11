import LogoHat from "../../icons/LogoHat";
import EditPen from "../../icons/EditPen";
import { useSelector } from 'react-redux';

const RecipeReadUx = ({recipe, formMethod, style, changeEditionMode}) => {

    const user = useSelector((state) => state.session);

    function formatTime(time) {
        const [hours, minutes, seconds] = time.split(':');
        return `${hours}:${minutes}`;
    }

    return(
        <div className={`${style.sectionRecipe}`} method={formMethod}>
            <div>
                <LogoHat size={4}/>
                <h2 className={`${style.sectionRecipeName}`}>{recipe.name}</h2>
            </div>

            <section className={`${style.sectionRecipeTop}`}>
                <div className={`${style.leftSide}`}>
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
                    {recipe.diet && 
                        <div className={`${style.sectionRecipeField}`}>
                            {recipe.diet.map((diet, index) => {
                            return (
                                <span key={index}>{diet}{index + 1 !== recipe.diet.length && ','}</span>
                            )
                            })}
                        </div>
                    }
                </div>
                <div className={`${style.rightSide}`}>
                    <figure>
                        <img src={recipe.image === null ? "/default-img.webp" : `/img/${recipe.image}`} alt={recipe.name} />
                    </figure>
                </div>
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
                                <img src={ingredient.image === null ? "/default-img.webp" : `/img/ingredients/${ingredient.image}`} alt={ingredient.name} />
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
                <button type="button"><EditPen handleClick={changeEditionMode} size={30}/></button>
            </div>
            }
      </div>
    )
}

export default RecipeReadUx;