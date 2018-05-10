import React, { Component } from 'react';

import { getImageForEnv } from 'static/images/index';
import ContactInfoProfileCard from './contactInfoProfileCard';
import ContactInfoNotesCard from './contactInfoNotesCard';
import ContactInfoEventsCard from './contactInfoEventsCard';
// import EventsCard from '';
import muiThemeable from 'material-ui/styles/muiThemeable';

class ContactInfo extends Component {

    render() {

        const { user, uid, contact, muiTheme: {palette} } = this.props;

        return (
            <div>

                <h2>Contacts</h2>
                {contact.birthCountry}
                <pre>UID from URL: <span style={{color:'red'}}>{uid}</span></pre>

                <div>
                    <ContactInfoProfileCard palette={palette} contact={contact} />
                    <ContactInfoEventsCard palette={palette} events={contact.events} />
                    <ContactInfoNotesCard palette={palette} />
                </div>

            </div>
        );
    }
}

export default muiThemeable()(ContactInfo);
