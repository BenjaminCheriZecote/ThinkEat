import { apiBaseUrl } from "../../config";
import store from "../../store";
import { FamilyApi, IngredientApi, RecipeApi } from "../../store/api";
import types from "../../store/reducers/types";
import urlQueryJsonParser from "url-query-json-parser";
import secondesConverterFunction from "../../helpers/secondesConverterFunction";
import formatterSecondesTime from "../../helpers/formatterSecondesTime";

export function mappingUrlFunction(urlClient){
    const recipeQuery = []; 
    const ingredientQuery = [];
    const familyQuery = [];
    const orderByQuery = [];
    const recipeCriteriaQuery = [];
    let error = [];
    const errorDataPreparatingTime = 'Erreur sur le temps de préparation. Format de données non valide.';
    const errorDataCookingTime = 'Erreur sur le temps de cuisson. Format de données non valide.';
    const timeSecondesMax = {};
    const timeSecondesMin = {};
   
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

        if (result[0].startsWith('preparatingTime')) { // %3A; 00%3A21%3A44 => 00:21:44
            let value = result[2].split('%3A');
            if (value.length === 3) {
                value.forEach((data) => {
                    const parseValue = parseInt(data);
                    if (parseValue == undefined || parseValue == isNaN) {
                    return error.push(errorDataPreparatingTime)
                    }
                });
                
                const property = 'preparatingTime';
                value = value.join(':');
                let operator = result[0].slice(15);
                if (operator === 'min') {
                    operator = '>=';
                    const minimalTimeInSecondesPreparatingTime = secondesConverterFunction(value);
                    timeSecondesMin.preparatingTime = minimalTimeInSecondesPreparatingTime ;
                }
                if (operator === 'max') {
                    operator = '<=';
                    const maximalTimeInSecondesPreparatingTime = secondesConverterFunction(value);
                    timeSecondesMax.preparatingTime = maximalTimeInSecondesPreparatingTime ;
                }
                
                recipeQuery.push([property, operator, value]);
            } else return error = errorDataPreparatingTime
        }

        if (result[0].startsWith('cookingTime')) { // %3A; 00%3A21%3A44 => 00:21:44
            let value = result[2].split('%3A');
                if (value.length === 3) {
                    value.forEach((data) => {
                    const parseValue = parseInt(data);
                if (parseValue == undefined || parseValue == isNaN) {
                    return error.push(errorDataCookingTime)
                }
                });
            value = value.join(':');
            let operator = result[0].slice(11); 
            if (operator === 'min') {
                operator = '>=';
                const minimalTimeInSecondesCookingTime = secondesConverterFunction(value);
                timeSecondesMin.cookingTime = minimalTimeInSecondesCookingTime;
            }
            if (operator === 'max') {
                operator = '<=';
                    const maximalTimeInSecondesCookingTime = secondesConverterFunction(value);
                    timeSecondesMax.cookingTime = maximalTimeInSecondesCookingTime;
                } else return error = errorDataCookingTime
            }
        }

        if (result[0] === 'ingredients' || result[0] === 'families') {
            const splitedIngredientValue = result[2].split("-");
            
            const convertedArray = splitedIngredientValue.map((data) => {
                const parseNumber = parseInt(data);
                return parseNumber
            })
            const foundErrorTypeData = convertedArray.find((data) => data == undefined || data == isNaN)
            if (!foundErrorTypeData) {
                splitedIngredientValue.forEach((data) => {
                    if (result[0] === "ingredients" && data !== '') {
                        const resultParam = ['id', '=', data.toString()]
                        ingredientQuery.push(resultParam);
                    }
                    if (result[0] === "families" && data !== '') {
                        const resultParam = ["id", '=', data.toString()]
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

    if (timeSecondesMin.preparatingTime && timeSecondesMin.cookingTime) {
        const timeProperty = 'time';
        const timeOperator = '>=';
        const totalTimesSecondes = timeSecondesMin.preparatingTime + timeSecondesMin.cookingTime;
        const timeValue = formatterSecondesTime(totalTimesSecondes);
        console.log(timeValue);
        recipeQuery.push([timeProperty, timeOperator, timeValue]);
    }

    if (timeSecondesMax.preparatingTime && timeSecondesMax.cookingTime) {
        const timeProperty = 'time';
        const timeOperator = '<=';
        const totalTimesSecondes = timeSecondesMax.preparatingTime + timeSecondesMax.cookingTime;
        const timeValue = formatterSecondesTime(totalTimesSecondes);
        console.log(timeValue);
        recipeQuery.push([timeProperty, timeOperator, timeValue]);
    }

    console.log(recipeQuery)
    console.log(ingredientQuery)
    console.log(familyQuery)

    let stringFilter = '';
    let stringOrderBy = '';
    let stringCriteria = '';

    if (recipeQuery.length > 0) {
        stringFilter = `${stringFilter}"recipe":${JSON.stringify(recipeQuery)},`;
    }
    if (ingredientQuery.length > 0) {
        stringFilter = `${stringFilter}"ingredient":${JSON.stringify(ingredientQuery)},`
    }
    if (familyQuery.length > 0) {
        stringFilter = `${stringFilter}"family":${JSON.stringify(familyQuery)},`
    }
    if (orderByQuery.length > 0) {
        stringOrderBy = `${stringOrderBy}"orderBy":${JSON.stringify(orderByQuery)},`;
    }
    if (recipeCriteriaQuery.length > 0) {
        stringCriteria = `${stringCriteria}"recipe":${JSON.stringify(recipeCriteriaQuery)},`
    }

    const filterProperty = `"filter":{${stringFilter}},`
    const orderByProperty = `"orderBy":{${stringOrderBy}},`
    const criteriaProperty = `"criteria":{${stringCriteria}},`

    let stringFinalObject = `{${stringCriteria.length > 0?criteriaProperty:""}${stringFilter.length > 0?filterProperty:""}${stringOrderBy.length > 0?orderByProperty:""}}`;

    stringFinalObject = stringFinalObject.replace(/,\}/g, '}');
    console.log("new string ", stringFinalObject);
    const objectQuery = JSON.parse(stringFinalObject);
    console.log("console log final OBJECT : ", objectQuery);

    // eslint-disable-next-line no-inner-declarations
    let urlQuery = urlQueryJsonParser.parseJSON(objectQuery);
    // if (error.length) urlQuery = error;
    console.log(urlQuery);
    return urlQuery;
}