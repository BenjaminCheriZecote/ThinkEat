import { useState } from 'react';
import style from '../../../Partials/Aside/Aside.module.css'
import { MdKeyboardArrowDown } from 'react-icons/md';
import Options from './Option/Option';
import OptionChosen from './OptionChosen/OptionChosen';

const SelectSearch = ({store, item, label, isRotated, setIsRotatedFamilyIngredient, setIsRotatedIngredient, setIsRotatedDiet, activeSelectorFilter, setActiveSelectorFilter, itemChoices, mode}) => {

    const [itemCopy, setItemCopy] = useState(store);

    const handleClickSelect = (selected) => {
        const current = selected;
        let other = "";
        if (current === "ingredients") other = "families";
        if (current === "families") other = "ingredients";

        // si le select choisi n'est pas ouvert
        if (activeSelectorFilter !== current) {
            // si un des selects est déjà ouvert
            if (activeSelectorFilter !== null) {
                // on met la fleche du select déjà ouvert vers le bas.
                if (current === "ingredients") {
                    setIsRotatedFamilyIngredient(false);
                    setIsRotatedDiet(false)
                }
                if (current === "families") {
                    setIsRotatedIngredient(false)
                    setIsRotatedDiet(false)
                }
                if (current === "diets") {
                    setIsRotatedIngredient(false)
                    setIsRotatedFamilyIngredient(false);
                }
            }
            // on l'ouvre
            setActiveSelectorFilter(current);
        } else {
            // si le select choisi est déjà ouvert, on le ferme.
            setActiveSelectorFilter(null)
        }
        // on inverse la rotation la flèche du select choisi à chaque click.
        if (current === "ingredients") setIsRotatedIngredient(!isRotated);
        if (current === "families") setIsRotatedFamilyIngredient(!isRotated);
        if (current === "diets") setIsRotatedDiet(!isRotated);

    }

    const handleChangeSearch = (event) => {
        const filteredResearch = store.filter((element) => element.name.toLowerCase().startsWith(event.target.value.toLocaleLowerCase()));
        setItemCopy(filteredResearch)
    }

    return (
        <div className={style.selectBox}>
            {/* nom du select spécifié dans un button pour ouvrir et fermer le select*/}
            <div className={style.selectOption} onClick={() => handleClickSelect(item)} style={{color:"var(--colorUi3)"}}>
                <button type="button" style={{color:"var(--colorUi3)"}}>{label}  </button><MdKeyboardArrowDown className={style.arrowSoValue} style={{transform: isRotated ? "rotate(180deg)" : "rotate(0)"}}/> 
            </div>
            
            {/* input de type hidden */}
            <input id={item} name={item} type="hidden"  defaultValue={itemChoices.map((element) => element[0]).join("-") } />
            
            {/* // div content apparaissant a l'ouverture du select  */}
            <div className={`${style.content} ${activeSelectorFilter === item ? style.contentOpen : style.contentClose}`}>

                {/* input search */}
                <div className={style.search}>
                    <input type="search" id={`optionSearch${label}`} placeholder="Rechercher" name="" onChange={() => handleChangeSearch(event)}/>
                </div>

                {/* ul affichant les listes des options et des options sélectionnés */}
                <ul className={`${style.options} ${activeSelectorFilter === item ? style.optionsOpen : style.optionsClose}`} >
                    {itemChoices.map((element, index) => {
                        // composant OptionChosen
                        return (<OptionChosen key={index} choosen={element} itemName={item} />)
                    })}
                    {(itemCopy.length > 0 ? itemCopy : store).map((element, index) => (
                        // composant Options
                        <Options key={index} itemName={item} itemOption={element} itemChoices={itemChoices} mode={mode}>{element.name}</Options>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SelectSearch;