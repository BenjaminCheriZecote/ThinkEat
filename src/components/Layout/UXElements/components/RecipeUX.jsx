// {
//     id:1,
//     name:"Hamburger",
//     image:"",
//     steps:["Cuire les steak à la poèle.", "Chauffer le pain au four, avec steak et fromage", "Rajouter tomate et salade"],
//     hunger:"big",
//     preparating_time:10,
//     ingredients:["pain", "salade", "tomate", "steak", "fromage"]
// },


const RecipeUX = ({recipe}) => {

    return(
        <li>
            <img src="" alt="" />
            <h3>{recipe.name}</h3>
            <div><p>Préparation : {recipe.preparating_time} min.</p> <p>{recipe.hunger}</p></div>
            <ul> Etapes:
                {recipe.steps.length > 1?
                    recipe.steps.map((element, index) => {
                        return(
                            <li key={index}>{element}</li>
                        )
                    })
                    :
                    <li>{recipe.steps[0]}</li>}
            </ul>
        </li>
    )
}

export default RecipeUX;