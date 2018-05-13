import React, {Component} from 'react';

import AutoComplete from 'material-ui/AutoComplete';
import CancelIcon from 'material-ui/svg-icons/navigation/cancel';
import Paper from 'material-ui/Paper';

import muiThemeable from 'material-ui/styles/muiThemeable';

class ContactTypeaheadSearch extends Component {

    handleUpdateInput = (value) => {
        if (value.length > 0 && value.length < 16 /* TODO: validate entry regex here */) {
            this.props.typeaheadSearch(value);

            // navigate to contact search results page if we're not already there
            if (this.props.location.pathname !== '/contact') {
                this.props.history.push('/contact');
            }
        }

    };

    render() {
        const {
            dataSource,
            contactSearchQuery,
            setCurrentSearchQuery,
            muiTheme: {palette},
        } = this.props;

        return (
            <Paper
                style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    width: 'auto',
                    padding: '0.5rem',
                    position: 'relative', // cancel and char count are absolutely positioned
                }}
                zDepth={1}
            >
                <AutoComplete
                    dataSource={dataSource}
                    floatingLabelText="Search for a User ID"
                    fullWidth={true}
                    hintText="AA BB 01 01 2018 AAA"
                    menuStyle={{display: 'none'}} // FIXME:
                    onUpdateInput={this.handleUpdateInput}
                    searchText={contactSearchQuery}
                />
                <CancelIcon
                    color={palette.accent3Color}
                    style={{
                        position: 'absolute',
                        top: '2.5rem',
                        right: '0.4rem',
                        cursor: 'pointer',
                        zIndex: '1101',
                    }}
                    onClick={() => {setCurrentSearchQuery('')}}
                />
                <div style={{
                    position: 'absolute',
                    right: '0.5rem',
                    bottom: '-1rem',
                    fontSize: '0.6rem',
                }}>
                    {contactSearchQuery.length} / 15
                </div>
            </Paper>
        );
    }
}

export default muiThemeable()(ContactTypeaheadSearch);
