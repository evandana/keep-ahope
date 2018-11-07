import {
    UPDATE_CURRENT_CONTACT,
    UPDATE_CURRENT_CONTACT_WITH_EVENTS,
} from '../constants'

// TODO: should this be something other than an empty object?
const defaultCurrentContactState = {};

function contact(state = defaultCurrentContactState, action) {

    const { contact, eventsForContact } = action;
    
    switch (action.type) {
        case UPDATE_CURRENT_CONTACT:
            return {
                ...state,
                ...contact
            };

        case UPDATE_CURRENT_CONTACT_WITH_EVENTS:
            return {
                ...state,
                ...contact,
                events: eventsForContact
            };

        default:
            return state;

    }
}

export default contact;
