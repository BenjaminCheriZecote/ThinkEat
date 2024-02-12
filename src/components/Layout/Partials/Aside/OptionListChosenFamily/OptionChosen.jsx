import { MdCancel } from "react-icons/md";

const OptionChosen = ({family, setFamiliesChoices}) => {

    const handleClickOption = (event) => {
        console.log(event.target)
        setFamiliesChoices((current) => {
            const array = current;
            const newArray = current.filter((element) => element !== family)
            return newArray
        })
    }

    return(
        <li className="optionChosen">
            <p>{family} </p><MdCancel size={10} onClick={handleClickOption}/>
        </li>
    )


}

export default OptionChosen;