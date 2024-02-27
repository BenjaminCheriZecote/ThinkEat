import store from "../../../store";
import types from "../../../store/reducers/types";

const Home = () => {
    

    return(
        <main id="home" className="section outlet">
            <h1>Home</h1>
        </main>
    )
}

export default Home;

export function homeLoader(){

    store.dispatch({type:types.SET_IS_ASIDE_FALSE});
    
    return null;
}