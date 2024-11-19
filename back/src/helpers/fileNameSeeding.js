export const mappedFunctionNameFileImg = (name) => {
  const fileNameImg = `${name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\s']/g, "")}.webp`;
  return fileNameImg;
};

