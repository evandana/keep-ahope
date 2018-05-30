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
/** APP **/
import config from 'config';
import AuthorizedRoute from 'components/controller/AuthorizedRoute';

import Contact from 'components/controller/Contact';
import Reports from 'components/controller/Reports';
import Messages from 'components/controller/Messages';

import Navigation from 'components/controller/Navigation';
import { getUser, fetchConfig, showLoginSpinner } from './actions';

import './app.css';

class App extends Component {

    constructor(props) {
        super(props);

        injectTapEventPlugin();

        /** Firebase Setup **/
        window._FIREBASE_ = firebase.initializeApp(config.firebase);
        window._FIREBASE_PROVIDER_ = new firebase.auth.GoogleAuthProvider();
        window._FIREBASE_PROVIDER_.addScope('https://www.googleapis.com/auth/userinfo.email');
        window._FIREBASE_DB_ = firebase.database();
        window._FIREBASE_STORAGE_ = firebase.storage().ref();
        window._FIREBASE_.auth().onAuthStateChanged(
            (googleUser) => {

                window._UI_STORE_.dispatch(showLoginSpinner(false));

                // user data from Google Auth
                if (googleUser && googleUser.uid) {
                    const googleUserData = {
                        uid: googleUser.uid, // Google UID
                        displayName: googleUser.displayName,
                        email: googleUser.email,
                    };

                    // fetch initial state
                    window._UI_STORE_.dispatch(fetchConfig());
                    window._UI_STORE_.dispatch(getUser(googleUserData));
                }
            }
        );
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
