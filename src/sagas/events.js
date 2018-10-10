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
    const Event = window._Parse_.Object.extend("event");
    var event = new Event();

    const contact = window._Parse_.Object.extend("contacts")
    const query = new window._Parse_.Query(contact);
    query.equalTo('uid', eventData.contactUid)
    query.first().then(result => {
        event.set('ageOfFirstInjection', eventData.contactAgeOfFirstInjection)
        event.set('numberOfOthersHelping', eventData.numberOfOthersHelping)
        event.set('syringesGiven', eventData.syringesGiven)
        event.set('syringesTaken', eventData.syringesTaken)
        event.set('countryOfBirth', eventData.contactCountryOfBirth)
        event.set('otherDrugs', eventData.otherDrugs)
        event.set('dateOfBirth', eventData.contactDateOfBirth)
        event.set('date', eventData.date)
        event.set('newContactDate', eventData.newContactDate)
        event.set('ethnicity', eventData.contactEthnicity)
        event.set('primaryDrug', eventData.primaryDrug)
        event.set('genderIdentity', eventData.contactGenderIdentity)
        event.set('hivStatus', eventData.hivStatus)
        event.set('hepCStatus', eventData.hepCStatus)
        event.set('housingStatus', eventData.houingStatus)
        event.set('isEnrolled', eventData.hasHealthInsurance)
        event.set('isInCareForHepC', eventData.isInCareForHepC)
        event.set('isInCareForHiv', eventData.inInCareForHiv)
        event.set('isOutreach', eventData.isOutreach)
        event.set('narcanWasOffered', eventData.narcanWasOffered)
        event.set('narcanWasTaken', eventData.narcanWasTaken)
        event.set('didOdLastYear', eventData.didOdLastYear)
        event.set('hasHealthInsurance', eventData.hasHealthInsurance)
        event.set('hispanic', eventData.contactIsHispanic)
        event.set('uid', 'contacts', result)
    
        event.save()
    })
    yield;
}


export default function* () {
    yield [
        takeEvery(CREATE_EVENT, createEvent),
    ];
}
