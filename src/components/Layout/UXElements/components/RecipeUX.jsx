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

const RecipeUX = ({recipe, update, create, classList}) => {



    return(
        <li className={classList?"section__recipe":"section__recipe hidden"}>
            <img src="" alt="" />
            <h3>{create?"":update?recipe.name:""}</h3>
            <div><p>Preparation :</p><input type="text" value={create?recipe.preparating_time:""} disabled={update?false:true}/> </div>
            <div><input type="text" value={create?recipe.hunger:""} disabled={update?false:true}/></div>
            <ul> Etapes:
                {update?
                    <FaPlus />
                    :
                    ""
                    }

                {create?
                    recipe.steps.length > 1?
                        recipe.steps.map((element, index) => {
                            return(
                                <li key={index}>
                                    <input type="text" value={element} disabled={update?false:true}/>
                                    {update?<FaMinus />:""}
                                </li>   
                            )
                        })
                        :
                        <li>{recipe.steps[0]}</li>
                    :
                    ""}
            </ul>
        </li>
    )
}

export default RecipeUX;