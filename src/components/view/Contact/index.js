import React, { Component } from 'react';

import ContactInfo from 'components/controller/ContactInfo';
import ContactIntake from 'components/controller/ContactIntake';
import ContactNavigation from 'components/controller/ContactNavigation';

class Contact extends Component {

    render() {

        const { user, match } = this.props;

        const urlPathUid = match && match.params && match.params.uid && match.params.uid.toLowerCase();
        const urlPathAction = match && match.params && match.params.action && match.params.action.toLowerCase();
    
        return (
            <div>
                <ContactNavigation
                    >
                </ContactNavigation>
                <div className='page'>
                    {urlPathAction === 'intake' && (
                        <ContactIntake
                            uid={urlPathUid}
                            >
                        </ContactIntake>
                    )}
                    {urlPathAction === 'info' && (
                        <ContactInfo
                            uid={urlPathUid}
                            >
                        </ContactInfo>
                    )}
                </div>
            </div>
        );
    }
}

export default Contact;