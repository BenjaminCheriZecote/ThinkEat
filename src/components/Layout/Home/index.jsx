import { useLoaderData } from "react-router-dom";
import { FamilyApi } from "../../../store/api";
import store from "../../../store";
import { useSelector } from "react-redux";
import { useEffect } from "react";


const Home = () => {

    useEffect(() => {
        const toto = async () => {
            await fetchDataFamilyApi();
        }
        toto()
    }, [])

    // const families = useLoaderData();
    // const {families} = useSelector((state) => state.families)
    async function fetchDataFamilyApi() {
        try {
            const families = await FamilyApi.getAll();
            console.log(families)
            return families
        } catch (error) {
            console.log(error)
        }
    }

    const toto = async () => {
        await fetchDataFamilyApi()
    }
    


    
    
    

    

    return(
        <section className="section">
            <h1>Home</h1>
        </section>
    )
}

export default Home;

export async function homeLoader() {
    // const testFetchData = async () => {
    //     const response = await fetch("http://localhost:3000/api/family");
    //     const families = await response.json();
    //     return families
    // }
    async function fetchDataFamilyApi() {
        try {
            const result = await FamilyApi.getAll();
            console.log(result)
            const families = await result.json()
            console.log(families)
            return families
        } catch (error) {
            console.log(error)
        }
    }
    // store.dispatch({type:"SET_FAMILIES", payload:families})
    return fetchDataFamilyApi;
  }