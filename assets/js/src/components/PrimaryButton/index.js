import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { colors, spacing, type, font } from 'theme'
import Hover from '../Hover'

export default class PrimaryButton extends Component {
  render() {
    const { children, style, ...rest } = this.props

    return (
      <Hover>
        {({ hovered, handleEnter, handleLeave }) => {
          return (
            <button
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
              style={{
                minWidth: spacing.base * 8,
                padding: spacing.base,
                cursor: 'pointer',
                backgroundColor: hovered
                  ? colors.red700
                  : colors.red900,
                color: 'white',
                borderRadius: '2px',
                fontFamily: font.primaryFont,
                fontSize: type.small,
                textTransform: 'uppercase',
                transition: '250ms background-color ease-in-out',
                ...style
              }}
              {...rest}>

              {children}
            </button>
          )
        }}
      </Hover>

    )
  }
}

PrimaryButton.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
}
