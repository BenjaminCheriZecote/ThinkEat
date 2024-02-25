import './Proposition.css'

import { FaCheck } from 'react-icons/fa6'
import { MdCancel } from 'react-icons/md'
import { IoCartOutline } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import FavoriteStar from '../../../Layout/UXElements/icons/FavoriteStar'
import FavoriteStarOutline from '../../../Layout/UXElements/icons/FavoriteStarOutline'
import { useSelector } from 'react-redux';
import Proposition from '../../../Layout/UXElements/components/Proposition';


const Propositions = ({proposition}) => {
    const {favorites} = useSelector((state) => state.favorites);
    console.log("log", favorites);
    console.log(proposition)

    return(
        <>
            <ul className="ulContainer">
                {proposition.historic.array.map((proposition, index) => {
                    return(
                            // <li key={index} className={proposition.validate? "liProposotion validate":"liProposotion unvalidate"}>
                            //     <div className="liProposotion__imgContainer">
                            //         <img src={proposition.image === null?"/default-img.jpg":proposition.image} alt="" />
                            //     </div>
                            //     <p className="liProposotion__p--name">{proposition.name}</p>
                            //     <div>
                            //         <NavLink to={`/recipes/${proposition.id}`}>Voir la recette</NavLink>
                            //         {favorites.find((recipe) => recipe.id === proposition.id)?
                            //             <FavoriteStar />
                            //             :
                            //             <FavoriteStarOutline />
                            //             }
                            //     </div>

                            //     <div className="liProposotion__choiceBox">
                                    
                            //         <IoCartOutline />
                            //     </div>
                            // </li>
                            <Proposition key={index} historic={true} proposition={proposition}/>
                    )
                })}
            </ul>
        </>
    )
}
               

export default Propositions;