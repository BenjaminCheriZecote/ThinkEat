import store from "../../../store";
import types from "../../../store/reducers/types";


export async function historicLoader(){

    store.dispatch({type:types.SET_IS_ASIDE_FALSE});

    // const hystory = await HistoryApi.getAll();

    // return hystory
    return null
}