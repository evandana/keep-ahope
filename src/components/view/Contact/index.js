import React, { Component } from 'react';

import ContactInfo from 'components/controller/ContactInfo';
import Intake from 'components/controller/Intake';
import ContactNavigation from 'components/controller/ContactNavigation';
import ContactSearchResults from 'components/controller/ContactSearchResults';

class Contact extends Component {

    render() {

        const { user, match, contact } = this.props;

        const urlPathUid = match && match.params && match.params.uid && match.params.uid.toLowerCase();
        const urlPathAction = match && match.params && match.params.action && match.params.action.toLowerCase();

        return (
            <div>
                <ContactNavigation
                    >
                </ContactNavigation>
                <div className='page'>
                    {!urlPathAction && (
                        <ContactSearchResults
                            contactUidEntry='hardcoded123'>
                        </ContactSearchResults>
                    )}
                    {urlPathAction === 'intake' && (
                        <Intake
                            uid={urlPathUid}
                            >
                        </Intake>
                    )}
                    {urlPathAction === 'info' && (
                        <ContactInfo
                            uid={urlPathUid}
                            contact={contact}
                            >
                        </ContactInfo>
                    )}
                </div>
            </div>
        );
    }
}

export default Contact;
