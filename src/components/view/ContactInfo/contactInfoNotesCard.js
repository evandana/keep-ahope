
import React from 'react';

import {Card, CardHeader, CardText} from 'material-ui/Card';

class ContactInfoNotesCard extends React.Component {

  render() {
    const {palette} = this.props;
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

export default ContactInfoNotesCard;
