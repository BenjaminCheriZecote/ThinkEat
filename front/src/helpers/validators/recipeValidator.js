import CoreValidator from "./core.validator.js";

import toast from "../toast.js";

export default class RecipeValidator extends CoreValidator {
    static checkBodyForCreate({ name, image, steps, hunger, cookingTime, preparatingTime, person },{id}) {
        console.log(steps)
      if (!name || !String(name).match(/^[A-Z][a-zA-Z0-9\u00E0-\u00EF\u00F9-\u00FC' .-]{3,}$/)) {
        const message = "Merci de renseigner le nom correctement.";
        toast.error({message:message})
        throw new Error(message, {name: "Bad Request", httpStatus:400});
      }
      if (image && !String(image)) {
        
        const message = "Erreur de chemin de l'image.";
        toast.error({message:message})
        throw new Error(message, {name: "Bad Request", httpStatus:400});
      }
      if (!steps) {
        const message = "Merci d'indiquer les étapes de la préparation."
        toast.error({message:message})
        throw new Error({message, name: "Bad Request", httpStatus:400});
      }
      steps.forEach((step, index) => {
        if (!String(step)) {
       
        const message = `Merci de renseigner l'étape ${index+1} correctement.`
        toast.error({message:message})
          throw new Error(message, {name: "Bad Request", httpStatus:400});
        }
      });
      if (hunger && !["Copieux","Normal","Léger"].includes(hunger)) {
       
        const message = `hunger n'accepte que les valeur: Copieux, Normal, Léger`;
        toast.error({message:message})
        throw new Error(message, {name: "Bad Request", httpStatus:400});
      }
      this.checkValidTimeFormat(cookingTime);
      this.checkValidTimeFormat(preparatingTime);
      this.checkId(person, "person");
      if (id) {
        this.checkId(id, "userId");      
      }
  
      let result = {name, image, steps, hunger, cookingTime, preparatingTime, person, userId: id};
      Object.entries(result).forEach((key, value) => {
        if (value === undefined) {
          delete result[key];
        }
      });
      return result;
    }
  
    static checkBodyForUpdate({ name, image, steps, hunger, cookingTime, preparatingTime, person, userId }) {
      if (name && !String(name).match(/^[A-Z][a-zA-Z0-9\u00E0-\u00EF\u00F9-\u00FC' .-]{3,}$/)) {
        const message = "Merci de renseigner le nom correctement.";
        toast.error({message:message})
        throw new Error(message, {name: "Bad Request", httpStatus:400});
        
      }
      if (image && !String(image)) {
        const message = "Erreur de chemin de l'image.";
        toast.error({message:message})
        throw new Error(message, {name: "Bad Request", httpStatus:400});
      }
      if (steps) {
        steps.forEach((step, index) => {
          if (!String(step)) {
            const message = `Merci de renseigner l'étape ${index+1} correctement.`
            toast.error({message:message})
            throw new Error(message, {name: "Bad Request", httpStatus:400});
          }
        });
      }
      if (hunger && !["Copieux","Normal","Léger"].includes(hunger)) {
        const message = `hunger n'accepte que les valeur: Copieux, Normal, Léger`;
        toast.error({message:message});
        throw new Error(message, {name: "Bad Request", httpStatus:400});
      }
      if (cookingTime) {
        this.checkValidTimeFormat(cookingTime);
      }
      if (preparatingTime) {
        this.checkValidTimeFormat(preparatingTime);
      }
      if (person) {
        this.checkId(person, "person");      
      }
      if (userId) {
        this.checkId(userId, "userId");
      }
  
      let result = {name, image, steps, hunger, cookingTime, preparatingTime, person, userId};
      Object.entries(result).forEach((key, value) => {
        if (value === undefined) {
          delete result[key];
        }
      });
      return result;
    }
  
  }