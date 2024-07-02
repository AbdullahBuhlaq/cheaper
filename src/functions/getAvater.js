import jsonParse from "./jsonParse";

function getAvater(obj) {
  if (typeof obj == "object") {
    if (obj?.[0]?.slice(0, 4) == "http") return obj?.[0];
    else return `${import.meta.env.VITE_URL}/images/${obj?.[0]}`;
  } else if (typeof obj == "string" && obj[0] == "[") {
    if (jsonParse(obj)?.[0]?.slice(0, 4) == "http") return jsonParse(obj)?.[0];
    else return `${import.meta.env.VITE_URL}/images/${jsonParse(obj)?.[0]}`;
  } else if (typeof obj == "string") {
    if (obj?.slice(0, 4) == "http") return obj;
    else return `${import.meta.env.VITE_URL}/images/${obj}`;
  } else return "images/cheaper_icon.png";
}

export default getAvater;
