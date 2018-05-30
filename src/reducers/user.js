import {
    // user
    SET_CURRENT_USER,

    SHOW_LOGIN_SPINNER,
} from '../constants'

const defaultUserState = {
    permissions: {},
    name: '',
    uid: '',
    showLoginSpinner: true,
};


function user(state = defaultUserState, action) {

    const {
        showLoginSpinner,
        ...rest
    } = action;

    let cleanRest = { ...rest };
    delete cleanRest.type;

    switch (action.type) {

        case SHOW_LOGIN_SPINNER:
            return {
                ...state,
                showLoginSpinner,
            };

        case SET_CURRENT_USER:

            return {
                ...state,
                ...cleanRest,
            };

        default:
            return state
    }
}

export default user;
