import React, {Component} from 'react'
import { Route } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';

class AuthorizedNav extends Component {

    render() {

        const { location, userPermissions, component: Component, ...rest } = this.props;

        return (
            <Route {...rest} render={ props => (
                userPermissions.basic ? (
                        <div className="test">
                            <Component {...props}/>
                        </div>
                    ) : (
                        <div>
                            <AppBar
                                title='AHOPE'
                                showMenuIconButton={false}
                                titleStyle={{
                                    padding: '1rem 0.5rem',
                                    height: 'auto' //override
                                }}
                            />
                        </div>
                    )
            )}/>
        );
    }
}

export default AuthorizedNav;
