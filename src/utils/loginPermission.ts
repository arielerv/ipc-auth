const loginPermission = (allowedRoles: readonly string[], userRoles: string[]) => {
    return allowedRoles.some((role) => userRoles.includes(role));
};

export default loginPermission;
