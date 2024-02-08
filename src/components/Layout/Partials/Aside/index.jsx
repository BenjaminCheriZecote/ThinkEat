import store from '../../../../store'
import { useSelector } from 'react-redux';
// import IndicatorsUX from '../../UXElements/components/IndicatorsUX'

import './Aside.scss'

const Aside = () => {

    const {filters} = useSelector((state) => state.filters)
    const {criterias} = useSelector((state) => state.criterias)

    const {hungerBigCriteria} = useSelector((state) => state.criterias.criterias[1]);
    const {hungerFewCriteria} = useSelector((state) => state.criterias.criterias[2]);
    const {preparating_timeLongCriteria} = useSelector((state) => state.criterias.criterias[3]);
    const {preparating_timeShortCriteria} = useSelector((state) => state.criterias.criterias[4]);

    const handleChangeHungerBigCriteria = () => {
        store.dispatch({type:"SET_HUNGER_BIG_CRITERIA"});
    }

    const handleChangeHungerFewCriteria = () => {
        store.dispatch({type:"SET_HUNGER_FEW_CRITERIA"});
    }

    const handleChangePreparatingTimeLongCriteria = () => {
        store.dispatch({type:"SET_PREPARATING_TIME_LONG_CRITERIA"})
    }

    const handleChangePreparatingTimeShortCriteria = () => {
        store.dispatch({type:"SET_PREPARATING_TIME_SHORT_CRITERIA"})
    }

    return(
        <aside className="aside">
            
                <ul className="aside__top"> Critères
                    
                            <li>
                                <input id="hungryCriteria" type="checkbox" onChange={handleChangeHungerBigCriteria} checked={hungerBigCriteria?true:false}/>
                                <label htmlFor="hungryCriteria" >{criterias[1].name}</label>
                            </li>

                            <li>
                                <input id="hungryCriteria" type="checkbox" onChange={handleChangeHungerFewCriteria} checked={hungerFewCriteria?true:false}/>
                                <label htmlFor="hungryCriteria" >{criterias[2].name}</label>
                            </li>

                            <li>
                                <input id="cookingTimeCriteria" type="checkbox" onChange={handleChangePreparatingTimeLongCriteria} checked={preparating_timeLongCriteria?true:false}/>
                                <label htmlFor="cookingTimeCriteria" >{criterias[3].name}</label>
                            </li>

                            <li>
                                <input id="cookingTimeCriteria" type="checkbox" onChange={handleChangePreparatingTimeShortCriteria} checked={preparating_timeShortCriteria?true:false}/>
                                <label htmlFor="cookingTimeCriteria" >{criterias[4].name}</label>
                            </li>

                </ul>

                <div>
                    
                    <ul> Filters
                        <li >
                            {/* <input id="hungryFilter" type="checkbox" onChange={handleChangeHungerBigCriteria} checked={hungerBigCriteria?true:false}/> */}
                            <label htmlFor="hungryFilter" >{filters[0].name}</label>
                        </li>

                        <li>
                            {/* <input id="hungryFilter" type="checkbox" onChange={handleChangeHungerFewCriteria} checked={hungerFewCriteria?true:false}/> */}
                            <label htmlFor="hungryFilter" >{filters[1].name}</label>
                        </li>

                        <li>
                            {/* <input id="cookingTimeFilter" type="checkbox" onChange={handleChangePreparatingTimeLongCriteria} checked={preparating_timeLongCriteria?true:false}/> */}
                            <label htmlFor="cookingTimeFilter" >{filters[2].name}</label>
                        </li>

                        <li>
                            {/* <input id="cookingTimeFilter" type="checkbox" onChange={handleChangePreparatingTimeShortCriteria} checked={preparating_timeShortCriteria?true:false}/> */}
                            <label htmlFor="cookingTimeFilter" >{filters[3].name}</label>
                        </li>
                    </ul>

                </div>
                    
            
            <a className="aside__a" href="">Nouvelle proposition</a>
        </aside>
    )
};

export default Aside;