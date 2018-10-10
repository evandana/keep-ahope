import { takeEvery } from 'redux-saga/effects';

import {
    SEARCH_CONTACTS,
} from '../constants';

import { setContactSearchResults, setCurrentSearchQuery } from 'actions';

function* searchContacts({ searchStringUid }) {
    // set query in state
    window._UI_STORE_.dispatch(setCurrentSearchQuery(searchStringUid));

    const Contact = window._Parse_.Object.extend('contacts');
    const contactQuery = new window._Parse_.Query(Contact);
    contactQuery.startsWith('uid', searchStringUid)
    contactQuery.limit(10)
    contactQuery.descending()
    contactQuery.find().then(results => {
        const uidResultsArray = results.map(contact => contact.attributes.uid)
        window._UI_STORE_.dispatch(setContactSearchResults(uidResultsArray))
    })
    yield;
}

export default function* () {
    yield [
        takeEvery(SEARCH_CONTACTS, searchContacts),
    ];
}
