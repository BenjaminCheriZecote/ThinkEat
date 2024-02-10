// {
//     id:1,
//     name:"Hamburger",
//     image:"",
//     steps:["Cuire les steak à la poèle.", "Chauffer le pain au four, avec steak et fromage", "Rajouter tomate et salade"],
//     hunger:"big",
//     preparating_time:10,
//     ingredients:["pain", "salade", "tomate", "steak", "fromage"]
// },
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";

const RecipeUX = ({recipe, update, create}) => {
    return(
        <li className="section__recipe">
            <img src="" alt="" />
            <h3>{recipe.name}</h3>
            <div><p>Preparation :</p><input type="text" value={recipe.preparating_time} disabled={update?false:true}/> </div>
            <div><input type="text" value={recipe.hunger} disabled={update?false:true}/></div>
            <ul> Etapes:
                {update?
                    <FaPlus />
                    :
                    ""
                    }

                {recipe.steps.length > 1?
                    <ul>
                        {recipe.steps.map((element, index) => {
                            return(
                                <li key={index}>
                                    <input type="text" value={element} disabled={update?false:true}/>
                                    {update?<FaMinus />:""}
                                </li>   
                            )
                        })}
                    </ul>
                        :
                        <li>{recipe.steps[0]}</li>
                    }
            </ul>
            <ul> Ingredients:
                {update?
                    <FaPlus />
                    :
                    ""
                    }

                {recipe.ingredients.length > 1?
                    <ul className="section-recipe__field--ingredientsContainer">
                        {recipe.ingredients.map((element, index) => {
                            return(
                                <li key={index}>
                                    <input type="text" value={element.name} disabled={update?false:true}/>
                                    <img src={element.image} alt="" />
                                    {update?<FaMinus />:""}
                                </li>   
                            )
                        })}
                    </ul>
                        :
                        <li>{recipe.ingredients[0]}</li>
                    }
            </ul>
        </li>
    )
}

export default RecipeUX;