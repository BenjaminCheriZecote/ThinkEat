import defineNameImage from "../defineNameImage/defineNameImage";

const setImageNameIntoDataRecipeAction = (data, imageNameFile, recipeName) => {
    if (imageNameFile !== '') {
        const newName = defineNameImage(recipeName);
        const extension = imageNameFile.split('.').pop();
        const newNameImageFile = `${newName}.${extension}`;
        data.image = newNameImageFile;
    }
}

export default setImageNameIntoDataRecipeAction