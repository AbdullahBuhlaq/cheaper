async function checkVpn() {
  try {
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    const ipData = await ipResponse.json();
    const ipAddress = ipData.ip;
    const response = await fetch(`https://api.ipapi.is?q=${ipAddress}`);
    const data = await response.json();

    return data.is_vpn ? "يرجى إغلاق VPN وإعادة المحاولة" : data.is_proxy ? "يرجى إغلاق Proxy وإعادة المحاولة" : data.is_tor ? "يرجى عدم استخدام Tor وإعادة المحاولة" : "honest";
  } catch (error) {
    console.error(error);
  }
}

export default checkVpn;
