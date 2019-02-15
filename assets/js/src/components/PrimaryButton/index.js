import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { colors, spacing } from 'theme'
import Hover from '../Hover'

export default class PrimaryButton extends Component {
  render() {
    const { text } = this.props

    return (
      <Hover>
        {({ hovered, handleEnter, handleLeave }) => {
          return (
            <button
              style={{
                padding: spacing.base,
                cursor: 'pointer',
                backgroundColor: hovered
                  ? colors.red700
                  : colors.red900,
                color: 'white'
              }}>

              {children}
            </button>
          )
        }}
      </Hover>

    )
  }
}

PrimaryButton.propTypes = {
  text: PropTypes.node
}
