import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';


import CancelIcon from 'material-ui/svg-icons/navigation/cancel';

class ContactTypeaheadSearch extends Component {
    constructor(props){
        super(props);

        this.state = {
            value: props.value
        };

    }

    handleUpdateInput = (event, newVal) => {
        this.setState({value: newVal});
            this.props.typeaheadSearch(newVal);
    };

    render() {

        return (
                <TextField
                    style               = {{ backgroundColor: '#fff' }}
                    id                  = 'contact-search-input'
                    floatingLabelText   = 'Contact ID'
                    hintText            = 'AA BB 01 01 2018 AAA'
                    value               = { this.state.value }
                    onChange            = { this.handleUpdateInput }
                />
        );
    }
}

export default ContactTypeaheadSearch;
