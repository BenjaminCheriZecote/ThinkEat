import CoreValidator from "./core.validator.js";

import toast from "../toast.js";

export default class RecipeValidator extends CoreValidator {
    static checkBodyForCreate({ name, image, steps, hunger, time, preparatingTime, person }) {
      
      if (!name || !String(name).match(/^[A-Z][a-zA-Z0-9\u00E0-\u00EF\u00F9-\u00FC' .-]{3,}$/)) {
        const message = "Merci de renseigner le nom correctement.";
        toast.error({message:message})
        throw new Error(message, {name: "Bad Request", httpStatus:400});
      }
      if (image && !String(image) || image && !image.includes(".")) {
        
        const message = "Erreur sur le format de l'image.";
        toast.error({message:message})
        throw new Error(message, {name: "Bad Request", httpStatus:400});
      }
      if (!steps || steps.length === 1 && steps[0] === '') {
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
      
      this.checkValidTimeFormat(time);
      this.checkValidTimeFormat(preparatingTime);
      this.checkId(person, "person");
      
  
      let result = {name, image, steps, hunger, time, preparatingTime, person};
      Object.entries(result).forEach((key, value) => {
        if (value === undefined) {
          delete result[key];
        }
      });
      return result;
    }
  
    static checkBodyForUpdate(userId, { name, image, steps, hunger, time, preparatingTime, person }) {
      if (name && !String(name).match(/^[A-Z][a-zA-Z0-9\u00E0-\u00EF\u00F9-\u00FC' .-]{3,}$/)) {
        const message = "Merci de renseigner le nom correctement.";
        toast.error({message:message})
        throw new Error(message, {name: "Bad Request", httpStatus:400});
        
      }
      if (image && !String(image) || image && !image.includes(".")) {
        const message = "Erreur de chemin de l'image.";
        toast.error({message:message})
        throw new Error(message, {name: "Bad Request", httpStatus:400});
      }
      if (steps) {
        if (steps.length === 1 && steps[0] === '') {
          const message = "Merci d'indiquer les étapes de la préparation."
          toast.error({message:message})
          throw new Error(message, {name: "Bad Request", httpStatus:400});
        } 
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
      if (time) {
        this.checkValidTimeFormat(time);
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
  
      let result = {name, image, steps, hunger, time, preparatingTime, person};
      Object.entries(result).forEach((key, value) => {
        if (value === undefined) {
          delete result[key];
        }
      });
      return result;
    }
  
  }