import { useState } from "react";

import { MdKeyboardArrowDown } from "react-icons/md";
import Tag from "./Tag";

export default function DropDownList({itemName, items, choosenItems, isOpen, openHandler, closeHandler, toggleItemHandler}) {
  // itemsName = Ingredients
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchValue, setsearchValue] = useState();

  function handleChangeSearch(event) {
    setsearchValue(event.target.value.toLocaleLowerCase())
    const newFilteredItems = items.filter((element) => element.name.toLowerCase().includes(event.target.value.toLocaleLowerCase()));
    setFilteredItems(newFilteredItems);
  }
  
  return (
    
    <div onClick={openHandler}>
      {isOpen ?
        <input type="search" placeholder={itemName} value={searchValue} onChange={handleChangeSearch}/>
        :
        <span>{itemName}</span>
      }
      {choosenItems &&
        <input type="hidden" name={itemName.toLocaleLowerCase()} defaultValue={choosenItems.map((element) => element.id).join("-") }/>
      }
      <button type="button" onClick={closeHandler}><MdKeyboardArrowDown className='arrowSoValue'/></button>
      {isOpen && <>
        {choosenItems.length > 0 &&
          <ul>
            {choosenItems.map(item =>(
              <li key={item.id}><Tag itemName={itemName} item={item} removeHandler={toggleItemHandler}/></li>
            ))}
          </ul>
        }
        <ul>
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
      </>}
    </div>
    
  
  );
}