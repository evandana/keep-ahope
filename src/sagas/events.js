import { takeEvery } from 'redux-saga/effects';

import {
    CREATE_EVENT,
    NOTIFICATION_SAVE_SUCCESS,
    NOTIFICATION_SAVE_FAIL,
} from '../constants';

import { getContact, newNotification } from '../actions';

function* createEvent({ eventData, history }) {
    const Event = window._Parse_.Object.extend("event");
    var event = new Event();

    const contact = window._Parse_.Object.extend("contacts")
    const query = new window._Parse_.Query(contact);
    query.equalTo('uid', eventData.contactUid)
    query.first().then( parseContact => {

        // event data with most fields filled out
        eventData = {
            "contactAgeOfFirstInjection": 56,
            "contactCountryOfBirth": "Other",
            "contactDateOfBirth": new Date("1980-01-01T05:00:00.000Z"),
            "contactEthnicity": "Other",
            "contactGenderIdentity": "mtf",
            "contactIsHispanic": false,
            "contactUid": "aaaa651945aaa",
            "date": new Date(),
            "didOdLastYear": false,
            "didSeeOdLastYear": false,
            "enrollment": "enrolled",
            "hasHealthInsurance": true,
            "healthInsurer": "NHP",
            "hepCStatus": "positive",
            "hivStatus": "positive",
            "housingStatus": "housed",
            "isInCareForHepC": true,
            "isInCareForHiv": true,
            "isOutreach": true,
            "narcanWasOffered": true,
            "narcanWasTaken": true,
            "newContactDate": new Date("2018-11-03T04:00:00.000Z"),
            "numberOfOthersHelping": 54,
            "otherDrugs": [ "meth", "cocaine", "benzos"],
            "primaryDrug": "meth",
            "referrals": [ "Beth Israel" ],
            "syringesGiven": 20,
            "syringesTaken": 20,
          };

        // update contact
        parseContact.set('ageOfFirstInjection', eventData.contactAgeOfFirstInjection); // TODO: on server check if this changes to a LATER date
        parseContact.set('countryOfBirth', eventData.contactCountryOfBirth); // TODO: on server check if this changes (once no longer null) then flag to user
        parseContact.set('dateOfBirth', eventData.contactDateOfBirth); // TODO: on server check if this changes (once no longer null) then flag to user
        parseContact.set('dateOfLastVisit', eventData.date);
        parseContact.set('ethnicity', eventData.contactEthnicity); // TODO: on server check if this changes (once no longer null) then flag to user
        parseContact.set('primaryDrug', eventData.primaryDrug); 
        parseContact.set('genderIdentity', eventData.contactGenderIdentity); 
        parseContact.set('hivStatus', eventData.hivStatus); // TODO: on server ensure this can't go from `true` to `false`
        parseContact.set('hepCStatus', eventData.hepCStatus); 
        parseContact.set('housingStatus', eventData.housingStatus);
        parseContact.set('isEnrolled', eventData.hasHealthInsurance);
        parseContact.set('isInCareForHepC', eventData.isInCareForHepC);
        parseContact.set('isInCareForHiv', eventData.isInCareForHiv);
        parseContact.set('otherDrugsAggregate', eventData.otherDrugs); // TODO: aggregate all drugs here (or on server)
        parseContact.set('didOdLastYear', eventData.didOdLastYear);
        parseContact.set('hasHealthInsurance', eventData.hasHealthInsurance);
        parseContact.set('hispanic', eventData.contactIsHispanic);

        // update event
        event.set('ageOfFirstInjection', eventData.contactAgeOfFirstInjection);
        event.set('countryOfBirth', eventData.contactCountryOfBirth);
        event.set('date', eventData.date);
        event.set('dateOfBirth', eventData.contactDateOfBirth);
        event.set('didOdLastYear', eventData.didOdLastYear);
        event.set('ethnicity', eventData.contactEthnicity);
        event.set('genderIdentity', eventData.contactGenderIdentity);
        event.set('hasHealthInsurance', eventData.hasHealthInsurance);
        event.set('hepCStatus', eventData.hepCStatus);
        event.set('hispanic', eventData.contactIsHispanic);
        event.set('hivStatus', eventData.hivStatus);
        event.set('housingStatus', eventData.housingStatus);
        event.set('isEnrolled', eventData.hasHealthInsurance);
        event.set('isInCareForHepC', eventData.isInCareForHepC);
        event.set('isInCareForHiv', eventData.isInCareForHiv);
        event.set('isOutreach', eventData.isOutreach);
        event.set('narcanWasOffered', eventData.narcanWasOffered);
        event.set('narcanWasTaken', eventData.narcanWasTaken);
        event.set('newContactDate', eventData.newContactDate);
        event.set('numberOfOthersHelping', eventData.numberOfOthersHelping);
        event.set('otherDrugs', eventData.otherDrugs);
        event.set('primaryDrug', eventData.primaryDrug);
        event.set('referrals', eventData.referrals);
        event.set('syringesGiven', eventData.syringesGiven);
        event.set('syringesTaken', eventData.syringesTaken);
        // add event pointer to contact
        event.set('contactUidPointer', parseContact);

        event.save()
            .then( successfulSave => {
                // TODO: show save success message
                window._UI_STORE_.dispatch( newNotification( { newNotification: { notificationType: NOTIFICATION_SAVE_SUCCESS } } ));
                
                // fetch new contact data
                // TODO: include events
                window._UI_STORE_.dispatch( getContact( eventData.contactUid ) );
                // TODO: show spinner on contact info
                
                // navigate to contact info
                history.push(`/contact/${eventData.contactUid}/info`);
                
            })
            .catch( err => {
                window._UI_STORE_.dispatch( newNotification( { newNotification: { notificationType: NOTIFICATION_SAVE_FAIL, message: err.toString() } } ));
            } );
    })
    yield;
}


export default function* () {
    yield [
        takeEvery(CREATE_EVENT, createEvent),
    ];
}
