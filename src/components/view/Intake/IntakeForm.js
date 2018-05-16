import React, { Component } from 'react'

import muiThemeable from 'material-ui/styles/muiThemeable';

import Paper from 'material-ui/Paper';

import { Field, reduxForm } from 'redux-form'

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Tabs, Tab } from 'material-ui/Tabs';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import Slider from 'material-ui/Slider';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import { createEvent, getContact } from 'actions';

import * as moment from 'moment';

import './styles.css';


class IntakeForm extends Component {

  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this)
    this.themePalette = this.props.muiTheme.palette
    this.state = {
      value: 1,
      newContact: false,
      intake: {
        eventData: {
          daily: {
            countHelpingOthers: 2,
            countSyringesGiven: 10,
            countSyringesTaken: 10,
            enrollmentOrRefill: "Enrollment",
            narcanGiven: false,
            narcanOffered: true
          },
          firstContact: false,
        },
        contactData: {
          uid: "jnde123199abc",
        }
      }
    }
  }

  handleChange(event, index, value) {
    this.setState({value})
  }

  submitForm() {
    const { dispatch } = this.props;
    this.createEvent(dispatch)
    this.updateContact(dispatch)
  }

  createEvent(dispatch) {
    dispatch(createEvent(this.state.eventData))
  }

  updateContact(dispatch) {
    // dispatch(getContact(contactData))
  }

  updateCheckNewContact() {
    this.setState({newContact: !this.state.newContact})
  }


  render() {

    const selectedMenuItemStyles = {
      color: this.themePalette.primary1Color
    }

    const textareaStyles = {
      width: '100%',
    }

    const clearLabelStyle = {
      color: this.themePalette.errorColor
    }

    const titleColorStyle = {
      'color': '#999'
    }

    const labelStyle = {
      'color': this.themePalette.primary3Color,
      'padding': '1rem 0 .5rem'
    }

    const newContact = this.state.newContact ? (
      <Card className="card">
        <div className="fields">
          <div>
            <TextField hintText="Date of Birth" />
          </div>
          <div>
            <div style={labelStyle}>
              Gender
            </div>
            <RadioButtonGroup
              name="gender"
              className="radio"
            >
              <RadioButton
                label="Male"
                value="male"
              />
              <RadioButton
                label="Female"
                value="female"
              />
              <RadioButton
                label="MtF"
                value="mtf"
              />
              <RadioButton
                label="FtM"
                value="ftm"
              />
              <RadioButton
                label="Refused"
                value="refused"
              />
            </RadioButtonGroup>
          </div>

          <div id="ageOfFirstInjection">
            <div style={labelStyle}>Age of First Injection</div>
            <Slider name="ageOfFirstInjection" defaultValue={0} min={0} max={80} />
          </div>

          <div>
            <div style={labelStyle}>
              Race
            </div>
            <SelectField
              // value={this.state.value}
              // onChange={this.handleChange}
              selectedMenuItemStyle={selectedMenuItemStyles}
              id="race"
            >
              <MenuItem primaryText="White" />
            </SelectField>
          </div>

          <div>
            <div style={labelStyle}>
              Ethnicity
            </div>
            <SelectField
              // value={this.state.value}
              // onChange={this.handleChange}
              selectedMenuItemStyle={selectedMenuItemStyles}
              id="ethnicity"
            >
              <MenuItem primaryText="Polish" />
            </SelectField>
          </div>

          <div style={labelStyle}>
            Hispanic
          </div>
          <Toggle label="No" defaultToggled={false} labelPosition="right" />

          <div>
            <div style={labelStyle}>
              Country of Birth
            </div>
            <RadioButtonGroup
              name="countryOfBirth"
              className="radio"
              defaultSelected="US"
            >
              <RadioButton
                label="US"
                value="US"
              />
              <RadioButton
                label="Puerto Rico"
                value="PR"
              />
              <RadioButton
                label="Other"
                value="Other"
              />
            </RadioButtonGroup>
          </div>
        </div>
      </Card>
    ) : (
      <div></div>
    )

    return (
      <div className="page">
        <div className="form">
          <Card className="card">
            <CardTitle style={titleColorStyle}>
              Form Questions
            </CardTitle>
            <div className="checkbox">
              <Checkbox
                label="Intake"
                defaultChecked={true}
              />
              <Checkbox
                label="New"
                onCheck={this.updateCheckNewContact.bind(this)}
              />
              <Checkbox label="Periodic" />
            </div>
          </Card>

          {newContact}

          <Card className="card">
            <div className="fields">
              <Toggle label="No Refill" defaultToggled={false} labelPosition="right" />

              <div>
                <TextField hintText="Date" />
              </div>

              <div id="syringesGiven">
                <div style={labelStyle}>Syringes Given</div>
                <Slider name="SyringesGiven" defaultValue={0} step={1} min={0} max={10} />
              </div>

              <div id="syringesTaken">
                <div style={labelStyle}>Syringes Taken</div>
                <Slider name="SyringesTaken" defaultValue={0} min={0} max={10} />
              </div>

              <SelectField
                value={this.state.value}
                onChange={this.handleChange}
                selectedMenuItemStyle={selectedMenuItemStyles}
                id="referrals"
              >
                <MenuItem value={1} primaryText="No Referrals" />
                <MenuItem value={2} primaryText="Referrals" />
              </SelectField>

              <div className="checkbox usedGiven">
                <div>
                  <div style={labelStyle}>Used</div>
                  <Checkbox
                    label="No"
                    id="ifUsed"
                    defaultChecked={true}
                  />
                </div>

                <div>
                  <div style={labelStyle}>Given</div>
                  <Checkbox
                    label="No"
                    id="ifGiven"
                  />
                </div>
              </div>

              <p>Number of People</p>
              <Slider
                name="NumPeople"
                defaultValue={0}
                min={0}
                max={10}
                id="numPeople"
              />
            </div>
          </Card>

          <Card className="card">
            <CardTitle style={titleColorStyle}>
              Event Notes
            </CardTitle>
            <div className="textAreaContainer">
              <TextField
                multiLine={true}
                rows={5}
                style={textareaStyles}
                id="eventNotes"
              />
            </div>
          </Card>

          <Card className="card">
            <CardTitle style={titleColorStyle}>
              Profile Notes
            </CardTitle>
            <div className="textAreaContainer">
              <TextField
                multiLine={true}
                rows={5}
                style={textareaStyles}
                id="profileNotes"
              />
            </div>
          </Card>

          <Card className="card">
            <div className="submitButtons">
              <FlatButton label="Clear Form" labelStyle={clearLabelStyle} />
              <FlatButton label="Save" primary={true} onClick={this.submitForm} />
            </div>
          </Card>
        </div>
      </div>
    )

  }

}

export default muiThemeable()(IntakeForm);
