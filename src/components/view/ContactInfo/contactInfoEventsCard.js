import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';

import { getImageForEnv } from 'static/images/index'

class ContactInfoEventsCard extends Component {

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

    return (
        <Card {...cardProps}>
            <CardHeader {...cardHeaderProps} />
            <CardText {...cardTextProps}>
                <list>
                    {!!events && events.map(event => (
                    <ListItem key={event.uid} disabled={true}>
                        {event.uid}
                    </ListItem>
                    ))}
                </list>
            </CardText>
        </Card>
    );
  }
}

export default ContactInfoEventsCard;
