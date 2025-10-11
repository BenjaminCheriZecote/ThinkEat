import { useState } from "react";
import { useActionData, useLocation } from "react-router-dom";
import './style.css'
import style from './index.module.css'
import RecipeReadUx from "../RecipeReadUx";
import RecipeEditionUx from "../RecipeEditionUx";

const recipeInit = {
  steps:[],
  ingredients:[]
}

export default function RecipeUX({recipe = recipeInit, formMethod, cancelHandler}) {

  const error = useActionData();
  const location = useLocation();

  const [isEdition, setIsEdition] = useState(location.state?.isEditing || formMethod === 'POST');

  function  changeEditionMode() {
    setIsEdition(!isEdition);
  }
  
  if (!isEdition) {
    return <RecipeReadUx recipe={recipe} formMethod={formMethod} style={style} changeEditionMode={changeEditionMode}/>;
  }

  return(
    <RecipeEditionUx
      recipe={recipe}
      formMethod={formMethod}
      style={style}
      isEdition={isEdition}
      setEditionMode={changeEditionMode}
      cancelHandler={cancelHandler}
    />
  )
}
