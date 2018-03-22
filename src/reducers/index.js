import config from './config';
import contacts from './contacts';
import user from './user';

function isLoggedIn(state = false, action) {
    return state;
}

const reducers = {
    isLoggedIn,
    config,
    contacts,
    user,
};

export default reducers;