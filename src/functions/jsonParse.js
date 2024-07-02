export default function jsonParse(string) {
  let res = string;
  console.log(res);
  while (typeof res == "string") {
    res = JSON.parse(res);
  }

  return res;
}
