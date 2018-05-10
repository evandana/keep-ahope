
import React, { Component } from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

class ContactProfileCard extends React.Component {

  render() {
    const {userInfo, palette} = this.props;
    return (
      <div>
        <Card initiallyExpanded={true} >
          <CardHeader
              title='Notes'
              titleColor={palette.primary1Color}
              actAsExpander={true}
              showExpandableButton={true}
          />
          <CardText expandable={true}>
            notes props here
          </CardText>
        </Card>
      </div>
    )
  }
}

export default ContactProfileCard;
