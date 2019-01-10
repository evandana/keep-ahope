import React, { Component } from 'react'

import { Card, CardTitle } from 'material-ui/Card';
import TextField from 'material-ui/TextField';


class PeriodicIntakeForm extends Component {

    constructor(props) {
        super(props);

        this.buildSelectField = this.props.buildSelectField.bind(this);
        this.buildRadio = this.props.buildRadio.bind(this);
        this.buildToggle = this.props.buildToggle.bind(this);
    };

    render() {

        const housingRadioOptions = [
            { name: 'housed', label: 'Housed', value: 'housed' },
            { name: 'homeless', label: 'Homeless', value: 'homeless' },
            { name: 'unstable', label: 'Unstable Housed', value: 'unstable' },
        ];

        const hivRadioOptions = [
            { name: 'positive', label: 'Positive', value: 'positive' },
            { name: 'negative', label: 'Negative', value: 'negative' },
            { name: 'neverTested', label: 'Never Tested', value: 'neverTested' },
        ]

        const hepCOptions = [
            { name: 'positive', label: 'Positive', value: 'positive' },
            { name: 'negative', label: 'Negative', value: 'negative' },
            { name: 'neverTested', label: 'Never Tested', value: 'neverTested' },
        ];

        const insurerOptionsList = [
            {primaryText: 'Mass Health', value: 'MH'},
            {primaryText: 'Neighborhood Health Program', value: 'NHP'},
            {primaryText: 'Blue Cross Blue Shield', value: 'BCBS'},
            {primaryText: 'Tufts', value: 'TF'},
            // TODO: user needs to be able to click this and enter in their own custom entry
            {primaryText: 'Other', value: 'other'},
        ];

        const primaryDrugOptionsList = [
            {primaryText: '-none-', value: null},
            {primaryText: 'Heroin', value: 'heroin'},
            {primaryText: 'Methamphetamine', value: 'meth'},
            {primaryText: 'Cocaine', value: 'cocaine'},
            // TODO: user needs to be able to click this and enter in their own custom entry
            {primaryText: 'Other', value: 'other'},
        ];

        const otherDrugOptionsList = [
            {primaryText: '-none-', value: null},
            {primaryText: 'Heroin', value: 'heroin'},
            {primaryText: 'Methamphetamine', value: 'meth'},
            {primaryText: 'Cocaine', value: 'cocaine'},
            {primaryText: 'Crack', value: 'crack'},
            {primaryText: 'Benzos', value: 'benzos'},
            {primaryText: 'Suboxone (not RX)', value: 'suboxone'},
            {primaryText: 'Methadone (not RX)', value: 'methadone'},
            // TODO: user needs to be able to click this and enter in their own custom entry
            {primaryText: 'Other', value: 'other'},
        ]

        // rest of the stuff for this form
        return (
            <Card>
                <CardTitle title='Periodic' titleColor={this.props.palette.primary1Color}/>

                <TextField
                    style={{paddingTop: '2rem', paddingLeft: '2rem', paddingRight: '2rem'}}
                    floatingLabelText="Zip Code"
                    value={this.props.zipCode}
                    name='zipCode'
                    onChange={this.props.handleChange}
                />

                <div style={{padding: '2rem'}}>
                    {this.buildRadio('Housing Status', housingRadioOptions, 'housingStatus', this.props.handleChange)}
                </div>

                <div style={{padding: '2rem'}}>
                    {this.buildRadio('HIV Status', hivRadioOptions, 'hivStatus', (evt, val) => {
                        this.props.handleChange(evt, val);
                        this.props.handleChildToggleChange('isInCareForHiv', val === 'negative' ? false : this.props.isInCareForHiv );
                    })}
                </div>

                {this.props.hivStatus === 'positive' && <div style={{padding: '2rem'}}>
                    {this.buildToggle('In care for HIV?', 'isInCareForHiv', this.props.handleChildToggleChange)}
                </div>}

                <div style={{padding: '2rem'}}>
                    {this.buildRadio('Hepatitus C Status', hepCOptions, 'hepCStatus', (evt, val) => {
                        this.props.handleChange(evt, val);
                        this.props.handleChildToggleChange('isInCareForHepC', val === 'negative' ? false : this.props.isInCareForHepC );
                    })}
                </div>

                {this.props.hepCStatus === 'positive' &&  <div style={{padding: '2rem'}}>
                    {this.buildToggle('In care for Hepatitis C?', 'isInCareForHepC', this.props.handleChildToggleChange)}
                </div>}

                <div style={{padding: '2rem'}}>
                    {this.buildToggle('Health Insurance?', 'hasHealthInsurance', (evt, val, multiple) => {
                        this.props.handleChildToggleChange(evt, val, multiple);
                        this.props.handleSelectChange('healthInsurer', val ? null : this.props.healthInsurer );
                    })}
                </div>

                {this.props.hasHealthInsurance && <div style={{padding: '2rem'}}>
                    {this.buildSelectField('Health Insurer', insurerOptionsList, 'healthInsurer', this.props.handleSelectChange)}
                </div>}

                <div style={{padding: '2rem'}}>
                    {this.buildToggle('OD In Last Year?', 'didOdLastYear', this.props.handleChildToggleChange)}
                </div>

                <div style={{padding: '2rem'}}>
                    {this.buildToggle('Witness an OD in Last Year?', 'didSeeOdLastYear', this.props.handleChildToggleChange)}
                </div>

                <div style={{padding: '2rem'}}>
                    {this.buildSelectField('Primary Drug', primaryDrugOptionsList, 'primaryDrug', this.props.handleSelectChange)}
                </div>

                <div style={{padding: '2rem'}}>
                    {this.buildSelectField('Other Drugs', otherDrugOptionsList, 'otherDrugs', this.props.handleSelectChange, true)}
                </div>

            </Card>
        )
    }

}

export default PeriodicIntakeForm;
