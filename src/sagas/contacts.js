import { takeEvery } from 'redux-saga/effects';

import {
    FETCH_CONTACTS,
} from '../constants';

import { refreshContacts } from 'actions';


function* fetchContacts() {
    window._FIREBASE_DB_.ref('/contacts')
        .on('value', (snapshot) => {
            const contacts = snapshot.val();
            const contactsArr = Object.keys(contacts).map(key => {
                const contact = contacts[key];
                contact.uid = key;
                return contact;
            })
            
            window._UI_STORE_.dispatch(refreshContacts(contactsArr));
        });
    
    yield;
}


export default function* () {
    yield [
        takeEvery(FETCH_CONTACTS, fetchContacts),
    ];
}