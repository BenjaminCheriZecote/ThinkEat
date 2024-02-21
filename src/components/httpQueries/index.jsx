import { apiBaseUrl } from "../../config";
import store from "../../store";
import { FamilyApi, IngredientApi, RecipeApi } from "../../store/api";
import types from "../../store/reducers/types";
import urlQueryJsonParser from "url-query-json-parser";

export function mappingUrlFunction(urlClient){
    
    // les trois tables du back end (recipe, ingredient, family) possiblement concernée par la query + l'orderBy pour le trie
    // représentés ici par 4 array vides, qui vont être potentiellement alimenté selon l'url généré par les Form concernés
    const recipeQuery = []; 
    const ingredientQuery = [];
    const familyQuery = [];
    const orderByQuery = [];
    const recipeCriteriaQuery = [];
   
    if (!urlClient.includes('?')) {
        return null;
    }
    
    const queryString = urlClient.split('?')[1];
    const params = queryString.split('&');

    const mappingParams = params.forEach((param) => {
        const parts = param.split('=');
        const result = [parts[0], '=', parts[1]];
        if (result[0] === 'hunger') {
            if (result[2] === 'Copieux' || result[2] === 'Normal' || result[2] === 'Léger') {
                recipeCriteriaQuery.push(result)
            }
        }
        if (result[0] === 'preparatingTime' || result[0] === 'cookingTime') {
            const parseNumber = parseInt(result[2]);
            if (parseNumber !== undefined) {
                if (result[2] !== '') {
                    recipeQuery.push(result)
                }
            }
        }
        if (result[0] === 'ingredients' || result[0] === 'families') {
            const splitedIngredientValue = result[2].split("-");
            
            const convertedArray = splitedIngredientValue.map((data) => {
                const parseNumber = parseInt(data);
                return parseNumber
            })
            const foundErrorTypeData = convertedArray.find((data) => data == undefined)
            if (!foundErrorTypeData) {
                splitedIngredientValue.forEach((data) => {
                    if (result[0] === "ingredients" && data !== '') {
                        const resultParam = ['id', '=', data]
                        ingredientQuery.push(resultParam);
                    }
                    if (result[0] === "families" && data !== '') {
                        const resultParam = ["id", '=', data]
                        familyQuery.push(resultParam);
                    }  
                })
            }
            
        }

        if (result[0].startsWith('orderBy')) {
            if (result[0].slice(7) === "name" || result[0].slice(7) === "time" || result[0].slice(7) === "hunger") {
                const resultParam = [result[0].slice(7), '=', result[2]]
                orderByQuery.push(resultParam)
            }
        }



    })

    const formatQuery = (query) => {
        return query.map(item => {

            return item.map(value => value);
        }).join(',');
        };

    let urlSended = '';

    console.log(recipeQuery)
    console.log(ingredientQuery)
    console.log(familyQuery)

    let stringFilter = ``;
    let stringOrderBy = '';
    let stringCriteria = '';

    if (recipeQuery.length > 0) {
        stringFilter = `${stringFilter}"recipe":${JSON.stringify(recipeQuery)},`;
    }
    if (ingredientQuery.length > 0) {
        stringFilter = `${stringFilter}"ingredient":${JSON.stringify(ingredientQuery)},`
    }
    if (familyQuery.length > 0) {
        stringFilter = `${stringFilter}"family":${JSON.stringify(familyQuery)}`
    }
    if (orderByQuery.length > 0) {
        stringOrderBy = `${stringOrderBy}"orderBy":${JSON.stringify(orderByQuery)}`;
    }
    if (recipeCriteriaQuery.length > 0) {
        stringCriteria = `${stringCriteria}"recipe":${JSON.stringify(recipeCriteriaQuery)}`
    }

    const filterProperty = `"filter":{${stringFilter}},`
    const orderByProperty = `"orderBy":{${stringOrderBy}},`
    const criteriaProperty = `"criteria":{${stringCriteria}},`

    let stringFinalObject = `{${stringCriteria.length > 0?criteriaProperty:""}${stringFilter.length > 0?filterProperty:""}${stringOrderBy.length > 0?orderByProperty:""}}`;

    stringFinalObject = stringFinalObject.slice(0, stringFinalObject.length - 2) + stringFinalObject.slice(stringFinalObject.length - 1);
    
    console.log("new string ", stringFinalObject)
    const objectQuery = JSON.parse(stringFinalObject);
    console.log("console log final OBJECT : ", objectQuery)

    // eslint-disable-next-line no-inner-declarations
    const urlQuery = urlQueryJsonParser.parseJSON(objectQuery);
    console.log(urlQuery);
    return urlQuery
    
}