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
    const res = await fetch('/api/get-work-orders', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('sessionToken')}`
      }
    })

    if (res.ok) {
      const { workOrders } = await res.json()

      this.setState({workOrders})
    }
  }

  async saveWorkOrder() {
    // Save down a new order
  }

  showCreateWorkOrder() {
    this.setState({
      creatingWorkOrder: true
    })
  }

  componentDidMount() {
    this.fetchWorkOrders()
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
