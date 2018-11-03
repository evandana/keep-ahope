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
    query.first().then( parseContact => {

        // event data with most fields filled out
        eventData = {
            "isOutreach": true,
            "referrals": [
                "Beth Israel"
              ],
            "syringesGiven": 20,
            "syringesTaken": 20,
            "narcanWasOffered": true,
            "narcanWasTaken": true,
            "enrollment": "enrolled",
            "numberOfOthersHelping": 54,
            "contactUid": "aaaa651945aaa",
            "date": "2018-11-03T04:00:00.000Z",
            "housingStatus": "housed",
            "hivStatus": "positive",
            "isInCareForHiv": true,
            "hepCStatus": "positive",
            "isInCareForHepC": true,
            "healthInsurer": "NHP",
            "primaryDrug": "meth",
            "didOdLastYear": false,
            "didSeeOdLastYear": false,
            "hasHealthInsurance": true,
            "otherDrugs": [
              "meth",
              "cocaine",
              "benzos"
            ],
            "newContactDate": "2018-11-03T04:00:00.000Z",
            "contactDateOfBirth": "1980-01-01T05:00:00.000Z",
            "contactGenderIdentity": "mtf",
            "contactEthnicity": "Other",
            "contactIsHispanic": false,
            "contactCountryOfBirth": "Other",
            "contactAgeOfFirstInjection": 56
          };

        // update contact
        parseContact.set('ageOfFirstInjection', eventData.contactAgeOfFirstInjection)
        parseContact.set('countryOfBirth', eventData.contactCountryOfBirth)
        parseContact.set('dateOfBirth', eventData.contactDateOfBirth)
        parseContact.set('dateOfLastVisit', eventData.date)
        parseContact.set('ethnicity', eventData.contactEthnicity)
        parseContact.set('primaryDrug', eventData.primaryDrug)
        parseContact.set('genderIdentity', eventData.contactGenderIdentity)
        parseContact.set('hivStatus', eventData.hivStatus)
        parseContact.set('hepCStatus', eventData.hepCStatus)
        parseContact.set('housingStatus', eventData.houingStatus)
        parseContact.set('isEnrolled', eventData.hasHealthInsurance)
        parseContact.set('isInCareForHepC', eventData.isInCareForHepC)
        parseContact.set('isInCareForHiv', eventData.inInCareForHiv)
        parseContact.set('didOdLastYear', eventData.didOdLastYear)
        parseContact.set('hasHealthInsurance', eventData.hasHealthInsurance)
        parseContact.set('hispanic', eventData.contactIsHispanic)

        // update event
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
        event.set('contactUidPointer', parseContact)

        event.save()
    })
    yield;
}


export default function* () {
    yield [
        takeEvery(CREATE_EVENT, createEvent),
    ];
}
