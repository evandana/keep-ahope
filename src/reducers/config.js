import {
    REFRESH_CONFIG
} from '../constants'

const defaultState = {
    LOCKDOWN_MODE: false,
}

function config(state = defaultState, action) {

    const {
        config
    } = action;

    switch (action.type) {
        case REFRESH_CONFIG:

            return Object.assign({}, config);

        default:
            return state
    }
}

export default config
