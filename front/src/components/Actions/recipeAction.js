import { RecipeApi, UserApi } from "../../api";
import RecipeValidator from "../../helpers/validators/recipeValidator";
import toast from "../../helpers/toast";
import store from "../../store";
import { callsApiRecipeAction, defineNameImage, postImageByRecipeAction, setImageNameIntoDataRecipeAction, timeFormat } from "../../helpers";
import { methods } from "../../helpers/callsApiRecipeAction";

export async function recipeAction({ request, params }) {
  
    switch (request.method) {
      case "PATCH": {
        try {
          let formData = await request.formData();
          let formFields = {};
          const requestApi = [];
          const requestApiImg = [];
          const newIngredientsId = {}
  
          for (let entry of formData.entries()) {
            let fieldName = entry[0];
            let fieldValue = entry[1]; 
            formFields[fieldName] = fieldValue;
          }
        
          const {recipes, units} = store.getState();
          
          const id = parseInt(formFields.id);
          const steps = formFields.steps;
          const mappingSteps = steps.split('"');
          const concatenatedStringNewIngredientsId = formFields.ingredients;
          concatenatedStringNewIngredientsId.split('-').forEach((id) => newIngredientsId[id] = id);

          const { time, preparatingTime } = timeFormat(formFields.preparatingTime, formFields.cookingTime);
          
          let foundRecipe;
          if(Array.isArray(recipes.recipes) && recipes.recipes.length) foundRecipe = recipes.recipes.find((recipe) => recipe.id === id)
          if (!foundRecipe) foundRecipe = await RecipeApi.get(id);

          const currentIngredients = foundRecipe.ingredients || [];

          currentIngredients.forEach((currentIngredient) => {
            // si l'ingrédient n'est plus présent dans la nouvelle liste d'ingrédient => supression de l'ingredient de la recette
            if (!newIngredientsId[currentIngredient.id]) requestApi.push({method:methods.delete, recipeId:id, ingredientId:currentIngredient.id}) // si l'ingrédient n'est plus présent dans la nouvelle liste d'ingrédient => suppression
            // si l'ingrédient est toujours présent dans la nouvelle liste d'ingrédient
            if (newIngredientsId[currentIngredient.id]) {
              // l'enlever de la nouvelle liste d'ingredient à ajouter
              delete newIngredientsId[currentIngredient.id]
              
              // vérifier si la quantité ou l'unité a changé pour les mettre à jour
              const idNewQuantity = parseInt(formFields[`quantity-${currentIngredient.id}`]);
              const idNewUnity = parseInt(formFields[`unit-${currentIngredient.id}`]);
              const isUpdatedQuantity = currentIngredient.quantity !== idNewQuantity;
              const currentUnityIngredient = currentIngredient.unit === null ? 0 : units.units.find((unit) => unit.name === currentIngredient.unit).id; 
              const isUpdatedUnity = currentUnityIngredient !== idNewUnity;

              if (!isUpdatedQuantity && !isUpdatedUnity) return

              const data = {
                quantity: idNewQuantity,
                unitId: idNewUnity === 0 ? null : idNewUnity,
              }
              requestApi.push({method:methods.patch, recipeId:id, ingredientId:currentIngredient.id, data:data});
            }
          })

          if (Object.keys(newIngredientsId).length) {
            for (const ingredientId in newIngredientsId) {
              if (!Object.hasOwn(newIngredientsId, ingredientId)) continue
              const quantity = parseInt(formFields[`quantity-${ingredientId}`]);
              const unit = parseInt(formFields[`unit-${ingredientId}`]);

              const data = {
                quantity: quantity,
                unitId: unit === 0 ? null : unit
              }
              requestApi.push({method:methods.put, recipeId:id, ingredientId:ingredientId, data:data});
            }
          }

          await Promise.all(requestApi.map( async (request) => {
            await callsApiRecipeAction(request);
          }))

          const data = {
            name:formFields.name,
            hunger:formFields.hunger,
            preparatingTime:preparatingTime,
            time:time,
            person:formFields.person,
            steps:mappingSteps,
          }

          setImageNameIntoDataRecipeAction(data, formFields.imageFile.name, formFields.name)

          const dataValidate = RecipeValidator.checkBodyForUpdate(id, data);
          const updatedRecipe = await RecipeApi.update(id, dataValidate);

          postImageByRecipeAction(updatedRecipe, formFields.imageFile, requestApiImg);
          
          if (foundRecipe.name !== updatedRecipe.name && foundRecipe.image) {
            const {id, name} = updatedRecipe;
            const oldNameImage = foundRecipe.image;
            const extension = oldNameImage.split('.').pop();
            const newNameImage = `${defineNameImage(name)}.${extension}`;
            const data = {oldName:oldNameImage, newName:newNameImage}
            requestApiImg.push({method:methods.postImgName, recipeId:id, data:data});
          }

          await Promise.all(requestApiImg.map( async (request) => {
            await callsApiRecipeAction(request);
          }))

          toast.success("La recette a été modifié avec succès.")
          
          return updatedRecipe
        } catch (error) {
          toast.error({message: error.message})
          return null
        }
        
      }
      case "POST": {
        try {
          let formData = await request.formData();
          let formFields = {};
          const newIngredientsId = {};
          const requestApi = [];

          for (let entry of formData.entries()) {
              let fieldName = entry[0];
              let fieldValue = entry[1]; 
              formFields[fieldName] = fieldValue;
          }

          const steps = formFields.steps;
          const mappingSteps = steps.split('"');
          const concatenatedStringNewIngredientsId = formFields.ingredients;
          concatenatedStringNewIngredientsId.split('-').forEach((id) => newIngredientsId[id] = id);

          const { time, preparatingTime } = timeFormat(formFields.preparatingTime, formFields.cookingTime); 
          
          const data = {
            name:formFields.name,
            hunger:formFields.hunger,
            preparatingTime:preparatingTime,
            time:time,
            person:formFields.person,
            steps:mappingSteps,
          }

          setImageNameIntoDataRecipeAction(data, formFields.imageFile.name, formFields.name)

          const dataValidate = RecipeValidator.checkBodyForCreate(data);
          if (!dataValidate) return
          const createdRecipe = await RecipeApi.create(dataValidate);

          if (createdRecipe.error) {
            toast.error({message:createdRecipe.error})
            return null
          }
          if (createdRecipe.userId) {
            await UserApi.addRecipeToUser(createdRecipe.userId, createdRecipe.id);
          }

          postImageByRecipeAction(createdRecipe, formFields.imageFile, requestApi);
          
          const newIdFromCreatedRecipe = (createdRecipe.id).toString();
          const newIngredientsIdArray = Object.keys(newIngredientsId)

          if (newIngredientsIdArray.length === 1 && newIngredientsIdArray[0] === '') {
            toast.error({message:"Veuillez ajouter au moins un ingrédient à la recette."});
            return null
          } else {
            for (const ingredientId in newIngredientsId) {
              if (!Object.hasOwn(newIngredientsId, ingredientId)) continue
              const quantity = parseInt(formFields[`quantity-${ingredientId}`]);
              const unit = parseInt(formFields[`unit-${ingredientId}`]);

              const data = {
                quantity: quantity,
                unitId: unit === 0 ? null : unit
              }
              requestApi.push({method:methods.put, recipeId:newIdFromCreatedRecipe, ingredientId:ingredientId, data:data});
            }
          }

          await Promise.all(requestApi.map( async (request) => {
            await callsApiRecipeAction(request);
          }))

          toast.success("La recette a été créée avec succès.")
          
          return createdRecipe;
        } catch (error) {
          toast.error({message: error.message})
          return null
        }
      }
      case "DELETE": {
        try {
          await RecipeApi.delete(params.id)
    
          toast.success("Suppression de la recette effectué avec succès.");
          return true
        } catch (error) {
          toast.error({message: error.message})
          return null
        }
      }
      default: {
        throw new Response("Invalide methode", { status: 405 });
      }
  
    }
  }