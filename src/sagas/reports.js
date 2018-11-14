import { takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
    FETCH_REPORTS_DATA,
    RANGE_CURRENT_WEEK,
    RANGE_PREVIOUS_WEEK,
    RANGE_CURRENT_YEAR,
    RANGE_PREVIOUS_YEAR,
} from '../constants';

import Moment from 'moment';
import { extendMoment } from 'moment-range';

import { updateReportsData } from '../actions';

// memoize moment assignment
const getExtendedMoment = (() => {

    let cachedMoment = null;
    
    return getCachedMoment;

    function getCachedMoment() {
        return cachedMoment || ( cachedMoment = extendMoment(Moment) );
    }
})();

function* fetchReportsData({ dateRange }) {

    // db needs
    // - count of all contacts total
    // - count of all events total
    // - all events in range
    // - all contacts for events in range

    // all events
    const eventsAll = window._Parse_.Object.extend("event");
    const eventsAllQuery = new window._Parse_.Query(eventsAll);

    // all contacts
    const contactsAll = window._Parse_.Object.extend("contacts");
    const contactsAllQuery = new window._Parse_.Query(contactsAll);
    
    // events in date range
    const dateBoundsMinMax = getDateBoundsFromRangeKey({rangeKey: dateRange});
    let eventsFilteredQuery = new window._Parse_.Query(eventsAll);
    eventsFilteredQuery.greaterThanOrEqualTo('date', dateBoundsMinMax.min);
    eventsFilteredQuery.lessThanOrEqualTo('date', dateBoundsMinMax.max);
    
    // unique contacts in events for date range
    
    // async queries
    const contactsAllQueryCount = contactsAllQuery.count();
    const eventsAllQueryCount = eventsAllQuery.count();
    const eventsFilteredQueryFind = eventsFilteredQuery.find();

    console.log('dateRange', dateRange)

    Promise.all([
        contactsAllQueryCount,
        eventsAllQueryCount,
        eventsFilteredQueryFind,
    ]).then(([
        contactsAllQueryCountResults,
        eventsAllQueryCountResults,
        eventsFilteredQueryFindResults,
    ]) => {
        console.log('contactsAllQueryCountResults', contactsAllQueryCountResults);
        console.log('eventsAllQueryCountResults', eventsAllQueryCountResults);
        console.log('eventsFilteredQueryFindResults', eventsFilteredQueryFindResults);

        window._UI_STORE_.dispatch(updateReportsData({ 
            reportsData: {
                events: {
                    _meta: {
                        count: eventsFilteredQueryFindResults.length,
                        unfilteredCount: eventsAllQueryCountResults,
                    }
                    // ...eventAggregations
                },
                contacts: {
                    _meta: {
                        // count: filteredContacts.length,
                        unfilteredCount: contactsAllQueryCountResults,
                    }
                    // ...contactBreakdownData
                },
                /** Example: */
                // contacts: {
                //     meta: {
                //         total: 100,
                //     },
                //     total: 0,
                //     birthCountry: [
                //         {
                //             label: 'US',
                //             count: 0
                //         }
                //     ],
                // }
            } 
        }));
    });


    // const contact = window._Parse_.Object.extend("contacts")
    // const contactQuery = new window._Parse_.Query(contact);
    // contactQuery.equalTo('uid', uid);
    // contactQuery.first().then( parseContactPointer => {
        
    //     const events = window._Parse_.Object.extend("event")
    //     const eventsQuery = new window._Parse_.Query(events);

    //     eventsQuery.equalTo('contactUidPointer', parseContactPointer);
    //     eventsQuery.find().then( eventsForContact => {

    yield;
}

function getDateBoundsFromRangeKey({ rangeKey }) {

    const moment = getExtendedMoment();
    const now = new Date();
    let min, max;

    // note isoWeek starts on Monday

    switch ( rangeKey ) {
        case RANGE_CURRENT_WEEK:
            min = moment().startOf('isoWeek');
            max = moment(now).add(1, 'day');
            break;

        case RANGE_PREVIOUS_WEEK:
            min = moment().startOf('isoWeek').subtract(1, 'week');
            max = moment().startOf('isoWeek').subtract(1, 'day');
            break;

        case RANGE_CURRENT_YEAR:
            min = moment().startOf('year');
            max = moment(now).add(1, 'day');
            break;

        case RANGE_PREVIOUS_YEAR:
            min = moment().startOf('year').subtract(1, 'year');
            max = moment().startOf('year').subtract(1, 'day');
            break;
    }

    return {
        min: min.toDate(),
        max: max.toDate(),
    };
}


export default function* () {
    yield [
        takeEvery(FETCH_REPORTS_DATA, fetchReportsData),
    ];
}