import { takeEvery } from 'redux-saga/effects';

import {
    GET_CONTACT,
} from '../constants';

import { updateCurrentContact } from 'actions';

function* getContact({ uid }) {

    if (uid) {

        const contact = window._Parse_.Object.extend("contacts")
        const query = new window._Parse_.Query(contact);
        query.equalTo('uid', uid);
        query.first().then( parseContact => {
            let contactDataPlusUid = Object.assign({}, parseContact.attributes, { uid: uid });
            window._UI_STORE_.dispatch( updateCurrentContact( contactDataPlusUid ) );
        });
    } else {
        window._UI_STORE_.dispatch( updateCurrentContact( {} ) );
    }

    yield;
}

export default function* () {
    yield [
        takeEvery(GET_CONTACT, getContact),
    ];
}
