

export async function mappingUrlFunction(urlClient, endpointApi){
        
    // les trois tables du back end (recipe, ingredient, family) possiblement concernée par la query + l'orderBy pour le trie
    // représentés ici par 4 array vides, qui vont être potentiellement alimenté selon l'url généré par les Form concernés
    const recipeQuery = []; 
    const ingredientQuery = [];
    const familyQuery = [];
    const orderByQuery = [];

   
    if (urlClient.includes('?')) {
        const queryString = urlClient.split('?')[1];
        const params = queryString.split('&');

        const mappingParams = params.forEach((param) => {
            const parts = param.split('=');
            const result = [parts[0], '=', parts[1]];
            if (result[0] === 'hunger') {
                if (result[2] === 'Copieux' || result[2] === 'Normal' || result[2] === 'Léger') {
                    recipeQuery.push(result)
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

            const formatQuery = (query) => {
                return query.map(item => {
                  return '[' + item.map(value => `'${value}'`).join(',') + ']';
                }).join(',');
              };

              let urlSended = endpointApi;

              
                    if (recipeQuery.length > 0) {
                        const formattedRecipeQuery = formatQuery(recipeQuery);
                        urlSended = urlSended + `recipe=${formattedRecipeQuery}&`;
                    }
                    if (ingredientQuery.length > 0) {
                        const formattedIngredientQuery = formatQuery(ingredientQuery);
                        urlSended = urlSended + `ingredient=${formattedIngredientQuery}&`
                    }
                    if (familyQuery.length > 0) {
                        const formattedFamilyQuery = formatQuery(familyQuery);
                        urlSended = urlSended + `family=${formattedFamilyQuery}&`
                    }
                    if (orderByQuery.length > 0) {
                        const formattedOrderByQuery = formatQuery(orderByQuery);
                        urlSended = urlSended + `orderBy=${formattedOrderByQuery}&`
                    }

            console.log("console URL", urlSended)
            // console.log("recipe query :", recipeQuery)
            // console.log("family query :", familyQuery)

            window.history.replaceState({}, '', urlSended.href);
        })
    }
}