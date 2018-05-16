import { takeEvery, take, cancel, call, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import * as moment from 'moment';

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
    const year = moment().format('YYYY');
    const month = moment().format('MM');
    const id = Math.round(Math.random()*1000000)
    const eventUid = `${year}/${month}/${id}`;
    
    updates['events/' + eventUid] = {
        ...eventData,
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
