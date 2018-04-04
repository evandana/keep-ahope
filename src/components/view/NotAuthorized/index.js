import React from 'react';
import './styles.css';

import Login from 'components/controller/Login'

const NotAuthorizedPage = props => {

    return (
        <div className="page">
            <Login />
        </div>
    );
};

export default NotAuthorizedPage;