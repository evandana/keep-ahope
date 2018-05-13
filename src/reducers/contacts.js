import {
    REFRESH_CONTACTS,
    SET_CONTACT_SEARCH_RESULTS,
    SET_CURRENT_SEARCH_QUERY,
} from '../constants'

const defaultState = {
    // array of all contacts, unfiltered
    all: [],
    // array of filtered contacts based on user search
    searchResults: [],
    searchQuery: '',
};

function contacts(state = defaultState, action) {

    const {
        contacts,
        searchResultArray,
        searchQuery,
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
        case SET_CURRENT_SEARCH_QUERY:
            return Object.assign({}, state, {
                searchQuery,
            })
        default:
            return state
    }
}

export default contacts
