import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Paper';

import CancelIcon from 'material-ui/svg-icons/navigation/cancel';

class ContactTypeaheadSearch extends Component {

    handleUpdateInput = (value) => {
        if (value.length > 0) {
            this.props.typeaheadSearch(value);
        }
    };

    render() {
        const { dataSource } = this.props;
        return (
            <Paper style={{display: 'flex', alignItems: 'baseline', width: 'auto', padding: '0.5rem'}} zDepth={1} >
                <AutoComplete
                    menuStyle={{display: 'none'}} // FIXME:
                    dataSource={dataSource}
                    floatingLabelText="Search for a User ID"
                    fullWidth={true}
                    hintText="AA BB 01 01 2018 AAA"
                    onNewRequest={(c) => {console.log(`go to contact/${c}/`)}}
                    onUpdateInput={this.handleUpdateInput}
                />
            </Paper>
        );
    }
}

export default ContactTypeaheadSearch;
