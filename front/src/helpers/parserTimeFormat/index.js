
// fonction pour convertir le format du temps 00:00 au format 00:00:00
export const parserTimeFormat = (time) => {
  if (typeof time !== "string") return "";
    if (time !== "") {
      if (time.length === 5) {
        const newTime = time + ':00';
        return newTime
      }
    }
    return time
}