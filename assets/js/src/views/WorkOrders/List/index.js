import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { Block, Grid, Row, Col } from 'components'
import { colors, spacing, type } from 'theme'

import HeaderCell from './HeaderCell'
import BodyCell from './BodyCell'

export default class List extends Component {
  render() {
    const { workOrders } = this.props

    return (
      <Block>
        <Grid
          noMobileWrap
          padding={12}>

          {/* Header row */}
          <Row
            style={{
              fontWeight: 700,
              fontSize: type.small
            }}>

            <HeaderCell>
              Title
            </HeaderCell>

            <HeaderCell>
              Description
            </HeaderCell>

            <HeaderCell>
              Priority
            </HeaderCell>

            <HeaderCell>
              Due Date
            </HeaderCell>
          </Row>

          {workOrders.map((workOrder, i) => {
            const { title, description, priority, dueDate } = workOrder
            const displayDate = moment(dueDate, moment.ISO_8601)
              .calendar()

            return (
              <Row
                key={i}
                style={{
                  fontSize: type.small
                }}>

                <BodyCell>
                  {title}
                </BodyCell>

                <BodyCell>
                  {description}
                </BodyCell>

                <BodyCell>
                  {priority}
                </BodyCell>

                <BodyCell>
                  {displayDate}
                </BodyCell>
              </Row>
            )
          })}
        </Grid>
      </Block>
    )
  }
}

List.propTypes = {
  workOrders: PropTypes.arrayOf(PropTypes.object)
}
