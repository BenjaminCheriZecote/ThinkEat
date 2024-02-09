import { apiBaseUrl } from "../config.js";

class CoreApi {
  static routeName;
  static  _errorHandler(error) {
    console.error(error);
    return null;
  }
  static async create(data) {
    async function fetchData(token) {
      const httpResponse = await fetch(`${apiBaseUrl}/${this.routeName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data)
      });
  
      if (! httpResponse.ok) {
        throw new Error("Invalid responce");
      }
  
      return await httpResponse.json();
    }

    return await this.getValidToken()
      .then(fetchData)
      .catch(this._errorHandler)
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
    async function fetchData(token) {
      const httpResponse = await fetch(`${apiBaseUrl}/${this.routeName}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data)
      });
    
      if (!httpResponse.ok) {
        throw new Error("Invalid responce");
      }
      
      return await httpResponse.json();
    }
    return await this.getValidToken()
      .then(fetchData)
      .catch(this._errorHandler);
  }
  static async delete(id) {
    async function fetchData(token) {
      const httpResponse = await fetch(`${apiBaseUrl}/${this.routeName}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
    
      if (!httpResponse.ok) {
        console.error(httpResponse.status);
        return false;
      }
    
      return true;
    }
    return await this.getValidToken()
      .then(fetchData)
      .catch(this._errorHandler);
  }
  static async getValidToken() {
    async function fetchData() {
      const httpResponse = await fetch(`${apiBaseUrl}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: sessionStorage.setItem("getItem")
      });
      
      if (! httpResponse.ok) {
        throw new Error("Invalid responce");
      }
  
      const response = await httpResponse.json();
      sessionStorage.setItem("token", JSON.stringify(response.token));
      return response.token;
    }
    
    return new Promise(fetchData)
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
  
      return true;
    }

    return await fetchData().catch(this._errorHandler)
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
      
      const response = await httpResponse.json();
      sessionStorage.setItem("token", JSON.stringify(response.token));
      sessionStorage.setItem("userDataConnection", JSON.stringify(data));

      return response.user;
    }

    return await fetchData().catch(this._errorHandler)
  }
  static signout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userDataConnection");
  }

  static async RequestResetPasword(data) {
    async function fetchData() {
      const httpResponse = await fetch(`${apiBaseUrl}/reset-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      
      if (!httpResponse.ok) {
        throw new Error("Invalid responce");
      }
      
      return true;
    }
    return await fetchData().catch(this._errorHandler)
  }
  static async validateAccount(uuid) {
    async function fetchData() {
      const httpResponse = await fetch(`${apiBaseUrl}/user/account/${uuid}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
      });
      
      if (!httpResponse.ok) {
        throw new Error("Invalid responce");
      }
      
      return true;
    }
    return await fetchData().catch(this._errorHandler)
  }
  static async validatePassword(uuid, data) {
    async function fetchData() {
      const httpResponse = await fetch(`${apiBaseUrl}/user/password/${uuid}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      
      if (!httpResponse.ok) {
        throw new Error("Invalid responce");
      }
      
      return true;
    }
    return await fetchData().catch(this._errorHandler)
  }
 
}