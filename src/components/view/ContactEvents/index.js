import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';

import { getImageForEnv } from 'static/images/index'

class Events extends Component {

  render() {
    const { contactEvents } = this.props

    const cardProps = {
      initiallyExpanded: true
    }

    const cardHeaderProps = {
      actAsExpander: true,
      showExpandableButton: true,
      titleColor: this.props.titleColor
    }

    const cardTextProps = {
      expandable: true
    }

    return (
      <div className='page'>
        <Card {...cardProps}>

          <CardHeader {...cardHeaderProps}>
            Events
          </CardHeader>

          <CardText {...cardTextProps}>
            <list>
              {!!contactEvents && contactEvents.map(event => (
                <ListItem key={event.uid} disabled={true}>
                  {event.uid}
                </ListItem>
              ))}
            </list>
          </CardText>

        </Card>
      </div>
    );
  }
}

export default Events;
