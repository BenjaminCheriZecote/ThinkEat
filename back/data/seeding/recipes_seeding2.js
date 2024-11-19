/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import { readFile } from 'node:fs/promises';
import cluster from "cluster";
import os from "node:os";
import client from '../../src/helpers/pg.client.js';

import '../../src/helpers/envLoad.js';
import IngredientDatamapper from '../../src/datamappers/ingredient.datamapper.js';
import FamilyDatamapper from '../../src/datamappers/family.datamapper.js';
import { mappedFunctionNameFileImg } from '../../src/helpers/fileNameSeeding.js';

const checkDataBase = async (tableName) => {
    try {
        const query = {
            text:`SELECT name FROM ${tableName};`
        };
        const dataFromDb = await client.query(query);
        return dataFromDb.rows;
    } catch (error) {
        console.log("error :", error);
        return null;
    }
};
const getDataFromDb = async (tableName) => {
    const query = {
        text:`SELECT id, name FROM ${tableName};`
    };
    const dataFromDb = await client.query(query);
    return dataFromDb.rows;
};

if (cluster.isPrimary) {
  const recipesJson = await readFile(new URL("../recipes.json", import.meta.url));
  const recipesFromJson = JSON.parse(recipesJson);

  const numCpu = os.cpus().length;
  const numThread = numCpu >= 4 ? 4 : numCpu;
  let endingThread = 0;

  const data = {
    recipes:null,
    ingredients: null,
    ingredientsDB:null,
    addFamiliesToIngredients:null,
    addIngredientsToRecipes:null,

  };

  console.log(`Master en fonctionnement avec ${numThread} threads`);
  console.time("Seeding de recettes.");

  // Créer des workers
  for (let i = 0; i < numThread; i++) {
    const worker = cluster.fork();  
  }

  cluster.on("message", async (worker, message) => {
  
    if (message.task === "ready") {
      console.log(`Worker ${worker.id} is ready`);
    }

    if (message.task === "result") {
      Object.entries(message.payload).forEach(([key,value]) => {
        console.log(`Worker ${worker.id} computed result:`, key);
        data[key] = value;
      });
    }
    if (!data.recipes) {
        data.recipes = "in progress";
        return worker.send({ task: "find_recipes", payload: {recipesFromJson }});
      }
    if (!data.ingredients) {
      data.ingredients = "in progress";
      const tableName = 'ingredient';
      const dataFromDb = await checkDataBase(tableName);
      return worker.send({ task: "find_ingredients", payload: {recipesFromJson, dataFromDb }});
    }
    if (!data.ingredientsDB && data.ingredients && data.ingredients !== "in progress") {
      data.ingredientsDB = "in progress";
      return worker.send({ task: "create_ingredients", payload: data.ingredients });
    }
    if (!data.addFamiliesToIngredients && data.ingredientsDB && data.ingredientsDB !== "in progress") {
      data.addFamiliesToIngredients = "in progress";
      const familiesDB = await getDataFromDb('family');
      const payload = {familiesDB: familiesDB, ingredients: data.ingredients, ingredientsDB: data.ingredientsDB};
      return worker.send({ task: "add_families_to_ingredients", payload });
    }
    if (!data.addIngredientsToRecipes && data.ingredientsDB && data.ingredientsDB !== "in progress" && data.recipes) {
      data.addIngredientsToRecipes = "in progress";
      const [recipesDB, unitsDB] = await Promise.all([
        getDataFromDb('recipe'),
        getDataFromDb('unit')
      ]);
      const payload = {ingredientsDB: data.ingredientsDB, recipes: data.recipes, recipesDB:recipesDB,  unitsDB: unitsDB};
      return worker.send({ task: "add_ingredients_to_recipes", payload });
    }

    console.log(`Worker ${worker.id} end`);
    endingThread++;
    if (endingThread === numThread) {
      console.timeEnd("Seeding de recettes.");
      process.exit();
    }

  });

} else {
  // Code pour les processus enfants
  process.send({task: "ready", pid:process.pid});

  // Recevoir les messages du processus principal
  process.on("message", async (message) => {
    let payload;
    if (message.task === "find_recipes") {
        payload = {recipes:findRecipes(message.payload)};
    }
    if (message.task === "find_ingredients") {
      payload = {ingredients:findIngredients(message.payload)};
    }
    if (message.task === "create_ingredients") {
      const ingredientsDB = await seedIngredients(message.payload);
      payload = {ingredientsDB};
    }
    if (message.task === "add_families_to_ingredients") {
      const result = await addFamiliesToIngredients(message.payload);
      payload = {addFamiliesToIngredients: result};
    }
    if (message.task === "add_ingredients_to_recipes") {
      const result = await addIngredientsToRecipes(message.payload);
      payload = {addIngredientsToRecipes: result};
    }

    if (payload) {
      process.send({ task: 'result', payload });      
    }
  });
}
function findRecipes({recipesFromJson }) {
    let allRecipes = [];
  
    recipesFromJson.forEach(extendRecipe =>{
      const isExist = allRecipes.some(recipe => recipe.name === extendRecipe.name);
      if (isExist) return;
      allRecipes.push(extendRecipe);
    });
  
    return allRecipes;
  }
function findIngredients({recipesFromJson, dataFromDb }) {
  let allIngredients = [];
  let isExistOnDb = false;

  recipesFromJson.forEach(async extendRecipe => {
    const {ingredients, ...recipe} = extendRecipe;
    
    ingredients.forEach(async extendIngredient =>{
      const isExist = allIngredients.some(ingredient => ingredient.name === extendIngredient.name);
      if (isExist) return;
      if (dataFromDb) isExistOnDb = dataFromDb.find(ingredient => ingredient.name === extendIngredient.name);
      if (isExistOnDb) return;
      if (extendIngredient.name !== ("Salsa fraîche" || "Sauce cacahuète" || "Vinaigre de riz" || "Pâte à pizza" || "Pâte sablée")) extendIngredient.image = mappedFunctionNameFileImg(extendIngredient.name);
      allIngredients.push(extendIngredient);
    });
  });

  return allIngredients;
}
async function seedIngredients(ingredients) {
  return await Promise.all(ingredients.map(async ingredient => await IngredientDatamapper.create(ingredient)));
}
async function addFamiliesToIngredients({familiesDB, ingredients, ingredientsDB}) {
  return await Promise.all(ingredients.map(async ingredient => {
    const ingredientId = ingredientsDB.find(ingredientDB => ingredientDB.name === ingredient.name).id;

    return Promise.all(ingredient.families.map(async family => {
      const familyId = familiesDB.find(familyDB => familyDB.name === family.name).id;
      return await FamilyDatamapper.addToIngredient({ingredientId, familyId});
    }));
  }));
}
async function addIngredientsToRecipes({ingredientsDB, recipes, recipesDB , unitsDB}) {
  return await Promise.all(recipes.map(async recipe => {
    const recipeId = recipesDB.find(recipeDB => recipeDB.name === recipe.name).id;
    return Promise.all(recipe.ingredients.map(async ingredient => {
      const ingredientId = ingredientsDB.find(ingredientDB => ingredientDB.name === ingredient.name).id;
      let unitId = null;
      if (ingredient.unit) {
        unitId = unitsDB.find(unitDB => unitDB.name === ingredient.unit).id;
      }
      return await await IngredientDatamapper.addToRecipe({ingredientId, recipeId , unitId, quantity: ingredient.quantity});
    }));
  }));
}
