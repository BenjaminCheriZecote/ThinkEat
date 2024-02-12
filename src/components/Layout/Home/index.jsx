import { FamilyApi } from "../../../store/api";
import store from "../../../store";

const Home = () => {

    return(
        <section className="section">
            <h1>Home</h1>
        </section>
    )
}

export default Home;

export async function homeLoader() {
    async function fetchDataFamilyApi() {
        try {
            const families = await FamilyApi.getAll();
            console.log(families)
            store.dispatch({type:"SET_FAMILIES", payload: families})
            return families
        } catch (error) {
            console.log(error)
        }
    }
    fetchDataFamilyApi()
    // autre fetch ici
    return null;
  }