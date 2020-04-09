import { takeEvery } from 'redux-saga/effects';

import {
    OFFLINE_MODE,
    SEARCH_CONTACTS,
} from '../constants';

import { setContactSearchResults, setCurrentSearchQuery } from 'actions';

import stubContacts from '../endpointStubs/contacts_intake'

function* searchContacts({ searchStringUid }) {
    // set query in state
    window._UI_STORE_.dispatch(setCurrentSearchQuery(searchStringUid));

    const Contact = window._Parse_.Object.extend('contacts');
    const contactQuery = new window._Parse_.Query(Contact);
    contactQuery.matches('uid', new RegExp('^' + searchStringUid, 'i'))
    contactQuery.limit(10)
    contactQuery.descending()
    contactQuery.find().then(results => {
        const contactsWithMatchingUid = results.map(parseObj => parseObj.attributes).map(contact => {
            return {
                ...contact,
                uidSegment1: contact.uid.substring(0,2).toUpperCase(), 
                uidSegment2: contact.uid.substring(2,4).toUpperCase(), 
                uidSegment3: contact.uid.substring(4,6).toUpperCase(),
                uidSegment4: contact.uid.substring(6,8).toUpperCase(),
                uidSegment5: contact.uid.substring(8,10).toUpperCase(),
                uidSegment6: contact.uid.substring(10,13).toUpperCase()
            }
        });
        window._UI_STORE_.dispatch(setContactSearchResults(contactsWithMatchingUid))
    })
    yield;
}

function* stubSearchContacts({ searchStringUid = 'AAAA236889AAA' }) {
    window._UI_STORE_.dispatch(setCurrentSearchQuery(searchStringUid));
    window._UI_STORE_.dispatch(setContactSearchResults(stubContacts.results));
    yield;
}

export default function* () {
    if (OFFLINE_MODE) {
        yield [
            takeEvery(SEARCH_CONTACTS, stubSearchContacts),
        ];
    } else {

        yield [
            takeEvery(SEARCH_CONTACTS, searchContacts),
        ];
    }
}
