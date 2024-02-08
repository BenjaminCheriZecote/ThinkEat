import store from '../../../../store'
import { useSelector } from 'react-redux';

import { NavLink } from "react-router-dom";
import './Aside.scss'

const Aside = () => {

    const {hungerBig} = useSelector((state) => state.criterias.criterias[1]);
    const {hungerFew} = useSelector((state) => state.criterias.criterias[2]);
    const {preparating_timeLong} = useSelector((state) => state.criterias.criterias[3]);
    const {preparating_timeShort} = useSelector((state) => state.criterias.criterias[4]);

    const handleChangeHungerBigFilter = () => {
        store.dispatch({type:"SET_HUNGER_BIG"});
    }

    const handleChangeHungerFewFilter = () => {
        store.dispatch({type:"SET_HUNGER_FEW"});
    }

    const handleChangePreparatingTimeLongFilter = () => {
        store.dispatch({type:"SET_PREPARATING_TIME_LONG"})
    }

    const handleChangePreparatingTimeShortFilter = () => {
        store.dispatch({type:"SET_PREPARATING_TIME_SHORT"})
    }

    return(
        <aside className="aside">
            
                <div className="aside__top">
                    <div className="aside-top__criterias" >
                                <input id="hungryFilter" type="checkbox" onChange={handleChangeHungerBigFilter} checked={hungerBig?true:false}/>
                                <label htmlFor="hungryFilter" >Copieux</label>
                            </div>

                            <div>
                                <input id="hungryFilter" type="checkbox" onChange={handleChangeHungerFewFilter} checked={hungerFew?true:false}/>
                                <label htmlFor="hungryFilter" >Petite faim</label>
                            </div>

                            <div>
                                <input id="cookingTimeFilter" type="checkbox" onChange={handleChangePreparatingTimeLongFilter} checked={preparating_timeLong?true:false}/>
                                <label htmlFor="cookingTimeFilter" >Preparation longue</label>
                            </div>

                            <div>
                                <input id="cookingTimeFilter" type="checkbox" onChange={handleChangePreparatingTimeShortFilter} checked={preparating_timeShort?true:false}/>
                                <label htmlFor="cookingTimeFilter" >Preparation courte</label>
                            </div>

                    </div>



                <div>
                    

                </div>
                    
            
            <a className="aside__a" href="">Nouvelle proposition</a>
        </aside>
    )
};

export default Aside;