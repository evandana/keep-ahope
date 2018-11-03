import config from './config';
import contact from './contact';
import contacts from './contacts';
import notificationSingleton from './notificationSingleton';
import reportsData from './reportsData';
import user from './user';

function isLoggedIn(state = false) {
    return state;
}

const reducers = {
    config,
    contact,
    contacts,
    isLoggedIn,
    notificationSingleton,
    reportsData,
    user,
};

export default reducers;
