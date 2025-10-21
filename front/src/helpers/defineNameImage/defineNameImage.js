const defineNameImage = (name) => {
    return name
        .toLowerCase() // Convertit la chaîne de caractères en minuscules
        .normalize("NFD") // Normalise les caractères avec accents en caractères de base + marqueurs de diacritiques
        .replace(/[\u0300-\u036f]/g, "") // Supprime les marqueurs de diacritiques (accents)
        .replace(/\s+/g, '-') // Remplace les espaces par des tirets
        .replace(/[^a-z0-9-]/g, ''); // Supprime tous les caractères qui ne sont pas des lettres minuscules, des chiffres ou des tirets
};

export default defineNameImage;