import { takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
    FETCH_REPORTS_DATA,
} from '../constants';

import { setReportsData } from '../actions';


function* fetchReportsData() {

    window._FIREBASE_DB_.ref('reportsdata?range=1')
        .once('value', (snapshot) => {
            const reportsData = snapshot.val();

            if (!!reportsData) {
                window._UI_STORE_.dispatch(setReportsData(reportsData));
            }
        })
        .catch(err => {
            console.log('Error fetching Reports Data: ', err);
        });

    yield;
}


export default function* () {
    yield [
        takeEvery(FETCH_REPORTS_DATA, fetchReportsData),
    ];
}