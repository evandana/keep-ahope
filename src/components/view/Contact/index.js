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


        const regex = new RegExp(/\w{4}\d{6}\w{3}/);
        const isValidSearchQuery = contact.uid && contact.uid.length === 13 && regex.test(contact.uid);

        return (
            <div>
                {!isValidSearchQuery ? (
                    <div style={{
                        display: 'block',
                        padding: '1em',
                    }}>
                        <h2>Invalid Contact ID</h2>
                        <p>Please enter a valid contact ID in the header to continue</p>
                    </div>
                ) : (
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
                )}
            </div>
        );
    }
}

export default Contact;
