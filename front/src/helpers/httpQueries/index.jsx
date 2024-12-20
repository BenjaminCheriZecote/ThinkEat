import urlQueryJsonParser from "url-query-json-parser";

export function mappingUrlFunction(urlClient, page){
    // si il n'y a pas d'urlClient, on sort de la fonction
    if (!urlClient || !page && !urlClient.search) {
        return null
    }

    if (!urlClient.search && page) return urlQueryJsonParser.parseJSON({"page":page});

    const recipeQuery = []; 
    const ingredientQuery = [];
    const familyQuery = [];
    const orderByQuery = [];
    let pageQuery = page?page:'';

    const favoriteQuery = [];
    const recipeCriteriaQuery = [];
    let error = [];
    const errorDataTime = 'Erreur sur le(s) temps de la recette. Format de données non valide.';
    
    // récupération de la query du formulaire
    const urlSplited = urlClient.search;
    
    // décodage des caractères spéciaux de la query
    const urlParsed = decodeURIComponent(urlSplited);
    // supression du "?" en début de string
    const queryString = urlParsed.slice(1);
    // création d'un tableau avec les données du formulaire
    const params = queryString.split('&');
    
    params.forEach((param) => {
        const parts = param.split('=');
        const result = [parts[0], '=', parts[1]];

        // si le param est hunger
        if (result[0] === 'hunger') {
            // et que sa valeur est 'Copieux', ou 'Normal', ou 'Léger'
            if (result[2] === 'Copieux' || result[2] === 'Normal' || result[2] === 'Léger') {
                // on push dans la variable recipeCriteriaQuery
                recipeCriteriaQuery.push(result)
            }
        }

        // si le param commence par 'preparatingTime'
        if (result[0].startsWith('preparatingTime') || result[0].startsWith('cookingTime')) {
            // on récupère les les données entre les ':' dans un tableau
            let value = result[2].split(':');

            // si on a bien un tableau de 3 valeurs
            if (value.length === 3) {
                value.forEach((data) => {
                    // on vérifie que chacunes d'elles peut-être converti en nombre
                    const parseValue = parseInt(data);

                    // sinon on push une erreur et on sort de la fonction
                    if (parseValue == undefined || parseValue == isNaN) {
                        return error.push(errorDataTime)
                    }
                });
                
                // on récupère la string en partant de la fin à partir de 3 caractères, c.à.d soit 'preparatingTime' soit 'cookingTime'
                const property = result[0].slice(0, -3);
                // on récupère les 3 derniers caractères de la string, c.à.d soit 'min' soit 'max'
                let operator = result[0].slice(-3);
                if (operator === 'min') operator = '>=';
                if (operator === 'max') operator = '<=';

                value = value.join(':');
              
                // le temps de préparation/cuisson est une propriété de la table recipe dans la base de donnée
                // on push dans la variable recipeQuery : le nom de la propriété, l'opérateur, la valeur
                recipeQuery.push([property, operator, value]);
            } else return error = errorDataTime
        }

        // si le param est ingredients ou families
        if (result[0] === 'ingredients' || result[0] === 'families' || result[0] === 'diets') {
            // on récupère les valeurs des param 
            // des id séparés par des '-' 
            const splitedIngredientValue = result[2].split("-");
            
            // on les converti en nombre pour vérification
            const convertedArray = splitedIngredientValue.map((data) => {
                const parseNumber = parseInt(data);
                return parseNumber
            })
            // si un valeur n'est pas convertible en nombre la valeur d'erreur devient true
            const foundErrorTypeData = convertedArray.find((data) => data == undefined || data == isNaN)

            // si il n'y a pas d'erreur
            if (!foundErrorTypeData) {

                splitedIngredientValue.forEach((data) => {
                    // si le param est ingrédient
                    if (result[0] === "ingredients" && data !== '') {
                        // variable avec le nom de la propriété, l'operateur, la valeur reconverti en string
                        const resultParam = ['id', '=', data.toString()]
                        // on push dans ingrédientQuery
                        ingredientQuery.push(resultParam);
                    }

                    if (result[0] === "families" && data !== '') {
                        const resultParam = ["id", '=', data.toString()]
                        familyQuery.push(resultParam);
                    }
                    
                    if (result[0] === "diets" && data !== '') {
                        // si végétarien : ni viande ni poisson
                        if (data === "1") {
                            recipeQuery.push(["diet", "=", 'Végétarien']);
                        }
                        // si végétalien : ni viande, ni poisson, ni lait, ni oeuf, ni insectes
                        if (data === "2") {
                            recipeQuery.push(["diet", "=", 'Végétalien']);
                        }
                        // si crudivore : sans temps de cuisson
                        if (data === "3") recipeQuery.push(["diet", "=", 'Crudivore']);
                        
                        // si sans gluten : sans blé, céréale
                        if (data === "4") {
                            recipeQuery.push(["diet", "=", 'Sans gluten']);
                        }
                        // si sans lactose: sans lait
                        if (data === "5") {
                            recipeQuery.push(["diet", "=", 'Sans lactose']);
                        }
                    } 
                })
            }
            
        }

        if (result[0].startsWith('orderBy')) {
            if (result[0].slice(7) === "name" || result[0].slice(7) === "time" || result[0].slice(7) === "hunger") {
                const resultParam = [result[0].slice(7), result[2]]
                orderByQuery.push(resultParam)
            }
        }

        if (result[0] === 'favorites') {
            if (result[2] === 'true') {
                const resultParam = `"${result[0]}":${result[2]}`
                favoriteQuery.push(resultParam)
            }
        }

        if (result[0] === 'page') {
            pageQuery = result[2];
        }

    })

    let stringFilter = '';
    let stringOrderBy = '';
    let stringCriteria = '';

    // typage demandé :
    // filter={<nom de la table>:[[<nom de la propriété>,<operateur>,<valeur>]]...}
    const builderStringFunction = (queryArray, string, tableName) => {

        // on vérifie que les variables array ne soient pas vide
        if (queryArray && queryArray.length > 0) {
            // afin d'être insérer dans les variables strings, on stringify les array
            string += `${tableName?`"${tableName}"`:""}:${JSON.stringify(queryArray)},`;
        }
        return string
    }

    stringFilter = builderStringFunction(recipeQuery, stringFilter, "recipe");
    stringFilter = builderStringFunction(ingredientQuery, stringFilter, "ingredient");
    stringFilter = builderStringFunction(familyQuery, stringFilter, "family");

    stringOrderBy = builderStringFunction(orderByQuery, stringOrderBy);

    stringCriteria = builderStringFunction(recipeCriteriaQuery, stringCriteria, "recipe");

    const filterProperty = `"filter":{${stringFilter}},`;
    const orderByProperty = `"orderBy"${stringOrderBy}`;
    const pageProperty = pageQuery.length > 0? `"page":"${pageQuery}",`:"";
    const criteriaProperty = `"criteria":{${stringCriteria}},`;

    let stringFinalObject = `{${stringCriteria.length > 0?criteriaProperty:""}${stringFilter.length > 0?filterProperty:""}${pageProperty.length > 0?pageProperty:""}${stringOrderBy.length > 0?orderByProperty:""}${favoriteQuery[0]?favoriteQuery[0].length > 0?favoriteQuery[0]:"":""}}`;
    // regex pour remplacer la chaîne de caractère “,}” par “}”
    stringFinalObject = stringFinalObject.replace(/,\}/g, '}');
    // parse de la string en objet au format JSON
    const objectQuery = JSON.parse(stringFinalObject);

    // eslint-disable-next-line no-inner-declarations
    let urlQuery = urlQueryJsonParser.parseJSON(objectQuery);
    // if (error.length) urlQuery = error;
    return urlQuery;
 
}