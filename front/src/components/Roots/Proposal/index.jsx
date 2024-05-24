
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Proposition from "../../Layout/UXElements/components/Proposition";
import { v4 as uuidv4 } from 'uuid';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import './Proposal.css';
import { NavLink } from "react-router-dom";
import types from "../../../store/reducers/types";
import { Form } from "react-router-dom";
import { HistoryApi } from "../../../api";


const Proposal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const {isConnected, id} = useSelector((state) => state.session);
    const {recipes} = useSelector((state) => state.proposal);
    const {numberOfProposition, generatedProposal, proposal, historicalPropositions} = useSelector((state) => state.proposal);

    const findProposal = historicalPropositions.find((e) => e.historic.id === proposal.id);
    const logoElement = document.querySelector("#imgLogo");
    const animationChef = "zoomInLeft"

    useEffect(() => {
        dispatch({type:types.SET_IS_ASIDE_TRUE});
    }, [])

    useEffect(() => {
        if (generatedProposal === false && generatedProposal !== null) {
            setProposition();
            dispatch({type:types.CLOSE_PROPOSAL})
        }

    }, [generatedProposal])

    const handleClickMinus = () => {
        if (numberOfProposition !== 0) dispatch({type:types.SUBTRACT_NUMBER_OF_PROPOSITION});
    }
    
    const handleClickPlus = () => {
        dispatch({type:types.ADD_NUMBER_OF_PROPOSITION});
    }

    const handleChange = () => {
        //
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch({type:types.GENERATE_PROPOSAL});
        new Promise((resolve, reject) => {
            logoElement.classList.add("animate__animated", `animate__${animationChef}`);
        
            // When the animation ends, we clean the classes and resolve the Promise
            function handleAnimationEnd(event) {
              event.stopPropagation();
              logoElement.classList.remove("animate__animated", `animate__${animationChef}`);
              resolve('Animation ended');
            }
        
            logoElement.addEventListener('animationend', handleAnimationEnd, {once: true});
          });
    }

    const setProposition = async () => {
        const proposalsWithValidate = recipes.map(recipe => {
            return { ...recipe, validate: true }; // Crée un nouvel objet avec la propriété validate ajoutée
        });

        const limitedProposal = proposalsWithValidate.slice(0, numberOfProposition)
        
        const objectProposal = {
            id: uuidv4(),
            array: limitedProposal
        }
        dispatch({ type: types.SET_PROPOSAL, payload: objectProposal });
    }

    const handleClickValidateChoices = async () => {

        if (proposal.array.length > 0) {
            if (!findProposal) {
                const createdHistory = await HistoryApi.create({userId:id});
                await Promise.all(proposal.array.map(async (recipe) => await HistoryApi.addRecipeToHistory(createdHistory.id, recipe.id, {validate:recipe.validate}) ));
                
                dispatch({type:types.SET_HISTORIC_PROPOSAL, payload:[... historicalPropositions, {date:new Date().toLocaleString(), historic:proposal}]});
                
            } else {
                navigate('/history')
            }
        }
    }
  

    return(
        <main className="outlet" style={{ gridColumn: '2 / -1' }}>
            <div id="imgLogoContainer">
                <svg version="1.0" id="imgLogo" xmlns="http://www.w3.org/2000/svg"  width="10rem" height="100%" viewBox="0 0 900.000000 900.000000"  preserveAspectRatio="xMidYMid meet" >
                    <g transform="translate(0.000000,900.000000) scale(0.100000,-0.100000)" fill="var(--colorLogo)" stroke="none"> 
                        <path d="M6415 7794 c-96 -14 -232 -83 -305 -155 -58 -56 -106 -141 -121 -209 -34 -162 -35 -211 -4 -313 16 -54 60 -144 81 -168 20 -23 17 -46 -15 -114 -30 -63 -50 -125 -76 -240 -39 -169 -105 -239 -320 -346 -83 -41 -154 -83 -166 -98 -27 -33 -19 -73 21 -114 36 -37 40 -74 8 -79 -25 -3 -24 -3 -12 -101 5 -42 2 -53 -22 -90 -72 -106 -114 -198 -114 -248 0 -56 36 -101 110 -136 51 -25 131 -53 151 -53 47 0 118 -55 119 -92 0 -51 -107 -208 -142 -208 -12 0 -44 6 -72 14 -74 21 -186 36 -266 36 -90 0 -270 -46 -270 -69 0 -5 -8 -12 -18 -15 -25 -8 -210 -197 -342 -351 -62 -71 -128 -148 -148 -170 -19 -22 -75 -94 -125 -160 -50 -66 -96 -124 -103 -130 -6 -5 -24 -29 -38 -52 -14 -23 -50 -68 -80 -100 -53 -56 -56 -58 -104 -57 -43 0 -57 6 -97 39 -48 38 -128 133 -146 170 -5 11 -18 34 -29 50 -40 62 -181 356 -241 502 -35 85 -47 95 -84 69 -50 -34 -136 -76 -145 -71 -6 3 -10 43 -10 88 0 82 13 131 56 217 19 37 129 151 204 211 41 33 44 37 30 54 -8 10 -20 30 -27 44 l-11 26 -1 -34 c-1 -36 -8 -43 -121 -133 -149 -119 -229 -284 -218 -453 5 -74 4 -76 -23 -95 -15 -11 -31 -20 -36 -20 -4 0 -37 -14 -73 -32 -36 -17 -81 -38 -100 -46 -19 -8 -48 -21 -65 -28 -16 -7 -66 -24 -110 -39 -120 -39 -116 -29 -58 -142 28 -54 60 -114 72 -133 11 -19 24 -42 27 -50 4 -8 37 -64 73 -123 36 -60 71 -116 76 -125 27 -45 136 -203 145 -212 3 -3 34 -43 70 -90 35 -47 69 -89 75 -95 6 -5 28 -32 50 -60 45 -58 289 -308 323 -331 13 -9 26 -13 29 -10 6 5 -64 93 -115 146 -14 14 -50 57 -80 95 -31 39 -59 72 -62 75 -17 14 -275 367 -305 418 -6 9 -28 44 -50 77 -34 51 -65 109 -65 120 0 2 21 14 48 27 57 27 247 140 282 167 32 25 20 38 -17 18 -26 -14 -70 -35 -193 -89 -25 -10 -58 -25 -75 -33 -51 -23 -75 -27 -91 -14 -23 19 -137 258 -130 275 3 8 11 16 18 18 37 10 150 48 198 66 30 12 66 25 80 29 24 8 93 38 180 79 19 9 43 23 52 31 28 22 42 8 86 -81 23 -45 58 -110 77 -143 19 -33 39 -69 44 -80 5 -11 21 -37 35 -58 14 -21 26 -40 26 -42 0 -7 92 -139 128 -184 158 -195 266 -227 400 -118 74 60 207 202 292 312 30 39 60 76 67 83 7 7 34 41 60 75 26 34 50 64 53 67 4 3 24 28 46 55 87 111 173 198 274 274 89 67 131 88 186 97 95 14 113 -46 42 -139 -92 -120 -173 -223 -186 -236 -7 -8 -21 -26 -30 -40 -9 -14 -36 -52 -59 -83 -24 -31 -43 -59 -43 -62 0 -2 -20 -34 -45 -70 -25 -37 -45 -68 -45 -71 0 -2 -12 -21 -26 -42 -14 -21 -30 -47 -35 -58 -5 -11 -18 -33 -29 -50 -31 -48 -43 -71 -131 -245 -84 -166 -108 -218 -169 -365 -18 -44 -38 -93 -45 -110 -23 -52 -53 -137 -86 -245 -12 -36 -27 -80 -35 -98 -8 -18 -14 -42 -14 -53 0 -11 -5 -30 -12 -42 -6 -12 -15 -38 -19 -57 -8 -36 -21 -87 -44 -175 -40 -149 -89 -421 -119 -655 -37 -290 -55 -682 -30 -657 3 2 9 53 14 113 5 60 14 141 20 179 6 39 18 115 26 170 20 134 60 337 91 460 8 33 21 85 28 115 23 93 47 183 60 225 7 22 21 67 30 100 10 33 22 71 28 85 5 14 13 39 17 55 10 35 28 87 47 132 7 17 13 36 13 42 0 6 7 27 16 48 28 64 41 96 59 143 10 25 23 59 31 75 95 217 152 337 208 440 83 153 92 169 161 283 28 46 55 91 60 100 6 9 28 44 51 77 22 33 56 83 74 110 19 28 36 52 39 55 4 3 17 21 30 40 24 34 170 220 182 230 3 3 20 26 37 51 88 130 236 219 360 218 80 0 141 -23 188 -69 30 -28 34 -39 34 -82 0 -55 -33 -124 -105 -218 -41 -54 -147 -223 -166 -265 -5 -11 -25 -47 -44 -80 -76 -132 -211 -415 -295 -615 -28 -69 -56 -133 -61 -142 -8 -16 -27 -65 -49 -128 -5 -14 -18 -50 -30 -80 -12 -30 -25 -68 -30 -85 -8 -28 -16 -53 -45 -135 -12 -32 -27 -83 -61 -200 -12 -42 -25 -92 -58 -227 -8 -32 -21 -92 -30 -133 -8 -41 -22 -107 -31 -146 -8 -40 -15 -84 -15 -99 0 -15 -6 -66 -14 -114 -19 -108 -37 -358 -35 -476 1 -82 2 -86 10 -45 5 25 16 73 24 107 8 34 15 76 15 95 0 18 7 71 16 118 8 47 22 121 30 165 8 44 20 100 26 125 6 25 14 65 18 90 9 55 27 129 46 190 8 25 14 53 14 64 0 10 7 41 16 70 9 28 22 71 29 96 30 106 72 239 126 400 25 74 63 175 85 225 7 17 22 55 34 85 40 101 155 339 220 455 144 259 306 482 502 690 111 118 312 186 503 170 123 -10 363 21 465 61 19 7 44 14 54 16 11 2 21 9 24 16 5 17 -42 16 -125 -4 -106 -26 -441 -25 -548 0 -84 20 -242 71 -335 106 -30 12 -64 24 -75 27 -11 2 -29 9 -40 14 -30 13 -107 40 -132 46 -24 6 -33 46 -13 58 6 3 26 40 45 81 26 55 35 88 35 126 0 45 -4 54 -34 83 -22 21 -61 40 -108 55 -215 68 -227 73 -258 113 -11 14 -20 40 -20 61 0 38 52 154 98 221 24 35 33 40 72 43 49 4 153 -20 220 -51 119 -54 189 -114 386 -332 62 -68 98 -98 148 -125 63 -33 73 -35 161 -35 l93 0 48 41 c53 44 92 127 93 194 1 43 -13 70 -23 45 -3 -9 -6 -27 -6 -41 0 -13 -9 -41 -20 -62 -71 -136 -244 -151 -382 -33 -27 24 -95 104 -152 179 -57 76 -123 158 -147 183 -104 108 -242 183 -358 195 -92 9 -112 24 -118 90 -5 43 -2 54 22 82 25 30 135 89 265 142 134 55 174 110 214 295 10 44 24 103 32 131 8 28 14 58 14 67 0 15 8 35 52 134 23 51 85 115 153 158 57 36 195 95 222 95 11 0 28 7 39 15 17 13 14 14 -36 15 -84 0 -184 -38 -292 -111 -32 -22 -60 -39 -63 -39 -7 0 -37 61 -57 115 -23 66 -24 184 -1 250 67 195 252 325 464 325 223 0 430 -136 484 -318 6 -20 11 -23 33 -17 15 4 34 12 42 19 18 14 73 37 150 63 43 14 88 18 205 18 150 0 191 -7 255 -46 8 -5 24 -13 35 -18 37 -17 114 -106 143 -166 70 -143 63 -309 -21 -535 -7 -19 -18 -45 -25 -57 -10 -18 -9 -24 4 -37 8 -9 24 -16 33 -16 10 0 24 -7 31 -15 7 -8 18 -15 24 -15 16 0 109 -97 138 -145 32 -52 58 -148 58 -212 0 -209 -237 -423 -470 -423 -156 0 -310 97 -495 310 -30 35 -175 247 -175 255 0 3 -21 35 -46 73 -49 70 -208 232 -229 232 -7 0 -18 7 -25 15 -7 8 -19 15 -27 15 -8 0 -21 7 -29 15 -9 8 -20 15 -25 15 -15 0 -10 -20 6 -27 17 -6 50 -33 133 -108 44 -40 126 -147 152 -200 3 -5 17 -28 32 -51 14 -23 35 -56 45 -75 105 -192 243 -366 353 -446 115 -84 214 -115 367 -115 123 0 137 4 262 64 64 32 170 125 207 183 33 52 43 70 49 85 4 8 14 33 23 55 13 29 17 70 17 160 0 126 -3 138 -59 254 -28 59 -128 166 -194 208 -30 19 -52 40 -49 46 23 63 44 168 54 270 8 95 -24 253 -68 327 -5 8 -13 24 -18 35 -16 36 -118 124 -172 149 -238 108 -463 116 -662 22 -29 -14 -58 -26 -63 -26 -6 0 -26 20 -47 44 -64 77 -155 138 -267 181 -45 17 -273 30 -345 19z"/> 
                        <path d="M2774 7317 c-51 -20 -140 -93 -188 -156 -25 -33 -46 -64 -46 -69 0 -5 -7 -15 -15 -22 -29 -24 0 -30 81 -19 106 15 323 16 349 2 25 -14 51 -60 41 -70 -4 -5 -85 -8 -179 -8 -271 -1 -495 -42 -702 -129 -36 -16 -180 -87 -203 -101 -226 -138 -404 -312 -561 -549 -71 -109 -68 -104 -129 -220 -44 -82 -50 -106 -29 -106 2297 -1 3371 1 3375 4 3 3 -14 30 -38 61 l-42 55 -1249 0 c-786 0 -1250 4 -1254 10 -3 5 -2 17 4 27 5 10 26 52 46 93 55 109 130 212 226 310 88 89 266 207 389 258 23 9 24 10 6 18 -12 5 -30 1 -48 -9 -17 -9 -42 -17 -58 -17 -15 0 -33 -7 -40 -15 -7 -8 -20 -15 -29 -15 -15 0 -81 -32 -171 -81 -14 -8 -41 -26 -61 -41 -20 -16 -41 -28 -47 -28 -6 0 -15 -6 -19 -12 -4 -7 -28 -29 -53 -49 -93 -75 -279 -288 -314 -359 -43 -91 -42 -90 -197 -90 -76 0 -140 4 -144 9 -21 34 159 302 291 435 219 219 471 344 829 412 170 32 495 17 673 -32 126 -34 169 -47 207 -61 145 -55 152 -58 260 -111 72 -35 157 -80 203 -107 39 -23 201 -132 250 -169 29 -21 55 -36 58 -33 8 8 -131 141 -215 205 -112 86 -174 131 -196 142 -11 6 -33 19 -50 30 -16 11 -37 23 -45 27 -8 4 -35 18 -60 33 -39 22 -116 57 -235 105 -38 15 -122 40 -208 61 -57 14 -70 22 -88 50 -23 38 -17 58 17 51 47 -9 50 8 8 70 -54 80 -142 165 -200 194 -56 27 -151 34 -200 16z"/> 
                        <path d="M6605 7199 c-5 -7 5 -8 32 -3 51 9 54 14 10 14 -20 0 -39 -5 -42 -11z"/> 
                        <path d="M685 5749 c-11 -18 -5 -21 130 -66 112 -38 256 -71 415 -95 64 -9 356 -13 1163 -16 702 -2 1077 -6 1077 -13 0 -5 -12 -14 -27 -20 -16 -6 -68 -41 -118 -78 -149 -111 -188 -132 -264 -138 -89 -7 -219 21 -253 55 -14 14 -48 16 -48 4 0 -13 78 -66 130 -90 25 -11 72 -23 105 -27 138 -15 263 33 461 176 95 70 156 68 230 -6 24 -25 50 -45 58 -45 7 0 22 10 34 23 l22 23 -40 42 c-23 23 -52 49 -66 59 -14 9 -21 19 -17 24 4 4 179 9 388 12 221 3 409 10 450 16 153 26 278 55 360 83 17 5 44 14 60 18 41 12 119 41 125 46 2 3 -2 9 -10 14 -22 14 -4357 13 -4365 -1z"/> 
                        <path d="M1874 5433 c-21 -51 -30 -148 -15 -158 7 -4 53 13 104 38 138 67 259 82 381 46 49 -14 32 -29 -34 -29 -44 0 -163 -32 -184 -49 -6 -5 -28 -14 -49 -21 -34 -11 -40 -10 -51 6 -13 17 -14 16 -21 -5 -11 -35 15 -141 34 -141 4 0 17 10 31 23 54 48 115 82 194 108 71 23 83 23 166 1 77 -20 141 -56 194 -109 37 -37 116 -151 129 -185 3 -10 11 -18 17 -18 16 0 12 46 -5 60 -8 7 -15 18 -15 24 0 40 -116 211 -186 275 -55 50 -164 121 -187 121 -7 0 -30 7 -52 15 -78 28 -273 9 -354 -34 -11 -6 -29 -11 -40 -11 -18 0 -21 6 -21 40 0 50 -15 51 -36 3z"/> 
                        <path d="M2780 4908 c0 -7 4 -19 9 -27 11 -17 25 3 17 24 -7 18 -26 20 -26 3z"/> 
                        <path d="M5472 4621 c-77 -77 -117 -179 -76 -195 27 -10 66 16 116 79 108 133 74 230 -40 116z"/> 
                        <path d="M5047 4006 c-64 -65 -114 -198 -88 -230 18 -22 36 -20 63 7 60 58 101 146 96 208 -4 57 -26 62 -71 15z"/> 
                        <path d="M4688 3293 c-45 -51 -87 -201 -69 -245 11 -30 41 -37 63 -15 32 33 70 140 72 205 1 62 -34 91 -66 55z"/> 
                        <path d="M4457 2509 c-25 -15 -54 -89 -61 -160 -8 -79 3 -123 31 -127 28 -4 57 45 78 136 15 60 16 80 6 111 -12 42 -28 54 -54 40z"/> 
                        <path d="M4293 1648 c-33 -42 -43 -80 -43 -172 0 -87 2 -96 22 -110 21 -15 24 -14 44 12 22 27 29 53 40 147 9 84 -31 163 -63 123z"/> 
                    </g> 
                </svg> 
            </div>

            <section className="section">
                
                    <Form className="section__start" action="/proposal">
                        <div>
                            <FaMinus onClick={handleClickMinus} id="minus" style={{color:"var(--colorUi4)"}} size={20}/>
                            <input type="number" value={numberOfProposition} onChange={handleChange} id="starter" aria-label="Nombre de propositions."/>
                            <FaPlus onClick={handleClickPlus} id="plus" style={{color:"var(--colorUi4)"}} size={20}/>
                        </div>
  
                        <button onClick={handleSubmit} className="buttonStarter" id="starterButton">C'est parti !</button>
                    </Form>
            </section>

            <section className="section">
                    {proposal.array.length > 0?
                    <>
                        <ul className="section__ulContainerProposal">
                            {proposal.array.map((element, index) => {
                                return(
                                    <Proposition proposition={element} key={index}/>
                                )
                            })}
                        </ul>
                        {isConnected?
                            <div className="section__btnValidate">
                                <button className="btnValidate" role="button" onClick={handleClickValidateChoices}>{findProposal?"Voir l'historique":"Valider les choix"}</button>
                            </div>
                            :
                            <div className="section__btnValidate">
                                <p>Connecte toi <NavLink to={"/signin"}>ici</NavLink> pour valider tes choix</p>
                            </div>
                            }
                    
                    </>
                        :
                        <p className="section__pNoResults">Aucuns résultats. Précise tes critères</p>
                    }
            </section>
        </main>
    )
}

export default Proposal;

