import 'animate.css';
import ValidateCheck2 from "../../icons/ValidateCheck2";
import DeleteCruse from "../../icons/DeleteCruse";
import { IoCartOutline } from "react-icons/io5";

import FavoriteStar from "../../icons/FavoriteStar";
import FavoriteStarOutline from "../../icons/FavoriteStarOutline";
import { NavLink, useLocation } from "react-router-dom";

import './Proposition.css'
import { useDispatch, useSelector } from "react-redux";
import types from "../../../../../store/reducers/types";


const Proposition = ({proposition, history}) => {

    const {isConnected} = useSelector((state) => state.session);
    const {proposal} = useSelector((state) => state.proposal)
    const {favorites} = useSelector((state) => state.favorites);
    const dispatch = useDispatch();
    const location = useLocation();


    const handleClickDeleteProposition = (event) => {
        
        const foundIndexRecipe = proposal.array.findIndex((recipe) => recipe.id === proposition.id);
        const copyProposal = {...proposal}
        const updatedProposalArray = [...proposal.array];
        updatedProposalArray[foundIndexRecipe] = {...updatedProposalArray[foundIndexRecipe], validate:false}
        copyProposal.array = updatedProposalArray
        dispatch({type:types.SET_PROPOSAL, payload:copyProposal}); 
        
    };

    const handleClickValidateProposition = () => {
        const foundIndexRecipe = proposal.array.findIndex((recipe) => recipe.id === proposition.id);
        const copyProposal = {...proposal}
        const updatedProposalArray = [...proposal.array];
        updatedProposalArray[foundIndexRecipe] = {...updatedProposalArray[foundIndexRecipe], validate:true}
        copyProposal.array = updatedProposalArray
        dispatch({type:types.SET_PROPOSAL, payload:copyProposal});
    }

    return(
        <li className={location.pathname === '/proposal'?
        proposition.validate? "animate__animated animate__bounce liProposotion validate":"animate__animated animate__headShake liProposotion unvalidate"
        :
        proposition.validate? "liProposotion validate":"liProposotion unvalidate"
        }>
            <div className={proposition.validate?"liProposotion__imgContainer validateImg":"liProposotion__imgContainer unvalidateImg"}>
                <img src={proposition.image === null?"/default-img.webp":`/img/${proposition.image}`} alt={`${proposition.name}`} className={!proposition.validate?"unvalidateGrayscale":""}/>
            </div>

            <div className={proposition.validate?"liProposotion__legendContainer":"liProposotion__legendContainer unvalidateGrayscale"}>
                <p className="liProposotion__p--name">
                    {proposition.name}
                </p>
                <div>
                    <NavLink to={`/recipes/${proposition.id}`}>Voir la recette</NavLink>
                    {isConnected?
                    favorites.find((recipe) => recipe.id === proposition.id)?
                        <FavoriteStar />
                        :
                        <FavoriteStarOutline />
                        :
                        ""
                        }
                </div>
            </div>

            {history?
                <div className="liProposotion__choiceBox">        
                    <IoCartOutline />
                </div>
            :
            <div className="liProposotion__choiceBox">
                    <ValidateCheck2 handleClick={handleClickValidateProposition} color={"var(--colorGreenCheck)"} size={0.9}/>
                    <DeleteCruse handleClick={handleClickDeleteProposition} size={1}/>
            </div>
            }

        </li>

    )
}

export default Proposition;