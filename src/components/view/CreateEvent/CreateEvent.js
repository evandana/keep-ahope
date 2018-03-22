import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable';

import Paper from 'material-ui/Paper';

import { Field, reduxForm } from 'redux-form'

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Tabs, Tab } from 'material-ui/Tabs';
// import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';

import { createEvent } from 'actions';

import MuiForm from './MuiForm';

class CreateEvent extends Component {

    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.themePalette = this.props.muiTheme.palette;
        this.state = {
            selectedTab: !this.props.eventsOwned || this.props.eventsOwned.length < 1 ? 'new' : this.props.eventsOwned[0].uid ,
        };
    }

    numberify(val, defaultValue) {
        return !val ? defaultValue : typeof val !== "number" ? parseInt(val, 10) : val;
    }

    submitForm(formData) {
        // console.log('form', formData);
        const { dispatch, user } = this.props;

        dispatch(createEvent(formData, user));
    }


    handleChange = (value) => {
        this.setState({
            selectedTab: value,
        });
    };

    render() {

        const { eventsOwned } = this.props;

        const style = {
            field: {
                borderRight: '.5em solid #fff'
            }
        };

        return (
            <div className="page">
                <Tabs
                    inkBarStyle={{background: this.themePalette.highlight1Color}}
                    tabItemContainerStyle={{ backgroundColor: this.themePalette.ternaryTextColor }}
                    value={this.state.selectedTab}
                    onChange={this.handleChange}
                >
                    {eventsOwned.map(event => {
                        return (
                            <Tab 
                                label={event.title.length < 17 ? event.title : event.title.substring(0,15) + '...'} 
                                value={event.uid} 
                                key={event.uid}
                                >
                                <div className="text-content">
                                    <MuiForm
                                        key={event.uid}
                                        form={event.uid}
                                        initialValues={event}
                                        eventSubmitLabel='Save'
                                        createEventSubmitForm={this.submitForm}
                                    />
                                </div>
                            </Tab>
                        );
                    })}
                    <Tab icon={<AddCircleIcon />} value={'new'}>
                        <div className="text-content">
                            <Paper style={{
                                width: '100%',
                                padding: '1em',
                                marginTop: '-.5em',
                                marginBottom: '1.5em',
                                border: '1px solid '+ this.themePalette.accent1Color,
                                background: '#eee'
                            }}>Some note here
                            </Paper>
                            <MuiForm
                                form={'new'}
                                initialValues={{
                                    openingBid: 10,
                                    bidIncrement: 5,
                                    numberOffered: 1,
                                    useBy: '2018-09-01',
                                    show: true,
                                }}
                                eventSubmitLabel='Create Event'
                                createEventSubmitForm={this.submitForm}
                            />
                        </div>
                    </Tab>
                </Tabs>
            </div>
        )

    }

}

export default muiThemeable()(CreateEvent);


// export default muiThemeable()(reduxForm({
//     form: 'MaterialUiForm', // a unique identifier for this form
//     validate: this.validate,
//     // asyncValidate
// })(CreateEvent))