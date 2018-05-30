
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
                <span style={infoKeyStyle}>DOB</span>
                {/* TODO: add this to the DB */}
                {contact.dateOfBirth}
              </div>
              <div className="col-xs-6">
                <span style={infoKeyStyle}>Race</span>
                {/* TODO: add this to the DB */}
                {contact.race}
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

export default ContactInfo;
