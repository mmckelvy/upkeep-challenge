import React, { Component } from 'react'
import moment from 'moment'

import { Link } from 'react-router-dom'

import { Block, Grid, Row, Col, PrimaryButton, ClickAway } from 'components'
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

    this.saveWorkOrder = this.saveWorkOrder.bind(this)
    this.showCreateWorkOrder = this.showCreateWorkOrder.bind(this)
    this.hideCreateWorkOrder = this.hideCreateWorkOrder.bind(this)
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

  async saveWorkOrder({ values }) {
    try {
      const { dueDate, ...rest } = values
      const ms = moment(dueDate, 'YYYY-MM-DD').valueOf()

      const res = await fetch(`/api/create-work-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('sessionToken')}`
        },
        body: JSON.stringify({dueDate: ms, ...rest})
      })

      if (res.ok) {
        const { workOrder } = await res.json()

        // Add the saved resource to the list.
        this.setState({
          workOrders: [workOrder, ...this.state.workOrders]
        })

        this.hideCreateWorkOrder()
      }

    } catch (err) {
      // Some error handling
    }
  }

  showCreateWorkOrder() {
    this.setState({
      creatingWorkOrder: true
    })
  }

  hideCreateWorkOrder() {
    this.setState({
      creatingWorkOrder: false
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

            <PrimaryButton
              type="button"
              onClick={this.showCreateWorkOrder}>

              + Create New Order
            </PrimaryButton>
        </Block>

        <CreateWorkOrder
          saveWorkOrder={this.saveWorkOrder}
          creatingWorkOrder={creatingWorkOrder}
          hideCreateWorkOrder={this.hideCreateWorkOrder}
        />

        {creatingWorkOrder &&
          <ClickAway
            zIndex={1}
            onClick={this.hideCreateWorkOrder}
          />
        }

        <List workOrders={workOrders} />
      </Block>
    )
  }
}
