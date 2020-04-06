import React, {Component} from 'react'
import './styles.css'

import RaisedButton from 'material-ui/RaisedButton';

class CookieBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cookieConsent: window.localStorage.getItem('cookieConsent')
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        window.localStorage.setItem('cookieConsent', true);
        this.setState({'cookieConsent': true});
    }

    render() {
        const showBanner = !this.state.cookieConsent ? (
            <div className="cookie-banner">
                <p>This website uses cookies, which are necessary to its functioning. By closing this banner, clicking a link or continuing to browse otherwise, you agree to the use of cookies.</p>
                <RaisedButton label="OK, Got it!" onClick={this.handleClick} />
            </div>
        ) : null;
    
        return showBanner
    }
}

export default CookieBanner