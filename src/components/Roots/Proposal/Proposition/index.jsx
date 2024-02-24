
import ValidateCheck from "../../../Layout/UXElements/icons/ValidateCheck";
import DeleteCruse from "../../../Layout/UXElements/icons/DeleteCruse";


import FavoriteStar from "../../../Layout/UXElements/icons/FavoriteStar";
import FavoriteStarOutline from "../../../Layout/UXElements/icons/FavoriteStarOutline";

import { NavLink } from "react-router-dom";

import './Proposition.css'
import { useSelector } from "react-redux";
import store from "../../../../store";
import types from "../../../../store/reducers/types";
import { useEffect } from "react";

const Proposition = ({proposition}) => {

    const {proposal} = useSelector((state) => state.proposal)
    const {favorites} = useSelector((state) => state.favorites)


    const handleClickDeleteProposition = (event) => {
        
        const foundIndexRecipe = proposal.array.findIndex((recipe) => recipe.id === proposition.id);
        const copyProposal = {...proposal}
        const updatedProposalArray = [...proposal.array];
        updatedProposalArray[foundIndexRecipe] = {...updatedProposalArray[foundIndexRecipe], validate:false}
        copyProposal.array = updatedProposalArray
        store.dispatch({type:types.SET_PROPOSAL, payload:copyProposal});
        event.target.closest("li").style.backgroundColor = "#fafafa";
        event.target.closest("li").style.filter = "grayscale(70%)"
    };

    const handleClickValidateProposition = () => {
        const foundIndexRecipe = proposal.array.findIndex((recipe) => recipe.id === proposition.id);
        const copyProposal = {...proposal}
        const updatedProposalArray = [...proposal.array];
        updatedProposalArray[foundIndexRecipe] = {...updatedProposalArray[foundIndexRecipe], validate:true}
        copyProposal.array = updatedProposalArray
        store.dispatch({type:types.SET_PROPOSAL, payload:copyProposal});
        event.target.closest("li").style.backgroundColor = "white",
        event.target.closest("li").style.filter= "grayscale(0%)"
    }

    return(
        <li className={proposition.validate? "liProposotion validate":"liProposotion unvalidate"}>
            <div className="liProposotion__imgContainer">
                <img src={proposition.image} alt="" />
            </div>
            <div className="liProposotion__legendContainer">
                <p className="liProposotion__p--name">
                    {proposition.name}
                </p>
                <div>
                    <NavLink to={`/recipes/${proposition.id}`}>Voir la recette</NavLink>
                    {favorites.find((recipe) => recipe.id === proposition.id)?
                        <FavoriteStar />
                        :
                        <FavoriteStarOutline />
                        }
                </div>
            </div>

            <div className="liProposotion__choiceBox">
                    <ValidateCheck onClick={handleClickValidateProposition} />
                    <DeleteCruse onClick={handleClickDeleteProposition} />
            </div>
        </li>

    )
}

export default Proposition;