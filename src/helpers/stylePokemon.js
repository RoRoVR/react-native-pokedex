const typesColors = {
  bug: "#8BD674",
  dark: "#6F6E78",
  dragon: "#7383B9",
  electric: "#F2CB55",
  fairy: "#EBA8C3",
  fighting: "#EB4971",
  fire: "#FFA756",
  flying: "#83A2E3",
  ghost: "#8571BE",
  grass: "#8BBE8A",
  ground: "#F78551",
  ice: "#91D8DF",
  normal: "#B5B9C4",
  poison: "#9F6E97",
  psychic: "#FF6568",
  rock: "#D4C294",
  steel: "#4C91B2",
  water: "#58ABF6",
};

const backgroundColors = {
  bug: "#8CB230",
  dark: "#58575F",
  dragon: "#0F6AC0",
  electric: "#EED535",
  fairy: "#ED6EC7",
  fighting: "#D04164",
  fire: "#FD7D24",
  flying: "#748FC9",
  ghost: "#556AAE",
  grass: "#62B957",
  ground: "#DD7748",
  ice: "#61CEC0",
  normal: "#9DA0AA",
  poison: "#A552CC",
  psychic: "#EA5D60",
  rock: "#BAAB82",
  steel: "#417D9A",
  water: "#417D9A",
};

const textColor = {
  white: "#FFF",
  black: "#17171B",
  grey: "#747476",
  number: "rgba(23, 23, 27, 0.6)",
};

// Genera un color rependiendo al tipo de pokemon
const getTypeColor = (type) => {
  return typesColors[type] || "light";
};

// Genera un color rependiendo al tipo de pokemon
const getBackColor = (type) => {
  return backgroundColors[type] || "light";
};

// Formatea el número con 3 digitos
const formatNumber = (num) => {
  return num.toString().padStart(3, "0");
};

export {
  typesColors,
  getTypeColor,
  formatNumber,
  textColor,
  backgroundColors,
  getBackColor,
};
