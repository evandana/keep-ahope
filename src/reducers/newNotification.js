import {
    NEW_NOTIFICATION,
} from '../constants';

const defaultState = {
    newNotification: {}
};

function newNotification(state = defaultState, action) {

    const {
        newNotification,
    } = action;

    switch (action.type) {
        case NEW_NOTIFICATION:
            return {
                ...state,
                ...newNotification,
            };
        default:
            return state;
    }
}

export default newNotification;
