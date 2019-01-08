import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import PersonIcon from 'material-ui/svg-icons/social/person';
import PersonAddIcon from 'material-ui/svg-icons/social/person-add';
import Divider from 'material-ui/Divider';

class ContactSearchResults extends Component {

    handleNavigationToContact(contactUid) {
        this.props.getContact(contactUid);
        this.props.setCurrentSearchQuery(contactUid || '');
        this.props.history.push(`/contact/${contactUid}/intake`);
    }

    render() {
        const { searchResults, contactSearchQuery, currentContactUid } = this.props;

        let regex = new RegExp(/\w{4}\d{6}\w{3}/);
        const isValidSearchQuery = contactSearchQuery && contactSearchQuery.length === 13 && regex.test(contactSearchQuery);

        return (
            <div>
                {/* only show if there is nothing else showing */}
                {(searchResults.length === 0 && contactSearchQuery.length < 1 && !currentContactUid) && (
                    <Subheader>
                        Enter User ID {contactSearchQuery}
                    </Subheader>
                )}

                {currentContactUid && (
                    <div>
                        <Subheader>Most Recent Contact</Subheader>
                        <ListItem
                            primaryText={currentContactUid}
                            leftIcon={<PersonIcon />}
                            onClick={() => this.handleNavigationToContact(currentContactUid)}
                        />
                        <Divider/>
                    </div>
                )}

                {(searchResults.length === 0 && contactSearchQuery.length > 1) && (
                    <div>
                        <Subheader>
                            { !isValidSearchQuery ?
                                'No results for contact ID: "' + contactSearchQuery + '"' :
                                'Create new contact'
                            }
                        </Subheader>
                        { !isValidSearchQuery ? (
                            <ListItem
                                key='invalid'
                                primaryText='Enter a valid new ID to create a new contact'
                            />
                        ) : (
                            <ListItem
                                key='createNew'
                                primaryText={'CREATE ' + contactSearchQuery}
                                leftIcon={<PersonAddIcon />}
                                onClick={() => this.handleNavigationToContact(contactSearchQuery)}
                            />
                        )}
                        <Divider/>
                    </div>
                )}

                {searchResults.length > 0 && (
                    <div>
                        <List>
                            <Subheader>Results (Top 10)</Subheader>
                            {searchResults.map((result) => {
                                return (
                                    <ListItem
                                        key={result}
                                        primaryText={result}
                                        leftIcon={<PersonIcon />}
                                        onClick={() => this.handleNavigationToContact(result)}
                                    />
                                )
                            })}
                            </List>
                        <Divider />
                    </div>
                )}
            </div>
        );
    }
}

export default ContactSearchResults;
