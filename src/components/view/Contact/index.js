import React, { Component } from 'react';

import ContactInfo from 'components/controller/ContactInfo';
import ContactIntake from 'components/controller/ContactIntake';
import ContactNavigation from 'components/controller/ContactNavigation';
import ContactSearchResults from 'components/controller/ContactSearchResults';

class Contact extends Component {

    render() {

        const { match, contact } = this.props;

        const urlPathUid = match && match.params && match.params.uid && match.params.uid.toLowerCase();
        const urlPathAction = match && match.params && match.params.action && match.params.action.toLowerCase();

        return (
            <div>
                <div>
                    {!urlPathAction && (
                        <ContactSearchResults
                            contactUidEntry='hardcoded123'>
                        </ContactSearchResults>
                    )}
                    {urlPathAction === 'intake' && (
                        <div>
                            <ContactNavigation/>
                            <ContactIntake
                                uid={urlPathUid}
                                contact={contact}
                            />
                        </div>
                    )}
                    {urlPathAction === 'info' && (
                        <div>
                            <ContactNavigation/>
                            <ContactInfo
                                uid={urlPathUid}
                                contact={contact}
                            />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Contact;
