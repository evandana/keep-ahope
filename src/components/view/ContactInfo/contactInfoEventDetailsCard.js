import React, { Component } from 'react';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export class ContactInfoEventDetailsCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { event } = this.props;


        const eventDate = new Date(event.attributes.date).toLocaleDateString();
        const updatedDate = new Date(event.updatedAt).toLocaleDateString();

        let primaryDateString = eventDate;
        let secondaryDateString = '';

        if (eventDate !== updatedDate) {
            primaryDateString = 'event date: ' + eventDate;
            secondaryDateString = 'log date: ' + updatedDate;
        }

        return (
            <Card>
                <CardHeader
                    title={primaryDateString}
                    subtitle={secondaryDateString}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                {/* <CardActions>
                    <FlatButton label="Action1" />
                    <FlatButton label="Action2" />
                </CardActions> */}
                <CardText expandable={true}>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>Attribute</TableHeaderColumn>
                                <TableHeaderColumn>Value</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { event.attributes && Object.keys(event.attributes).map( attrKey => {
                                return (
                                    <TableRow key={attrKey}>
                                        <TableRowColumn>{attrKey}</TableRowColumn>
                                        <TableRowColumn>{event.attributes[attrKey].toString()}</TableRowColumn>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardText>
            </Card>
        );
    }
}