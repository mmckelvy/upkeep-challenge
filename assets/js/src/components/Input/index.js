import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Block from '../Block'

import { colors, font, spacing, type } from 'theme'

export default class Input extends Component {
  constructor() {
    super()

    this.state = {
      focused: false,
    }

    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleFocus(e) {
    this.setState({focused: true})

    if (this.props.onFocus) {
      this.props.onFocus(e)
    }
  }

  handleBlur(e) {
    this.setState({focused: false})

    if (this.props.onBlur) {
      this.props.onBlur(e)
    }
  }

  render() {
    const {
      label,
      width,
      inputStyle,
      inputContainerStyle,
      multiLine,
      onFocus,
      onBlur,
      ...rest
    } = this.props

    const { focused } = this.state
    const activeColor = focused
      ? colors.blue800
      : colors.blueGrey500

    return (
      <Block
        style={{
          width,
          ...inputContainerStyle
        }}>

        {label &&
          <label
            style={{
              color: activeColor,
              fontSize: type.exSmall
            }}>

            {label}
          </label>
        }

        {!multiLine &&
          <input
            style={{
              display: 'block',
              outline: 'none',
              fontSize: type.small,
              fontFamily: font.primaryFont,
              border: `1px solid ${activeColor}`,
              borderRadius: '2px',
              width: '100%',
              padding: `8px`,
              transition: 'border 250ms ease-in-out',
            }}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            ref={input => this.input = input}
            {...rest}
          />
        }

        {multiLine &&
          <textarea
            style={appliedStyles.input}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            disabled={disabled}
            ref={input => this.input = input}
            {...rest}
          />
        }
      </Block>
    )
  }
}

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  errorMsg: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  noError: PropTypes.bool, // If you don't want to have the error message
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inputStyle: PropTypes.object,
  inputContainerStyle: PropTypes.object,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  multiLine: PropTypes.bool,
}
