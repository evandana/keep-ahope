import config from './config';
import contact from './contact';
import contacts from './contacts';
import reportsData from './reportsData';
import user from './user';

function isLoggedIn(state = false, action) {
    return state;
}

const reducers = {
    config,
    contact,
    contacts,
    reportsData,
    isLoggedIn,
    contact,
    user,
};

export default reducers;
