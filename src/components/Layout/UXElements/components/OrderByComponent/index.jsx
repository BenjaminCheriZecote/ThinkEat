import { useRef, useState } from "react";
import { useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaArrowsRotate } from "react-icons/fa6";
import { Form } from "react-router-dom";
import './OrderBy.css';
import { mappingUrlFunction } from "../../../../../helpers/httpQueries";
import { RecipeApi } from "../../../../../api";
import { useNavigate } from 'react-router-dom';



const OrderByComponent = () => {

    //
    const [orderBy, setOrderBy] = useState([])
    const [ascName, setAscName] = useState(true)
    const [ascTime, setAscTime] = useState(true)
    const [ascHunger, setAscHunger] = useState(true)
    const [isVisible, setIsVisible] = useState(false)
    const fieldsetOrderByUl = useRef()
    const navigate = useNavigate();

    const [objectsOrder, setObjectsOrder] = useState({
        name: { position: 1, title: "name", label: "Nom", ascState: ascName },
        time: { position: 2, title: "time", label: "Temps", ascState: ascTime },
        hunger: { position: 3, title: "hunger", label: "Faim", ascState: ascHunger }
      });

    //
    useEffect(() => {
        console.log("following order by :", orderBy)
    }, [orderBy])
    //
    useEffect(() => {
        setObjectsOrder(prevState => ({
            ...prevState,
            name: { ...prevState.name, ascState: ascName },
            time: { ...prevState.time, ascState: ascTime },
            hunger: { ...prevState.hunger, ascState: ascHunger }
          }));
    }, [ascName, ascTime, ascHunger])

    //
    const handleClickOrderBy = () => {
        setIsVisible(!isVisible)
        const widthFieldsetOrderBy = fieldsetOrderByUl.current.offsetWidth;
        if (!isVisible) {
            fieldsetOrderByUl.current.style.transform = `translateX(-${widthFieldsetOrderBy+34}px`;
        } else {
            fieldsetOrderByUl.current.style.transform = `translateX(+${widthFieldsetOrderBy}px`;
        }
    }

    //
    const handleClickOrderByChoice = (event) => {
        const liParentElement = event.target.closest("li");
        liParentElement.classList.toggle("selectedOrderBy")
        const containerOptionOrderBy = liParentElement.querySelector("div");

        const foundOption = orderBy.find((option) => option.label === containerOptionOrderBy.className);
        
        if (!foundOption) {
            if (containerOptionOrderBy.className === objectsOrder.name.label) setOrderBy((currentArray) => [...currentArray, objectsOrder.name])
            if (containerOptionOrderBy.className === objectsOrder.time.label) setOrderBy((currentArray) => [...currentArray, objectsOrder.time])
            if (containerOptionOrderBy.className === objectsOrder.hunger.label) setOrderBy((currentArray) => [...currentArray, objectsOrder.hunger])  
        } else {
            if (containerOptionOrderBy.className === objectsOrder.name.label) {
                const updatedArray = [...orderBy];
                const filteredArray = updatedArray.filter((element) => element.label !== objectsOrder.name.label)
                setOrderBy(filteredArray)
            }

            if (containerOptionOrderBy.className === objectsOrder.time.label) {
                const updatedArray = [...orderBy];
                const filteredArray = updatedArray.filter((element) => element.label !== objectsOrder.time.label)
                setOrderBy(filteredArray)
            }
            if (containerOptionOrderBy.className === objectsOrder.hunger.label) {
                const updatedArray = [...orderBy];
                const filteredArray = updatedArray.filter((element) => element.label !== objectsOrder.hunger.label)
                setOrderBy(filteredArray)
            }
        }
    }

    //
    const setAscFunction = (event) => {
        const liParentElement = event.target.closest("li");
        const containerOptionOrderBy = liParentElement.querySelector("div");
        const foundOption = orderBy.find((option) => option.label === containerOptionOrderBy.className);


        if (foundOption) {

            if (foundOption.label === objectsOrder.name.label) {
                // setAscName(prevState => !prevState)
                console.log("test name", ascName)
                const foundIndex = orderBy.findIndex((option) => (option.label === foundOption.label))
                const updatedArray = [...orderBy];
                updatedArray[foundIndex] = {...updatedArray[foundIndex], ascState:ascName}
                console.log("updated array !!", updatedArray[foundIndex])
                setOrderBy(updatedArray)
            }

            if (foundOption.label === objectsOrder.time.label) {
                // setAscTime(prevState => !prevState)
                const foundIndex = orderBy.findIndex((option) => (option.label === foundOption.label))
                console.log("test name", ascTime)
                const updatedArray = [...orderBy];
                updatedArray[foundIndex] = {...updatedArray[foundIndex], ascState:ascTime}
                console.log("updated array !!", updatedArray[foundIndex])
                setOrderBy(updatedArray)
            }

            if (foundOption.label === objectsOrder.hunger.label) {
                // setAscHunger(prevState => !prevState)
                console.log("test name", ascHunger)
                const foundIndex = orderBy.findIndex((option) => (option.label === foundOption.label))
                const updatedArray = [...orderBy];
                updatedArray[foundIndex] = {...updatedArray[foundIndex], ascState:ascHunger}
                setOrderBy(updatedArray)
            }
        }
        
    }

    const handleSubmitOrderBy = async (event) => {
        // event.preventDefault()
        // const formData = new FormData(event.target);
        // const dataForm = Object.fromEntries(formData);
        // const urlOrderBy = `${dataForm}`;
        // console.log("log UrlOrderBy", urlOrderBy)
        // history.push(urlOrderBy);
        // console.log("log form data OrderBy :");
        // const urlClient = window.location.href;
        // const url = urlClient + urlOrderBy;
        // const query = mappingUrlFunction(url);
        
        // const recipesQuerry = await RecipeApi.getAll(query);
        // // store.dispatch({type:types.SET_RECIPES_QUERRY, payload: recipesQuerry})
        // navigate(url);
    }

    return(
        

                <Form>
                    <fieldset className="fieldsetOrderBy">

                        <ul>
                            {orderBy.map((option, index) => {
                                return(
                                    <input key={index} name={`orderBy${option.title}`} value={option.ascState?"ASC":"DESC"} type="hidden"/>
                                )
                            })}

                        </ul>

                        <legend>
                            <button className="buttonOrderBy" type="button">
                               
                                <label className="hamburger">
                                    <input type="checkbox"/>
                                    <svg viewBox="0 0 32 32" onClick={handleClickOrderBy}>
                                        <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                                        <path className="line" d="M7 16 27 16"></path>
                                    </svg>
                                    </label>
                            </button>
                        </legend>
                        
                            <ul ref={fieldsetOrderByUl} className='fieldsetOrderBy__ulContainer'>
                                <li className={objectsOrder.name.label}>
                                    <RxHamburgerMenu className="sizeIconsOrderBy"/>
                                    <div className={objectsOrder.name.label} onClick={handleClickOrderByChoice}>
                                        <p className="tag">{objectsOrder.name.label}</p> <p className="ascOrderBy">{ascName?"Croissant":"Décroissant"}</p>
                                    </div>
                                    <FaArrowsRotate className="sizeIconsOrderBy" onClick={() => {
                                        setAscName(prevState => !prevState);
                                        setAscFunction(event);
                                        }}/>
                                </li>

                                <li className={objectsOrder.time.label}>
                                    <RxHamburgerMenu className="sizeIconsOrderBy"/>
                                    <div className={objectsOrder.time.label} onClick={handleClickOrderByChoice}>
                                        <p className="tag">{objectsOrder.time.label}</p> <p className="ascOrderBy"> {ascTime?"Croissant":"Décroissant"}</p>
                                    </div> 
                                    <FaArrowsRotate className="sizeIconsOrderBy" onClick={() => {
                                        setAscTime(prevState => !prevState);
                                        setAscFunction(event);
                                    }}/>
                                       
                                        
                                </li>

                                <li className={objectsOrder.hunger.label}>
                                    <RxHamburgerMenu className="sizeIconsOrderBy"/>
                                    <div className={objectsOrder.hunger.label} onClick={handleClickOrderByChoice}>
                                        <p className="tag">{objectsOrder.hunger.label}</p> <p className="ascOrderBy"> {ascHunger?"Croissant":"Décroissant"}</p>
                                    </div>
                                    <FaArrowsRotate className="sizeIconsOrderBy" onClick={() => {
                                        setAscHunger(prevState => !prevState);
                                        setAscFunction(event);
                                        }}/>
                                    </li>
                                <button type="submit" onSubmit={handleSubmitOrderBy}>Trier</button>
                            </ul>           
                    </fieldset>    
                </Form>  
    )
}

export default OrderByComponent;