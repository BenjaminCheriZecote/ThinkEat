import { useDispatch } from 'react-redux';
import style from '../../../Partials/Aside/Aside.module.css'

const AsideCheckbox = ({item, label, state, mode}) => {
    const dispatch = useDispatch();

    const handleChangeHungerFilter = () => {
        const filter = event.target.dataset.item.toUpperCase();
        dispatch({type:`SET_HUNGER_${filter}`});
    }

    return(
        <div className={style.asideFormFilter__hungerContainer}>
            <div className={style.boxContainer}>
                <input 
                data-item={item} 
                className={style.checkboxAside} 
                id={`hunger${item}Filter`} 
                name="hunger" value={label} 
                type="checkbox" onChange={handleChangeHungerFilter} 
                checked={state} 
                style={mode?{border:"1px #282a2c solid", cursor:"pointer"}:{border:"1px var(--colorGrey) solid", cursor:"pointer"}}
                />

                <label htmlFor={`hunger${item}Filter`} >{label}</label>
            </div>
        </div>
    )
}

export default AsideCheckbox;