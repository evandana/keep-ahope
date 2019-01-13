import React, { Component } from 'react'

import { FieldWithManualOption } from '../common/FieldWithManualOption';

import { Card, CardTitle } from 'material-ui/Card';
import TextField from 'material-ui/TextField';


class PeriodicIntakeForm extends Component {

    constructor(props) {
        super(props);

        this.buildSelectField = this.props.buildSelectField.bind(this);
        this.buildRadio = this.props.buildRadio.bind(this);
        this.buildToggle = this.props.buildToggle.bind(this);
    };

    getUniquePrimaryTextList({collection, realValue}) {
        const isManualInCollection = collection.find( obj => obj.primaryText === realValue || obj.value === realValue );
        return isManualInCollection ? collection : [ ...collection, {primaryText: realValue, value: realValue} ];
    }

    render() {

        const { updateIntakeFormField } = this.props;

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
                    {this.buildSelectField({ title: 'Health Insurer', selectOptionsList: insurerOptionsList, name: 'healthInsurer', val: this.props.healthInsurer, updateCallback: this.props.handleSelectChange, multiple: false })}
                </div>}

                <div style={{padding: '2rem'}}>
                    {this.buildToggle('OD In Last Year?', 'didOdLastYear', this.props.handleChildToggleChange)}
                </div>

                <div style={{padding: '2rem'}}>
                    {this.buildToggle('Witness an OD in Last Year?', 'didSeeOdLastYear', this.props.handleChildToggleChange)}
                </div>

                <div style={{padding: '2rem'}}>
                    <FieldWithManualOption
                        showManual={this.props.primaryDrug && ( this.props.primaryDrug === 'other' || primaryDrugOptionsList.findIndex( ddObj => ddObj.value === this.props.primaryDrug ) < 0 ) }
                        onManualChange={({manualVal, defaultFieldVal}) => {
                            updateIntakeFormField({
                                key: 'primaryDrug', 
                                val: manualVal
                            })
                        }}
                        defaultFieldProps={{
                            title: 'Primary Drug',
                            val: this.props.primaryDrug,
                            validOptionsList: primaryDrugOptionsList.map( obj => obj.value ),
                        }}
                        defaultFieldEl={this.buildSelectField({ 
                            title: 'Primary Drug', 
                            selectOptionsList: this.getUniquePrimaryTextList({
                                collection: primaryDrugOptionsList, 
                                realValue: this.props.primaryDrug,
                            }),
                            name: 'primaryDrug', 
                            val: this.props.primaryDrug, 
                            updateCallback: this.props.handleSelectChange, 
                            multiple: false 
                        })}
                    /> 
                </div>

                <div style={{padding: '2rem'}}>
                    <FieldWithManualOption
                        showManual={this.props.otherDrugs && this.props.otherDrugs.indexOf('other') > -1 }
                        onManualChange={({manualVal, defaultFieldVal}) => {
                            const validDropdownOptions = otherDrugOptionsList.map( obj => obj.value );
                            updateIntakeFormField({
                                key: 'otherDrugs', 
                                val: [
                                    ...defaultFieldVal.filter( val => validDropdownOptions.indexOf(val) > -1 ),
                                    manualVal,
                                ]
                            })
                        }}
                        defaultFieldProps={{
                            title: 'Other Drugs',
                            val: this.props.otherDrugs,
                            validOptionsList: otherDrugOptionsList.map( obj => obj.value ),
                        }}
                        defaultFieldEl={this.buildSelectField({ 
                            title: 'Other Drugs', 
                            selectOptionsList: otherDrugOptionsList,
                            name: 'otherDrugs', 
                            val: this.props.otherDrugs, 
                            updateCallback: this.props.handleSelectChange, 
                            multiple: true 
                        })}
                    />
                </div>

            </Card>
        )
    }

}

export default PeriodicIntakeForm;
