import React, { Component } from 'react';

import { getImageForEnv } from 'static/images/index';
import ContactInfoProfileCard from './contactInfoProfileCard';
import ContactInfoNotesCard from './contactInfoNotesCard';
import ContactInfoEventsCard from './contactInfoEventsCard';
// import EventsCard from '';
import muiThemeable from 'material-ui/styles/muiThemeable';

class ContactInfo extends Component {

    render() {

        const { contact, muiTheme: {palette} } = this.props;

        const divStyles = {
          margin: '0 0 2rem'
        }

        return (
            <form className="form">
                <div style={divStyles}>
                    <ContactInfoProfileCard
                        palette={palette}
                        contact={contact}
                    />
                    <ContactInfoEventsCard
                        palette={palette}
                        events={contact.events}
                    />
                    <ContactInfoNotesCard
                        palette={palette}
                    />
                </div>
            </form>
        );
    }
}

export default muiThemeable()(ContactInfo);
