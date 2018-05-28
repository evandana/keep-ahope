'use strict';

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
const promise = require('promise');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.reportsdata = functions.https.onRequest((req, res) => {

    console.log('req.query.range', req.query.range);

    const dbRef = admin.database(),
        contactsRef = dbRef.ref('/contacts'),
        eventsRef = dbRef.ref('/events');
    
    promise.all([
        contactsRef.once('value'),
        eventsRef.once('value')
    ])
    .then( ([contactsSnapshot, eventsSnapshot]) => {
        const contacts = contactsSnapshot.val();
        const events = flattenEventNodes(convertObjToArray( eventsSnapshot.val() ));

        var contactUidsForFilteredEvents = {};

        const filteredEvents = events.filter( event => {
            
            if ( !!event.contactUid ) {

                // add contact uid to object prop (automatic unique filter)
                contactUidsForFilteredEvents[ event.contactUid ] = true;
            }

            return event;
        });     

        console.log('contactUidsForFilteredEvents', contactUidsForFilteredEvents);
        
        const filteredContacts = Object.keys(contactUidsForFilteredEvents).map( contactUid => {
            return {
                ...contacts[contactUid],
                uid: contactUid,
            };
        });

        console.log('filteredContacts', filteredContacts);

        const contactBreakdowns = [
            'birthCountry',
            'ethnicity',
            'firstInjectionAge',
            'genderIdentity',
            'hispanic'
        ];

        const contactBreakdownData = contactBreakdowns.reduce( (agg, breakdownField) => {

            const breakdownFieldValsAsKeys = filteredContacts.reduce( (breakdownFieldValAgg, contact) => {

                // { 'US' : 123, ...  }
                breakdownFieldValAgg[ contact[breakdownField] ] = !breakdownFieldValAgg[ contact[breakdownField] ] ? 1 : breakdownFieldValAgg[ contact[breakdownField] ] + 1;

                return breakdownFieldValAgg;
            }, {});

            agg[breakdownField] = Object.keys(breakdownFieldValsAsKeys).map( breakdownFieldVal => {

                console.log('breakdownFieldVal', breakdownFieldVal)

                return {
                    label: breakdownFieldVal,
                    count: breakdownFieldValsAsKeys[ breakdownFieldVal ]
                };
            });

            return agg; 
        }, {});
        

        res.status(200)
            .send( JSON.stringify({
                events: {
                    meta: {
                        total: 100,
                    },
                    total: 0
                },
                contacts: {
                    meta: {
                        total: contacts.length
                    },
                    ...contactBreakdownData,
                }
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
            }
        ));
    });
        
});

function flattenEventNodes (node) {

    // console.log('node', JSON.stringify(node).substr(0,50));

    if ( node.contactUid || node.uid || node.date || node.eventDate || typeof node === 'string' ) {
        return [ node ];
    } else {
        
        const nodeAsArr = typeof node !== 'string' && typeof node.reduce === 'function' ? node : Object.keys(node).map( key => node[key] );
        
        // console.log('nodeAsArr', JSON.stringify(nodeAsArr).substr(0,50));

        return nodeAsArr.reduce( (eventAgg, childNode) => {

            // console.log('childNode RECURSE', JSON.stringify(childNode).substr(0,50));

            return eventAgg.concat( flattenEventNodes( childNode ) );

        }, []);
    }
};
        

function convertObjToArray(obj) {
    return Object.keys(obj).map( key => {
        return obj[key];
    })
}