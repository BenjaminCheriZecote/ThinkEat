import { apiBaseUrl } from "../config.js";

class CoreApi {
  static routeName;
  static  _errorHandler(error) {
    console.error(error);
    return null;
  }
  static async create(data) {
    async function fetchData() {
      const httpResponse = await fetch(`${apiBaseUrl}/${this.routeName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
  
      if (! httpResponse.ok) {
        throw new Error("Invalid responce");
      }
  
      return await httpResponse.json();
    }

    return await fetchData(data).catch(this._errorHandler)
  }
  static async getAll() {
    async function fetchData() {
      const httpResponse = await fetch(`${apiBaseUrl}/${this.routeName}`);
  
      if (!httpResponse.ok) {
        throw new Error("Invalid responce");
      }
  
      return await httpResponse.json();
    }

    return await fetchData().catch(this._errorHandler)
  }
  static async update(id, data) {
    async function fetchData() {
      const httpResponse = await fetch(`${apiBaseUrl}/${this.routeName}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    
      if (!httpResponse.ok) {
        throw new Error("Invalid responce");
      }
      
      return await httpResponse.json();
    }
    return await fetchData(id, data).catch(this._errorHandler)
  }
  static async delete(id) {
    async function fetchData() {
      const httpResponse = await fetch(`${apiBaseUrl}/${this.routeName}/${id}`, {
        method: "DELETE"
      });
    
      if (!httpResponse.ok) {
        console.error(httpResponse.status);
        return false;
      }
    
      return true;
    }
    return await fetchData(id).catch(this._errorHandler)
  }
}

export class HistoryApi extends CoreApi {
  static routeName = "hitory";
}
export class IngredientApi extends CoreApi {
  static routeName = "ingredient";
}
export class RecipeApi extends CoreApi {
  static routeName = "recipe";
}
export class FamilyApi extends CoreApi {
  static routeName = "family";
}
export class UserApi extends CoreApi {
  static routeName = "user";

  static async create(data) {
    async function fetchData() {
      const httpResponse = await fetch(`${apiBaseUrl}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
  
      if (! httpResponse.ok) {
        throw new Error("Invalid responce");
      }
  
      return await httpResponse.json();
    }

    return await fetchData(data).catch(this._errorHandler)
  }
  static async signin(data) {
    async function fetchData() {
      const httpResponse = await fetch(`${apiBaseUrl}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
  
      if (! httpResponse.ok) {
        throw new Error("Invalid responce");
      }
  
      return await httpResponse.json();
    }

    return await fetchData(data).catch(this._errorHandler)
  }
}