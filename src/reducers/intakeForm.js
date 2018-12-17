import {
    UPDATE_INTAKE_FORM_FIELD,
    UPDATE_INTAKE_FORM_WITH_CONTACT,
} from '../constants';

const INITIAL_FORM_STATE = {
    visitOrOutreach: null, // true
    showPeriodic: null, // false,
    showNewContactQuestions: null, // false,

    eventNotes: null, // '',
    profileNotes: null,

    // form
    eventDate: null,

    // periodic
    housingStatus: null, // 'homeless',
    hivStatus: null, // 'neverTested',
    isInCareForHiv: null, //false,
    hepCStatus: null, // 'neverTested',
    isInCareForHepC: null, // false,
    healthInsurer: null,
    primaryDrug: null,
    didOdLastYear: null, // true,
    didSeeOdLastYear: null, // true,
    hasHealthInsurance: null, // false,
    otherDrugs: [null],

    // new contact
    newContactDate: null,
    contactDateOfBirth: null, // new Date(1980, 0, 1),
    contactGenderIdentity: null, // 'male',
    contactEthnicity: null, // 'White',
    contactIsHispanic: null, // true,
    contactCountryOfBirth: null, // '',
    contactAgeOfFirstInjection: null, // 0,

    // visit or isOutreach
    uid: null, // params.uid,
    isOutreach: null, // false,
    referrals: [null],
    syringesGiven: null, // 0,
    syringesTaken: null, // 0,
    narcanWasOffered: null, // false,
    narcanWasTaken: null, // false,
    enrollment: null, // '',
    numberOfOthersHelping: null, // 0,
};

const intakeFormState = {
    userState: INITIAL_FORM_STATE,
    initialState : INITIAL_FORM_STATE,
};

function intakeForm(state = intakeFormState, action) {

    const { key, val, contact } = action;
    
    switch (action.type) {
        case UPDATE_INTAKE_FORM_FIELD:

            // console.log('reducer: ', key, val)

            let updatedStateValObj = {};
            updatedStateValObj[key] = val;

            return {
                ...state,
                ...{userState: {
                    ...state.userState,
                    ...updatedStateValObj,
                }}
            };

        case UPDATE_INTAKE_FORM_WITH_CONTACT:
            
            const { initialStateWithContactInfo , userStateWithContactInfo } = getStateWithContactInfo({contact, initialState: state.initialState, userState: state.userState});

            return {
                ...state,
                ...{initialState: {
                    ...state.initialState,
                    ...initialStateWithContactInfo,
                }},
                ...{userState: {
                    ...state.userState,
                    ...userStateWithContactInfo,
                    // ...initialStateWithContactInfo // TODO ADD SOMETHING HERE!
                }}
            };

        default:
            return state;

    }
}

export default intakeForm;

function getStateWithContactInfo({contact, initialState, userState}) {

    let initialStateWithContactInfo = {}, 
        userStateWithContactInfo = {};

    const initialStateFieldToContactFieldMapping = {
        uid: 'uid',
        profileNotes: 'profileNotes',

        // new contact
        newContactDate: 'createdAt',
        contactDateOfBirth: 'dateOfBirth',
        contactGenderIdentity: 'genderIdentity',
        contactEthnicity: 'ethnicity',
        contactIsHispanic: 'isHispanic',
        contactCountryOfBirth: 'birthCountry',
        contactAgeOfFirstInjection: 'ageOfFirstInjection',

        // periodic
        housingStatus: 'housingStatus',
        hivStatus: 'hivStatus',
        isInCareForHiv: 'isInCareForHiv',
        hepCStatus: 'hepCStatus',
        isInCareForHepC: 'isInCareForHepC',
        healthInsurer: 'healthInsurer',
        primaryDrug: 'primaryDrug',
        didOdLastYear: 'didOdLastYear',
        didSeeOdLastYear: 'didSeeOdLastYear',
        hasHealthInsurance: 'hasHealthInsurance',
        otherDrugs: 'otherDrugs',
    }

    // if initialState val is default, then use val from contact, else don't return that prop
    Object.keys(initialState).forEach( initialStateKey => {
        if ( contact[ initialStateFieldToContactFieldMapping[initialStateKey] ] ) {

            initialStateWithContactInfo[ initialStateKey ] = contact[ initialStateFieldToContactFieldMapping[initialStateKey] ];

            // only override if user has not yet set the value
            if ( userState[ initialStateKey ] === INITIAL_FORM_STATE[ initialStateKey ]) {
                userStateWithContactInfo[ initialStateKey ] = contact[ initialStateFieldToContactFieldMapping[initialStateKey] ];
            } else {
                return;
            }
        }
    });

    return { initialStateWithContactInfo , userStateWithContactInfo };
}