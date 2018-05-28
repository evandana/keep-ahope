import { takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
    FETCH_REPORTS_DATA,
} from '../constants';

import { updateReportsData } from '../actions';


function* fetchReportsData() {

    const functionsRootUrl = window.location.host.indexOf('localhost') !== 0 ? 
        'https://us-central1-keep-ahopecloudfunctions.net' : 
        'http://localhost:5000/keep-ahope/us-central1';

    fetch(functionsRootUrl + '/reportsdata?range=1')
        .then( response => response.json() )
        .then( responseJson => {

            window._UI_STORE_.dispatch(updateReportsData({ reportsData: responseJson }));
        })
        .catch( err => {
            //throw error
            console.log('Error getting reports data', err);
        });

    yield;
}


export default function* () {
    yield [
        takeEvery(FETCH_REPORTS_DATA, fetchReportsData),
    ];
}