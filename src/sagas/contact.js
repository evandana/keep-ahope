import { takeEvery } from 'redux-saga/effects';

import {
    GET_CONTACT,
} from '../constants';

import { updateCurrentContact } from 'actions';

function* getContact({ uid }) {
    const contactRef = `/contacts/${uid}`
    window._FIREBASE_DB_.ref(contactRef)
        .once('value', (snapshot) => {
            let contactDataPlusUid = Object.assign({}, snapshot.val(), { uid: uid });
            window._UI_STORE_.dispatch(updateCurrentContact(contactDataPlusUid));
        })
    yield;
}

export default function* () {
    yield [
        takeEvery(GET_CONTACT, getContact),
    ];
}
