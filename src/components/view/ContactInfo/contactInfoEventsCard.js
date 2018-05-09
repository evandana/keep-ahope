import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';

import { getImageForEnv } from 'static/images/index'

class ContactInfoEventsCard extends Component {

    formatUidToDate = uid => {
        const splitUid = uid.split('');
        return `${splitUid.slice(4,6).join('')}/${splitUid.slice(7,9).join('')}/${splitUid.slice(0,4).join('')}`
    }

    render() {
        const { events } = this.props

        const cardProps = {
            initiallyExpanded: true
        }

        const cardHeaderProps = {
            title: 'Events',
            actAsExpander: true,
            showExpandableButton: true,
            titleColor: this.props.titleColor
        }

        const cardTextProps = {
            expandable: true
        }

        const noEventsText = 'There are no events for this user'

        return (
            <Card {...cardProps}>
                <CardHeader {...cardHeaderProps} />
                <CardText {...cardTextProps}>
                    {/* QUESTION: is it even worth using list and listItem if we need
                    to override the styles like this? */}
                    <List
                        insetChildren={false}
                        style={{padding: 0}}
                    >
                    {!!events ? (
                        // if there are events, list each one
                        events.map(event => (
                        <ListItem key={event.uid}
                            disabled={true}
                            primaryText={this.formatUidToDate(event.uid)}
                            innerDivStyle={{paddingLeft: 0, paddingTop: 0}}>
                        </ListItem>
                        ))
                    ) : (
                        noEventsText
                    )}
                    </List>
                </CardText>
            </Card>
        );
    }
}

export default ContactInfoEventsCard;
