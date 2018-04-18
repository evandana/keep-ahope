import React from 'react';
import './styles.css';

import Login from 'components/controller/Login'

const NotAuthorizedView = props => {

    const {user} = props;

    return (
        <div className="page">
            {!user || Object.keys(user.permissions).length < 1 ? <Login /> : 
                !user.permissions || !user.permissions.basic ? 'Logged in, but basic permissions have not been granted.' : ''}
        </div>
    );
};

export default NotAuthorizedView;