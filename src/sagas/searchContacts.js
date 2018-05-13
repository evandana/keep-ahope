import { takeEvery } from 'redux-saga/effects';

import {
    SEARCH_CONTACTS,
} from '../constants';

import { setContactSearchResults } from 'actions';

function* searchContacts({ searchStringUid }) {
    window._FIREBASE_DB_.ref('/contacts/')
        .orderByKey()
        .startAt(searchStringUid)
        .limitToFirst(10)
        .once('value', (snapshot) => {
            const searchResultsArray = Object.keys(snapshot.val()).filter((uid) => {
                const subString = uid.slice(0, searchStringUid.length);
                return searchStringUid === subString;
            });
            window._UI_STORE_.dispatch(setContactSearchResults(searchResultsArray))
        })
    yield;
}

export default function* () {
    yield [
        takeEvery(SEARCH_CONTACTS, searchContacts),
    ];
}
