import style from './index.module.css'

const ToggleDarkMode = ({handleClick, mode}) => {

    return(
        <>
            <label className={style.switch} htmlFor="darkMode" >
                <input type="checkbox" id="darkMode" onChange={handleClick} checked={mode}/>
                <span className={style.slider}></span>
            </label>
        </>
    )
}

export default ToggleDarkMode;