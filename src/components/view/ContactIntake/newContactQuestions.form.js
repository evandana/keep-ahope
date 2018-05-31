import React, { Component } from 'react'

import { Card, CardTitle, CardText } from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';


class NewContactQuestionsForm extends Component {

    constructor(props) {
        super(props);

        this.buildSelectField = this.props.buildSelectField.bind(this);
        this.buildRadio = this.props.buildRadio.bind(this);
        this.buildToggle = this.props.buildToggle.bind(this);
        this.buildSlider = this.props.buildSlider.bind(this);
    };


    render() {

        const radioButtonGenderList = [
            {label: 'Male', value: 'male'},
            {label: 'Female', value: 'female'},
            {label: 'MtF', value: 'mtf'},
            {label: 'FtM', value: 'ftm'},
            {label: 'Refused', value: 'refused'},
        ];

        const enthnicityOptionsList = [
            {primaryText: 'American Indian', value: 'AI'},
            {primaryText: 'Asian', value: 'Asian'},
            {primaryText: 'Black/African American', value: 'BAA'},
            {primaryText: 'Hawaiin/Pacific Islander', value: 'HPI'},
            {primaryText: 'White', value: 'White'},
            // TODO: user needs to be able to click this and enter in their own custom entry
            {primaryText: 'Other', value: 'Other'},
            {primaryText: 'Prefer not to say', value: 'Refuse'},
        ];

        const countryOfBirthList = [
            {label: 'US', value: 'US'},
            {label: 'Puerto Rico', value: 'PR'},
            // TODO: user needs to be able to click this and enter in their own custom entry
            {label: 'Other', value: 'Other'},
        ];

        const options = {
            defaultValue: 0,
            step: 1,
            min: 1,
            max: 100,
        }

        // rest of the stuff for this form
        return (
            <Card>
                <CardTitle title='First Contact' titleColor={this.props.palette.primary1Color}/>

                <div style={{padding: '2rem'}}>
                    <DatePicker
                        hintText="Date of Birth"
                        floatingLabelText="Date of Birth"
                        value={this.props.contactDateOfBirth}
                        // FIXME:
                        // onChange={this.setDateOfBirth}
                        autoOk={true}
                        openToYearSelection={true}
                    />
                </div>

                <div style={{padding: '2rem 2rem 0rem 2rem'}}>
                    {this.buildSlider('contactAgeOfFirstInjection', 'Age of First Injection', this.props.contactAgeOfFirstInjection, this.props.handleSliderChange, options)}
                </div>
                <div style={{padding: '2rem'}}>
                    {this.buildRadio('Gender Identity', radioButtonGenderList, 'contactGenderIdentity', this.props.handleChange)}
                </div>
                <div style={{padding: '2rem'}}>
                    {this.buildSelectField('Ethnicity', enthnicityOptionsList, 'contactEthnicity', this.props.handleSelectChange)}
                </div>
                <div style={{padding: '2rem'}}>
                    {this.buildRadio('Country of Birth', countryOfBirthList, 'contactCountryOfBirth', this.props.handleChange)}
                </div>
                <div style={{padding: '2rem'}}>
                    {this.buildToggle('Hispanic?', 'contactIsHispanic', this.props.handleChildToggleChange)}
                </div>
            </Card>
        )
    }

}

export default NewContactQuestionsForm;
