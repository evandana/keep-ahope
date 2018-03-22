import { fork } from 'redux-saga/effects';
import authentication from './authentication';
import config from './config';
import contacts from './contacts';
import events from './events';
import user from './user';

/**
 * use one root saga to yield all other side effect sagas
 */
function* sagas() {
    yield [
        fork(authentication),
        fork(config),
        fork(contacts),
        fork(events),
        fork(user),
    ];
}

export default sagas;