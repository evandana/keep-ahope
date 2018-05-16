import React, {Component} from 'react'
import { Route, Redirect } from 'react-router-dom';

import NotAuthorizedRoute from 'components/controller/NotAuthorizedRoute';

class AuthorizedRoute extends Component {

	constructor(props) {
		super(props);
    }

    render() {

        const { location, userPermissions, component: Component, ...rest } = this.props;

        const notAuthProps = {
            from: location
        };

        return (
            <Route {...rest} render={props => (
                userPermissions.basic ? (
                        <div className='page-wrapper'>
                            <Component {...props}/>
                        </div>
                    ) : (
                        <NotAuthorizedRoute {...notAuthProps} />
                    )
            )}/>
        );
    }
}

export default AuthorizedRoute;
