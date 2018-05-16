
import React, { Component } from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

class ContactProfileCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {userInfo} = this.props;
    return (
      <div>
        <Card initiallyExpanded={true} >
          <CardHeader
              title='Notes'
              titleColor={this.props.titleColor}
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
