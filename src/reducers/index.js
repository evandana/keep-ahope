import config from './config';
import contact from './contact';
import contacts from './contacts';
import user from './user';

function isLoggedIn(state = false, action) {
    return state;
}

const reducers = {
    config,
    contact,
    contacts,
    isLoggedIn,
    contact,
    user,
};

export default reducers;
