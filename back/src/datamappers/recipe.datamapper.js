import CoreDatamapper from './core.datamapper.js';
import client from '../helpers/pg.client.js';

export default class RecipeDatamapper extends CoreDatamapper {
  static tableName = 'recipe';

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

  static async getProposal(user = null, queryOptions = null, favorite = null) {
    const {filter, criteria, orderBy, page, number} = queryOptions;
    let result, query;
    switch (Boolean(user)) {
    case true:
      query = {
        text:`SELECT "evaluate_proposal".id as "id", "name", "image", "history_note" FROM evaluate_proposal(${user ? "$1::int" : ""})`,
        values:user ? [ user ] : []
      };
      if (favorite) query.text += ` JOIN "user_has_recipe" uhr ON uhr.recipe_id = "evaluate_proposal".id`;

      if (filter || criteria) query = this.addWhereToQuery({filter, criteria, query});
        
      query.text += ` ORDER BY "history_note" DESC, RANDOM()`;

      result = await client.query(query);
      break;
    case false:
      result = await this.findAll(queryOptions = null);
      result.sort(() => Math.random() - 0.5);
      break;
    default:
    }
    return result.rows;
  }
}
