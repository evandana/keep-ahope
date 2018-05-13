import {
    REFRESH_CONTACTS,
    SET_CONTACT_SEARCH_RESULTS,
} from '../constants'

const defaultState = {
    // array of all contacts, unfiltered
    all: [],
    // array of filtered contacts based on user search
    searchResults: [],
};

function contacts(state = defaultState, action) {

    const {
        contacts,
        searchResultArray,
    } = action;

    switch (action.type) {
        case REFRESH_CONTACTS:
            return Object.assign({}, state, {
                all: contacts,
            });
        case SET_CONTACT_SEARCH_RESULTS:
            return Object.assign({}, state, {
                searchResults: searchResultArray,
            });
        default:
            return state
    }
}

export default contacts
