import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Block } from 'components'

export default class List extends Component {
  render() {
    const { workOrders } = this.props

    console.log(workOrders)

    return (
      <Block>

      </Block>
    )
  }
}

List.propTypes = {
  workOrders: PropTypes.arrayOf(PropTypes.object)
}
