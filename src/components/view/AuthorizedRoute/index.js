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
        
        const pageWrapperStyles = {
            position: 'fixed',
            width: '100%',
            height: 'calc(100% - 175px)',
            // height: userPermissions.admin ? 'calc(100% - 247px)' : 'calc(100% - 175px)',
        }

        if (userPermissions && userPermissions.basic && location.pathname === '/') {
            return <Redirect to="/intake"/>
        }

        return (
            <Route {...rest} render={props => (
                userPermissions.basic ? (
                        <div className='page-wrapper' style={pageWrapperStyles}>
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
