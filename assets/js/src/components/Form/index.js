import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      values: props.initialInputs || {},
      errors: {},
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  handleChange(e) {
    this.setState({
      values: {
        ...this.state.values,
        ...{[e.target.name]: e.target.value}
      }
    })
  }

  submitForm() {
    this.handleSubmit()
  }

  handleSubmit(e) {
    if (e) {
      e.preventDefault()
    }

    const { onSubmit, validator, transform } = this.props
    const values = transform ? transform(this.state.values) : this.state.values

    if (validator) {
      const { isValid, errors } = validator(values)

      onSubmit({isValid, values, errors, resetForm: this.resetForm})
      this.setState({errors})

    } else {
      onSubmit({isValid: true, values, resetForm: this.resetForm})
    }
  }

  render() {
    const { style, children: renderFn } = this.props
    const { values, errors } = this.state

    return (
      <form
        ref={(form) => this.form = form}
        onSubmit={this.handleSubmit}
        style={style}>

        {renderFn({
          values,
          errors,
          handleChange: this.handleChange,
          submitForm: this.submitForm,
        })}
      </form>
    )
  }
}

Form.propTypes = {
  style: PropTypes.object,
  children: PropTypes.func,
  onSubmit: PropTypes.func,
  validator: PropTypes.func,
  transform: PropTypes.func,
  initialInputs: PropTypes.object
}
