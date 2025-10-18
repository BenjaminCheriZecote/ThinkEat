import {  IngredientApi, RecipeApi, UserApi } from "../../api";
import RecipeValidator from "../../helpers/validators/recipeValidator";
import formatterSecondesTime from "../../helpers/formatterSecondesTime";
import secondesConverterFunction from "../../helpers/secondesConverterFunction";
import toast from "../../helpers/toast";
import store from "../../store";
import defineNameImage from "../../helpers/defineNameImage/defineNameImage";

export async function recipeAction({ request, params }) {
  
    switch (request.method) {
      case "PATCH": {
        try {
          let formData = await request.formData();
          let formFields = {};
          const unitProperty = [];
          const quantityProperty = [];
          const existingIngredients = [];
  
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
        
          const {recipes, units} = store.getState();
          
          const id = parseInt(formData.get("id"));
          const steps = formData.get("steps");
          const mappingSteps = steps.split('"');
          const allIngredients = formData.get("ingredients");
          const mappingIngredientsId = allIngredients.split('-');
          // format des temps (préparation / cuisson) peuvent varier si ils sont modifié ou non
          // le format est soit "" si le temps est vide, soit "00:00" si le temps est modifié, soit "00:00:00" si le temps est présent mais non modifé
          
          let preparatingTimeFromForm = formFields.preparatingTime; 
          let cookingTimeFromForm = formFields.cookingTime;

          // fonction pour convertir le format du temps 00:00 au format 00:00:00
          const checkTimeFunction = (time) => {
            if (time !== "") {
              if (time.length === 5) {
                const newTime = time + ':00';
                return newTime
              }
            }
            return time
          }
          preparatingTimeFromForm = checkTimeFunction(preparatingTimeFromForm); 
          cookingTimeFromForm = checkTimeFunction(cookingTimeFromForm); 
    
          // ------ gestion temps total. Le temps de cuisson n'existe pas en bdd, on le créer ici.
          // conversion des temps en secondes pour additionner les deux temps: 
    
          if (preparatingTimeFromForm !== "") {
            preparatingTimeFromForm = secondesConverterFunction(preparatingTimeFromForm);
          } else preparatingTimeFromForm = 0;
    
          if (cookingTimeFromForm !== "") {
            cookingTimeFromForm = secondesConverterFunction(cookingTimeFromForm);
          } else cookingTimeFromForm = 0
    
          const totalTimeInSecondes = preparatingTimeFromForm + cookingTimeFromForm;
          const timeFormatted = formatterSecondesTime(totalTimeInSecondes);
          const preparatingTimeFormatted = formatterSecondesTime(preparatingTimeFromForm);
    
          // reconversion du temps total et temps de préparation au format 00:00:00
          let match = timeFormatted.match(/^(\d+):(\d+):(\d+)$/);
          let match2 = preparatingTimeFormatted.match(/^(\d+):(\d+):(\d+)$/);
    
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
          const preparatingTime = functionParser(match2); 
          
          let foundRecipe;
          if (foundRecipe) foundRecipe = recipes.recipes.find((recipe) => recipe.id === id);
          if (!foundRecipe) foundRecipe = await RecipeApi.get(id);

          const foundIngredientsOfRecipe = foundRecipe.ingredients || [];

          const removeIngredientsRecipe = foundIngredientsOfRecipe.filter((ingredient) => !mappingIngredientsId.some((id) => {
            return ingredient.id === parseInt(id);
          }));
    
          if (removeIngredientsRecipe.length) {
            await Promise.all(removeIngredientsRecipe.map(async (element) => {
              await IngredientApi.removeIngredientToRecipe( id, element.id )
            }));
          }

          const addIngredientsRecipe = mappingIngredientsId.filter((idIngredient) => {
            if (foundIngredientsOfRecipe.some((element) => element.id === parseInt(idIngredient))) existingIngredients.push(idIngredient) 
            return !foundIngredientsOfRecipe.some((element) => element.id === parseInt(idIngredient))
          });
          if (addIngredientsRecipe.length) {
            await Promise.all(addIngredientsRecipe.map(async (ingredientId) => {
              const foundQuantityToAddInRecipe = quantityProperty.find((quantityElement) => quantityElement[0] === ingredientId);
              const foundUnityToAddInRecipe = unitProperty.find((unitElement) => unitElement[0] === ingredientId);
              const data = {};
              data.quantity = foundQuantityToAddInRecipe[1];
              if (foundUnityToAddInRecipe[1] !== '0') data.unitId = foundUnityToAddInRecipe[1];
              await IngredientApi.addIngredientToRecipe( id, ingredientId, data )
            }));
          }

          if (existingIngredients.length) {
            await Promise.all(existingIngredients.map(async (ingredientId) => {
              const foundUpdatedQuantity = foundIngredientsOfRecipe.find((ingredientRecipe) => {
                return ingredientRecipe.id === parseInt(ingredientId) && parseInt(formFields[`quantity-${ingredientId}`]) !== ingredientRecipe.quantity
              });
              const foundUpdatedUnity = foundIngredientsOfRecipe.find((ingredientRecipe) => {
                const existedIdUnitRecipe = ingredientRecipe.unit === null ? 0 : units.units.find((unit) => unit.name === ingredientRecipe.unit).id;
                return ingredientRecipe.id === parseInt(ingredientId) && parseInt(formFields[`unit-${ingredientId}`]) !== existedIdUnitRecipe
              });
              if (!foundUpdatedQuantity && !foundUpdatedUnity) {
                return;
              }

              const parsedUnit = parseInt(formFields[`unit-${ingredientId}`])

              const data = {
                quantity: parseInt(formFields[`quantity-${ingredientId}`]),
                unitId: parsedUnit === 0 ? null : parsedUnit,
              };
               await IngredientApi.updateIngredientsRecipe( id, ingredientId, data );
            }))
          }

          const data = {
            name:formData.get("name"),
            hunger:formData.get("hunger"),
            preparatingTime:preparatingTime,
            time:time,
            person:formData.get("person"),
            steps:mappingSteps,
          }

          let image; 

          if ((formData.get("imageFile")).name !== '') {
            image = defineNameImage(formFields.name);
            const originalNameFile = (formFields.imageFile).name;
            const extension = originalNameFile.split('.').pop();
            image = `${image}.${extension}`;
            data.image = image;
          }
          const dataValidate = RecipeValidator.checkBodyForUpdate(id, data)
          
          const updatedRecipe = await RecipeApi.update(id, dataValidate);
          
          if ((formData.get("imageFile")).name !== '') {
            const imageFile = formData.get("imageFile");
            const {id, image} = updatedRecipe;
            await RecipeApi.addImageToRecipe(id, imageFile, image);
          }
          
          if (foundRecipe.name !== updatedRecipe.name && foundRecipe.image) {
            const {id, name} = updatedRecipe;
            const oldNameImage = foundRecipe.image;
            const extension = oldNameImage.split('.').pop();
            const newNameImage = `${defineNameImage(name)}.${extension}`;
            await RecipeApi.updateImageNameToRecipe(id, {oldName:oldNameImage, newName:newNameImage})
          }

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