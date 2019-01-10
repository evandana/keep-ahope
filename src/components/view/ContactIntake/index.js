import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable';

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import Slider from 'material-ui/Slider';
import { Card, CardTitle } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';

import PeriodicQuestionsForm from 'components/view/ContactIntake/periodicQuestions.form';
import NewContactQuestionsForm from 'components/view/ContactIntake/newContactQuestions.form';
import VisitOrOutreachQuestions from 'components/view/ContactIntake/visitOrOutreachQuestions.form';

import './styles.css';


class IntakeForm extends Component {

    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this);
        this.updateIntakeFormField = this.props.updateIntakeFormField;
        this.createEvent = this.props.createEvent;
    }


    // i'm sure we'll want to change names on the db in the future at some time
    // or locally within state. so I'm abstracting this call to make it clear what data
    // we send in event creation
    packageFormDataForSubmission({initialState, userStateForDisplay}) {
        const visitOrOutreach = {
            isOutreach: userStateForDisplay.isOutreach,
            referrals: userStateForDisplay.referrals,
            syringesGiven: userStateForDisplay.syringesGiven,
            syringesTaken: userStateForDisplay.syringesTaken,
            narcanWasOffered: userStateForDisplay.narcanWasOffered,
            narcanWasTaken: userStateForDisplay.narcanWasTaken,
            enrollment: userStateForDisplay.enrollment,
            numberOfOthersHelping: userStateForDisplay.numberOfOthersHelping,
        }
        
        const periodic = userStateForDisplay.showPeriodic ? {
            housingStatus: userStateForDisplay.housingStatus,
            hivStatus: userStateForDisplay.hivStatus,
            isInCareForHiv: userStateForDisplay.isInCareForHiv,
            hepCStatus: userStateForDisplay.hepCStatus,
            isInCareForHepC: userStateForDisplay.isInCareForHepC,
            healthInsurer: userStateForDisplay.healthInsurer,
            primaryDrug: userStateForDisplay.primaryDrug,
            didOdLastYear: userStateForDisplay.didOdLastYear,
            didSeeOdLastYear: userStateForDisplay.didSeeOdLastYear,
            hasHealthInsurance: userStateForDisplay.hasHealthInsurance,
            otherDrugs: userStateForDisplay.otherDrugs,
            zipCode: userStateForDisplay.zipCode,
        } : null;
        
        const contactData = initialState.newContact || userStateForDisplay.showNewContactQuestions ? {
            newContactDate: userStateForDisplay.newContactDate,
            contactDateOfBirth: userStateForDisplay.contactDateOfBirth,
            contactGenderIdentity: userStateForDisplay.contactGenderIdentity,
            contactEthnicity: userStateForDisplay.contactEthnicity,
            contactIsHispanic: userStateForDisplay.contactIsHispanic,
            contactCountryOfBirth: userStateForDisplay.contactCountryOfBirth,
            contactAgeOfFirstInjection: userStateForDisplay.contactAgeOfFirstInjection,
        } : null;

        // dirty check to only submit data for visible forms
        let prunedEventData = {
            ...visitOrOutreach,
            ...periodic,
            ...contactData,
            profileNotes: userStateForDisplay.profileNotes,
            eventNotes: userStateForDisplay.eventNotes,
            date: userStateForDisplay.eventDate,
            contactUid: initialState.uid,
        };
        return prunedEventData;
    }

    submitForm({initialState, userStateForDisplay}) {
        // TODO: Ultimately should change these cases to prompts, not alert; but React errors for now
        // TODO: what about validation?
        if (initialState === userStateForDisplay) {
            alert("Cannot post empty form");
        } else {
            // TODO: should call an action 'SUBMIT_FORM' or something
            // which should take the event and contact info, and call the update contact
            // action from within
            let eventData = this.packageFormDataForSubmission({initialState, userStateForDisplay});
            this.createEvent( { eventData, history: this.props.history } );
        }
    }

    // helpers to build controlled input elements
    buildRadio(title, radioOptionsList, name, updateCallback) {
        let radioControls = radioOptionsList.map(option => (
            <RadioButton
                key={option.label}
                name={option.name}
                label={option.label}
                value={option.value}
            />
        ));

        let labelStyle = {
            color: this.props.palette.accent3Color,
            margin: '2rem 0 1rem 0'
        };

        return (
            <div>
                <div style={labelStyle}>{title}</div>
                <RadioButtonGroup
                    name={name}
                    onChange={updateCallback}
                    defaultSelected={this.props[name]}
                    valueSelected={this.props[name]}
                >
                    {radioControls}
                </RadioButtonGroup>
            </div>
        )
    };

    buildToggle(toggleName, stateName, updateCallback) {
        return (
            <Toggle
                label={toggleName}
                labelPosition="right"
                toggled={this.props[stateName]}
                onToggle={(event, isInputChecked) => {
                    updateCallback(stateName, isInputChecked)
                }}
            />
        )
    };

    buildSelectField(title, selectOptionsList, name, updateCallback, multiple=false) {
        const selectControls = selectOptionsList.map(selectOption => (
            <MenuItem
                key={selectOption.value}
                primaryText={selectOption.primaryText}
                value={selectOption.value}
                name={name}
            />
        ));

        const labelStyle = {
            color: this.props.palette.accent3Color,
            margin: '2rem 0 1rem 0'
        };

        return (
            <div>
                <div style={labelStyle}>{title}</div>
                <SelectField
                    multiple={multiple}
                    value={ this.props[name] }
                    style={{color: this.props.palette.primary1Color}}
                    name={name}
                    onChange={(e, index, value) => {
                        updateCallback(name, value, multiple, this.props[name])
                    }}
                >
                    {selectControls}
                </SelectField>
            </div>
        )
    };

    buildSlider(sliderName, labelText, sliderValue, updateCallback, overrides = {}) {
        let labelStyle = {
            color: this.props.palette.accent3Color,
            margin: '2rem 0 1rem 0'
        };
        
        const options = {
            defaultValue: overrides.defaultValue || 0,
            step: overrides.step || 10,
            min: overrides.min || 0,
            max: overrides.max || 50,
        }
        return (
            <div id={sliderName}>
                <div style={labelStyle}>
                    {labelText}
                    <span style={{paddingLeft: '.5rem'}}>
                        (<span style={{fontWeight: 'bold', color: this.props.palette.primary1Color, letterSpacing: '1px'}}>{sliderValue}</span>
                        <span>/{options.max}</span>)
                    </span>
                </div>
                <Slider
                    name={sliderName}
                    defaultValue={options.defaultValue}
                    step={options.step}
                    min={options.min}
                    max={options.max}
                    value={this.props[sliderName]}
                    onChange={(e, value) => updateCallback(sliderName, value)}
                />
            </div>
        )
    }

    handleSliderChange(name, value) {
        this.updateIntakeFormField({
            key: name,
            val: value,
        });
    };

    handleChildInputChange(event, value) {
        const target = event.target;
        const name = target.name;

        this.updateIntakeFormField({
            key: name,
            val: value,
        });
    };

    handleChildSelectChange(name, value, multiple = false, prevVal) {

        if (multiple) {
            value = this.handleMultiSelectChangeWithNull({newVal: value, prevVal});
        }

        this.updateIntakeFormField({
            key: name,
            val: value,
        });
    };

    handleMultiSelectChangeWithNull({newVal, prevVal}) {
        
        const selectedCount = newVal.length;
        const indexOfNullInCurr = newVal.findIndex( item => item === null );
        const indexOfNullInPrev = prevVal.findIndex( item => item === null );

        // if only one item selected, no action to take
        if (selectedCount === 1) {
            return newVal;
        } else if (selectedCount > 1 && indexOfNullInCurr > -1 ) {
            // if greater than 1 item and has null, then either return null or the other values
            if (indexOfNullInPrev > -1) {
                // if previously had null, then remove it
                return newVal.filter( item => item !== null );
            } else {
                // if previously didn't have null, then remove all others
                return newVal.filter( item => item === null );
            }
        } else {
            // else no changes needed
            return newVal;
        }
    }

    handleChildToggleChange(name, isInputChecked) {
        this.updateIntakeFormField({
            key: name,
            val: isInputChecked,
        })
    }

    addDefaultValuesToIntakeForm({initialState, userState}) {
        return {
            visitOrOutreach: userState.visitOrOutreach !== null ? userState.visitOrOutreach : true,
            showPeriodic: userState.showPeriodic !== null ? userState.showPeriodic : true,
            showNewContactQuestions: userState.showNewContactQuestions !== null ? userState.showNewContactQuestions : false,
        
            eventNotes: userState.eventNotes !== null ? userState.eventNotes : '',
            profileNotes: userState.profileNotes !== null ? userState.profileNotes : '',
        
            // form
            eventDate: userState.eventDate !== null ? userState.eventDate : new Date(),
        
            // periodic
            zipCode: userState.zipCode !== null ? userState.zipCode : '',
            didOdLastYear: userState.didOdLastYear !== null ? userState.didOdLastYear : false,
            didSeeOdLastYear: userState.didSeeOdLastYear !== null ? userState.didSeeOdLastYear : false,
            hasHealthInsurance: userState.hasHealthInsurance !== null ? userState.hasHealthInsurance : false,
            healthInsurer: userState.healthInsurer !== null ? userState.healthInsurer : null,
            hepCStatus: userState.hepCStatus !== null ? userState.hepCStatus : null,
            hivStatus: userState.hivStatus !== null ? userState.hivStatus : null,
            housingStatus: userState.housingStatus !== null ? userState.housingStatus : null,
            isInCareForHepC: userState.isInCareForHepC !== null ? userState.isInCareForHepC : null,
            isInCareForHiv: userState.isInCareForHiv !== null ? userState.isInCareForHiv : null,
            otherDrugs: userState.otherDrugs || [null],
            primaryDrug: userState.primaryDrug !== null ? userState.primaryDrug : null,
        
            // new contact
            contactAgeOfFirstInjection: userState.contactAgeOfFirstInjection !== null ? userState.contactAgeOfFirstInjection : 0,
            contactCountryOfBirth: userState.contactCountryOfBirth !== null ? userState.contactCountryOfBirth : '',
            contactDateOfBirth: userState.contactDateOfBirth !== null ? userState.contactDateOfBirth : new Date(1980, 0, 1),
            contactEthnicity: userState.contactEthnicity !== null ? userState.contactEthnicity : null,
            contactGenderIdentity: userState.contactGenderIdentity !== null ? userState.contactGenderIdentity : null,
            contactIsHispanic: userState.contactIsHispanic !== null ? userState.contactIsHispanic : false,
            newContactDate: userState.newContactDate !== null ? userState.newContactDate : new Date(),
        
            // visit or isOutreach
            enrollment: userState.enrollment !== null ? userState.enrollment : '',
            isOutreach: userState.isOutreach !== null ? userState.isOutreach : false,
            narcanWasOffered: userState.narcanWasOffered !== null ? userState.narcanWasOffered : false,
            narcanWasTaken: userState.narcanWasTaken !== null ? userState.narcanWasTaken : false,
            numberOfOthersHelping: userState.numberOfOthersHelping !== null ? userState.numberOfOthersHelping : 0,
            referrals: userState.referrals || [null],
            syringesGiven: userState.syringesGiven !== null ? userState.syringesGiven : 0,
            syringesTaken: userState.syringesTaken !== null ? userState.syringesTaken : 0,
            uid: initialState.uid,
        };
    }

    render() {

        const { intakeForm: {userState, initialState }, muiTheme: {palette} } = this.props;

        const userStateForDisplay = this.addDefaultValuesToIntakeForm({initialState, userState});

        const clearLabelStyle = {
            color: palette.errorColor
        }

        const fieldsStyle = {
            padding: '2rem',
        };

        // checkboxes to select which forms to show
        const formCheckboxOptionsArray = [
            {
                label: 'Visit or Outreach',
                key: 'visitOrOutreach',
                defaultChecked: true, 
                disabled: true,
                checked: userStateForDisplay.visitOrOutreach,
            },
            {
                label: 'First Contact',
                key: 'showNewContactQuestions',
                defaultChecked: initialState.newContact === true ? true : false, 
                disabled: initialState.newContact === true ? true : false, 
                checked: initialState.newContact === true ? true : userStateForDisplay.showNewContactQuestions,
                onCheckCallback: () => this.updateIntakeFormField({key: 'showNewContactQuestions', val: !userStateForDisplay.showNewContactQuestions})
            },
            {
                label: 'Periodic',
                key: 'showPeriodic',
                defaultChecked: true, 
                disabled: false, 
                checked: userStateForDisplay.showPeriodic,
                onCheckCallback: () => this.updateIntakeFormField({key: 'showPeriodic', val: !userStateForDisplay.showPeriodic})
            },
        ];

        return (
            <form className="form">

                <Card>
                    <CardTitle title='Form Questions' titleColor={palette.primary1Color}/>
                    <div style={fieldsStyle}>
                    <DatePicker
                        hintText="Date"
                        floatingLabelText="Date"
                        value={userStateForDisplay.eventDate}
                        onChange={(e, date) => this.updateIntakeFormField({key: 'eventDate', val: date})}
                        autoOk={true}
                    />
                    </div>
                    <div
                        className="row"
                        style={{padding: '2rem'}}
                        >
                        {formCheckboxOptionsArray.map(option => (
                            <Checkbox
                                className="col-xs-12 col-sm-6 col-md-3"
                                key={option.key}
                                labelStyle={option.labelStyle}
                                style={option.style}
                                label={option.label}
                                checked={option.checked}
                                // defaultChecked={option.defaultChecked}
                                disabled={option.disabled}
                                onCheck={option.onCheckCallback}
                            />
                        ))}
                    </div>
                </Card>


                <VisitOrOutreachQuestions
                    // helpers
                    updateIntakeFormField={this.updateIntakeFormField}
                    palette={palette}
                    handleSelectChange={this.handleChildSelectChange.bind(this)}
                    handleChange={this.handleChildInputChange.bind(this)}
                    handleChildToggleChange={this.handleChildToggleChange.bind(this)}
                    handleSliderChange={this.handleSliderChange.bind(this)}
                    buildSelectField={this.buildSelectField}
                    buildToggle={this.buildToggle}
                    buildRadio={this.buildRadio}
                    buildSlider={this.buildSlider}
                    // form data
                    isOutreach={userStateForDisplay.isOutreach}
                    referrals={userStateForDisplay.referrals}
                    syringesGiven={userStateForDisplay.syringesGiven}
                    syringesTaken={userStateForDisplay.syringesTaken}
                    narcanWasOffered={userStateForDisplay.narcanWasOffered}
                    narcanWasTaken={userStateForDisplay.narcanWasTaken}
                    enrollment={userStateForDisplay.enrollment}
                    numberOfOthersHelping={userStateForDisplay.numberOfOthersHelping}
                />

                {(initialState.newContact === true || userStateForDisplay.showNewContactQuestions) && <NewContactQuestionsForm
                    // helpers
                    updateIntakeFormField={this.updateIntakeFormField}
                    handleChange={this.handleChildInputChange.bind(this)}
                    handleSelectChange={this.handleChildSelectChange.bind(this)}
                    handleChildToggleChange={this.handleChildToggleChange.bind(this)}
                    handleSliderChange={this.handleSliderChange.bind(this)}
                    buildToggle={this.buildToggle}
                    buildSelectField={this.buildSelectField}
                    buildRadio={this.buildRadio}
                    buildSlider={this.buildSlider}
                    palette={palette}
                    // form data
                    contactDateOfBirth={userStateForDisplay.contactDateOfBirth}
                    contactGenderIdentity={userStateForDisplay.contactGenderIdentity}
                    contactEthnicity={userStateForDisplay.contactEthnicity}
                    contactIsHispanic={userStateForDisplay.contactIsHispanic}
                    contactCountryOfBirth={userStateForDisplay.contactCountryOfBirth}
                    contactAgeOfFirstInjection={userStateForDisplay.contactAgeOfFirstInjection}
                />}

                {userStateForDisplay.showPeriodic && <PeriodicQuestionsForm
                    // helpers
                    updateIntakeFormField={this.updateIntakeFormField}
                    handleChange={this.handleChildInputChange.bind(this)}
                    handleSelectChange={this.handleChildSelectChange.bind(this)}
                    handleChildToggleChange={this.handleChildToggleChange.bind(this)}
                    buildToggle={this.buildToggle}
                    buildSelectField={this.buildSelectField}
                    buildRadio={this.buildRadio}
                    palette={palette}
                    // form data
                    zipCode={userStateForDisplay.zipCode}
                    housingStatus={userStateForDisplay.housingStatus}
                    hivStatus={userStateForDisplay.hivStatus}
                    isInCareForHiv={userStateForDisplay.isInCareForHiv}
                    hepCStatus={userStateForDisplay.hepCStatus}
                    isInCareForHepC={userStateForDisplay.isInCareForHepC}
                    hasHealthInsurance={userStateForDisplay.hasHealthInsurance}
                    healthInsurer={userStateForDisplay.healthInsurer}
                    primaryDrug={userStateForDisplay.primaryDrug}
                    otherDrugs={userStateForDisplay.otherDrugs}
                    didOdLastYear={userStateForDisplay.didOdLastYear}
                    didSeeOdLastYear={userStateForDisplay.didSeeOdLastYear}
                    />}

                <Card>
                    <div className="textAreaContainer">
                    <TextField
                        multiLine={true}
                        rows={5}
                        fullWidth={true}
                        id="eventNotes"
                        floatingLabelText="Event Notes"
                        value={userStateForDisplay.eventNotes}
                        onChange={(e, value) => this.updateIntakeFormField({key: 'eventNotes', val: value})}
                        />
                    </div>
                </Card>

                <Card>
                    <div className="textAreaContainer">
                    <TextField
                        multiLine={true}
                        rows={5}
                        fullWidth={true}
                        id="profileNotes"
                        floatingLabelText="Profile Notes"
                        value={userStateForDisplay.profileNotes}
                        onChange={(e, value) => this.updateIntakeFormField({key: 'profileNotes', val: value})}
                    />
                    </div>
                </Card>

                <Card>
                    <div className="submitButtons">
                    {/* TODO: handle this in a more elegant way than just reloading the page */}
                    <FlatButton label="Clear Form" labelStyle={clearLabelStyle} onClick={() => window.location.reload()} />
                    <FlatButton label="Save" primary={true} onClick={() => this.submitForm({initialState, userStateForDisplay})} />
                    </div>
                </Card>
            </form>
        )
    }
}

export default muiThemeable()(IntakeForm);
