import {  IngredientApi, RecipeApi, UserApi } from "../../api";
import RecipeValidator from "../../helpers/validators/recipeValidator";
import toast from "../../helpers/toast";
import store from "../../store";
import { callsApiRecipeAction, defineNameImage, formatterSecondesTime, secondesConverterFunction, timeFormat } from "../../helpers";
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

          let image; 

          if (formFields.imageFile.name !== '') {
            image = defineNameImage(formFields.name);
            const originalNameFile = (formFields.imageFile).name;
            const extension = originalNameFile.split('.').pop();
            image = `${image}.${extension}`;
            data.image = image;
          }
          const dataValidate = RecipeValidator.checkBodyForUpdate(id, data)
          
          const updatedRecipe = await RecipeApi.update(id, dataValidate);
          
          if (formFields.imageFile.name !== '') {
            const imageFile = formFields.imageFile;
            const {id, image} = updatedRecipe;
            const data = {
              imageFile:imageFile,
              nameFile: image,
            }
            requestApiImg.push({method:methods.postImg, recipeId:id, data:data});
          }
          
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
          toast.error({message:error})
          return null
        }
        
      }
      case "POST": {
        try {
          let formData = await request.formData();
          let formFields = {};
          const unitProperty = [];
          const quantityProperty = [];
    
    
          for (let entry of formData.entries()) {
              let fieldName = entry[0];
              let fieldValue = entry[1]; 
              if (fieldName.startsWith('unit')) {
                const idIngredientUnit = fieldName.slice(5);
                const value = [idIngredientUnit, fieldValue];
                unitProperty.push(value)
              }
              if (fieldName.startsWith('quantity')) {
                const idIngredientQuantity = fieldName.slice(9);
                const value = [idIngredientQuantity, fieldValue];
                quantityProperty.push(value)
              }
              formFields[fieldName] = fieldValue;
          }
        
          const steps = formData.get("steps");
          const mappingSteps = steps.split('"');
          const allIngredients = formData.get("ingredients");
          const mappingIngredientsId = allIngredients.split('-');
          
    
          const preparatingTimeConvertedFormat = `${formData.get("preparatingTime")}:00`;
          const preparatingTimeConvertedInSecondes = secondesConverterFunction(preparatingTimeConvertedFormat);
        
          const cookingTimeConvertedFormat = `${formData.get("cookingTime")}:00`;
          const cookingTimeConvertedInSecondes = secondesConverterFunction(cookingTimeConvertedFormat);
    
          const totalTimeInSecondes = preparatingTimeConvertedInSecondes + cookingTimeConvertedInSecondes;
          const timeFormatted = formatterSecondesTime(totalTimeInSecondes);
          let match = timeFormatted.match(/^(\d+):(\d+):(\d+)$/);
          const functionParser = (match) => {
            if (match) {
              let hours = match[1].padStart(2, '0');
              let minutes = match[2].padStart(2, '0');
              let seconds = match[3].padStart(2, '0');
          
              let formattedString = `${hours}:${minutes}:${seconds}`;
              return formattedString;
            } else {
              const error = "Format de chaine invalide."
              return error
            }
          }
          const time = functionParser(match);

          let image; 
          
          
          const data = {
            name:formData.get("name"),
            hunger:formData.get("hunger"),
            preparatingTime:preparatingTimeConvertedFormat,
            time:time,
            person:formData.get("person"),
            steps:mappingSteps,
          }
          
          
          if ((formData.get("imageFile")).name !== '') {
            image = defineNameImage(formFields.name);
            const originalNameFile = (formFields.imageFile).name;
            const extension = originalNameFile.split('.').pop();
            image = `${image}.${extension}`;
            data.image = image;
          }

          const dataValidate = RecipeValidator.checkBodyForCreate(data);
          
          const createdRecipe = await RecipeApi.create(dataValidate);
          
          if (createdRecipe.error) {
            toast.error({message:createdRecipe.error})
            return null
          }
          if (createdRecipe.userId) {
            await UserApi.addRecipeToUser(createdRecipe.userId, createdRecipe.id)
          }
          
          if ((formData.get("imageFile")).name !== '') {
            const imageFile = formData.get("imageFile");
            const {id, image} = createdRecipe;
            await RecipeApi.addImageToRecipe(id, imageFile, image);
          }
          

          const newIdFromCreatedRecipe = (createdRecipe.id).toString()
          // && mappingIngredientsId[0] == ''
          if (mappingIngredientsId.length === 1 && mappingIngredientsId[0] === '') {
            toast.error({message:"Veuillez ajouter au moins un ingrédient à la recette."});
            return null
          }
    
          if (mappingIngredientsId.length > 1) {
            await Promise.all(mappingIngredientsId.map(async (ingredientId) => {
              
              const foundQuantityToAddInRecipe = quantityProperty.find((quantityElement) => quantityElement[0] === ingredientId);
              const foundUnityToAddInRecipe = unitProperty.find((unitElement) => unitElement[0] === ingredientId);
              const data = {};
              data.quantity = foundQuantityToAddInRecipe[1];
              if (foundUnityToAddInRecipe[1] !== '0') data.unitId = foundUnityToAddInRecipe[1];
              
              await IngredientApi.addIngredientToRecipe(newIdFromCreatedRecipe, ingredientId, data )
            }));
          }
          if (mappingIngredientsId.length === 1 && mappingIngredientsId[0] !== '') {
            const foundQuantityToAddInRecipe = quantityProperty.find((quantityElement) => quantityElement[0] === mappingIngredientsId[0]);
            const foundUnityToAddInRecipe = unitProperty.find((unitElement) => unitElement[0] === mappingIngredientsId[0]);
            const data = {};
              data.quantity = foundQuantityToAddInRecipe[1];
              if (foundUnityToAddInRecipe[1] !== '0') data.unitId = foundUnityToAddInRecipe[1];
            await IngredientApi.addIngredientToRecipe( newIdFromCreatedRecipe, mappingIngredientsId[0], data );
          }
          toast.error("Test.")
          toast.success("La recette a été créée avec succès.")
          
          return null;
        } catch (error) {
          toast.error({message:error})
          return null
        }
        
      }
      case "DELETE": {
        await RecipeApi.delete(params.id)
  
        toast.success("Suppression de la recette effectué avec succès.");
        break;
      }
      default: {
        throw new Response("Invalide methode", { status: 405 });
      }
  
    }
  }