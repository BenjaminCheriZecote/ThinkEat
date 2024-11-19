/* eslint-disable no-case-declarations */
/* eslint-disable indent */
import { readFile } from 'node:fs/promises';
import cluster from "cluster";
import os from "node:os";
import client from '../../src/helpers/pg.client.js';

import '../../src/helpers/envLoad.js';
import RecipeDatamapper from '../../src/datamappers/recipe.datamapper.js';
import FamilyDatamapper from '../../src/datamappers/family.datamapper.js';
import UnitDatamapper from '../../src/datamappers/unit.datamapper.js';

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

if (cluster.isPrimary) {
  const recipesJson = await readFile(new URL("../recipes.json", import.meta.url));
  const recipesFromJson = JSON.parse(recipesJson);

  const numCpu = os.cpus().length;
  const numThread = numCpu >= 4 ? 4 : numCpu;
  let endingThread = 0;

  const data = {
    families: null,
    ingredients: null,
    units: null,
    recipes: null,
    familiesDB:null,
    ingredientsDB:null,
    unitsDB:null,
    recipesDB:null,
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

    if (!data.families) {
      data.families = "in progress";
      const tableName = 'family';
      const dataFromDb = await checkDataBase(tableName);
      return worker.send({ task: "find_families", payload: {recipesFromJson, dataFromDb }});
    }
    if (!data.units) {
      data.units = "in progress";
      const tableName = 'unit';
      const dataFromDb = await checkDataBase(tableName);
      return worker.send({ task: "find_units", payload: {recipesFromJson, dataFromDb } });
    }
    if (!data.recipes) {
      data.recipes = "in progress";
      const tableName = 'recipe';
      const dataFromDb = await checkDataBase(tableName);
      return worker.send({ task: "find_recipes", payload: {recipesFromJson, dataFromDb }});
    }

    if (!data.familiesDB && data.families && data.families !== "in progress") {
      data.familiesDB = "in progress";
      return worker.send({ task: "create_families", payload: data.families });
    }
    if (!data.unitsDB && data.units && data.units !== "in progress") {
      data.unitsDB = "in progress";
      return worker.send({ task: "create_units", payload: data.units });
    }
    if (!data.recipesDB && data.recipes && data.recipes !== "in progress") {
      data.recipesDB = "in progress";
      return worker.send({ task: "create_recipes", payload: data.recipes });
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
    if (message.task === "find_families") {
      payload = {families:findFamilies(message.payload)};
    }
    if (message.task === "create_families") {
      const familiesDB = await seedFamilies(message.payload);
      payload = {familiesDB};
    }
    if (message.task === "find_units") {
      payload = {units:findUnits(message.payload)};
    }
    if (message.task === "create_units") {
      const unitsDB = await seedUnits(message.payload);
      payload = {unitsDB};
    }
    if (message.task === "find_recipes") {
      payload = {recipes:findRecipes(message.payload)};
    }
    if (message.task === "create_recipes") {
      const recipesDB = await seedRecipes(message.payload);
      payload = {recipesDB};
    }

    if (payload) {
      process.send({ task: 'result', payload });      
    }
  });
}



function findFamilies({recipesFromJson, dataFromDb }) {
  let allFamilies = [];
  let isExistOnDb = false;

  recipesFromJson.forEach(async extendRecipe =>{
    const {ingredients, ...recipe} = extendRecipe;
    
    ingredients.forEach(async extendIngredient =>{
      const {families, ...ingredient} = extendIngredient;
      
      families.forEach(async family =>{
        const isExist = allFamilies.some(element => element.name === family.name);
        if (isExist) return;
        if (dataFromDb) isExistOnDb = dataFromDb.find(family => family.name === family.name);
        if (isExistOnDb) return;
        allFamilies.push(family);
      });
    });
  });

  return allFamilies;
}

function findUnits({recipesFromJson, dataFromDb }) {
  let allUnits = [];
  let isExistOnDb = false;

  recipesFromJson.forEach(async extendRecipe =>{
    const {ingredients, ...recipe} = extendRecipe;
    
    ingredients.forEach(async extendIngredient =>{
      const isExist = allUnits.some(unit => unit.name === extendIngredient.unit);
      if (isExist) return;
      if (dataFromDb) isExistOnDb = dataFromDb.find(unit => unit.name === extendIngredient.unit);
      if (isExistOnDb) return;
      allUnits.push({name: extendIngredient.unit});
    });
  });

  return allUnits;
}
function findRecipes({recipesFromJson, dataFromDb }) {
  let allRecipes = [];
  let isExistOnDb = false;

  recipesFromJson.forEach(extendRecipe =>{
    const isExist = allRecipes.some(recipe => recipe.name === extendRecipe.name);
    if (isExist) return;
    if (dataFromDb) isExistOnDb = dataFromDb.find(recipe => recipe.name === extendRecipe.name);
    if (isExistOnDb) return;
    allRecipes.push(extendRecipe);
  });

  return allRecipes;
}

async function seedFamilies(families) {
  return await Promise.all(families.map(async family => await FamilyDatamapper.create(family)));
}
async function seedUnits(units) {
  return await Promise.all(units.filter(unit => unit.name !== null).map(async unit => await UnitDatamapper.create(unit)));
}
async function seedRecipes(recipes) {
  return await Promise.all(recipes.map(async recipe => await RecipeDatamapper.create(recipe)));
}
