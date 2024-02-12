const Options = ({family, setFamiliesChoices}) => {

    const handleClickOption = (event) => {
        setFamiliesChoices((current) => {
            return [...current, family.name]
        })
    }

    return(
        <li className="liOptions" onClick={(handleClickOption)}>{family.name}</li>
    )

}

export default Options;