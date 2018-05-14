import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { getImageForEnv } from 'static/images/index';
import PersonIcon from 'material-ui/svg-icons/social/person';
import Divider from 'material-ui/Divider';

class ContactSearchResults extends Component {

    render() {

        const { searchResults, contactUidEntry, contactSearchQuery } = this.props;

        return (
            <div>
                {/* TODO: only show if there is nothing else showing */}
                {(searchResults.length === 0 && contactSearchQuery.length < 1) && <Subheader>
                    Enter User ID {contactSearchQuery}
                </Subheader>}

                <Subheader>Most Recent Contact</Subheader>
                <ListItem
                    primaryText={contactUidEntry}
                    leftIcon={<PersonIcon />}
                    onClick={() => window.location = `/contact/${contactUidEntry}/intake`}
                />

                {(searchResults.length === 0 && contactSearchQuery.length > 1) && (
                    <div>
                        <Subheader>
                            No results for contact ID: {contactSearchQuery}
                        </Subheader>
                        <Divider/>
                    </div>
                )}

                {searchResults.length > 0 && <div>
                    <List>
                        <Subheader>Results (Top 10)</Subheader>
                        {searchResults.map((result) => {
                            return (
                                <ListItem
                                    key={result}
                                    primaryText={result}
                                    leftIcon={<PersonIcon />}
                                    onClick={() => {
window.location = `/contact/${result}/intake`
}}
                                />
                            )
                        })}
                        </List>
                    <Divider />
                </div>}



            </div>
        );
    }
}

export default ContactSearchResults;
