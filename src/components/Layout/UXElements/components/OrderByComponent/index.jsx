import { useRef, useState } from "react";
import { useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaArrowsRotate } from "react-icons/fa6";
import { MdSort } from "react-icons/md";
import { Form } from "react-router-dom";
import './OrderBy.css';



const OrderByComponent = () => {

    //
    const [orderBy, setOrderBy] = useState([])
    const [ascName, setAscName] = useState(true)
    const [ascTime, setAscTime] = useState(true)
    const [ascHunger, setAscHunger] = useState(true)
    const [isVisible, setIsVisible] = useState(false)
    const fieldsetOrderByUl = useRef()

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

                        <legend><button type="button" onClick={handleClickOrderBy}><MdSort /></button></legend>
                        
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
                                <button>Trier</button>
                            </ul>           
                    </fieldset>    
                </Form>  
    )
}

export default OrderByComponent;