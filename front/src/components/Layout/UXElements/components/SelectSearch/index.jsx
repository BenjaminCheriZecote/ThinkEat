import { useState } from 'react';
import style from '../../../Partials/Aside/Aside.module.css'
import { MdKeyboardArrowDown } from 'react-icons/md';
import Options from './Option/Option';
import OptionChosen from './OptionChosen/OptionChosen';

const SelectSearch = ({store, item, label, isRotated, setIsRotatedFamilyIngredient, setIsRotatedIngredient, activeSelectorFilter, setActiveSelectorFilter, itemChoices}) => {

    const [itemCopy, setItemCopy] = useState(store);

    const handleClickSelect = (selected) => {
        const current = selected;
        let other = "";
        if (current === "ingredients") other = "families";
        if (current === "families") other = "ingredients";

        // si le select choisi n'est pas ouvert
        if (activeSelectorFilter !== current) {
            // on l'ouvre
            setActiveSelectorFilter(current);
            // si l'autre select est déjà ouvert, on met la flèche vers le bas.
            if (activeSelectorFilter === other) {
                if (other === "families") setIsRotatedFamilyIngredient(false)
                if (other === "ingredients") setIsRotatedIngredient(false)
            }
        } else {
            // si le select choisi est déjà ouvert, on le ferme.
            setActiveSelectorFilter(null)
        }
        // on inverse la rotation la flèche du select choisi à chaque click.
        if (current === "ingredients") setIsRotatedIngredient(!isRotated);
        if (current === "families") setIsRotatedFamilyIngredient(!isRotated); 

    }

    const handleChangeSearch = (event) => {
        const filteredResearch = store.filter((element) => element.name.toLowerCase().startsWith(event.target.value.toLocaleLowerCase()));
        setItemCopy(filteredResearch)
    }

    return (
        
        <div className={style.selectBox}>
            {/* nom du select spécifié dans un button pour ouvrir et fermer le select*/}
            <div className={style.selectOption} onClick={() => handleClickSelect(item)}>
                <button type="button">{label}  </button><MdKeyboardArrowDown className={style.arrowSoValue} style={{transform: isRotated ? "rotate(180deg)" : "rotate(0)"}}/> 
            </div>
            
            {/* input de type hidden */}
            <input id={item} name={item} type="hidden"  defaultValue={itemChoices.map((element) => element[0]).join("-") } />
            

            {activeSelectorFilter === item &&

                // div content apparaissant a l'ouverture du select 
                <div className={style.content}>

                    {/* input search */}
                    <div className={style.search}>
                        <input type="search" id={`optionSearch${label}`} placeholder="Rechercher" name="" onChange={() => handleChangeSearch(event)}/>
                    </div>

                    {/* ul affichant les listes des options et des options sélectionnés */}
                    <ul className={style.options} >
                        {itemChoices.map((element, index) => {
                            // composant OptionChosen
                            return (<OptionChosen key={index} choosen={element} itemName={item} />)
                        })}
                        {(itemCopy.length > 0 ? itemCopy : store).map((element, index) => (
                            // composant Options
                            <Options key={index} itemName={item} itemOption={element} itemChoices={itemChoices} >{element.name}</Options>
                        ))}
                    </ul>
                </div>
            }
        </div>
    )
}

export default SelectSearch;