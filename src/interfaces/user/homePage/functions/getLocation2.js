async function getLocation2() {
  try {
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipResponse.json();
    const ipAddress = ipData.ip;

    const response = await fetch(`http://api.ipstack.com/${"5.155.48.184"}?access_key=${"4c91566f8941f77e36bfd4b77fc9a84d"}`);
    // const response = await fetch(`http://api.ipapi.com/api/${ipAddress}?access_key=${"0c07a3b5fcb0f29af1c626f944b8cd93"}`);
    const data = await response.json();
  } catch (error) {
    console.error(error);
  }
}

export default getLocation2;
