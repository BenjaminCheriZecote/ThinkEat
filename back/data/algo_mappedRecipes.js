import { readFile, writeFile } from 'node:fs/promises';
import { mappedFunctionNameFileImg } from '../src/helpers/fileNameSeeding.js';
const recipesJson = await readFile(new URL("./recipes.json", import.meta.url));
const recipesFromJson = JSON.parse(recipesJson);

// définition des variables relatives au régime (diet) : associé les familles d'ingrédients aux variables
const diets = {
  vegetarian:{
    fruitdemer:true,
    fruitsdemer:true,
    crevette:true,
    crevettes:true,
    porc:true,
    poulet:true,
    viande:true,
    viandes:true,
    volaille:true,
    poisson:true,
    anchois:true,
    anchovy:true,
  },
  vegan:{
    animal:true,
    chèvre:true,
    crevette:true,
    crevettes:true,
    fromage:true,
    fruitdemer:true,
    fruitsdemer:true,
    porc:true,
    poulet:true,
    viande:true,
    viandes:true,
    volaille:true,
    poisson:true,
    anchois:true,
    anchovy:true,
    lait:true,
    laitage:true,
    produitlaîtier:true,
    oeuf:true,
    oeufs:true
  },
  glutenFree:{
    blé:true,
    céréale:true,
    pain:true
  },
  lactoseFree:{
    lait:true,
    laitage:true,
    produitlaîtier:true
  }
};

const upRecipesFromJson = recipesFromJson.map((recipe) => {
  const fileNameImgRecipeBasedOnNameRecipe = mappedFunctionNameFileImg(recipe.name);
  const allFamilies = [];
  let vegeterian = true;
  let vegan = true;
  let glutenFree = true;
  let lactoseFree = true;
  let rawFoodist = true;
  
  // vérification si temps de cuisson pour déterminer le régime crudivore
  if (recipe.cookingTime !== "00:00:00") rawFoodist = false;
  // récupération de la liste de toutes les familles d'ingrédients composant la recette
  recipe.ingredients.forEach((ingredient) => {
    ingredient.families.forEach((family) => {
      if (!allFamilies.includes(family.name)) allFamilies.push(family.name);
    });
  });
  // 3. Si aucunes des familles d'ingrédients ne figure d'une variable diet, ajouté le régime a la propriété diet
  allFamilies.forEach(family => {
    const lowerCaseFamily = family.toLowerCase().replace(/\s+/g, '');
    if (diets.vegetarian[lowerCaseFamily]) vegeterian = false;
    if (diets.vegan[lowerCaseFamily]) vegan = false;
    if (diets.glutenFree[lowerCaseFamily]) glutenFree = false;
    if (diets.lactoseFree[lowerCaseFamily]) lactoseFree = false;
  });
  const diet = [];
  if (vegeterian) diet.push("Végétarien");
  if (vegan) diet.push("Végétalien");
  if (rawFoodist) diet.push("Crudivore");
  if (glutenFree) diet.push("Sans gluten");
  if (lactoseFree) diet.push("Sans lactose");

  return {...recipe, ...(diet.length > 0?{diet:diet}:{}), image:fileNameImgRecipeBasedOnNameRecipe};
});

await writeFile('data/upRecipes.json', JSON.stringify(upRecipesFromJson));
export default upRecipesFromJson;