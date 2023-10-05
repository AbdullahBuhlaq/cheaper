function checkPermissions(userInformation, permissions) {
  let permissionStatus = true;

  permissions.map((permission) => {
    permissionStatus = permissionStatus || userInformation.allPermission.action.includes(permission);
  });
  permissions.map((permission) => {
    permissionStatus = permissionStatus && !userInformation.allRestrictions.action.includes(permission);
  });

  return permissionStatus;
}

export default checkPermissions;
