const defineTimeFormat = (match) => {
    if (match) {
        const hours = match[1].padStart(2, '0');
        const minutes = match[2].padStart(2, '0');
        const seconds = match[3].padStart(2, '0');

        const formattedString = `${hours}:${minutes}:${seconds}`;
        return formattedString;
    } else {
        const error = "Format de chaine invalide."
        return error
    }
}

export default  defineTimeFormat;