
import React from 'react';

import {Card, CardHeader, CardText} from 'material-ui/Card';

class ContactInfo extends React.Component {

  render() {
    const { contact, palette } = this.props;

    const infoKeyStyle = {
      color: '#90A4AE',
      paddingRight: '.5rem'
    }

    return (
      <div>
        <Card initiallyExpanded={true} >
          <CardHeader
              title='Profile'
              titleColor={palette.primary1Color}
              subtitle={contact.uid}
              subtitleColor={palette.titleColor}
              actAsExpander={true}
              showExpandableButton={true}
          />

          <CardText expandable={true}>
            <div className="row">
              <div className="col-xs-6">
                <span style={infoKeyStyle}>Last Event</span>
                {contact.dateOfLastVisit && (contact.dateOfLastVisit.toLocaleDateString('en-US') + ' (' + contact.dateOfLastVisit.toLocaleTimeString('en-US') + ')' )}
              </div>
              <div className="col-xs-6">
                <span style={infoKeyStyle}>DOB</span>
                {contact.dateOfBirth && contact.dateOfBirth.toDateString()}
              </div>
              <div className="col-xs-6">
                <span style={infoKeyStyle}>Ethnicity</span>
                {contact.ethnicity}
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
                {contact.firstInjectionAge && contact.firstInjectionAge.toDateString()}
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

export default ContactInfo;
