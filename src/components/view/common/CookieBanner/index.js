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
                <p>This application uses cookies to improve website performance. We use cookies to personalize content and to analyze our traffic. We do not share your information with any outside partners.</p>
                <RaisedButton label="I consent to cookie policy" onClick={this.handleClick} />
            </div>
        ) : null;
    
        return showBanner
    }
}

export default CookieBanner