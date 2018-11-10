import React, { Component } from 'react';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

export class ContactInfoEventDetailsSection extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { eventDetailsSectionData, className, palette } = this.props;

        const styles = {
            container: {
                float: 'left',
                paddingBottom: '3.25em',
            },
            cell: {
                padding: '.8em .5em 0 .5em',
                height: '2em',
                overflow: 'hidden',
                whiteSpace: 'normal',
                textOverflow: 'ellipsis',
                overflowWrap: 'break-word',
            },
            row: {
                borderBottom: 'none',
                height: '2em',
            },
            headerRow: {
                height: '1.45em',
            },
            headerColumn: {
                height: '1.45em',
                padding: '.4em .5em .4em .5em',
                color: palette.accent1Color,
                fontWeight: 'bold',
                textAlign: 'center',
                letterSpacing: '.1em',
                textTransform: 'uppercase',
            }
        }

        return !eventDetailsSectionData || !eventDetailsSectionData.data || !eventDetailsSectionData.data.length ? null : (
            <div 
                className={className}
                style={ styles.container }
                >
                <Table>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                    >
                        <TableRow
                            style={ styles.headerRow }
                            >
                            <TableHeaderColumn 
                                colSpan={2} 
                                style={ styles.headerColumn }
                                >
                                {eventDetailsSectionData.label}
                            </TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                    >
                        {eventDetailsSectionData.data.map(attrObj => {
                            return (
                                <TableRow 
                                    key={ attrObj.key }
                                    style={ styles.row }
                                    >
                                    <TableRowColumn
                                        style={{ 
                                            ...styles.cell, 
                                            textAlign: 'right',
                                            color: palette.accent3Color
                                        }}
                                    >
                                        {attrObj.label}
                                    </TableRowColumn>
                                    <TableRowColumn
                                        style={ styles.cell }
                                        >
                                        {attrObj.value}
                                    </TableRowColumn>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        );
    }
}