import {
    REFRESH_CONTACTS
} from '../constants'

const defaultState = []

function contacts(state = defaultState, action) {

    const {
        contacts
    } = action;

    switch (action.type) {
        case REFRESH_CONTACTS:

            return Object.assign([], contacts);

        default:
            return state
    }
}

export default contacts