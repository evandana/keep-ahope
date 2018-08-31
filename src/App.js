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
/** FIREBASE **/
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/functions';
/** APP **/
import config from 'config';
import AuthorizedRoute from 'components/controller/AuthorizedRoute';

import Contact from 'components/controller/Contact';
import Reports from 'components/controller/Reports';
import Messages from 'components/controller/Messages';

import Navigation from 'components/controller/Navigation';
import { getUser, fetchConfig, showLoginSpinner, loginGoogleRequest } from './actions';

import './app.css';

class App extends Component {

    constructor(props) {
        super(props);

        injectTapEventPlugin();
        
        window._UI_STORE_.dispatch( loginGoogleRequest( { signInOverride: false } ) );

        /** Firebase Setup **/
        // window._FIREBASE_ = firebase.initializeApp(config.firebase);
        // window._FIREBASE_PROVIDER_ = new firebase.auth.GoogleAuthProvider();
        // window._FIREBASE_PROVIDER_.addScope('https://www.googleapis.com/auth/userinfo.email');
        // window._FIREBASE_DB_ = firebase.database();
        // window._FIREBASE_FUNCTIONS_ = firebase.functions();
        // window._FIREBASE_STORAGE_ = firebase.storage().ref();
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
                            <Navigation/>
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
