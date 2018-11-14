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
    
    // date range selector
    const dateBoundsMinMax = getDateBoundsFromRangeKey({rangeKey: dateRange});

    // events in date range
    const eventsFilteredQuery = new window._Parse_.Query(eventsAll);
    eventsFilteredQuery.greaterThanOrEqualTo('date', dateBoundsMinMax.min);
    eventsFilteredQuery.lessThanOrEqualTo('date', dateBoundsMinMax.max);

    // contacts with events in date range    
    const contactsFilteredQuery = new window._Parse_.Query(contactsAll);
    contactsFilteredQuery.greaterThanOrEqualTo('updatedAt', dateBoundsMinMax.min);
    contactsFilteredQuery.lessThanOrEqualTo('updatedAt', dateBoundsMinMax.max);
    
    // async queries
    const contactsAllQueryCount = contactsAllQuery.count();
    const eventsAllQueryCount = eventsAllQuery.count();
    const eventsFilteredQueryFind = eventsFilteredQuery.find();
    const contactsFilteredQueryFind = contactsFilteredQuery.find();

    console.log('dateRange', dateRange)

    Promise.all([
        contactsAllQueryCount,
        eventsAllQueryCount,
        eventsFilteredQueryFind,
        contactsFilteredQueryFind,
    ]).then(([
        contactsAllQueryCountResults,
        eventsAllQueryCountResults,
        eventsFilteredQueryFindResults,
        contactsFilteredQueryFindResults,
    ]) => {
        /** 
         * object definition: eventsFilteredQueryFindResults
         * 
         * {
         *      className: "event"
         *      id: "kuemd3hLtq"
         *      _objCount: 105
         *      attributes: Object
         *      createdAt: Object
         *      updatedAt: Object
         * }
         */
        console.log('contactsAllQueryCountResults', contactsAllQueryCountResults);
        console.log('eventsAllQueryCountResults', eventsAllQueryCountResults);
        console.log('eventsFilteredQueryFindResults', eventsFilteredQueryFindResults);
        console.log('contactsFilteredQueryFindResults', contactsFilteredQueryFindResults);


        const eventAggregations = getEventAggregations(eventsFilteredQueryFindResults);
        const contactBreakdownData = getContactBreakdownData(contactsFilteredQueryFindResults);
        
        console.log('eventAggregations', eventAggregations);
        console.log('contactBreakdownData', contactBreakdownData);
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

        window._UI_STORE_.dispatch(updateReportsData({ 
            reportsData: {
                events: {
                    _meta: {
                        count: eventsFilteredQueryFindResults.length,
                        unfilteredCount: eventsAllQueryCountResults,
                    },
                    ...eventAggregations,
                },
                contacts: {
                    _meta: {
                        count: contactsFilteredQueryFindResults.length,
                        unfilteredCount: contactsAllQueryCountResults,
                    },
                    ...contactBreakdownData,
                },
            } 
        }));
    });

    yield;
}

export default function* () {
    yield [
        takeEvery(FETCH_REPORTS_DATA, fetchReportsData),
    ];
}

function getEventAggregations ( events ) {

    let eventAggregations = {
        narcanWasOffered: 0,
        narcanWasTaken: 0,
        syringesGiven: 0,
        syringesTaken: 0,
    };

    return !events ? [] : events.reduce( (agg, event) => {
        return {
            narcanWasOffered: eventAggregations.narcanWasOffered + parseInt( event.attributes.narcanWasOffered || 0, 10),
            narcanWasTaken: eventAggregations.narcanWasTaken + parseInt( event.attributes.narcanWasTaken || 0, 10),
            syringesGiven: eventAggregations.syringesGiven + parseInt( event.attributes.syringesGiven || 0, 10),
            syringesTaken: eventAggregations.syringesTaken + parseInt( event.attributes.syringesTaken || 0, 10),
        };
    }, {
        narcanWasOffered: 0,
        narcanWasTaken: 0,
        syringesGiven: 0,
        syringesTaken: 0,
    });
}

function getContactBreakdownData ( contacts ) {

    const contactBreakdowns = [
        'birthCountry',
        'ethnicity', // from contact
        'hispanic', // from contact
        'firstInjectionAge',
        'genderIdentity',
    ];

    return !contacts ? [] : contactBreakdowns.reduce((agg, breakdownField) => {

        const breakdownFieldValsAsKeys = contacts.reduce((breakdownFieldValAgg, contact) => {

            // { 'US' : 123, ...  }
            breakdownFieldValAgg[contact.attributes[breakdownField]] = !breakdownFieldValAgg[contact.attributes[breakdownField]] ? 1 : breakdownFieldValAgg[contact.attributes[breakdownField]] + 1;

            return breakdownFieldValAgg;
        }, {});

        agg[breakdownField] = Object.keys(breakdownFieldValsAsKeys).map(breakdownFieldVal => {

            return {
                label: breakdownFieldVal,
                count: breakdownFieldValsAsKeys[breakdownFieldVal]
            };
        });

        return agg;
    }, {});
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
