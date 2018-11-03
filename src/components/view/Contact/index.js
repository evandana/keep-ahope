import React, { Component } from 'react';

import ContactInfo from 'components/controller/ContactInfo';
import ContactIntake from 'components/controller/ContactIntake';
import ContactNavigation from 'components/controller/ContactNavigation';
import ContactSearchResults from 'components/controller/ContactSearchResults';

import Snackbar from 'material-ui';

class Contact extends Component {

    render() {

        const { match, contact, snackbarStatus } = this.props;

        const urlPathUid = match && match.params && match.params.uid && match.params.uid.toLowerCase();
        const urlPathAction = match && match.params && match.params.action && match.params.action.toLowerCase();

        return (
            <div>
                <div>
                    {/* <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open={open}
                        onClose={this.handleClose}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">I love snacks</span>}
                        /> */}
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
