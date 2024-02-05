import { FaPlus } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import store from "../../../../store";
import { useSelector } from "react-redux";

const Meal = ({meal}) => {

    const {favorites} = useSelector((state) => state.favorites);

    const handleClickDelete = () => {
        const newFavorites = favorites.filter((element) => element !== meal);
        store.dispatch({type:"DELETE_MEAL", payload:newFavorites })
    }

    return(
        <article  className="section__article"> {meal.name} <div><FaPlus/> <MdCancel onClick={handleClickDelete}/></div></article>
    )
}

export default Meal;