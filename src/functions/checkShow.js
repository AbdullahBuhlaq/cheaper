function checkShow(userInformation, shows) {
  let showStatus = false;
  console.log(userInformation);
  shows.map((show) => {
    showStatus = showStatus || userInformation.allPermission.show?.includes(show);
  });
  shows.map((show) => {
    showStatus = showStatus && !userInformation.allRestrictions.show?.includes(show);
  });

  return showStatus;
}

export default checkShow;
