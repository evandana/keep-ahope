import {
    // AUTHENTICATION
    LOGIN_GOOGLE_REQUEST,
    LOGOUT_USER_REQUEST,

    // USER
    GET_USER,
    UPDATE_USER,
    SET_CURRENT_USER,
    SHOW_LOGIN_SPINNER,

    // MODALS
    OPEN_MODAL,

    // CONTACT
    GET_CONTACT,
    UPDATE_CURRENT_CONTACT,

    // CONTACTS
    SET_CONTACT_SEARCH_RESULTS,
    SET_CURRENT_SEARCH_QUERY,
    SEARCH_CONTACTS,

    // CONFIG
    FETCH_CONFIG,
    REFRESH_CONFIG,

    // INTAKE
    CREATE_INTAKE,

    // EVENTS
    ASYNC_FORM_STATUS_UPDATE,
    FETCH_EVENTS,
    GET_EVENTS, // why set and get?
    REFRESH_EVENTS,
    CREATE_EVENT,
    
    // REPORTS
    FETCH_REPORTS_DATA,
    UPDATE_REPORTS_DATA,

} from '../constants';

/** AUTHENTICATION **/
export function loginGoogleRequest() {
    return { type: LOGIN_GOOGLE_REQUEST };
}

/** USER **/
export function setCurrentUser(userData) {
    return {
        type: SET_CURRENT_USER,
        ...userData
    };
}

export function logoutUserRequest() {
    return {
        type: LOGOUT_USER_REQUEST,
    };
}

export function getUser(googleUserData = null) {
    return {
        type: GET_USER,
        googleUserData,
    };
}

export function updateUser(userData) {
    return {
        type: UPDATE_USER,
        userData,
    };
}

export function showLoginSpinner(showLoginSpinner) {
    return {
        type: SHOW_LOGIN_SPINNER,
        showLoginSpinner,
    }
}


/** ASYNC FORM */
export function asyncFormStatusUpdate({status, success}) {
    return {
        type: ASYNC_FORM_STATUS_UPDATE,
        status,
        success,
    }
}

/** CONFIG */
export function fetchConfig() {
    return {
        type: FETCH_CONFIG
    }
}
export function refreshConfig(config) {
    return {
        type: REFRESH_CONFIG,
        config,
    }
}

/** CONTACT */
export function getContact(uid) {
    return {
        type: GET_CONTACT,
        uid,
    }
}

export function updateCurrentContact(contact) {
    return {
        type: UPDATE_CURRENT_CONTACT,
        contact,
    }
}

/** CONTACTS */
export function searchContacts(searchStringUid) {
    return {
        type: SEARCH_CONTACTS,
        searchStringUid,
    }
}

export function setContactSearchResults(searchResultArray) {
    return {
        type: SET_CONTACT_SEARCH_RESULTS,
        searchResultArray,
    }
}

export function setCurrentSearchQuery(searchQuery) {
    return {
        type: SET_CURRENT_SEARCH_QUERY,
        searchQuery,
    }
}

/** EVENTS */
export function fetchEvents() {
    return {
        type: FETCH_EVENTS
    }
}

export function getEvents() {
    return {
        type: GET_EVENTS,
    };
}

export function refreshEvents(eventCollection) {
    return {
        type: REFRESH_EVENTS,
        eventCollection,
    }
}

export function createEvent(userInputData, user) {

    const eventData = {
        ...userInputData
    };

    return {
        type: CREATE_EVENT,
        eventData,
    }

}

/** REPORTS PAGE */

export function fetchReportsData({dateRange}) {
    return {
        type: FETCH_REPORTS_DATA,
        dateRange,
    };
}

export function updateReportsData({reportsData}) {
    return {
        type: UPDATE_REPORTS_DATA,
        reportsData,
    }
}