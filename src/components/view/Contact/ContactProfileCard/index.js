
import React, { Component } from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

class ContactProfileCard extends React.Component {

  render() {
    const { contact } = this.props;

    const infoKeyStyle = {
      color: '#90A4AE',
      paddingRight: '.5rem'
    }

    return (
      <div>
        <Card initiallyExpanded={true} >
          <CardHeader
              title='Profile'
              titleColor={this.props.titleColor}
              actAsExpander={true}
              showExpandableButton={true}
          />
          <CardText expandable={true}>
            <div className="row">
              <div className="col-xs-6">
                <span style={infoKeyStyle}>DOB</span>
                Not stored in firebase
              </div>
              <div className="col-xs-6">
                <span style={infoKeyStyle}>Race</span>
                Not stored in firebase
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6">
                <span style={infoKeyStyle}>Gender</span>
                {contact.genderIdentity}
              </div>
              <div className="col-xs-6">
                <span style={infoKeyStyle}>Ethnicity</span>
                {contact.ethnicity}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6">
                <span style={infoKeyStyle}>Age of first injection</span>
                {contact.firstInjectionAge}
              </div>
              <div className="col-xs-6">
                <span style={infoKeyStyle}>Hispanic</span>
                {contact.hispanic ? 'True' : 'False'}
              </div>
            </div>
          </CardText>
        </Card>
      </div>
    )
  }
}

export default ContactProfileCard;
