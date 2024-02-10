import { apiBaseUrl } from "../config.js";
import AppError from "../helpers/appError.js";

class CoreApi {
  static routeName;

  static async create(data) {
    const token = await this.getValidToken();

    const httpResponse = await fetch(`${apiBaseUrl}/${this.routeName}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });

    this.errorHandler(httpResponse);

    return await httpResponse.json();

  }
  static async get(id) {
    const httpResponse = await fetch(`${apiBaseUrl}/${this.routeName}/${id}`);

    this.errorHandler(httpResponse);

    return await httpResponse.json();
  }
  static async getAll() {
    const httpResponse = await fetch(`${apiBaseUrl}/${this.routeName}`);

    this.errorHandler(httpResponse);

    return await httpResponse.json();
  }
  static async update(id, data) {
    const token = await this.getValidToken();

    const httpResponse = await fetch(`${apiBaseUrl}/${this.routeName}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
  
    this.errorHandler(httpResponse);
    
    return await httpResponse.json();
  }
  static async delete(id) {
    const token = await this.getValidToken();

    const httpResponse = await fetch(`${apiBaseUrl}/${this.routeName}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
  
    this.errorHandler(httpResponse);
  
    return true;
  }
  static async getValidToken() {
    const httpResponse = await fetch(`${apiBaseUrl}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: sessionStorage.setItem("getItem")
    });
    
    this.errorHandler(httpResponse);

    const response = await httpResponse.json();
    sessionStorage.setItem("token", JSON.stringify(response.token));
    return response.token;
  }
  static async errorHandler(res) {
    if (httpResponse.ok) return;
    if (!res.bodyUsed) {
      throw new AppError(res.statusText, {httpStatu: res.status});
    }
    const {error} = await res.json()
    throw new AppError(error, {httpStatu: res.status});
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
    const httpResponse = await fetch(`${apiBaseUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    this.errorHandler(httpResponse);

    return true;
  }
  static async signin(data) {
    const httpResponse = await fetch(`${apiBaseUrl}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    this.errorHandler(httpResponse);
    
    const response = await httpResponse.json();
    sessionStorage.setItem("token", JSON.stringify(response.token));
    sessionStorage.setItem("userDataConnection", JSON.stringify(data));

    return response.user;
  }
  static signout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userDataConnection");
  }

  static async RequestResetPasword(data) {
    const httpResponse = await fetch(`${apiBaseUrl}/reset-password/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    
    this.errorHandler(httpResponse);
    
    return true;
  }
  static async validateAccount(uuid) {
    const httpResponse = await fetch(`${apiBaseUrl}/user/account/${uuid}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" }
    });
    
    this.errorHandler(httpResponse);
    
    return true;
  }
  static async validatePassword(uuid, data) {
    const httpResponse = await fetch(`${apiBaseUrl}/user/password/${uuid}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    
    this.errorHandler(httpResponse);
    
    return true;
  }
 
}