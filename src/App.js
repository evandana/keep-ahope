/** REACT **/
import React, { Component } from 'react';
/** MATERIAL UI **/
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
/** ROUTER **/
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
/** REDUX **/
import { Provider } from 'react-redux';

/** APP **/
import AuthorizedRoute from 'components/controller/AuthorizedRoute';
import AuthorizedNav from 'components/controller/AuthorizedNav';

import Contact from 'components/controller/Contact';
import Reports from 'components/controller/Reports';
import Messages from 'components/controller/Messages';

import Navigation from 'components/controller/Navigation';
import { setCurrentSearchQuery, loginGoogleRequest } from './actions';

import './app.css';

const Parse = require('parse');

class App extends Component {

    constructor(props) {
        super(props);

        injectTapEventPlugin();
        
        Parse.initialize("AHOPEPARSESERVER");

        Parse.serverURL = 'https://keep-ahope.appspot.com/parse'
        window._Parse_ = Parse;

        // try to login with google (enables re-login on page refresh)
        window._UI_STORE_.dispatch( loginGoogleRequest() );

        window._UI_STORE_.dispatch(setCurrentSearchQuery(''));
    }


    render() {

        const muiTheme = getMuiTheme({
            palette: {
                primary1Color: '#1DAFEC', // override
                fadedPrimary1Color: '#4FDFFF', // additional
                primary2Color: '#47B4E0', // overrides the default
                tertiaryTextColor: '#8DC3DB', // additional
                accent1Color: '#8EC449', // override
                primaryLinkColor: '#1DAFEC', // additional
                secondaryLinkColor: '#8AC9EC', // additional
                highlight1Color: '#E8448B', // additional
                errorColor: '#E8448B', // additional
                warningColor: '#FF953F', // additional
                successColor: '#8EC449', // additional
                // DEFAULTS
                // primary1Color: cyan500,
                // primary2Color: cyan700,
                // primary3Color: grey400,
                // accent1Color: pinkA200,
                // accent2Color: grey100,
                // accent3Color: grey500,
                // textColor: darkBlack,
                // alternateTextColor: white,
                // canvasColor: white,
                // borderColor: grey300,
                // disabledColor: fade(darkBlack, 0.3),
                // pickerHeaderColor: cyan500,
                // clockCircleColor: fade(darkBlack, 0.07),
                // shadowColor: fullBlack,
            },
        });

        const { store, history } = this.props;

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <div className="app">
                            <AuthorizedNav path="/:context/:uid/:action/" component={Navigation} />
                            <AuthorizedNav exact path="/" component={Navigation} />
                            <Messages />
                            <Switch>
                                <AuthorizedRoute exact path="/contact/" component={Contact} />
                                <AuthorizedRoute path="/contact/:uid/:action" component={Contact} />
                                <AuthorizedRoute exact path="/reports" component={Reports} />
                                <AuthorizedRoute path="/" component={Contact} />
                            </Switch>
                        </div>
                    </ConnectedRouter>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
