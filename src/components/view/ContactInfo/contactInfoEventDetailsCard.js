import React, { Component } from 'react';

import { Card, CardHeader, CardText } from 'material-ui/Card';

import { ContactInfoEventDetailsSection } from './contactInfoEventDetailsSection';

export class ContactInfoEventDetailsCard extends Component {

    constructor(props) {
        super(props);
    }


    upperCase(str){
        return str.toUpperCase();
    }

    convertCamelCaseToTitleCase(str) {
        str = str.replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, '$1 $2');
        str = str.toLowerCase(); //add space between camelCase text
        str = str.replace(/^\w|\s\w/g, this.upperCase);
        return str;
    }

    render() {

        const { event, palette } = this.props;

        const eventDate = new Date(event.attributes.date).toLocaleDateString();
        const updatedDate = new Date(event.updatedAt).toLocaleDateString();

        let primaryDateString = eventDate;
        let secondaryDateString = '';

        if (eventDate !== updatedDate) {
            primaryDateString = 'event date: ' + eventDate;
            secondaryDateString = 'log date: ' + updatedDate;
        }
        
        const attrCollection = Object.keys(event.attributes).map( key => {

            let label = this.convertCamelCaseToTitleCase( key );
            let value = event.attributes[key];
            
            if ( Object.prototype.toString.call(value) === '[object Date]' ) {
                // date
                if (key === 'createdAt' || key === 'updatedAt') {
                    value = new Date(value).toLocaleDateString() + ' (' + new Date(value).toLocaleTimeString() + ')';
                } else {
                    value = new Date(value).toLocaleDateString();
                }
            } if ( Array.isArray(value) ) {
                // array
                value = value.join(', ');
            } else {
                value = value.toString();
            }

            return {
                value,
                key,
                label,
            };
        });

        const sortedAttrCollections = {
            eventMeta: {
                label: 'Event',
                data: [],
            },
            persistent: {
                label: 'Persistent',
                data: [],
            },
            temporal: {
                label: 'Temporal',
                data: [],
            },
            other: {
                label: 'Other',
                data: [],
            },
        };

        attrCollection.forEach( attrObj => {
            switch (attrObj.key) {

                // event meta
                case 'createdAt':
                case 'updatedAt':
                case 'date':
                case 'newContactDate':
                    sortedAttrCollections.eventMeta.data.push(attrObj);
                    break;

                // persistent
                case 'ageOfFirstInjection':
                case 'countryOfBirth':
                case 'dateOfBirth':
                case 'dateOfLastVisit':
                case 'didOdLastYear':
                case 'ethnicity':
                case 'genderIdentity':
                case 'hasHealthInsurance':
                case 'hepCStatus':
                case 'hispanic':
                case 'hivStatus':
                case 'housingStatus':
                case 'isEnrolled':
                case 'isInCareForHepC':
                case 'isInCareForHiv':
                case 'otherDrugs':
                case 'otherDrugsAggregate':
                case 'primaryDrug':
                    sortedAttrCollections.persistent.data.push(attrObj);
                    break;

                // temporal
                case 'isOutreach':
                case 'narcanWasOffered':
                case 'narcanWasTaken':
                case 'numberOfOthersHelping':
                case 'referrals':
                case 'syringesGiven':
                case 'syringesTaken':
                    sortedAttrCollections.temporal.data.push(attrObj);
                    break;

                // other
                default:
                    sortedAttrCollections.other.data.push(attrObj);
            }
        });

        return (
            <Card>
                <CardHeader
                    title={primaryDateString}
                    subtitle={secondaryDateString}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    <div>
                        <ContactInfoEventDetailsSection 
                            eventDetailsSectionData={ sortedAttrCollections.persistent } 
                            palette={ palette } 
                            className="col-xs-12 col-sm-6"
                            />
                        <ContactInfoEventDetailsSection 
                            eventDetailsSectionData={ sortedAttrCollections.eventMeta } 
                            palette={ palette } 
                            className="col-xs-12 col-sm-6"
                            />
                        <ContactInfoEventDetailsSection 
                            eventDetailsSectionData={ sortedAttrCollections.temporal } 
                            palette={ palette } 
                            className="col-xs-12 col-sm-6"
                            />
                        <ContactInfoEventDetailsSection 
                            eventDetailsSectionData={ sortedAttrCollections.other } 
                            palette={ palette } 
                            className="col-xs-12 col-sm-6"
                            />
                    </div>
                    <div style={{ clear: 'both' }}> </div>
                </CardText>
            </Card>
        );
    }
}