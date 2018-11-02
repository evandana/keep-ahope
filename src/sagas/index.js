import { fork } from 'redux-saga/effects';
import authentication from './authentication';
import config from './config';
import contact from './contact';
import events from './events';
import reports from './reports';
import searchContacts from './searchContacts';

/**
 * use one root saga to yield all other side effect sagas
 */
function* sagas() {
    yield [
        fork(authentication),
        fork(config),
        fork(contact),
        fork(events),
        fork(reports),
        fork(searchContacts),
    ];
}

export default sagas;
