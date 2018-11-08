import React, { Component } from 'react';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';

class ContactInfoEventsCard extends Component {

    /*
    * convert event uid to date format
    * @param uid {String} event uid of format 201803009-00-00-aaa
    * @return {string} dd/mm/yyyy
    */
    formatUidToDate(uid) {
        const splitUid = uid.split('');
        // extracting dd / mm / yyyy from UID
        return `${splitUid.slice(4,6).join('')}/${splitUid.slice(7,9).join('')}/${splitUid.slice(0,4).join('')}`
    }

    render() {
        const { contact, events, palette } = this.props

        const cardHeaderProps = {
            title: 'Events',
            actAsExpander: true,
            showExpandableButton: true,
            titleColor: palette.primary1Color
        }

        return (
            <Card initiallyExpanded={true}>
                <CardHeader {...cardHeaderProps} />
                <CardText expandable={true}>
                    <List
                        style={{padding: 0}}
                    >
                    {!!events ? (
                        // if there are events, list each one
                        events.map(event => {

                            const eventDate = new Date(event.attributes.date).toLocaleDateString();
                            const updatedDate = new Date(event.updatedAt).toLocaleDateString();

                            let primaryText = eventDate;
                            let secondaryText = '';

                            if ( eventDate !== updatedDate ) {
                                primaryText = 'event date: ' + eventDate;
                                secondaryText = 'log date: ' + updatedDate;
                            }

                            return (
                                <ListItem 
                                    key={event.id}
                                    disabled={true}
                                    primaryText={ primaryText }
                                    secondaryText={ secondaryText }
                                    innerDivStyle={{paddingLeft: 0, paddingTop: 0}}>
                                </ListItem>
                            );
                        })
                    ) : (
                        'There are no events for this user'
                    )}
                    </List>
                </CardText>
            </Card>
        );
    }
}

export default ContactInfoEventsCard;
