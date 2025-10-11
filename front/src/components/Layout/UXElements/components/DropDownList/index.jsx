import { useState } from "react";

import { MdKeyboardArrowDown } from "react-icons/md";
import Tag from "../Tag";
import style from './dropDownList.module.css';

export default function DropDownList({itemName, items, choosenItems=[], isOpen, openHandler, closeHandler, toggleItemHandler}) {
  
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchValue, setsearchValue] = useState();

  function handleChangeSearch(event) {
    setsearchValue(event.target.value.toLocaleLowerCase())
    const newFilteredItems = items.filter((element) => element.name.toLowerCase().includes(event.target.value.toLocaleLowerCase()));
    setFilteredItems(newFilteredItems);
  }
  
  return (
    <div className={`${style.dropDownListContainer} ${isOpen ? style.dropDownListContainerOpen : style.dropDownListContainerClose}`}>
      <div className={style.dropDownListSearchContainer}>
        
        <input className={`${style.dropDownListSearch} ${isOpen ? style.dropDownListSearchOpen : style.dropDownListSearchClose}`} type="search" placeholder="Rechercher" value={searchValue} onChange={handleChangeSearch}/>
        
        {choosenItems &&
          <input type="hidden" name={itemName.toLocaleLowerCase()} defaultValue={choosenItems.map((element) => element.id).join("-") }/>
        }
        <button className={isOpen?"": style.bordered} type="button" onClick={closeHandler}>
          <MdKeyboardArrowDown className='arrowSoValue' onClick={openHandler}/>
        </button>

      </div>
      <div className={`${style.scrollContainer} ${isOpen ? style.scrollContainerOpen : style.scrollContainerClose}`}>
        {choosenItems.length > 0 &&
          <ul className={style.choosenItemsContainer}>
            {choosenItems.map(item =>(
              <Tag key={item.id} itemName={itemName} item={item} removeHandler={toggleItemHandler} style={style}/>
            ))}
          </ul>
        }
        <ul className={style.itemsListContainer}>
          {!!searchValue && filteredItems.length === 0 &&
            <li>Aucun élément trouvé.</li>
          }
          {!!searchValue && filteredItems.length !== 0 &&
            filteredItems.map(item =>(
              <li key={`${itemName} ${item.id}`} data-item-id={`${itemName}-${item.id}`} onClick={toggleItemHandler}>{item.name}</li>
            ))
          }
          {!searchValue &&
            items.map(item =>(
              <li key={`${itemName} ${item.id}`} data-item-id={`${itemName}-${item.id}`} onClick={toggleItemHandler}>{item.name}</li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}