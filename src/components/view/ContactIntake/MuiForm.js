import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
// import muiThemeable from 'material-ui/styles/muiThemeable';
// import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
// import SelectField from 'material-ui/SelectField'
// import MenuItem from 'material-ui/MenuItem'
// import asyncValidate from './asyncValidate'

const validate = values => {
  const errors = {}
  // const requiredFields = [
  //   'firstName',
  //   'lastName',
  //   'email',
  //   'favoriteColor',
  //   'notes'
  // ]
  // requiredFields.forEach(field => {
  //   if (!values[field]) {
  //     errors[field] = 'Required'
  //   }
  // })
  // if (
  //   values.email &&
  //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  // ) {
  //   errors.email = 'Invalid email address'
  // }
  return errors
}
// name === 'openingBid' || name === 'bidIncrement' ? '$' : ''}
const renderTextField = ({
  input,
  label,
  type,
  name,
  value,
  meta: { touched, error },
  ...custom
}) => (
    <TextField
      floatingLabelText={label}
      errorText={touched && error}
      floatingLabelFixed={type === 'date' ? true : false}
      hintText={type === 'date' ? '' : label}
      type={type}
      {...input}
      {...custom}
    />
  )

const renderCheckbox = ({ input, label }) => (
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
  />
)

class MuiForm extends Component {

  constructor(props) {
    super(props);
    // this.themePalette = this.props.muiTheme.palette;
    this.state = {
      initialValues: this.props.initialValues
    };
  }

  render() {

    const { handleSubmit, createEventSubmitForm, pristine, reset, submitting, initialValues, eventSubmitLabel } = this.props;

    // this.setState({initialValues});  

    const style = {
      field: {
        borderRight: '.5em solid #fff'
      }
    };

    return (
      <form
        onSubmit={handleSubmit(createEventSubmitForm)}
      >

        <section className="row middle-xs middle-sm">
          <RaisedButton className="col-xs-7" type="submit" style={{ padding: 0 }} primary disabled={pristine || submitting}>
            {eventSubmitLabel || ''}
          </RaisedButton>
          <span className="col-xs-1"> </span>
          <RaisedButton className="col-xs-4" type="button" style={{ padding: 0 }} disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </RaisedButton>
        </section>

        <section className="row">
          <Field
            className="col-xs-12"
            style={style.field}
            name="uid"
            type="text"
            component={renderTextField}
            label="Contact UID"
          />
        </section>
      </form>
    )
  }
}

export default reduxForm({
  validate,
})(MuiForm)
