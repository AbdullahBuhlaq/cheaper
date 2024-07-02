import jsonParse from "./jsonParse";

function getAvater(obj) {
  if (typeof obj == "object")
    return `${import.meta.env.VITE_URL}/images/${obj?.[0]}`;
  else if (typeof obj == "string" && obj[0] == "[")
    return `${import.meta.env.VITE_URL}/images/${jsonParse(obj)?.[0]}`;
  else if (typeof obj == "string")
    return `${import.meta.env.VITE_URL}/images/${obj}`;
  else return "images/cheaper_icon.png";
}

export default getAvater;
