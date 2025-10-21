import { defineTimeFormat, formatterSecondesTime, parserTimeFormat, secondesConverterFunction } from '../'

// format des temps (préparation / cuisson) peuvent varier si ils sont modifié ou non
// // le format est soit "" si le temps est vide, soit "00:00" si le temps est modifié, soit "00:00:00" si le temps est présent mais non modifé

const timeFormat = (rawPreparatingTime, rawCookingTime) => {
    const preparatingTimeParsed = parserTimeFormat(rawPreparatingTime);
    const cookingTimeParsed = parserTimeFormat(rawCookingTime);
  
    const preparatingTimeInSeconds = preparatingTimeParsed !== "" ? secondesConverterFunction(preparatingTimeParsed) : 0;
    
    const cookingTimeInSeconds = cookingTimeParsed !== "" ? secondesConverterFunction(cookingTimeParsed) : 0;
  
    const totalTimeInSeconds = preparatingTimeInSeconds + cookingTimeInSeconds;
  
    const timeFormatted = formatterSecondesTime(totalTimeInSeconds);
    const preparatingTimeFormatted = formatterSecondesTime(preparatingTimeInSeconds);
  
    const matchTotal = timeFormatted.match(/^(\d+):(\d+):(\d+)$/);
    const matchPreparating = preparatingTimeFormatted.match(/^(\d+):(\d+):(\d+)$/);
  
    const time = defineTimeFormat(matchTotal);
    const preparatingTime = defineTimeFormat(matchPreparating);
  
    return { time, preparatingTime };
};

export default timeFormat;