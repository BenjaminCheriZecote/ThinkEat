import './index.css'

const BurgerMenu = ({handleClick, color, label}) => {

    // background: var(--colorbg4);

    return(
        <>
            <label className="burgerHeader" htmlFor={label}>
                <input  onClick={handleClick} type="checkbox" id={label}/>
                <span style={color}></span>
                <span style={color}></span>
                <span style={color}></span>
            </label>  
        </>
    )
}

export default BurgerMenu