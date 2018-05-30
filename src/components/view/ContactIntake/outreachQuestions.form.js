import React, { Component } from 'react'

import { Card, CardTitle, CardText } from 'material-ui/Card';


class OutreachQuestionsForm extends Component {

    constructor(props) {
        super(props);

        this.buildRadio = this.props.buildRadio.bind(this);
        this.buildToggle = this.props.buildToggle.bind(this);
        this.buildSlider = this.props.buildSlider.bind(this);
    };



    render() {

        const enrollmentRadioOptions = [
            { name: 'enrollment', label: 'Enrollment', value: 'enrolled' },
            { name: 'refill', label: 'Refill', value: 'refill' },
        ];
        // rest of the stuff for this form
        return (
            <Card>
                <CardTitle title='Outreach' titleColor={this.props.palette.primary1Color}/>

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
                    {this.buildSlider('numberOfOthersHelping', 'Number of others helping', this.props.numberOfOthersHelping, this.props.handleSliderChange)}
                </div>
            </Card>
        )
    }

}

export default OutreachQuestionsForm;
