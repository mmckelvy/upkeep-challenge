import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Col } from 'components'
import { colors, spacing } from 'theme'

export default class BodyCell extends Component {
  render() {
    const { children } = this.props

    return (
      <Col
        style={{
          borderBottom: `1px solid ${colors.blueGrey100}`,
          padding: `${spacing.med}px ${spacing.small}px`
        }}>

        {children}
      </Col>
    )
  }
}

BodyCell.propTypes = {
  children: PropTypes.node
}
