function getDays(time) {
  return time / 86400000;
}
function getHours(time) {
  return time / 3600000;
}
function getMins(time) {
  return time / 60000;
}

function getRemainingTime(time) {
  let ans = "";
  let res = Math.floor(getDays(time));
  if (res) {
    if (ans != "") ans += " و ";
    ans += res + "يوم";
    time -= res * 86400000;
  }
  res = Math.floor(getHours(time));
  if (res) {
    if (ans != "") ans += " و ";
    ans += res + "ساعة";
    time -= res * 3600000;
  }
  res = Math.floor(getMins(time));
  if (res) {
    if (ans != "") ans += " و ";
    ans += res + "دقيقة";
  }
  return ans;
}

export default getRemainingTime;
