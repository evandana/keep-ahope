import React, { Component } from 'react'

import { Card, CardTitle } from 'material-ui/Card';


class NewVisitAndOutreachQuestions extends Component {

    constructor(props) {
        super(props);
        this.buildSelectField = this.props.buildSelectField.bind(this);
        this.buildRadio = this.props.buildRadio.bind(this);
        this.buildToggle = this.props.buildToggle.bind(this);
        this.buildSlider = this.props.buildSlider.bind(this);
    };

    render() {
        const referralSelectOptionsList = [
            {primaryText: 'No Referrals', value: null},
            {primaryText: 'Referrals', value: 'some list of referrals'},
        ];
        const enrollmentRadioOptions = [
            { name: 'enrollment', label: 'Enrollment', value: 'enrolled' },
            { name: 'refill', label: 'Refill', value: 'refill' },
        ];
        const options = {
            defaultValue: 0,
            step: 1,
            min: 0,
            max: 100,
        }
        return (
            <Card>
                <CardTitle title='Visit or Outreach' titleColor={this.props.palette.primary1Color}/>
                <div style={{padding: '2rem'}}>
                    {this.buildToggle('Outreach', 'isOutreach', this.props.handleChildToggleChange)}
                </div>
                <div style={{padding: '2rem'}}>
                    {this.buildSelectField('Referral', referralSelectOptionsList, 'referral', this.props.handleSelectChange)}
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
                    {this.buildSlider('numberOfOthersHelping', 'Number of others helping', this.props.numberOfOthersHelping, this.props.handleSliderChange, options)}
                </div>
            </Card>
        )
    }
}

export default NewVisitAndOutreachQuestions;
