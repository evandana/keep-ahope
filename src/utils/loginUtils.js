import { setCurrentUser, showLoginSpinner, logoutUserRequest as logoutUserRequestAction } from 'actions';

export const setCurrentUserAsHavingPermissions = ({ email, fullName, uid }) => {
    // for now we can equate Admin role with basic permissions
    window._UI_STORE_.dispatch(setCurrentUser({
        permissions: { basic: true, googleAuth: true },
        email,
        name: fullName,
        uid,
    }));
};

export const setCurrentUserAsNotHavingPermissions = ({ email, fullName, uid }) => {
    // console.log('user is logged in but doesn\'t have permissions')
    window._UI_STORE_.dispatch(setCurrentUser({
        permissions: { basic: false, googleAuth: true },
        email,
        name: fullName,
        uid,
    }));
};