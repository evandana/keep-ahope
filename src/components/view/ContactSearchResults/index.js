import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { getImageForEnv } from 'static/images/index';
import PersonIcon from 'material-ui/svg-icons/social/person';
import Divider from 'material-ui/Divider';

class ContactSearchResults extends Component {

    render() {

        const { searchResults, contactUidEntry } = this.props;

        return (
            <div>

            {searchResults.length === 0 && <Subheader>
                No results found.  Search by contact ID above
            </Subheader>}

            {searchResults.length > 0 && <div>
                <List>
                    <Subheader>Results</Subheader>
                    {searchResults.map((result) => {
                        return (
                            <ListItem
                                primaryText={result}
                                leftAvatar={<PersonIcon />}
                                // TODO: replace this with the actual result once routing works
                                onClick={() => {window.location = `/contact/${result}/intake`}}
                            />
                        )
                    })}
                    </List>
                <Divider />
            </div>}

            <Subheader>Most Recent Contact</Subheader>
            <ListItem
                primaryText={contactUidEntry}
                leftAvatar={<PersonIcon />}
                onClick={() => {window.location = `/contact/${contactUidEntry}/intake`}}
            />

            </div>
        );
    }
}

export default ContactSearchResults;
