import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import { Block, Grid, Row, Col, PrimaryButton } from 'components'
import { colors, spacing } from 'theme'

import List from './List'
import CreateWorkOrder from './CreateWorkOrder'

export default class WorkOrders extends Component {
  constructor() {
    super()

    this.state = {
      creatingWorkOrder: false,
      workOrders: []
    }

    this.showCreateWorkOrder = this.showCreateWorkOrder.bind(this)
  }

  async fetchWorkOrders() {
    // Some fetching here
  }

  async saveWorkOrder() {
    // Save down a new order
  }

  showCreateWorkOrder() {
    this.setState({
      creatingWorkOrder: true
    })
  }

  render() {
    const { workOrders, creatingWorkOrder } = this.state

    return (
      <Block
        style={{
          padding: spacing.med
        }}>

        <Block
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: spacing.med
          }}>

          {!creatingWorkOrder &&
            <PrimaryButton
              type="button"
              onClick={this.showCreateWorkOrder}>

              + Create New Order
            </PrimaryButton>
          }
        </Block>

        {creatingWorkOrder &&
          <CreateWorkOrder saveWorkOrder={this.saveWorkOrder} />
        }

        <List workOrders={workOrders} />
      </Block>
    )
  }
}
