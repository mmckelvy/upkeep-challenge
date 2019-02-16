import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Col } from 'components'
import { colors, spacing } from 'theme'

export default class HeaderCell extends Component {
  render() {
    const { children } = this.props

    return (
      <Col
        style={{
          borderBottom: `1px solid ${colors.blueGrey500}`,
          padding: spacing.small
        }}>

        {children}
      </Col>
    )
  }
}

HeaderCell.propTypes = {
  children: PropTypes.node
}
