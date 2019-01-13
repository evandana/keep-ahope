import React, { Component } from 'react'

import { FieldWithManualOption } from '../common/FieldWithManualOption';

import { Card, CardTitle } from 'material-ui/Card';


class VisitOrOutreachQuestions extends Component {

    constructor(props) {
        super(props);
        this.buildSelectField = this.props.buildSelectField.bind(this);
        this.buildRadio = this.props.buildRadio.bind(this);
        this.buildToggle = this.props.buildToggle.bind(this);
        this.buildSlider = this.props.buildSlider.bind(this);
    };

    render() {

        const { updateIntakeFormField } = this.props;

        const referralsSelectOptionsList = [
            {primaryText: 'No Referrals', value: null},
            {primaryText: 'Medical attention', value: 'Medical attention'},
            {primaryText: 'Mental health', value: 'Mental health'},
            {primaryText: 'Other', value: 'other'},
        ];
        const enrollmentRadioOptions = [
            { name: 'enrollment', label: 'Enrollment', value: 'enrolled' },
            { name: 'refill', label: 'Refill', value: 'refill' },
        ];
        const numberOfOthersHelpingStepDetails = {
            defaultValue: 0,
            step: 1,
            min: 0,
            max: 12,
        }
        return (
            <Card>
                <CardTitle title='Visit or Outreach' titleColor={this.props.palette.primary1Color}/>
                <div style={{padding: '2rem'}}>
                    {this.buildToggle('Outreach', 'isOutreach', this.props.handleChildToggleChange)}
                </div>
                <div style={{padding: '2rem'}}>
                    <FieldWithManualOption
                        showManual={this.props.referrals && this.props.referrals.indexOf('other') > -1}
                        onManualChange={({manualVal, defaultFieldVal}) => {
                            const validDropdownOptions = referralsSelectOptionsList.map( obj => obj.value );
                            updateIntakeFormField({
                                key: 'referrals', 
                                val: [
                                    ...defaultFieldVal.filter( val => validDropdownOptions.indexOf(val) > -1 ),
                                    manualVal,
                                ]
                            })
                        }}
                        defaultFieldProps={{
                            title: 'Referrals',
                            val: this.props.referrals,
                        }}
                        defaultFieldEl={ this.buildSelectField({ title: 'Referrals', selectOptionsList: referralsSelectOptionsList, name: 'referrals', val: this.props.referrals, updateCallback: this.props.handleSelectChange, multiple: true }) }
                    />  
                </div>
                <div style={{padding: '2rem 2rem 0rem 2rem'}}>
                    {this.buildSlider('syringesGiven', 'Syringes Given', this.props.syringesGiven, this.props.handleSliderChange)}
                </div>
                <div style={{padding: '2rem 2rem 0rem 2rem'}}>
                    {this.buildSlider('syringesTaken', 'Syringes Taken', this.props.syringesTaken, this.props.handleSliderChange)}
                </div>
                <div style={{padding: '2rem'}}>
                    {this.buildToggle('Narcan was offered', 'narcanWasOffered', this.props.handleChildToggleChange)}
                </div>
                <div style={{padding: '2rem'}}>
                    {this.buildToggle('Narcan was given', 'narcanWasTaken', this.props.handleChildToggleChange)}
                </div>
                <div style={{padding: '2rem'}}>
                    {this.buildRadio('Enrollment', enrollmentRadioOptions, 'enrollment', this.props.handleChange)}
                </div>
                <div style={{padding: '2rem'}}>
                    {this.buildSlider('numberOfOthersHelping', 'Number of others helping', this.props.numberOfOthersHelping, this.props.handleSliderChange, numberOfOthersHelpingStepDetails)}
                </div>
            </Card>
        )
    }
}

export default VisitOrOutreachQuestions;
