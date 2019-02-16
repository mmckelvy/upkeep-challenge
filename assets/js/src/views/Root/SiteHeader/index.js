import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Block, Hover } from 'components'

import { colors, spacing } from 'theme'

export default class SiteHeader extends Component {
  render() {
    const { logout, isAuthenticated } = this.props

    return (
      <Block
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: `${spacing.med}px ${spacing.med}px ${spacing.med}px 0`,
        }}>

        {isAuthenticated
          ?
            <Hover>
              {({ hovered, handleEnter, handleLeave }) => {
                return (
                  <Link
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                    to="/logout"
                    style={{
                      color: hovered ? colors.blue300 : colors.blue800,
                      transition: `250ms color ease-in-out`,
                      cursor: 'pointer'
                    }}>

                    Log out
                  </Link>
                )
              }}
            </Hover>

          : <Block>Welcome!</Block>
        }

      </Block>
    )
  }
}

SiteHeader.propTypes = {
  isAuthenticated: PropTypes.bool
}
