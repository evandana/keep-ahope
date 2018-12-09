import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable';

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import Slider from 'material-ui/Slider';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';

// TODO: this should be mapped via props instead
import { createEvent } from 'actions';

import PeriodicQuestionsForm from 'components/view/ContactIntake/periodicQuestions.form';
import NewContactQuestionsForm from 'components/view/ContactIntake/newContactQuestions.form';
import VisitOrOutreachQuestions from 'components/view/ContactIntake/visitOrOutreachQuestions.form';

import './styles.css';


class IntakeForm extends Component {

    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this)

        const todayDate = new Date();

        const initDateOfBirth = new Date(1980, 0, 1)

        const { match: { params } } = this.props;

        // TODO: prepopulate with personal info issue #34
        this.initialFormState = {

            showPeriodic: false,
            showNewContactQuestions: false,

            eventNotes: '',

            // form
            eventDate: todayDate,

            // periodic
            housingStatus: 'homeless',
            hivStatus: 'neverTested',
            isInCareForHiv: false,
            hepCStatus: 'neverTested',
            isInCareForHepC: false,
            healthInsurer: null,
            primaryDrug: 'heroin',
            didOdLastYear: true,
            didSeeOdLastYear: true,
            hasHealthInsurance: false,
            otherDrugs: null,

            // new contact
            newContactDate: todayDate,
            contactDateOfBirth: initDateOfBirth,
            contactGenderIdentity: 'male',
            contactEthnicity: 'White',
            contactIsHispanic: true,
            contactCountryOfBirth: '',
            contactAgeOfFirstInjection: 0,

            // visit or isOutreach
            uid: params.uid,
            isOutreach: false,
            referrals: [null],
            syringesGiven: 0,
            syringesTaken: 0,
            narcanWasOffered: false,
            narcanWasTaken: false,
            enrollment: '',
            numberOfOthersHelping: 0,
        };

        this.state = { ...this.initialFormState };

        this.initialState = this.state;
        this.submittedState = this.state;
    }

    // i'm sure we'll want to change names on the db in the future at some time
    // or locally within state. so I'm abstracting this call to make it clear what data
    // we send in event creation
    packageFormDataForSubmission() {
        const visitOrOutreach = {
            isOutreach: this.initialFormState.isOutreach !== this.state.isOutreach ? this.state.isOutreach : null,
            referrals: this.initialFormState.referrals !== this.state.referrals ? this.state.referrals : null,
            syringesGiven: this.initialFormState.syringesGiven !== this.state.syringesGiven ? this.state.syringesGiven : null,
            syringesTaken: this.initialFormState.syringesTaken !== this.state.syringesTaken ? this.state.syringesTaken : null,
            narcanWasOffered: this.initialFormState.narcanWasOffered !== this.state.narcanWasOffered ? this.state.narcanWasOffered : null,
            narcanWasTaken: this.initialFormState.narcanWasTaken !== this.state.narcanWasTaken ? this.state.narcanWasTaken : null,
            enrollment: this.initialFormState.enrollment !== this.state.enrollment ? this.state.enrollment : null,
            numberOfOthersHelping: this.initialFormState.numberOfOthersHelping !== this.state.numberOfOthersHelping ? this.state.numberOfOthersHelping : null,
        }
        
        const periodic = this.state.showPeriodic ? {
            housingStatus: this.initialFormState.housingStatus !== this.state.housingStatus ? this.state.housingStatus : null,
            hivStatus: this.initialFormState.hivStatus !== this.state.hivStatus ? this.state.hivStatus : null,
            isInCareForHiv: this.initialFormState.isInCareForHiv !== this.state.isInCareForHiv ? this.state.isInCareForHiv : null,
            hepCStatus: this.initialFormState.hepCStatus !== this.state.hepCStatus ? this.state.hepCStatus : null,
            isInCareForHepC: this.initialFormState.isInCareForHepC !== this.state.isInCareForHepC ? this.state.isInCareForHepC : null,
            healthInsurer: this.initialFormState.healthInsurer !== this.state.healthInsurer ? this.state.healthInsurer : null,
            primaryDrug: this.initialFormState.primaryDrug !== this.state.primaryDrug ? this.state.primaryDrug : null,
            didOdLastYear: this.initialFormState.didOdLastYear !== this.state.didOdLastYear ? this.state.didOdLastYear : null,
            didSeeOdLastYear: this.initialFormState.didSeeOdLastYear !== this.state.didSeeOdLastYear ? this.state.didSeeOdLastYear : null,
            hasHealthInsurance: this.initialFormState.hasHealthInsurance !== this.state.hasHealthInsurance ? this.state.hasHealthInsurance : null,
            otherDrugs: this.initialFormState.otherDrugs !== this.state.otherDrugs ? this.state.otherDrugs : null,
        } : null;
        
        const contactData = this.state.showNewContactQuestions ? {
            newContactDate: this.state.newContactDate,
            contactDateOfBirth: this.initialFormState.contactDateOfBirth !== this.state.contactDateOfBirth ? this.state.contactDateOfBirth : null,
            contactGenderIdentity: this.initialFormState.contactGenderIdentity !== this.state.contactGenderIdentity ? this.state.contactGenderIdentity : null,
            contactEthnicity: this.initialFormState.contactEthnicity !== this.state.contactEthnicity ? this.state.contactEthnicity : null,
            contactIsHispanic: this.initialFormState.contactIsHispanic !== this.state.contactIsHispanic ? this.state.contactIsHispanic : null,
            contactCountryOfBirth: this.initialFormState.contactCountryOfBirth !== this.state.contactCountryOfBirth ? this.state.contactCountryOfBirth : null,
            contactAgeOfFirstInjection: this.initialFormState.contactAgeOfFirstInjection !== this.state.contactAgeOfFirstInjection ? this.state.contactAgeOfFirstInjection : null,
        } : null;

        // dirty check to only submit data for visible forms
        let prunedEventData = {
            ...visitOrOutreach,
            ...periodic,
            ...contactData,
            profileNotes: this.state.profileNotes,
            eventNotes: this.state.eventNotes,
            date: this.state.eventDate,
            contactUid: this.state.uid,
        };
        return prunedEventData;
    }

    submitForm() {
        // TODO: Ultimately should change these cases to prompts, not alert; but React errors for now
        // TODO: what about validation?
        if (this.initialState == this.state) {
            alert("Cannot post empty form");
        } else {
            // TODO: should call an action 'SUBMIT_FORM' or something
            // which should take the event and contact info, and call the update contact
            // action from within
            let eventData = this.packageFormDataForSubmission()
            this.props.dispatch( createEvent( { eventData, history: this.props.history } ) );
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
            color: this.props.palette.primary3Color,
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
                defaultToggled={false}
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
            color: this.props.palette.primary3Color,
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
            color: this.props.palette.primary3Color,
            margin: '2rem 0 1rem 0'
        }
        const options = {
            defaultValue: overrides.defaultValue || 0,
            step: overrides.step || 10,
            min: overrides.min || 0,
            max: overrides.max || 50,
        }
        return (
            <div id={sliderName}>
            <div style={labelStyle}>{labelText}<span style={{paddingLeft: '.5rem', fontSize: '.5rem'}}>({sliderValue}/{options.max})</span></div>
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
        this.setState({
            [name]: value
        });
    };

    handleChildInputChange(event, value) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleChildSelectChange(name, value, multiple = false, prevVal) {

        if (multiple) {
            value = this.handleMultiSelectChangeWithNull({newVal: value, prevVal});
        }

        this.setState({
            [name]: value
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
        this.setState({
            [name]: isInputChecked
        })
    }

    render() {

        const palette = this.props.muiTheme.palette;

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
                defaultChecked: true, disabled: true
            },
            {
                label: 'First Contact',
                defaultChecked: false, disabled: false, onCheckCallback: () => this.setState({showNewContactQuestions: !this.state.showNewContactQuestions})
            },
            {
                label: 'Periodic',
                defaultChecked: false, disabled: false, onCheckCallback: () => this.setState({showPeriodic: !this.state.showPeriodic})
            },
        ];

        return (
            <form className="form">

                <Card>
                    <CardTitle title='Form Questions' titleColor={palette.primary1Color}/>
                    <div style={fieldsStyle}>
                    {/* FIXME: */}
                    <DatePicker
                        hintText="Date"
                        floatingLabelText="Date"
                        value={this.state.eventDate}
                        onChange={(e, date) => this.setState({eventDate: date})}
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
                                key={option.label}
                                labelStyle={option.labelStyle}
                                style={option.style}
                                label={option.label}
                                defaultChecked={option.defaultChecked}
                                disabled={option.disabled}
                                onCheck={option.onCheckCallback}
                            />
                        ))}
                    </div>
                </Card>


                <VisitOrOutreachQuestions
                    // helpers
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
                    isOutreach={this.state.isOutreach}
                    referrals={this.state.referrals}
                    syringesGiven={this.state.syringesGiven}
                    syringesTaken={this.state.syringesTaken}
                    narcanWasOffered={this.state.narcanWasOffered}
                    narcanWasTaken={this.state.narcanWasTaken}
                    enrollment={this.state.enrollment}
                    numberOfOthersHelping={this.state.numberOfOthersHelping}
                />

                {this.state.showNewContactQuestions && <NewContactQuestionsForm
                    // helpers
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
                    contactDateOfBirth={this.state.contactDateOfBirth}
                    contactGenderIdentity={this.state.contactGenderIdentity}
                    contactEthnicity={this.state.contactEthnicity}
                    contactIsHispanic={this.state.contactIsHispanic}
                    contactCountryOfBirth={this.state.contactCountryOfBirth}
                    contactAgeOfFirstInjection={this.state.contactAgeOfFirstInjection}
                />}

                {this.state.showPeriodic && <PeriodicQuestionsForm
                    // helpers
                    handleChange={this.handleChildInputChange.bind(this)}
                    handleSelectChange={this.handleChildSelectChange.bind(this)}
                    handleChildToggleChange={this.handleChildToggleChange.bind(this)}
                    buildToggle={this.buildToggle}
                    buildSelectField={this.buildSelectField}
                    buildRadio={this.buildRadio}
                    palette={palette}
                    // form data
                    housingStatus={this.state.housingStatus}
                    hivStatus={this.state.hivStatus}
                    isInCareForHiv={this.state.isInCareForHiv}
                    hepCStatus={this.state.hepCStatus}
                    isInCareForHepC={this.state.isInCareForHepC}
                    hasHealthInsurance={this.state.hasHealthInsurance}
                    healthInsurer={this.state.healthInsurer}
                    primaryDrug={this.state.primaryDrug}
                    otherDrugs={this.state.otherDrugs}
                    didOdLastYear={this.state.didOdLastYear}
                    didSeeOdLastYear={this.state.didSeeOdLastYear}
                />}

                <Card>
                    <div className="textAreaContainer">
                    <TextField
                        multiLine={true}
                        rows={5}
                        fullWidth={true}
                        id="eventNotes"
                        floatingLabelText="Event Notes"
                        onChange={(e, value) => this.setState({eventNotes: value})}
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
                        onChange={(e, value) => this.setState({profileNotes: value})}
                    />
                    </div>
                </Card>

                <Card>
                    <div className="submitButtons">
                    {/* TODO: handle this in a more elegant way than just reloading the page */}
                    <FlatButton label="Clear Form" labelStyle={clearLabelStyle} onClick={() => window.location.reload()} />
                    <FlatButton label="Save" primary={true} onClick={this.submitForm} />
                    </div>
                </Card>
            </form>
        )
    }
}

export default muiThemeable()(IntakeForm);
