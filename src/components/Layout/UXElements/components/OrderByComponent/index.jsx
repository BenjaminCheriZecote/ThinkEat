import { useRef, useState } from "react";
import { useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaArrowsRotate } from "react-icons/fa6";
import { Form } from "react-router-dom";
import './OrderBy.css';
import { mappingUrlFunction } from "../../../../../helpers/httpQueries";
import { RecipeApi } from "../../../../../api";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import sortArray from "sort-array";



const OrderByComponent = ({setCopy}) => {

    const recipes = useSelector((state) => state.recipes.recipes)

    //
    const [orderBy, setOrderBy] = useState([])
    const [ascName, setAscName] = useState(true)
    const [ascTime, setAscTime] = useState(true)
    const [ascHunger, setAscHunger] = useState(true)
    const [isVisible, setIsVisible] = useState(false)
    const fieldsetOrderByUl = useRef();
    const navigate = useNavigate();

    const [objectsOrder, setObjectsOrder] = useState({
        name: { position: 1, title: "name", label: "Nom", ascState: ascName },
        time: { position: 2, title: "time", label: "Temps", ascState: ascTime },
        hunger: { position: 3, title: "hunger", label: "Faim", ascState: ascHunger }
      });

    const [varOrderBy, setVarOrderBy] = useState([
        { position: 1, title: "name", label: "Nom", ascState: ascName },
        { position: 2, title: "time", label: "Temps", ascState: ascTime },
        { position: 3, title: "hunger", label: "Faim", ascState: ascHunger }
    ]);


    //
    // useEffect(() => {
    //     console.log("following order by :", orderBy)
    // }, [orderBy])
    //
    // useEffect(() => {
    //     setObjectsOrder(prevState => ({
    //         ...prevState,
    //         name: { ...prevState.name, ascState: ascName },
    //         time: { ...prevState.time, ascState: ascTime },
    //         hunger: { ...prevState.hunger, ascState: ascHunger }
    //       }));
    //       console.log(objectsOrder)
    // }, [ascName, ascTime, ascHunger])

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
        const dataset = liParentElement.dataset.label;
      
        liParentElement.classList.toggle("selectedOrderBy")

        const findObjectClicked = varOrderBy.find((object) => object.label === dataset);
        const foundCurrentOptionSelected = orderBy.find((option) => option.label === dataset);

        if (!foundCurrentOptionSelected) {
            setOrderBy((currentArray) => [...currentArray, findObjectClicked ]) 
        } else {
            const updatedArray = [...orderBy];
            const filteredArray = updatedArray.filter((element) => element.label !== findObjectClicked.label)
            setOrderBy(filteredArray);
        }
    }

    //
    const setAscFunction = (event) => {
        const liParentElement = event.target.closest("li");
        const dataset = liParentElement.dataset.label;
        const foundOption = varOrderBy.find((option) => option.label === dataset);
        if (foundOption) {
                const foundIndex = varOrderBy.findIndex((option) => (option.label === foundOption.label))
                const updatedpArrayVar = [...varOrderBy];
                updatedpArrayVar[foundIndex] = {...updatedpArrayVar[foundIndex], ascState:!updatedpArrayVar[foundIndex].ascState}
                setVarOrderBy(updatedpArrayVar);
        }
        
    }


    const handleClickSort = (event) => {
        event.preventDefault()
        const recipesToSort = recipes.slice();
        const orderByTest = [{title:"name", ascState:true}, {title:"hunger", ascState:true}]

        const recipesCopy = recipesToSort;

        const result = recipesCopy.sort((a, b) => {
            return a.time.localeCompare(b.time) || b.hunger - a.hunger;
        })

        // if (orderByTest.length > 0) {
        //     if (orderByTest[0])
        // }
       
    }

    



    const draggItem = useRef();
    const draggOverItem = useRef();

    const handleSort = () => {
        let orderByItems = [...varOrderBy];
        const draggedItemContent = orderByItems.splice(draggItem.current, 1)[0];
        orderByItems.splice(draggOverItem.current, 0, draggedItemContent);
        draggItem.current = null
        draggItem.current = null
        setVarOrderBy(orderByItems);
    }

    
    

    return(
                <form >
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
                                {varOrderBy.map((element, index) => {
                                    return(
                                            <li data-label={element.label} key={index} className={element.label} draggable 
                                            onDragStart={() => draggItem.current=index}
                                            onDragEnter={() => draggOverItem.current= index}
                                            onDragEnd={handleSort}
                                            onDragOver={(e) => e.preventDefault() }
                                            >
                                                <RxHamburgerMenu size={15}/>
                                                <div className={element.label} onClick={handleClickOrderByChoice}>
                                                    <p className="tag">{element.label}</p> <p className="ascOrderBy"> {element.ascState?"Croissant":"Décroissant"}</p>
                                                    <input type="hidden" name={element.title} value={element.ascState}/>
                                                </div>
                                                <FaArrowsRotate className="sizeIconsOrderBy" onClick={setAscFunction}
                                                />
                                        </li> 

                                    )
                                    
                                })}
                                <button type="button" className="btnValidate" onClick={handleClickSort}>Trier</button>
                            </ul> 

                                      
                    </fieldset>    
                </form>  
    )
}

export default OrderByComponent;