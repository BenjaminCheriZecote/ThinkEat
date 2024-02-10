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
  static async getAll() {
    const httpResponse = await fetch(`${apiBaseUrl}/${this.routeName}`);

    this.errorHandler(httpResponse);

    return await httpResponse.json();
  }
  static async update(id, data) {
    const token = await TokenApi.getValidToken();

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
    if (httpResponse.ok) return;
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
    
    const {user, ...tokens} = await httpResponse.json();
    TokenApi.addNewTokken(tokens);

    return response.user;
  }
  static signout() {
    TokenApi.deleteToken();
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
    this.useRefreshToken(tokens);
  }
  static async getValidToken() {
    const tokens = localStorage.getItem('tokens');
    if (!tokens) {
      throw new AppError("Vous êtes déconnecté.", {httpStatus: 401})
    }
    const { accessToken }= JSON.parse(tokens);
    return accessToken;
  }
  static async useRefreshToken(tokens) {
    const {
      accessToken,
      accessTokenExpiresAt,
      refreshToken,
      refreshTokenExpiresAt
    } = JSON.parse(tokens);


    setInterval(async () => {
      
    }, process.env.JWT_EXPIRE_IN)



  }
  static async postRefreshToken(tokens) {
    const { accessToken, refreshToken, ...otherDate }= JSON.parse(tokens);









    
      const httpResponse = await fetch(`${apiBaseUrl}/${this.routeName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify(refreshToken)
      });

      this.errorHandler(httpResponse);

      return await httpResponse.json();
  }
  static deleteToken() {
    localStorage.removeItem("token");
  }
}