import { apiBaseUrl } from "../config.js";
import AppError from "../helpers/appError.js";

class CoreApi {
  static routeName;

  static async create(data) {
    const token = await TokenApi.getValidToken();

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
  static async getAll(query = null) {
    console.log("query catch", query)
    let url = `${apiBaseUrl}/${this.routeName}`;
    if (query) {
      url += `?${query}`;
    }
    console.log(url);
    const httpResponse = await fetch(url);
    
    this.errorHandler(httpResponse);

    return await httpResponse.json();
  }
  static async update(id, data) {
    const token = await TokenApi.getValidToken();
    console.log("je passe bien par là ?")

    const httpResponse = await fetch(`${apiBaseUrl}/${this.routeName}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
  
    this.errorHandler(httpResponse);
    
    return await httpResponse.json();
  }
  static async delete(id) {
    const token = await TokenApi.getValidToken();

    const httpResponse = await fetch(`${apiBaseUrl}/${this.routeName}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
  
    this.errorHandler(httpResponse);
  
    return true;
  }
  static async getValidToken() {
    const tokens = localStorage.getItem('tokens');
    const { accessToken, accessTokenExpiresAt, ...otherTokens}= JSON.parse(tokens);

    if ((new Date().getTime() / 1000) > accessTokenExpiresAt) {
      this.signout();
      throw new AppError("token expired", {httpStatus: 401});
    }

    return accessToken;
  }
  static async errorHandler(res) {
    if (res.ok) return;
    if (!res.bodyUsed) {
      throw new AppError(res.statusText, {httpStatus: res.status});
    }
    const {error} = await res.json()
    throw new AppError(error, {httpStatus: res.status});
  }
}

export class HistoryApi extends CoreApi {
  static routeName = "hitory";
}
export class IngredientApi extends CoreApi {
  static routeName = "ingredient";

  static async addIngredientToRecipe(recipeId, ingredientId) {

    const httpResponse = await fetch(`${apiBaseUrl}/recipe/${recipeId}/ingredient/${ingredientId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
  
    this.errorHandler(httpResponse);
    
    return await httpResponse.json();
  }

  static async removeIngredientToRecipe(recipeId, ingredientId) {

    const httpResponse = await fetch(`${apiBaseUrl}/recipe/${recipeId}/ingredient/${ingredientId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  
    this.errorHandler(httpResponse);
    
    return await httpResponse.json();
  }


}
export class RecipeApi extends CoreApi {
  static routeName = "recipe";
}
export class UnitApi extends CoreApi {
  static routeName = "unit";
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
    
    const {user, ...tokens} = await httpResponse.json();
    TokenApi.addNewTokken(tokens);
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  }
  static signout() {
    localStorage.removeItem('user');
    TokenApi.deleteToken();
  }

  static getUser() {
    const userString = localStorage.getItem('user');
    if (!userString) {
      return null;
    }

    return JSON.parse(userString);
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

class TokenApi {
  static addNewTokken(tokens) {
    localStorage.setItem('tokens', JSON.stringify(tokens));
  }
  static async getValidToken() {
    const tokens = localStorage.getItem('tokens');
    if (!tokens) {
      throw new AppError("Veuillez vous connecter.", {httpStatus: 401});
    }

    const {
      accessToken,
      accessTokenExpiresAt,
      refreshToken,
      refreshTokenExpiresAt
    } = JSON.parse(tokens);

    const accessTokenisExpired = new Date((accessTokenExpiresAt - 10)* 1000).getTime() < new Date().getTime();
    if (!accessTokenisExpired) {
      return accessToken;
    }

    const refreshTokenisExpired = new Date((refreshTokenExpiresAt - 10)* 1000).getTime() < new Date().getTime();
    if (refreshTokenisExpired) {
      this.deleteToken();
      throw new AppError("Veuillez vous reconnecter.", {httpStatus: 401});
    }
    
    await this.postRefreshToken(accessToken,refreshToken)

    this.getValidToken();
  }
  static async postRefreshToken(accessToken,refreshToken) {
    const httpResponse = await fetch(`${apiBaseUrl}/user/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify(refreshToken)
    });

    this.errorHandler(httpResponse);

    const newTokens = await httpResponse.json();
    this.addNewTokken(newTokens);
  }
  static deleteToken() {
    localStorage.removeItem("token");
  }
  static async errorHandler(res) {
    if (res.ok) return;
    if (!res.bodyUsed) {
      throw new AppError(res.statusText, {httpStatus: res.status});
    }
    const {error} = await res.json()
    throw new AppError(error, {httpStatus: res.status});
  }
}