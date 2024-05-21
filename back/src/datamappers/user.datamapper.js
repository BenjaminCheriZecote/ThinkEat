import client from '../helpers/pg.client.js';
import CoreDatamapper from './core.datamapper.js';

export default class UserDatamapper extends CoreDatamapper {
  static tableName = "user";
  static keyTableName = "user_key";

  /**
   * @param {object} data contain property for create element
   * @returns {object} element
   */
  static async createKey(data) {
    const result = await client.query(
      `SELECT * FROM create_${this.keyTableName}($1)`,
      [data],
    );
    return result.rows[0];
  }

  /**
   * @param {integer} uuid search element by id
   * @returns {object} element
   */
  static async findKeyByPkAndType(uuid, type) {
    const result = await client.query(`SELECT * FROM find_${this.keyTableName}($1) WHERE "type"=$2`, [{id:uuid}, type]);
    return result.rows[0];
  }

  /**
   * @param {integer} uuid delete element by id
   * @returns {object} element
   */
  static async deleteKey(uuid) {
    const result = await client.query(`SELECT * FROM delete_${this.keyTableName}($1)`, [{id:uuid}]);
    // 0 devient false et 1 devient true
    return !!result.rowCount;
  }

  static async findRecipeToUser(data) {
    const result = await client.query(
      `SELECT * FROM find_recipe_to_user($1)`,
      [data],
    );
    if (result.rows[0].userId === null) return null;
    return result.rows[0];
  }

  static async addRecipeToUser(data) {
    const result = await client.query(
      `SELECT * FROM add_recipe_to_user($1)`,
      [data],
    );
    return result.rows[0];
  }

  static async removeRecipeToUser(data) {
    const result = await client.query(
      `SELECT * FROM remove_recipe_to_user($1)`,
      [data],
    );
    return result.rows[0];
  }

  static async getRecipeToUser({filter, criteria, orderBy, page, number}={}, data) {
    let query = {
      text: `SELECT *, COUNT(*) OVER() AS total FROM get_recipe_to_user($1)`,
      values: [data]
    };
    if (filter || criteria) {
      query = this.addWhereToQuery({filter, criteria, query});
    }
    if (orderBy) {
      query = this.addOrderByToQuery({orderBy, query});
    }
    if (page) {
      query = this.addPaginationToQuery({page, query, number});
    }
    
    let result = await client.query(query);

    if (result.rows.length === 0) {
      query.text = query.text.replace(/\s+LIMIT\s+\d+(\s+OFFSET\s+\d+)?;?/i, '');
      query = this.addPaginationToQuery({page:'1', query, number});
      result = await client.query(query);
    }
    
    return result.rows;
  }
  static addWhereToQuery({filter, criteria, query}) {
    query.text += " WHERE";
    if (filter) {
      query.text += " " + Object.entries(filter).map(([tableName, data]) => {
        return `(${data.map(condition => {
          if (condition[2] === "null") {
            return `"${condition[0]}" ${condition[1]} NULL`;
          }
          query.values.push(condition[2]);

          if (tableName === "ingredient" || tableName === "family") {
            const type = typeof condition[2] === "number" ? "int" : "text";
            const operator = condition[1] === "=" || condition[1] === "in" ? "IN" : "NOT IN";
            
            if (tableName === "ingredient") {
              return `$${query.values.length} ${operator} (SELECT (json_array_elements(ingredients)->>'${condition[0]}')::${type})`;
            }
            if (tableName === "family") {
              return `$${query.values.length} ${operator} (SELECT DISTINCT (json_array_elements(json_array_elements(ingredients)::json->'families')::json->>'${condition[0]}')::${type})`;
            }
          }

          return `"${condition[0]}" ${condition[1]} $${query.values.length}`;
        }).join(" AND ")})`;
      }).join(" AND ");
    }
    if (criteria) {
      query.text += (filter ? " AND " : " ") + Object.entries(criteria).map(([tableName, data]) => {
        const newData = data.reduce((newObject, condition) => {
          if (newObject[condition[0]]) {
            newObject[condition[0]].push([condition[1], condition[2]]);
          } else {
            newObject[condition[0]] = [[condition[1], condition[2]]];
          }
          return { ...newObject };
        }, {});

        return Object.entries(newData).map(([propertyName, data]) => {
          return `(${data.map(condition => {
            if (condition[1] === "null") {
              return `"${propertyName}" ${condition[0]} NULL`;
            }
            query.values.push(condition[1]);

            if (tableName === "ingredient" || tableName === "family") {
              const type = typeof condition[2] === "number" ? "int" : "text";
              const operator = condition[1] === "=" || condition[1] === "in" ? "IN" : "NOT IN";
              
              if (tableName === "ingredient") {
                return `$${query.values.length} ${operator} (SELECT (json_array_elements(ingredients)->>'${condition[0]}')::${type})`;
              }
              if (tableName === "family") {
                return `$${query.values.length} ${operator} (SELECT DISTINCT (json_array_elements(json_array_elements(ingredients)::json->'families')::json->>'${condition[0]}')::${type})`;
              }
            }

            return `"${propertyName}" ${condition[0]} $${query.values.length}`;
          }).join(" OR ")})`;
        }).join(" AND ");
      }).join(" AND ");
    }
    return query;
  }
  static addOrderByToQuery({orderBy, query}) {
    query.text += ` ORDER BY ${orderBy.map(order => `${order[0]} ${order[1] || "ASC"}`).join(", ")}`;
    return query;
  }
  static addPaginationToQuery({page, query, number=25}) {
    const offset = (page - 1) * (number || 10); // Assuming 10 items per page by default
    query.text += ` LIMIT ${number || 10} OFFSET ${offset}`;
    return query;
  }
}