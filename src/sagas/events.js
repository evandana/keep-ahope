import { takeEvery, take, cancel, call, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
    CREATE_EVENT,
    DEBOUNCE_REFRESH_EVENTS,
    FETCH_EVENTS,
    UPDATE_EVENT,
    REFRESH_EVENTS,
} from '../constants';

import { refreshEvents } from '../actions';


function* createEvent({ eventData }) {

    const updates = {};
    const eventUid = '2018/03/'+ Math.round(Math.random()*1000000);
    updates['events/' + eventUid] = {
        ...eventData,
        // add timestamp?
    };

    window._FIREBASE_DB_.ref()
        .update(updates);

    yield;
}


export default function* () {
    yield [
        takeEvery(CREATE_EVENT, createEvent),
    ];
}