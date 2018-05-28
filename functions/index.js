'use strict';

const promise = require('promise');

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');

// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({
    origin: true,
});

const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

admin.initializeApp();

exports.reportsdata = functions.https.onRequest((req, res) => {

    // [START sendError]
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(403).send('Forbidden!');
    }
    // [END sendError]

    // [START usingMiddleware]
    // Enable CORS using the `cors` express middleware.
    return cors(req, res, () => {

        console.log('req.query.daterange', req.query.daterange);
        
        const dateBounds = getDateBoundsFromRangeKey(req.query.daterange);
        
        console.log('dateBounds', dateBounds);

        const dateRange = moment().range( dateBounds.min, dateBounds.max );

        const dbRef = admin.database(),
            contactsRef = dbRef.ref('/contacts'),
            eventsRef = dbRef.ref('/events');

        return promise.all([
                contactsRef.once('value'),
                eventsRef.once('value')
            ])
            .then(([contactsSnapshot, eventsSnapshot]) => {
                const contacts = contactsSnapshot.val();
                const events = flattenEventNodes(convertObjToArray(eventsSnapshot.val()));

                var contactUidsForFilteredEvents = {};

                const filteredEvents = events.filter(event => {

                    return event.date ? dateRange.contains(event.date) : false;

                }).map(event => { // only need `map` so filteredEvents is an array

                    if (event.contactUid) {
                        // add contact uid to object prop (automatic unique filter)
                        contactUidsForFilteredEvents[event.contactUid] = true;
                    }

                    return event;
                });

                // console.log('contactUidsForFilteredEvents', contactUidsForFilteredEvents);

                const filteredContacts = Object.keys(contactUidsForFilteredEvents).map(contactUid => {
                    return Object.assign(
                        contacts[contactUid],
                        { uid: contactUid }
                    );
                });

                console.log('filteredContacts', filteredContacts);

                const contactBreakdowns = [
                    'birthCountry',
                    'ethnicity',
                    'firstInjectionAge',
                    'genderIdentity',
                    'hispanic'
                ];

                const contactBreakdownData = contactBreakdowns.reduce((agg, breakdownField) => {

                    const breakdownFieldValsAsKeys = filteredContacts.reduce((breakdownFieldValAgg, contact) => {

                        // { 'US' : 123, ...  }
                        breakdownFieldValAgg[contact[breakdownField]] = !breakdownFieldValAgg[contact[breakdownField]] ? 1 : breakdownFieldValAgg[contact[breakdownField]] + 1;

                        return breakdownFieldValAgg;
                    }, {});

                    agg[breakdownField] = Object.keys(breakdownFieldValsAsKeys).map(breakdownFieldVal => {

                        // console.log('breakdownFieldVal', breakdownFieldVal)

                        return {
                            label: breakdownFieldVal,
                            count: breakdownFieldValsAsKeys[breakdownFieldVal]
                        };
                    });

                    return agg;
                }, {});


                return res.status(200)
                    .send(JSON.stringify({
                        events: {
                            meta: {
                                total: 100,
                            },
                            total: 0
                        },
                        contacts: Object.assign(
                            {
                                '_meta': {
                                    count: filteredContacts.length,
                                    unfilteredCount: Object.keys(contacts).length,
                                },
                            },
                            contactBreakdownData
                        )
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
                        //     ethnicity: [
                        //         {
                        //             label: 'Hawaiian/Pacific Islander',
                        //             count: 0,
                        //         }
                        //     ],
                        //     hiv: [
                        //         {
                        //             label: 'confirmed',
                        //             count: 0
                        //         }
                        //     ]
                        // }
                    }));

            })
            .catch(err => {
                console.log('Error fetching contacts or events', err);
            });

    });

});

function flattenEventNodes(node) {

    // console.log('node', JSON.stringify(node).substr(0,50));

    if (node.contactUid || node.uid || node.date || node.eventDate || typeof node === 'string') {
        return [node];
    } else {

        const nodeAsArr = typeof node !== 'string' && typeof node.reduce === 'function' ? node : Object.keys(node).map(key => node[key]);

        // console.log('nodeAsArr', JSON.stringify(nodeAsArr).substr(0,50));

        return nodeAsArr.reduce((eventAgg, childNode) => {

            // console.log('childNode RECURSE', JSON.stringify(childNode).substr(0,50));

            return eventAgg.concat(flattenEventNodes(childNode));

        }, []);
    }
}


function convertObjToArray(obj) {
    return Object.keys(obj).map(key => {
        return obj[key];
    })
}

function getDateBoundsFromRangeKey( rangeKey ) {
    const now = new Date();
    let min, max;

    // note isoWeek starts on Monday

    switch ( rangeKey ) {
        case 'currentweek':
            min = moment().startOf('isoWeek');
            max = moment(now);
            break;

        case 'previousweek':
            min = moment().startOf('isoWeek').subtract(1, 'week');
            max = moment().startOf('isoWeek').subtract(1, 'day');
            break;

        case 'currentyear':
            min = moment().startOf('year');
            max = moment(now);
            break;

        case 'previousyear':
            min = moment().startOf('year').subtract(1, 'year');
            max = moment().startOf('year').subtract(1, 'day');
            break;
    }

    return {
        min,
        max,
    };
}