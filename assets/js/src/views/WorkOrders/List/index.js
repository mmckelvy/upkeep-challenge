import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Block, Grid, Row, Col } from 'components'
import { colors, spacing, type } from 'theme'

export default class List extends Component {
  render() {
    const { workOrders } = this.props

    return (
      <Block>
        <Grid
          padding={12}>

          {/* Header row */}
          <Row
            style={{
              fontWeight: 700,
              fontSize: type.small
            }}>

            <Col
              style={{
                borderBottom: `1px solid ${colors.blueGrey500}`,
                padding: spacing.small
              }}>

              Title
            </Col>

            <Col
              style={{
                borderBottom: `1px solid ${colors.blueGrey500}`,
                padding: spacing.small
              }}>

              Description
            </Col>

            <Col
              style={{
                borderBottom: `1px solid ${colors.blueGrey500}`,
                padding: spacing.small
              }}>

              Priority
            </Col>

            <Col
              style={{
                borderBottom: `1px solid ${colors.blueGrey500}`,
                padding: spacing.small
              }}>

              Due date
            </Col>
          </Row>

          {workOrders.map((workOrder, i) => {
            const { title, description, priority, dueDate } = workOrder

            return (
              <Row
                key={i}
                style={{
                  fontSize: type.small
                }}>

                <Col
                  style={{
                    borderBottom: `1px solid ${colors.blueGrey300}`,
                    padding: spacing.small
                  }}>

                  {title}
                </Col>

                <Col
                  style={{
                    borderBottom: `1px solid ${colors.blueGrey300}`,
                    padding: spacing.small
                  }}>

                  {description}
                </Col>

                <Col
                  style={{
                    borderBottom: `1px solid ${colors.blueGrey300}`,
                    padding: spacing.small
                  }}>

                  {priority}
                </Col>

                <Col
                  style={{
                    borderBottom: `1px solid ${colors.blueGrey300}`,
                    padding: spacing.small
                  }}>

                  {dueDate}
                </Col>
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
